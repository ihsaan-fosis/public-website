import { PUBLIC_EVENTS } from "./events";
import { PUBLIC_DESTINATIONS } from "./links";

const destinations = Object.entries(PUBLIC_DESTINATIONS);

describe("approved destinations", () => {
  it.each(destinations)("%s is an internal path or an HTTPS URL without captured tracking parameters", (_key, { href }) => {
    if (href.startsWith("/")) {
      // Internal paths (such as /volunteer) stay on this site.
      expect(href).not.toMatch(/^\/\/|[?#]/);
      return;
    }
    const url = new URL(href);
    expect(url.protocol).toBe("https:");
    expect(url.search).toBe("");
  });

  it("uses each destination URL once", () => {
    const hrefs = destinations.map(([, { href }]) => href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("leaves out the broken, unconfirmed and hidden destinations", () => {
    const hrefs = destinations.map(([, { href }]) => href).join(" ");
    expect(hrefs).not.toMatch(/tally\.so|forms\.gle|opportunities-tracker|403kel6v/);
  });
});

describe("scheduled events", () => {
  it("have unique ids, a Luma page and a start before the end", () => {
    const ids = PUBLIC_EVENTS.map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const event of PUBLIC_EVENTS) {
      expect(PUBLIC_DESTINATIONS[event.destination].href).toMatch(/^https:\/\/luma\.com\/[a-z0-9]+$/);
      expect(Date.parse(event.start)).toBeLessThan(Date.parse(event.end));
    }
  });
});
