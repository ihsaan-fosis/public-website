const configuredOrigin = process.env.NEXT_PUBLIC_APP_URL;

export const SITE_ORIGIN = configuredOrigin
  ? new URL(configuredOrigin).origin
  : "https://ihsaan.network";
