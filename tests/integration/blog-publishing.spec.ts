import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

// Exercise server pages, discovery routes and the real Convex HTTP client together.
// Only the remote Convex transport is substituted: no deployment or data writes are approved.
const calls: string[] = [];
const legacySlug = "civil-service-summer-internship";
const article = {
  slug: "published-backend-article",
  title: "Published backend article",
  summary: "A published article served from the shared backend.",
  authorName: "Example Author",
  tags: ["Careers"],
  imageUrl: "https://images.example.com/cover.webp",
  imageAlt: "A programme session",
  publishedAt: Date.UTC(2026, 9, 31),
  bodyMd: "## Workshop lessons\n\nA complete published story.\n\n<script>alert(1)</script>\n\n[unsafe](javascript:alert%281%29)",
};
let empty = false;

beforeEach(() => {
  calls.length = 0;
  empty = false;
  vi.stubEnv("CONVEX_URL", "https://public-content-fixture.convex.cloud");
  vi.stubGlobal("fetch", vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
    const request = JSON.parse(String(init?.body)) as { path: string; args: [{ slug?: string }] };
    calls.push(request.path);
    if (request.path === "blogPosts:listPublished") {
      return Response.json({ status: "success", value: empty ? [] : [{ ...article, bodyMd: undefined }] });
    }
    if (request.path === "blogPosts:getPublished") {
      return Response.json({ status: "success", value: !empty && request.args[0].slug === article.slug ? article : null });
    }
    throw new Error(`Unexpected backend access: ${request.path}`);
  }));
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("published blog data through public server routes", () => {
  it("renders backend articles on the index without loading any private API", async () => {
    const { default: BlogPage } = await import("../../src/app/blog/page");
    const html = renderToStaticMarkup(await BlogPage());
    expect(html).toContain(article.title);
    expect(html).toContain(`/blog/${article.slug}`);
    expect(calls).toContain("blogPosts:listPublished");
    expect(calls.every((path) => path === "blogPosts:listPublished")).toBe(true);
  });

  it("renders safe Markdown and correct metadata for a newly published slug", async () => {
    const { default: BlogPage, generateMetadata } = await import("../../src/app/blog/[slug]/page");
    const params = Promise.resolve({ slug: article.slug });
    const html = renderToStaticMarkup(await BlogPage({ params }));
    expect(html).toContain("A complete published story.");
    expect(html).toContain("Workshop lessons");
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).not.toContain('href="javascript:');
    expect(html).toContain(article.imageUrl);
    expect(html).not.toContain(`https://ihsaan.network${article.imageUrl}`);
    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe(article.title);
    expect(metadata.alternates?.canonical).toBe(`/blog/${article.slug}`);
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      url: `/blog/${article.slug}`,
      title: `${article.title} | IHSAAN`,
      description: article.summary,
      images: [article.imageUrl],
      authors: [article.authorName],
      publishedTime: new Date(article.publishedAt).toISOString(),
      tags: article.tags,
    });
    expect(metadata.twitter).toMatchObject({
      title: `${article.title} | IHSAAN`,
      description: article.summary,
      images: [article.imageUrl],
    });
    expect(calls).toContain("blogPosts:getPublished");
  });

  it("publishes the same live catalog in sitemap and llms.txt", async () => {
    const { default: sitemap } = await import("../../src/app/sitemap");
    const { GET } = await import("../../src/app/llms.txt/route");
    expect(await sitemap()).toEqual(expect.arrayContaining([
      expect.objectContaining({ url: `https://ihsaan.network/blog/${article.slug}` }),
    ]));
    expect(await (await GET()).text()).toContain(`/blog/${article.slug}`);
  });

  it("honors an authoritative empty catalog and does not resurrect an unpublished legacy slug", async () => {
    empty = true;
    const { default: BlogPage } = await import("../../src/app/blog/page");
    const { default: PostPage } = await import("../../src/app/blog/[slug]/page");
    const html = renderToStaticMarkup(await BlogPage());
    expect(html).toContain("Nothing is published yet.");
    expect(html).not.toContain("<article");
    expect(html).not.toContain(`/blog/${legacySlug}`);
    await expect(PostPage({ params: Promise.resolve({ slug: legacySlug }) })).rejects.toThrow(/NEXT_HTTP_ERROR_FALLBACK;404/);
    expect(calls).toEqual(["blogPosts:listPublished", "blogPosts:getPublished"]);
  });

  it.each([undefined, "", "   "])("serves no posts or article URLs without a configured backend (CONVEX_URL=%s)", async (url) => {
    vi.stubEnv("CONVEX_URL", url);
    const { default: BlogPage } = await import("../../src/app/blog/page");
    const { default: PostPage } = await import("../../src/app/blog/[slug]/page");
    const { default: sitemap } = await import("../../src/app/sitemap");
    const { GET } = await import("../../src/app/llms.txt/route");

    const html = renderToStaticMarkup(await BlogPage());
    expect(html).toContain("Nothing is published yet.");
    expect(html).not.toContain("<article");
    expect(html).not.toContain('href="/blog/');
    await expect(PostPage({ params: Promise.resolve({ slug: legacySlug }) })).rejects.toThrow(/NEXT_HTTP_ERROR_FALLBACK;404/);

    const urls = (await sitemap()).map(({ url }) => url);
    expect(urls).toContain("https://ihsaan.network/blog");
    expect(urls.some((url) => url.startsWith("https://ihsaan.network/blog/"))).toBe(false);
    const llms = await (await GET()).text();
    expect(llms).toContain("- [/blog](/blog) Blog:");
    expect(llms).not.toContain("/blog/");
    expect(calls).toEqual([]);
    expect(fetch).not.toHaveBeenCalled();
  });
});
