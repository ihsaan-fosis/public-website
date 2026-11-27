import { describe, expect, it } from "vitest";

// Full HTTP checks: no internal modules or third-party transport are mocked.
const baseUrl = process.env.BASE_URL;

const ALLOWED_FRAME_ANCESTORS = [
  "https://mikhailwijanarko.com",
  "https://www.mikhailwijanarko.com",
  "https://meitechnologies.co.uk",
  "https://www.meitechnologies.co.uk",
];

describe("CSP frame-ancestors for portfolio embeds", () => {
  it("allows the portfolio origins and no others", async () => {
    if (!baseUrl) throw new Error("Set BASE_URL to the running IHSAAN server");

    const response = await fetch(new URL("/", baseUrl), {
      redirect: "manual",
      signal: AbortSignal.timeout(25_000),
    });
    const csp = response.headers.get("content-security-policy") ?? "";
    console.info("CSP framing HTTP response", {
      status: response.status,
      frameAncestors: csp.match(/frame-ancestors[^;]*/)?.[0] ?? null,
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("x-frame-options")).toBeNull();

    const frameAncestors = csp
      .split(";")
      .map((directive) => directive.trim())
      .find((directive) => directive.startsWith("frame-ancestors "));
    expect(frameAncestors).toBeDefined();

    const origins = frameAncestors!.slice("frame-ancestors ".length).split(/\s+/).filter(Boolean);
    expect(origins).toEqual(ALLOWED_FRAME_ANCESTORS);
  });
});
