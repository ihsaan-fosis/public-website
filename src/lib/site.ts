const PRODUCTION_ORIGIN = "https://ihsaan.network";

const configuredOrigin = process.env.NEXT_PUBLIC_APP_URL;

// Production builds always publish the apex canonical, so a localhost or preview origin can never leak into metadata.
export const SITE_ORIGIN =
  process.env.NODE_ENV !== "production" && configuredOrigin ? new URL(configuredOrigin).origin : PRODUCTION_ORIGIN;

/** Vercel preview and development deployments stay out of search results. */
export const INDEXABLE = (process.env.VERCEL_ENV ?? "production") === "production";
