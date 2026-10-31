import { render, screen, within } from "@testing-library/react";
import { BLOG_POSTS } from "@/content/blog";
import sitemap from "../sitemap";
import BlogPage from "./page";
import BlogPostPage, { generateStaticParams } from "./[slug]/page";

describe("blog index", () => {
  it("links every post to its native article page", () => {
    render(<BlogPage />);
    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(BLOG_POSTS.length);
    for (const [index, post] of BLOG_POSTS.entries()) {
      const article = within(articles[index]);
      expect(article.getByRole("heading", { name: post.title })).toBeInTheDocument();
      expect(article.getByRole("link", { name: "Read article" })).toHaveAttribute("href", `/blog/${post.slug}`);
      expect(article.getByRole("link", { name: post.title })).toHaveAttribute("href", `/blog/${post.slug}`);
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
  const post = BLOG_POSTS.find(({ slug }) => slug === "civil-service-summer-internship");
  if (!post) throw new Error("Missing Civil Service reflection");

  it("builds a static page for every post", () => {
    expect(generateStaticParams()).toEqual(BLOG_POSTS.map(({ slug }) => ({ slug })));
  });

  it("renders the Civil Service reflection on-site with article schema and author contact", async () => {
    const { container } = render(await BlogPostPage({ params: Promise.resolve({ slug: post.slug }) }));

    expect(screen.getByRole("heading", { level: 1, name: post.title })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Applying for the SIP" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Connect on LinkedIn" }).getAttribute("href")).toBe(post.author.linkedin);
    expect(container.innerHTML).toContain("\"@type\":\"BlogPosting\"");
    expect(container.innerHTML).toContain(`"headline":"${post.title}"`);
    expect(container.innerHTML).toContain("https://ihsaan.network/blog/civil-service-summer-internship");
    expect(container.innerHTML).not.toContain("fbclid");
  });

  it("attributes the Notion original with a safe external link", async () => {
    render(await BlogPostPage({ params: Promise.resolve({ slug: post.slug }) }));
    const original = screen.getByRole("link", { name: post.originalSource!.label });
    expect(original).toHaveAttribute("href", post.originalSource!.href);
    expect(original).toHaveAttribute("target", "_blank");
    expect(original.relList).toContain("noopener");
    expect(original.relList).toContain("noreferrer");
  });

  it("links the section list to the corresponding article headings", async () => {
    render(await BlogPostPage({ params: Promise.resolve({ slug: post.slug }) }));
    const toc = screen.getByRole("navigation", { name: "Article sections" });
    expect(within(toc).getByText("In this article")).toBeInTheDocument();
    expect(within(toc).getAllByRole("link").map((link) => link.getAttribute("href")))
      .toEqual(post.sections.map(({ id }) => `#${id}`));
    for (const section of post.sections) {
      const heading = screen.getByRole("heading", { level: 2, name: section.title });
      expect(heading.closest("section")).toHaveAttribute("id", section.id);
    }
  });
});
