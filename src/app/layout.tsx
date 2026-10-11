import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import { RevealObserver } from "@/components/motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE_ORIGIN } from "../lib/site";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-poppins" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "IHSAAN | Elevating Faith-Driven Talent",
    template: "%s | IHSAAN",
  },
  "description": "IHSAAN empowers Muslim students with opportunities, mentorship, and networks for God-conscious careers.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  "alternates": {
    "canonical": "/"
  },
  "openGraph": {
    "title": "IHSAAN | Elevating Faith-Driven Talent",
    "description": "IHSAAN empowers Muslim students with opportunities, mentorship, and networks for God-conscious careers.",
    "type": "website",
    "url": "/",
    "siteName": "IHSAAN",
    "locale": "en_GB",
    "images": [
      "/media/hero-poster.webp"
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "IHSAAN | Elevating Faith-Driven Talent",
    "description": "IHSAAN empowers Muslim students with opportunities, mentorship, and networks for God-conscious careers.",
    "images": [
      "/media/hero-poster.webp"
    ]
  },
  "icons": {
    "icon": [
      {
        "url": "/blue-icon.svg",
        "media": "(prefers-color-scheme: light)"
      },
      {
        "url": "/icon-dark.svg",
        "media": "(prefers-color-scheme: dark)"
      }
    ],
    "apple": [
      {
        "url": "/blue-icon.svg"
      }
    ]
  }
};
export const viewport = {
  "width": "device-width",
  "initialScale": 1
};


const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IHSAAN",
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/media/blue-logo.webp`,
  email: "ihsaan@fosis.org.uk",
  areaServed: ["United Kingdom", "Ireland"],
  sameAs: [
    "https://www.instagram.com/ihsaan.network/",
    "https://www.linkedin.com/company/ihsaan-network/",
  ],
};

// Runs before paint so the stored or system theme applies without a flash.
const themeScript = `(function(){var d=document.documentElement;d.classList.add("js");var t;try{t=localStorage.getItem("theme")}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.dataset.theme=t})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={poppins.variable} data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${poppins.className} min-h-screen`}>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
