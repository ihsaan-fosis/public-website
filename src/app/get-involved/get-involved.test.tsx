import { fireEvent, render, screen, within } from "@testing-library/react";
import GetInvolvedPage from "./page";

Object.assign(Element.prototype, {
  hasPointerCapture: () => false,
  setPointerCapture: () => undefined,
  releasePointerCapture: () => undefined,
  scrollIntoView: () => undefined,
});

function section(id: string) {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Missing #${id}`);
  return within(element);
}

function openAudienceFilter() {
  fireEvent.pointerDown(screen.getByRole("combobox", { name: "Filter by audience" }), {
    button: 0,
    ctrlKey: false,
    pointerType: "mouse",
  });
}

describe("get involved page", () => {
  it("does not repeat home page sections or the closing contact strip", () => {
    render(<GetInvolvedPage />);
    expect(screen.queryByRole("heading", { name: "Not sure where to start?" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Contact IHSAAN" })).toBeNull();
    expect(screen.queryByRole("heading", { name: "Ways to get involved" })).toBeNull();
    expect(screen.queryByRole("heading", { name: "Good to know before you join" })).toBeNull();
  });

  it("anchors every action for deep links", () => {
    render(<GetInvolvedPage />);
    expect(
      ["programmes", "professional", "mentor", "community", "alumni", "volunteer", "partner"].map(
        (id) => document.getElementById(id)?.tagName,
      ),
    ).toEqual(["LI", "LI", "LI", "LI", "LI", "LI", "LI"]);
  });

  it("filters steps by audience with the dropdown", () => {
    render(<GetInvolvedPage />);
    expect(screen.getByRole("combobox", { name: "Filter by audience" })).toHaveTextContent("Everyone");
    expect(screen.getByRole("heading", { name: "Programmes for students" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Partner with IHSAAN" })).toBeTruthy();

    openAudienceFilter();
    fireEvent.click(screen.getByRole("option", { name: "Students" }));
    expect(screen.getByRole("heading", { name: "Programmes for students" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "WhatsApp community" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Professional network" })).toBeNull();
    expect(screen.queryByRole("heading", { name: "Partner with IHSAAN" })).toBeNull();

    openAudienceFilter();
    fireEvent.click(screen.getByRole("option", { name: "Organisations" }));
    expect(screen.getByRole("heading", { name: "Partner with IHSAAN" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Partner with us" }).getAttribute("href")).toBe("/contact");
    expect(screen.queryByRole("heading", { name: "Programmes for students" })).toBeNull();
  });

  it("shows every remounted step after switching filters, never gated by scroll reveal", () => {
    render(<GetInvolvedPage />);

    openAudienceFilter();
    fireEvent.click(screen.getByRole("option", { name: "Students" }));
    openAudienceFilter();
    fireEvent.click(screen.getByRole("option", { name: "Professionals" }));

    const items = [...document.querySelectorAll<HTMLLIElement>("ul > li[id]")];
    expect(items.map((item) => item.id)).toEqual(["professional", "mentor", "community", "alumni", "volunteer"]);
    expect(items.map((item) => item.querySelector("[aria-hidden]")?.textContent)).toEqual([
      "01",
      "02",
      "03",
      "04",
      "05",
    ]);
    for (const item of items) {
      expect(item.hasAttribute("data-reveal")).toBe(false);
      expect(item.style.getPropertyValue("--reveal-delay")).toBe("");
    }

    for (const name of [
      "Professional network",
      "Mentor on My Muslim Mentor",
      "WhatsApp community",
      "Alumni network",
      "Volunteer for IHSAAN",
    ]) {
      expect(screen.getByRole("heading", { name })).toBeVisible();
    }
    expect(screen.queryByRole("heading", { name: "Programmes for students" })).toBeNull();
    expect(screen.queryByRole("heading", { name: "Partner with IHSAAN" })).toBeNull();
  });

  it("does not offer membership and keeps community applications distinct", () => {
    render(<GetInvolvedPage />);

    expect(document.getElementById("membership")).toBeNull();
    expect(screen.queryByRole("heading", { name: "Membership" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Ask about membership" })).toBeNull();

    const community = section("community");
    expect(community.getByRole("link", { name: "Apply to join the WhatsApp community" }).getAttribute("href")).toBe(
      "https://docs.google.com/forms/d/e/1FAIpQLSehrwaRiPVkVI3UVq23jv4SZBZ540kC2D-PW84OeUIT9FIu6Q/viewform",
    );
    expect(community.getByText(/not an automatic invitation/)).toBeTruthy();
  });

  it("offers alumni a contact enquiry instead of the broken signup", () => {
    const { container } = render(<GetInvolvedPage />);
    expect(section("alumni").getByRole("link", { name: "Ask about the alumni network" }).getAttribute("href")).toBe(
      "/contact",
    );
    expect(container.innerHTML).not.toContain("tally.so");
  });

  it("routes volunteering to the on-site openings flow", () => {
    render(<GetInvolvedPage />);
    const volunteer = section("volunteer");
    expect(volunteer.getByRole("heading", { name: "Volunteer for IHSAAN" })).toBeTruthy();
    expect(volunteer.getByRole("link", { name: "View volunteer openings" }).getAttribute("href")).toBe("/volunteer");
    expect(volunteer.getByText(/unpaid/)).toBeTruthy();
    expect(volunteer.queryByText(/Notion/i)).toBeNull();
  });

  it("does not publish held destinations", () => {
    const { container } = render(<GetInvolvedPage />);
    const hrefs = [...container.querySelectorAll("a")].map((link) => link.getAttribute("href") ?? "");
    expect(hrefs.filter((href) => /forms\.gle|tally\.so|opportunities-tracker/.test(href))).toEqual([]);
  });
});
