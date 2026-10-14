import { render, screen } from "@testing-library/react";
import ContactPage from "./page";

describe("contact page", () => {
  it("leads with the contact form card", () => {
    render(<ContactPage />);
    expect(screen.getByRole("heading", { level: 1, name: "We would love to hear from you." })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: "Start a conversation" })).toBeTruthy();
    expect(screen.getByRole("form", { name: "Start a conversation" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Send message" })).toBeTruthy();
  });

  it("points to the privacy policy from the form card", () => {
    render(<ContactPage />);
    expect(screen.getByRole("link", { name: "privacy policy" }).getAttribute("href")).toBe("/privacy");
  });

  it("keeps the page to the form: no partner wall, contact details or social links", () => {
    render(<ContactPage />);
    expect(screen.queryByRole("heading", { name: "Organisations we work with" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Instagram" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Join the WhatsApp community" })).toBeNull();
  });
});
