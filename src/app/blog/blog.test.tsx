import { render, screen } from "@testing-library/react";
import { BLOG_POSTS } from "@/content/blog";
import { NAV_LINKS } from "@/content/site";
import sitemap from "../sitemap";
import BlogPage from "./page";
import BlogPostPage, { generateStaticParams } from "./[slug]/page";

describe("blog index", () => {
  it("nests resource types under the Resources nav item", () => {
    const resources = NAV_LINKS.find((link) => link.label === "Resources");
    expect(resources?.href).toBe("/resources");
    expect(resources?.children?.map((child) => child.label)).toEqual([
      "Career Essentials",
      "Blog",
    ]);
    expect(resources?.children?.map((child) => child.href)).toEqual([
      "/resources#career-essentials",
      "/blog",
    ]);
  });

  it("links every post to its native article page", () => {
    render(<BlogPage />);
    expect(BLOG_POSTS).toHaveLength(1);
    for (const post of BLOG_POSTS) {
      expect(screen.getByRole("heading", { name: post.title })).toBeTruthy();
      expect(screen.getByRole("link", { name: "Read article" }).getAttribute("href")).toBe(`/blog/${post.slug}`);
      expect(screen.getByRole("link", { name: post.title }).getAttribute("href")).toBe(`/blog/${post.slug}`);
    }
  });

  it("keeps tracking parameters and gated destinations out of the listing", () => {
    const { container } = render(<BlogPage />);
    expect(container.innerHTML).not.toContain("fbclid");
    expect(container.innerHTML).not.toContain("opportunities-tracker");
    expect(container.innerHTML).not.toContain("tally.so");
  });

  it("publishes the blog index and every article in the sitemap", () => {
    const urls = sitemap().map(({ url }) => url);
    expect(urls).toContain("https://ihsaan.network/blog");
    for (const post of BLOG_POSTS) {
      expect(urls).toContain(`https://ihsaan.network/blog/${post.slug}`);
    }
  });
});

describe("blog article pages", () => {
  it("builds a static page for every post", () => {
    expect(generateStaticParams()).toEqual(BLOG_POSTS.map(({ slug }) => ({ slug })));
  });

  it("renders the Civil Service reflection on-site with article schema and author contact", async () => {
    const post = BLOG_POSTS[0];
    const { container } = render(await BlogPostPage({ params: Promise.resolve({ slug: post.slug }) }));

    expect(screen.getByRole("heading", { level: 1, name: post.title })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Applying for the SIP" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Connect on LinkedIn" }).getAttribute("href")).toBe(post.author.linkedin);
    expect(container.innerHTML).toContain("\"@type\":\"BlogPosting\"");
    expect(container.innerHTML).toContain(`\"headline\":\"${post.title}\"`);
    expect(container.innerHTML).toContain("https://ihsaan.network/blog/civil-service-summer-internship");
    expect(container.innerHTML).not.toContain("fbclid");
  });

  it("keeps the article canonical on ihsaan.network while still attributing the Notion original", async () => {
    const post = BLOG_POSTS[0];
    render(await BlogPostPage({ params: Promise.resolve({ slug: post.slug }) }));
    const original = screen.getByRole("link", { name: post.originalSource!.label });
    expect(original.getAttribute("href")).toBe(post.originalSource!.href);
    expect(original.getAttribute("rel")).toContain("noopener");
  });
});
