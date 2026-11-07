// @ts-ignore The file exists only after `opennextjs-cloudflare build`.
import openNext from "../.open-next/worker.js";

// @ts-ignore The file exists only after `opennextjs-cloudflare build`.
export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "../.open-next/worker.js";

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

export default {
  fetch(request: Request, env: Env, ctx: unknown): Promise<Response> {
    const { pathname } = new URL(request.url);
    if ((request.method === "GET" || request.method === "HEAD") && VIDEO_PATH.test(pathname)) {
      return serveVideo(request, env);
    }
    return openNext.fetch(request, env, ctx);
  },
};
