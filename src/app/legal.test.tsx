import { render } from "@testing-library/react";
import PrivacyPage from "./privacy/page";
import TermsPage from "./terms/page";

describe("legal pages", () => {
  it.each([
    ["privacy", PrivacyPage],
    ["terms", TermsPage],
  ])("%s keeps the contact email but names no FOSIS affiliation", (_name, Page) => {
    const { container } = render(<Page />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/Federation of Student Islamic Societies|national careers programme/);
    expect(text.replace(/\S+@\S+/g, "")).not.toMatch(/FOSIS/i);
    expect(container.querySelector('a[href="mailto:ihsaan@fosis.org.uk"]')).toBeTruthy();
  });
});
