const SITEVERIFY_ENDPOINT = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TIMEOUT_MS = 10_000;
const PRODUCTION_HOSTNAMES = ["ihsaan.network", "www.ihsaan.network"];
const LOCAL_HOSTNAMES = ["localhost", "127.0.0.1"];
// Cloudflare's documented always-pass test secret. Observed Siteverify responses for it report
// "example.com", not the localhost hostname the docs show, so trust that only with this secret.
const TEST_SECRET = "1x0000000000000000000000000000000AA";
const TEST_HOSTNAME = "example.com";

type SiteverifyResult = { success?: unknown; hostname?: unknown };

function allowedHostnames(secret: string): string[] {
  if (process.env.NODE_ENV === "production") return PRODUCTION_HOSTNAMES;
  const local = secret === TEST_SECRET ? [...LOCAL_HOSTNAMES, TEST_HOSTNAME] : LOCAL_HOSTNAMES;
  return [...PRODUCTION_HOSTNAMES, ...local];
}

export async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  const response = await fetch(SITEVERIFY_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) return false;
  const result = (await response.json()) as SiteverifyResult | null;
  return result?.success === true && typeof result.hostname === "string" && allowedHostnames(secret).includes(result.hostname.toLowerCase());
}
