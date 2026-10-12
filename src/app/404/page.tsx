import type { Metadata } from "next";
import { NotFoundContent } from "@/components/not-found-content";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
  // Error pages must not inherit the homepage canonical or share tags from the layout.
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
};

export default function Page() {
  return <NotFoundContent />;
}
