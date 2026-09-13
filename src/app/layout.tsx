import "./globals.css";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import { SITE_ORIGIN } from "../lib/site";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-poppins" });

export const metadata = {
  "metadataBase": new URL(SITE_ORIGIN || "http://localhost:3000"),
  "title": "IHSAAN | Elevating Faith-Driven Talent",
  "description": "IHSAAN empowers Muslim students with opportunities, mentorship, and networks for God-conscious careers.",
  "robots": "max-image-preview:large",
  "alternates": {
    "canonical": "/"
  },
  "openGraph": {
    "title": "IHSAAN | Elevating Faith-Driven Talent",
    "description": "IHSAAN empowers Muslim students with opportunities, mentorship, and networks for God-conscious careers.",
    "type": "website",
    "url": "/",
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


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={poppins.variable}>
      <body className={`cn0 ${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}
