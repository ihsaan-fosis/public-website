import { LEGACY_PAGES } from "./src/content/legacy-routes.mjs";

/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";
// Cloudflare Turnstile (contact form) loads a script, an iframe and verifies over XHR from this origin.
const TURNSTILE_ORIGIN = "https://challenges.cloudflare.com";
// The volunteer application modal embeds a Tally form in an iframe.
const TALLY_ORIGIN = "https://tally.so";

const nextConfig = {
  reactStrictMode: true,
  // Photographs go through next/image; only first-party files under /public/media may be optimised.
  images: { localPatterns: [{ pathname: "/media/**", search: "" }] },
  async redirects() {
    return [
      // OpenNext leaves `:path*` unsubstituted when it matches nothing, so the bare root needs its own rule.
      {
        source: "/",
        has: [{ type: "host", value: "www.ihsaan.network" }],
        destination: "https://ihsaan.network/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ihsaan.network" }],
        destination: "https://ihsaan.network/:path*",
        permanent: true,
      },
      // Browsers cached the old broken www redirect to this literal path.
      { source: "/\\:path\\*", destination: "/", permanent: true },
      ...LEGACY_PAGES.map(({ page, destination, permanent }) => ({
        source: `/pages/${page}.html`,
        destination,
        permanent,
      })),
      // Hidden until the tracker returns; temporary so its URL can come back.
      { source: "/programmes/opportunities-tracker", destination: "/programmes", permanent: false },
      { source: "/programmes/faithful-talent", destination: "/programmes/summer-internships", permanent: true },
      { source: "/programmes/career-guides", destination: "/resources", permanent: true },
      { source: "/haqqathons", destination: "/programmes/hackathons", permanent: true },
      { source: "/mentoring", destination: "/programmes/mentorship", permanent: true },
      { source: "/ticket", destination: "/get-involved", permanent: true },
    ];
  },
  async headers() {
    // React dev tooling needs eval(); production stays locked down.
    const scriptSrc = isDev
      ? `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${TURNSTILE_ORIGIN}`
      : `script-src 'self' 'unsafe-inline' ${TURNSTILE_ORIGIN}`;
    const upgradeInsecureRequests = isDev ? "" : "upgrade-insecure-requests";

    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              scriptSrc,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "font-src 'self' data:",
              "media-src 'self'",
              `connect-src 'self' ${TURNSTILE_ORIGIN}`,
              `frame-src ${TURNSTILE_ORIGIN} ${TALLY_ORIGIN}`,
              "object-src 'none'",
              "base-uri 'none'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              upgradeInsecureRequests,
            ].filter(Boolean).join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
