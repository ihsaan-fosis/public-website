import { PROGRAMME_PAGES } from "@/content/programmes";
import { LEGACY_PAGES } from "@/content/legacy-routes.mjs";
import { pageMetadata } from "@/lib/metadata";
import { GET as llms } from "./llms.txt/route";
import robots from "./robots";
import sitemap from "./sitemap";

const ORIGIN = "https://ihsaan.network";

describe("technical SEO routes", () => {
  it("publishes only canonical, indexable sitemap URLs", () => {
    const urls = sitemap().map(({ url }) => url);

    expect(urls).toContain(`${ORIGIN}/`);
    expect(urls).toContain(`${ORIGIN}/privacy`);
    expect(urls).toContain(`${ORIGIN}/terms`);
    expect(urls).toContain(`${ORIGIN}/events`);
    expect(urls).toContain(`${ORIGIN}/impact`);
    expect(urls).toContain(`${ORIGIN}/resources`);
    expect(urls).toContain(`${ORIGIN}/resources/intentions-behind-a-career`);
    expect(urls).toContain(`${ORIGIN}/resources/acing-interviews`);
    expect(urls).not.toContain(`${ORIGIN}/resources/civil-service-summer-internship`);
    expect(urls).toContain(`${ORIGIN}/blog`);
    expect(urls).toContain(`${ORIGIN}/blog/civil-service-summer-internship`);
    expect(urls).toContain(`${ORIGIN}/tech-team`);
    expect(urls).toContain(`${ORIGIN}/start`);
    expect(urls).toContain(`${ORIGIN}/professionals`);
    expect(urls).not.toContain(`${ORIGIN}/mentoring`);
    expect(urls).not.toContain(`${ORIGIN}/haqqathons`);
    expect(urls).not.toContain(`${ORIGIN}/404`);
    expect(urls.every((url) => url.startsWith(ORIGIN))).toBe(true);
  });

  it("advertises the canonical sitemap and excludes the vanity 404 route", () => {
    const result = robots();

    expect(result.sitemap).toBe(`${ORIGIN}/sitemap.xml`);
    expect(result.rules).toMatchObject({ allow: "/", disallow: "/404" });
  });
});

describe("llms.txt", () => {
  it("lists the events and resources routes and every approved social profile", async () => {
    const body = await llms().text();

    expect(body).toContain("- [/events](/events) Events:");
    expect(body).toContain("- [/impact](/impact) Impact:");
    expect(body).toContain("- [/resources](/resources) Resources:");
    expect(body).toContain("- [/resources/intentions-behind-a-career](/resources/intentions-behind-a-career)");
    expect(body).toContain("- [/blog](/blog) Blog:");
    expect(body).toContain("- [/blog/civil-service-summer-internship](/blog/civil-service-summer-internship)");
    expect(body).toContain("- [/tech-team](/tech-team) IHSAAN Tech Team");
    expect(body).toContain("- [/start](/start)");
    expect(body).toContain("- [/professionals](/professionals) Professionals");
    expect(body).not.toContain("/mentoring");
    expect(body).not.toContain("/haqqathons");
    expect(body).toContain("Faith. Excellence. Service.");
    for (const profile of [
      "https://www.instagram.com/ihsaan.network/",
      "https://www.linkedin.com/company/ihsaan-network/",
      "https://www.tiktok.com/@ihsaan.network",
      "https://www.youtube.com/@IHSAAN.network",
    ]) {
      expect(body).toContain(profile);
    }
    expect(body).not.toMatch(/fbclid|tally\.so|opportunities-tracker/);
  });
});

describe("page metadata", () => {
  const professionalsPage = "./professionals/page";
  const pages = [
    ["/about", () => import("./about/page")],
    ["/contact", () => import("./contact/page")],
    ["/events", () => import("./events/page")],
    ["/impact", () => import("./impact/page")],
    ["/resources", () => import("./resources/page")],
    ["/blog", () => import("./blog/page")],
    ["/gallery", () => import("./gallery/page")],
    ["/start", () => import("./start/page")],
    ["/professionals", () => import(professionalsPage)],
    ["/volunteer", () => import("./volunteer/page")],
    ["/tech-team", () => import("./tech-team/page")],
    ["/programmes", () => import("./programmes/page")],
    ["/privacy", () => import("./privacy/page")],
    ["/terms", () => import("./terms/page")],
  ] as const;

  it.each(pages)("gives %s its own canonical, share image and social title", async (path, load) => {
    const { metadata } = await load();
    if (path === "/professionals") expect(metadata.title).toBe("Professionals");
    if (path === "/start") {
      expect(metadata.description).toEqual(expect.any(String));
      expect(metadata.description).not.toMatch(/mentor|partner/i);
    }
    expect(metadata.alternates?.canonical).toBe(path);
    expect(metadata.openGraph).toMatchObject({ url: path, siteName: "IHSAAN", images: ["/media/hero-poster.webp"] });
    expect(metadata.twitter).toMatchObject({ title: `${metadata.title} | IHSAAN`, images: ["/media/hero-poster.webp"] });
  });

  it.each(PROGRAMME_PAGES)("gives /programmes/$slug its own canonical, photo and social title", async ({ slug, title, summary, image }) => {
    const { generateMetadata } = await import("./programmes/[slug]/page");
    const metadata = await generateMetadata({ params: Promise.resolve({ slug }) });
    const path = `/programmes/${slug}`;
    expect(metadata.alternates?.canonical).toBe(path);
    expect(metadata.openGraph).toMatchObject({ url: path, title: `${title} | IHSAAN`, images: [image] });
    expect(metadata.twitter).toMatchObject({ title: `${title} | IHSAAN`, description: summary, images: [image] });
  });

  it("gives blog articles article Open Graph tags and a post canonical", async () => {
    const { BLOG_POSTS } = await import("@/content/blog");
    const post = BLOG_POSTS[0];
    const { generateMetadata } = await import("./blog/[slug]/page");
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: post.slug }) });
    const path = `/blog/${post.slug}`;
    expect(metadata.alternates?.canonical).toBe(path);
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      url: path,
      title: `${post.title} | IHSAAN`,
      images: [post.image.src],
      authors: [post.author.name],
    });
    expect(metadata.twitter).toMatchObject({ title: `${post.title} | IHSAAN`, description: post.summary });
  });

  it("gives Career Essentials guides article Open Graph tags and a guide canonical", async () => {
    const { nativeCareerGuides } = await import("@/content/career-essentials");
    const guide = nativeCareerGuides()[0];
    const { generateMetadata } = await import("./resources/[slug]/page");
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: guide.slug }) });
    const path = `/resources/${guide.slug}`;
    expect(metadata.alternates?.canonical).toBe(path);
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      url: path,
      title: `${guide.title} | IHSAAN`,
    });
    expect(metadata.twitter).toMatchObject({ title: `${guide.title} | IHSAAN`, description: guide.summary });
  });

  it("lets the homepage inherit the layout title while keeping full social tags", () => {
    const metadata = pageMetadata({ description: "Home", path: "/" });
    expect(metadata.title).toBeUndefined();
    expect(metadata.openGraph).toMatchObject({ title: "IHSAAN | Faith. Excellence. Service.", url: "/", images: ["/media/hero-poster.webp"] });
    expect(metadata.twitter).toMatchObject({ title: "IHSAAN | Faith. Excellence. Service.", card: "summary_large_image" });
  });
});

describe("error pages", () => {
  it.each([
    ["not-found", () => import("./not-found")],
    ["/404", () => import("./404/page")],
  ] as const)("keeps %s out of the index without borrowing the homepage canonical", async (_name, load) => {
    const { metadata } = await load();
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(metadata.alternates).toEqual({ canonical: null });
    expect(metadata.openGraph).toBeNull();
    expect(metadata.twitter).toBeNull();
  });
});

describe("legacy URLs", () => {
  type Redirect = { source: string; destination: string; permanent: boolean };

  async function redirects(): Promise<Redirect[]> {
    const { default: config } = await import("../../next.config.mjs");
    return config.redirects();
  }

  it.each(LEGACY_PAGES)("redirects /pages/$page.html to $destination", async ({ page, destination, permanent }) => {
    expect((await redirects()).find(({ source }) => source === `/pages/${page}.html`)).toEqual({
      source: `/pages/${page}.html`,
      destination,
      permanent,
    });
  });

  it("keeps the hidden tracker redirects temporary", async () => {
    const all = await redirects();
    expect(all.find(({ source }) => source === "/pages/opportunities-tracker.html")).toMatchObject({ destination: "/programmes", permanent: false });
    expect(all.find(({ source }) => source === "/programmes/opportunities-tracker")).toMatchObject({ destination: "/programmes", permanent: false });
  });

  it.each([
    ["/haqqathons", "/programmes/hackathons"],
    ["/programmes/faithful-talent", "/programmes/summer-internships"],
    ["/programmes/career-guides", "/resources"],
    ["/mentoring", "/programmes/mentorship"],
  ])("sends the retired %s hub to %s", async (source, destination) => {
    expect((await redirects()).find((redirect) => redirect.source === source)).toEqual({
      source,
      destination,
      permanent: true,
    });
  });

  it("sends www to the apex host", async () => {
    const [root, rest] = await redirects();
    expect(root).toMatchObject({
      source: "/",
      has: [{ type: "host", value: "www.ihsaan.network" }],
      destination: "https://ihsaan.network/",
      permanent: true,
    });
    expect(rest).toMatchObject({
      source: "/:path*",
      has: [{ type: "host", value: "www.ihsaan.network" }],
      destination: "https://ihsaan.network/:path*",
      permanent: true,
    });
  });

  it("rescues visitors who cached the broken www redirect", async () => {
    expect((await redirects())[2]).toEqual({ source: "/\\:path\\*", destination: "/", permanent: true });
  });
});

describe("deployment environment", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  async function site(env: Record<string, string | undefined>) {
    for (const [key, value] of Object.entries(env)) vi.stubEnv(key, value);
    vi.resetModules();
    return import("../lib/site");
  }

  it("publishes the apex canonical in production even if another origin is configured", async () => {
    const { SITE_ORIGIN } = await site({ NODE_ENV: "production", NEXT_PUBLIC_APP_URL: "https://preview.vercel.app" });
    expect(SITE_ORIGIN).toBe("https://ihsaan.network");
  });

  it("uses the configured origin outside production", async () => {
    const { SITE_ORIGIN } = await site({ NODE_ENV: "development", NEXT_PUBLIC_APP_URL: "http://localhost:3000/ignored" });
    expect(SITE_ORIGIN).toBe("http://localhost:3000");
  });

  it.each([
    [undefined, true],
    ["production", true],
    ["preview", false],
    ["development", false],
  ])("treats VERCEL_ENV=%s as indexable: %s", async (vercelEnv, indexable) => {
    const { INDEXABLE } = await site({ VERCEL_ENV: vercelEnv });
    expect(INDEXABLE).toBe(indexable);
  });
});
