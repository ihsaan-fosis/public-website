import { describe, expect, it } from "vitest";
import { MISSION, TAGLINE } from "../../src/content/site";
import { PROGRAMME_PAGES } from "../../src/content/programmes";

// Run against `bun run preview`, not next dev: src/worker.ts owns negotiation.
// Also run `bunx wrangler dev --port 8788 --inspector-port 9231
// --local-upstream www.ihsaan.network --upstream-protocol https
// --persist-to .wrangler/state-www` after the build.
// Set BASE_URL=http://localhost:8787 and WWW_BASE_URL=http://localhost:8788.
// Host headers alone cannot select the www origin through Wrangler's preview proxy.
const baseUrl = process.env.BASE_URL;

async function request(route: string, init: RequestInit = {}, origin = baseUrl) {
  if (!origin) throw new Error("Set BASE_URL to the running OpenNext Worker preview");
  const response = await fetch(new URL(route, origin), {
    ...init,
    redirect: "manual",
    signal: AbortSignal.timeout(25_000),
  });
  const body = await response.text();
  const contentType = response.headers.get("content-type");
  console.info("Worker HTTP response", {
    origin,
    route,
    method: init.method ?? "GET",
    status: response.status,
    contentType,
    location: response.headers.get("location"),
    bodyPreview: contentType?.includes("text") ? body.slice(0, 160) : "[non-text response]",
  });
  return { status: response.status, headers: response.headers, body };
}

function varyIncludesAccept(headers: Headers) {
  expect(headers.get("vary")?.toLowerCase().split(",").map((name) => name.trim())).toContain("accept");
}

describe("Worker Markdown representation", () => {
  it.each(["GET", "HEAD"])("preserves the www to apex redirect for Markdown %s requests", async (method) => {
    const wwwBaseUrl = process.env.WWW_BASE_URL;
    if (!wwwBaseUrl) throw new Error("Set WWW_BASE_URL to a Worker preview with --local-upstream www.ihsaan.network");
    const html = await request("/", { method, headers: { Accept: "text/html" } }, wwwBaseUrl);
    expect(html.status, "The www preview must reach the existing Next.js redirect").toBe(308);
    expect(html.headers.get("location")).toBe("https://ihsaan.network/");

    const markdown = await request("/", { method, headers: { Accept: "text/markdown" } }, wwwBaseUrl);
    expect.soft(markdown.status).toBe(308);
    expect.soft(markdown.headers.get("location")).toBe(html.headers.get("location"));
    expect.soft(markdown.headers.get("content-type") ?? "").not.toContain("text/markdown");
    if (method === "HEAD") expect(markdown.body).toBe("");
  });

  it("serves a faithful, uncached homepage with canonical and variant headers", async () => {
    const response = await request("/", { headers: { Accept: "text/markdown" } });
    expect.soft(response.status).toBe(200);
    expect.soft(response.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect.soft(response.headers.get("cache-control")).toContain("no-store");
    // Wrangler's preview proxy rewrites the production origin in response headers.
    expect.soft(["https://ihsaan.network", new URL(baseUrl!).origin].some((origin) =>
      (response.headers.get("link") ?? "").includes(`<${origin}/>; rel="canonical"`))).toBe(true);
    expect.soft(response.body.startsWith("# ")).toBe(true);
    expect.soft(response.body).toContain(TAGLINE);
    expect.soft(response.body).toContain(MISSION);
    expect.soft(response.body).toContain("https://ihsaan.network/start");
    expect.soft(response.body).toContain("https://portal.ihsaan.network/sign-in");
    for (const programme of PROGRAMME_PAGES) {
      expect.soft(response.body).toContain(`[${programme.title}](https://ihsaan.network/programmes/${programme.slug})`);
    }
    varyIncludesAccept(response.headers);
  });

  it("answers HEAD with the same Markdown headers as GET and no body", async () => {
    const get = await request("/", { headers: { Accept: "text/markdown" } });
    const head = await request("/", { method: "HEAD", headers: { Accept: "text/markdown" } });
    expect(head.status).toBe(200);
    expect.soft(head.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    for (const name of ["content-type", "vary", "cache-control", "link"]) {
      expect.soft(head.headers.get(name), name).toBe(get.headers.get(name));
    }
    expect(head.body).toBe("");
  });

  it.each([
    ["text/markdown", "text/markdown"],
    ["text/markdown, text/html;q=0.5", "text/markdown"],
    ["text/markdown ;q=1, text/html;q=0.5", "text/markdown"],
    ["text/markdown \t; q=1, text/html ; q=0.5", "text/markdown"],
    ["text/html", "text/html"],
    ["*/*", "text/html"],
    ["text/markdown, text/html", "text/html"],
    ["text/html, text/markdown;q=0.9", "text/html"],
    ["text/markdown;q=0", "text/html"],
    ["text/*;q=0.8, text/html;q=0.5", "text/markdown"],
    ["*/*;q=0.8, text/html;q=0.5", "text/markdown"],
    ["text/*", "text/html"],
    ["text/markdown;q=0, text/*;q=1, text/html;q=0.5", "text/html"],
    ["text/markdown;q=0.7, text/*;q=0.8, */*;q=1", "text/html"],
    ["text/markdown;q=0.7, text/html;q=0, */*;q=1", "text/markdown"],
  ])("negotiates Accept: %s as %s using the most specific quality", async (accept, type) => {
    const response = await request("/", { headers: { Accept: accept } });
    expect(response.status).toBe(200);
    expect.soft(response.headers.get("content-type")).toContain(type);
    varyIncludesAccept(response.headers);
  });

  it.each([
    { label: "RSC", route: "/", headers: new Headers({ RSC: "1" }), method: "GET" },
    { label: "router prefetch", route: "/", headers: new Headers({ "Next-Router-Prefetch": "1" }), method: "GET" },
    { label: "RSC query", route: "/?_rsc=issue41", headers: new Headers(), method: "GET" },
    { label: "POST", route: "/", headers: new Headers(), method: "POST" },
    { label: "API route", route: "/api/does-not-exist-41", headers: new Headers(), method: "GET" },
    { label: "Next asset", route: "/_next/static/does-not-exist-41.js", headers: new Headers(), method: "GET" },
    { label: "media asset", route: "/media/faithful-talent-hd.webp", headers: new Headers(), method: "GET" },
    { label: "missing media asset", route: "/media/does-not-exist-41", headers: new Headers(), method: "GET" },
    { label: "robots file", route: "/robots.txt", headers: new Headers(), method: "GET" },
    { label: "sitemap file", route: "/sitemap.xml", headers: new Headers(), method: "GET" },
  ])("passes through $label even when Markdown is requested", async ({ route, headers, method }) => {
    const baselineHeaders = new Headers(headers);
    baselineHeaders.set("Accept", "text/html");
    const markdownHeaders = new Headers(headers);
    markdownHeaders.set("Accept", "text/markdown");
    const baseline = await request(route, { method, headers: baselineHeaders });
    const markdown = await request(route, { method, headers: markdownHeaders });
    expect(markdown.status).toBe(baseline.status);
    expect(markdown.headers.get("content-type") ?? "").not.toContain("text/markdown");
    expect(markdown.headers.get("content-type")).toBe(baseline.headers.get("content-type"));
  });

  it("returns an agent-readable 404 with noindex and recovery links", async () => {
    const response = await request("/does-not-exist-41", { headers: { Accept: "text/markdown" } });
    expect.soft(response.status).toBe(404);
    expect.soft(response.headers.get("content-type")).toContain("text/markdown");
    expect.soft(response.headers.get("x-robots-tag")?.toLowerCase() ?? "").toContain("noindex");
    for (const url of ["https://ihsaan.network/", "https://ihsaan.network/sitemap.xml", "https://ihsaan.network/llms.txt"]) {
      expect.soft(response.body).toContain(`](${url})`);
    }
    varyIncludesAccept(response.headers);
  });

  it("preserves a real HTML 404 when HTML is requested", async () => {
    const response = await request("/does-not-exist-41", { headers: { Accept: "text/html" } });
    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toContain("text/html");
  });

  it("keeps /about as HTML because only home has a Markdown variant", async () => {
    const response = await request("/about", { headers: { Accept: "text/markdown" } });
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/html");
  });

  it("documents public jobs and the member portal boundary in llms.txt", async () => {
    const response = await request("/llms.txt");
    expect(response.status).toBe(200);
    const section = response.body.match(/^## When to use[^\n]*\n([\s\S]*?)(?=^## |$(?![\s\S]))/m)?.[1];
    expect(section, "llms.txt must contain a ## When to use section").toBeDefined();
    for (const job of ["programmes", "mentoring", "volunteering", "contact"]) {
      expect.soft(section?.toLowerCase()).toContain(job);
    }
    expect.soft(section).toContain("https://portal.ihsaan.network");
    expect.soft(section).toMatch(/sign[- ]in/i);
    expect.soft(section).toMatch(/sign[- ]up/i);
    expect.soft(section).toMatch(/events/i);
  });
});
