import { render, screen } from "@testing-library/react";
import ContactPage from "./page";

describe("contact page", () => {
  it("links every social profile to its normalized URL in a new tab", () => {
    render(<ContactPage />);
    const expected = {
      Instagram: "https://www.instagram.com/ihsaan.network/",
      LinkedIn: "https://www.linkedin.com/company/ihsaan-network/",
      TikTok: "https://www.tiktok.com/@ihsaan.network",
      YouTube: "https://www.youtube.com/@IHSAAN.network",
    };
    for (const [name, href] of Object.entries(expected)) {
      const link = screen.getByRole("link", { name });
      expect(link.getAttribute("href")).toBe(href);
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });

  it("lets social links wrap on narrow screens", () => {
    render(<ContactPage />);
    expect(screen.getByRole("link", { name: "Instagram" }).parentElement?.className).toContain("flex-wrap");
  });

  it("sends community and volunteering questions to the matching get involved sections", () => {
    render(<ContactPage />);
    expect(screen.getByRole("link", { name: "Join the WhatsApp community" }).getAttribute("href")).toBe(
      "/ticket#community",
    );
    expect(screen.getByRole("link", { name: "Volunteer with IHSAAN" }).getAttribute("href")).toBe("/ticket#volunteer");
  });
});
