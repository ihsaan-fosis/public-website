"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LEGACY_PAGES } from "@/content/legacy-routes.mjs";

/** Fragments never reach the server, so old `/#section` links are mapped here instead of in redirects. */
export function LegacyHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const redirect = () => {
      const page = window.location.hash.slice(1);
      const match = LEGACY_PAGES.find((legacy) => legacy.page === page);
      if (match && match.destination !== window.location.pathname) router.replace(match.destination);
    };
    redirect();
    window.addEventListener("hashchange", redirect);
    return () => window.removeEventListener("hashchange", redirect);
  }, [router]);

  return null;
}
