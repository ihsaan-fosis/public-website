import { render } from "@testing-library/react";
import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it("shows the closing wordmark without waiting for a scroll reveal it can never reach on phones", () => {
    const { container } = render(<SiteFooter />);
    const logos = container.querySelectorAll("img[src$='-logo-large.webp']");
    expect(logos).toHaveLength(2);
    logos.forEach((logo) => expect(logo.closest("[data-reveal]")).toBeNull());
  });
});
