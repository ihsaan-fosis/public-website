// @ts-ignore The file exists only after `opennextjs-cloudflare build`.
import openNext from "../.open-next/worker.js";

// @ts-ignore The file exists only after `opennextjs-cloudflare build`.
export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "../.open-next/worker.js";
import { homeMarkdown, notFoundMarkdown } from "./lib/markdown";
import { PRODUCTION_ORIGIN } from "./lib/site";

type Assets = { fetch(request: Request): Promise<Response> };
type Env = { ASSETS: Assets };

const VIDEO_PATH = /^\/media\/.+\.mp4$/;

type ByteRange = { start: number; end: number };

/** Reads a single `bytes=` range. Returns null to serve the whole file, or "unsatisfiable" for a 416. */
function parseRange(header: string | null, size: number): ByteRange | "unsatisfiable" | null {
  const match = header?.match(/^bytes=(\d*)-(\d*)$/);
  if (!match) return null;
  const [, first, last] = match;
  if (first === "" && last === "") return null;
  if (first === "") {
    const length = Number(last);
    if (length === 0) return "unsatisfiable";
    return { start: Math.max(size - length, 0), end: size - 1 };
  }
  const start = Number(first);
  if (start >= size) return "unsatisfiable";
  return { start, end: last === "" ? size - 1 : Math.min(Number(last), size - 1) };
}

/**
 * Static assets ignore `Range`, and iOS Safari will not play a video from a server that does not
 * answer it with 206. The hero video is the only asset that needs this.
 */
async function serveVideo(request: Request, env: Env): Promise<Response> {
  const headers = new Headers(request.headers);
  headers.delete("range");
  const asset = await env.ASSETS.fetch(new Request(request.url, { method: "GET", headers }));
  if (!asset.ok) return asset;

  const bytes = await asset.arrayBuffer();
  const out = new Headers(asset.headers);
  out.set("Accept-Ranges", "bytes");
  const range = parseRange(request.headers.get("range"), bytes.byteLength);

  if (range === "unsatisfiable") {
    out.set("Content-Range", `bytes */${bytes.byteLength}`);
    return new Response(null, { status: 416, headers: out });
  }

  const body = range ? bytes.slice(range.start, range.end + 1) : bytes;
  out.set("Content-Length", String(body.byteLength));
  if (range) out.set("Content-Range", `bytes ${range.start}-${range.end}/${bytes.byteLength}`);
  return new Response(request.method === "HEAD" ? null : body, { status: range ? 206 : 200, headers: out });
}

/** The q-value of the most specific Accept range that matches `type`, or 0 when none does. */
function quality(accept: string, type: string): number {
  const family = `${type.split("/")[0]}/*`;
  let best = { specificity: -1, q: 0 };
  for (const part of accept.split(",")) {
    const [range, ...params] = part.toLowerCase().split(";").map((piece) => piece.trim());
    const specificity = range === type ? 2 : range === family ? 1 : range === "*/*" ? 0 : -1;
    if (specificity <= best.specificity) continue;
    const q = params.find((param) => param.startsWith("q="));
    const value = q ? Number(q.slice(2)) : 1;
    best = { specificity, q: Number.isFinite(value) ? value : 0 };
  }
  return best.q;
}

const WWW_HOST = `www.${new URL(PRODUCTION_ORIGIN).host}`;

/**
 * Page documents only: not RSC or prefetch fetches, mutations, APIs, build assets or files. The
 * `www` host is left to the redirect in next.config.mjs, so no representation is served there.
 */
function isDocumentRequest(request: Request, url: URL): boolean {
  if (url.host === WWW_HOST) return false;
  if (request.method !== "GET" && request.method !== "HEAD") return false;
  if (request.headers.has("rsc") || request.headers.has("next-router-prefetch") || url.searchParams.has("_rsc")) return false;
  return !/^\/(?:api|_next|media)\//.test(url.pathname) && !/\.[^/]+$/.test(url.pathname);
}

/** Markdown only when the client ranks it above HTML, so a browser's `*\/*` keeps HTML. */
function prefersMarkdown(request: Request): boolean {
  const accept = request.headers.get("accept") ?? "";
  return quality(accept, "text/markdown") > quality(accept, "text/html");
}

function varyOnAccept(response: Response): Response {
  const vary = response.headers.get("vary");
  if (vary?.split(",").some((name) => ["accept", "*"].includes(name.trim().toLowerCase()))) return response;
  const out = new Response(response.body, response);
  out.headers.set("vary", vary ? `${vary}, Accept` : "Accept");
  return out;
}

/** Uncached: Cloudflare's cache does not key on `Vary`, so a cached copy could reach a browser. */
function markdownResponse(request: Request, body: string, status: number, headers: Record<string, string>): Response {
  return new Response(request.method === "HEAD" ? null : body, {
    status,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "no-store",
      vary: "Accept",
      "x-content-type-options": "nosniff",
      ...headers,
    },
  });
}

async function negotiate(request: Request, url: URL, env: Env, ctx: unknown): Promise<Response> {
  if (!prefersMarkdown(request)) return varyOnAccept(await openNext.fetch(request, env, ctx));
  if (url.pathname === "/") {
    return markdownResponse(request, homeMarkdown(), 200, { link: `<${PRODUCTION_ORIGIN}/>; rel="canonical"` });
  }
  const response = await openNext.fetch(request, env, ctx);
  if (response.status !== 404) return varyOnAccept(response);
  return markdownResponse(request, notFoundMarkdown(url.pathname), 404, { "x-robots-tag": "noindex" });
}

export default {
  fetch(request: Request, env: Env, ctx: unknown): Promise<Response> {
    const url = new URL(request.url);
    if ((request.method === "GET" || request.method === "HEAD") && VIDEO_PATH.test(url.pathname)) {
      return serveVideo(request, env);
    }
    if (isDocumentRequest(request, url)) return negotiate(request, url, env, ctx);
    return openNext.fetch(request, env, ctx);
  },
};
