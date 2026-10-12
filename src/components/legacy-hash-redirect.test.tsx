import { act, render } from "@testing-library/react";
import { LEGACY_PAGES } from "@/content/legacy-routes.mjs";
import { LegacyHashRedirect } from "./legacy-hash-redirect";

const replace = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ replace }) }));

function goTo(hash: string) {
  window.history.replaceState(null, "", `/${hash}`);
}

function changeHash(hash: string) {
  act(() => {
    goTo(hash);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
}

const REDIRECTED = LEGACY_PAGES.filter(({ destination }) => destination !== "/");

describe("LegacyHashRedirect", () => {
  beforeEach(() => {
    replace.mockClear();
    goTo("");
  });

  it.each(REDIRECTED)("sends #$page to $destination on load", ({ page, destination }) => {
    goTo(`#${page}`);
    render(<LegacyHashRedirect />);
    expect(replace).toHaveBeenCalledExactlyOnceWith(destination);
  });

  it.each(REDIRECTED)("sends #$page to $destination when the fragment changes", ({ page, destination }) => {
    render(<LegacyHashRedirect />);
    expect(replace).not.toHaveBeenCalled();
    changeHash(`#${page}`);
    expect(replace).toHaveBeenCalledExactlyOnceWith(destination);
  });

  it("maps the tracker fragment to the programmes index while the tracker is hidden", () => {
    goTo("#opportunities-tracker");
    render(<LegacyHashRedirect />);
    expect(replace).toHaveBeenCalledWith("/programmes");
  });

  it.each(["#home", "#programmes", "#not-a-section", ""])("leaves %j on the homepage", (hash) => {
    goTo(hash);
    render(<LegacyHashRedirect />);
    changeHash(hash);
    expect(replace).not.toHaveBeenCalled();
  });

  it("stops listening once unmounted", () => {
    const { unmount } = render(<LegacyHashRedirect />);
    unmount();
    changeHash("#who-we-are");
    expect(replace).not.toHaveBeenCalled();
  });
});
