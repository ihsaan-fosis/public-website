import { fireEvent, render, screen, within } from "@testing-library/react";
import GetInvolvedPage from "./page";

function section(id: string) {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Missing #${id}`);
  return within(element);
}

describe("get involved page", () => {
  it("keeps the audience overview and the partnership route", () => {
    render(<GetInvolvedPage />);
    expect(screen.getByRole("heading", { level: 2, name: "Ways to get involved" })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Professionals/ })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Organisations/ }));
    expect(screen.getByRole("link", { name: "Partner with us" }).getAttribute("href")).toBe("/contact");
    expect(screen.getByRole("link", { name: "Contact IHSAAN" }).getAttribute("href")).toBe("/contact");
  });

  it("anchors membership, community, alumni and volunteering for deep links", () => {
    render(<GetInvolvedPage />);
    expect(["membership", "community", "alumni", "volunteer"].map((id) => document.getElementById(id)?.tagName)).toEqual([
      "LI",
      "LI",
      "LI",
      "LI",
    ]);
  });

  it("keeps membership enquiries, portal access and community applications on separate paths", () => {
    render(<GetInvolvedPage />);

    const membership = section("membership");
    expect(membership.getByRole("link", { name: "Ask about membership" }).getAttribute("href")).toBe("/contact");
    expect(membership.getByRole("link", { name: "Student portal" }).getAttribute("href")).toBe(
      "https://portal.ihsaan.network",
    );
    expect(membership.getByText(/not a membership application/)).toBeTruthy();

    const community = section("community");
    expect(community.getByRole("link", { name: "Apply to join the WhatsApp community" }).getAttribute("href")).toBe(
      "https://docs.google.com/forms/d/e/1FAIpQLSehrwaRiPVkVI3UVq23jv4SZBZ540kC2D-PW84OeUIT9FIu6Q/viewform",
    );
    expect(community.getByText(/not an automatic invitation/)).toBeTruthy();
    expect(community.queryByRole("link", { name: "Student portal" })).toBeNull();
  });

  it("offers alumni a contact enquiry instead of the broken signup", () => {
    const { container } = render(<GetInvolvedPage />);
    expect(section("alumni").getByRole("link", { name: "Ask about the alumni network" }).getAttribute("href")).toBe(
      "/contact",
    );
    expect(container.innerHTML).not.toContain("tally.so");
  });

  it("links volunteer openings and says the roles are unpaid", () => {
    render(<GetInvolvedPage />);
    const volunteer = section("volunteer");
    expect(volunteer.getByRole("link", { name: "View volunteer openings" }).getAttribute("href")).toBe(
      "https://ihsaannetwork.notion.site/openings",
    );
    expect(volunteer.getByText(/unpaid/)).toBeTruthy();
  });

  it("does not publish held destinations", () => {
    const { container } = render(<GetInvolvedPage />);
    const hrefs = [...container.querySelectorAll("a")].map((link) => link.getAttribute("href") ?? "");
    expect(hrefs.filter((href) => /forms\.gle|tally\.so|opportunities-tracker/.test(href))).toEqual([]);
  });
});
