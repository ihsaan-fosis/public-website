import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Initialize the Geist font with Latin subset
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Initialize the Geist Mono font with Latin subset
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://ihsaan.network";
const siteName = "IHSAAN";
const siteDescription =
  "IHSAAN supports Muslim students and young professionals through programmes, opportunities, mentoring, and community.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "IHSAAN",
    template: "%s | IHSAAN",
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "IHSAAN",
    "ihsaan.network",
    "Muslim students",
    "young professionals",
    "mentoring",
    "programmes",
  ],
  authors: [{ name: "IHSAAN", url: "https://ihsaan.network" }],
  creator: "IHSAAN",
  publisher: "IHSAAN",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IHSAAN",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <a
          href="#main-content"
          className="absolute -top-12 left-4 z-50 px-4 py-2 bg-indigo-600 text-white rounded-md transition-[top] duration-200 focus:top-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
