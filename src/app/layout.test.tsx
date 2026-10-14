import { renderToStaticMarkup } from "react-dom/server";
import RootLayout, { metadata } from "./layout";

vi.mock("next/font/google", () => ({ Poppins: () => ({ variable: "poppins-variable", className: "poppins" }) }));
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("Organization structured data", () => {
  it("lists exactly the approved social profiles in sameAs", () => {
    const html = renderToStaticMarkup(<RootLayout>{null}</RootLayout>);
    const raw = /<script type="application\/ld\+json">(.*?)<\/script>/s.exec(html)?.[1];
    const organization = JSON.parse(raw ?? "{}");

    expect(organization["@type"]).toBe("Organization");
    expect(organization.sameAs).toEqual([
      "https://www.instagram.com/ihsaan.network/",
      "https://www.linkedin.com/company/ihsaan-network/",
      "https://www.tiktok.com/@ihsaan.network",
      "https://www.youtube.com/@IHSAAN.network",
    ]);
  });
});

describe("icons", () => {
  it("leads with square raster favicons that search engines can crawl", () => {
    const icons = metadata.icons as { icon: object[]; apple: object[] };
    expect(icons.icon.slice(0, 2)).toMatchObject([
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", sizes: "192x192" },
    ]);
    expect(icons.apple).toMatchObject([{ url: "/apple-icon.png", sizes: "180x180" }]);
  });
});
