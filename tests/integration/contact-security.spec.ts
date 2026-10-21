import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "../../src/app/api/contact/route";

const valid = {
  name: "Security regression",
  email: "security@example.com",
  queryType: "general",
  message: "A local integration check that sends no real email.",
  turnstileToken: "local-test-token",
};

describe("contact request and provider trust boundaries", () => {
  const deliveries: Record<string, unknown>[] = [];
  let hostname: string | undefined;
  let mailFails: boolean;

  beforeEach(() => {
    hostname = "ihsaan.network";
    mailFails = false;
    deliveries.length = 0;
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("RESEND_API_KEY", "local-regression-key");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "local-regression-secret");
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.stubGlobal("fetch", async (input: string | URL | Request, init: RequestInit) => {
      const url = String(input);
      if (url === "https://challenges.cloudflare.com/turnstile/v0/siteverify") {
        return Response.json({ success: true, ...(hostname ? { hostname } : {}) });
      }
      if (url === "https://api.resend.com/emails") {
        if (mailFails) throw new Error("Private provider diagnostic");
        deliveries.push(JSON.parse(String(init.body)));
        return Response.json({ id: "local-delivery" });
      }
      throw new Error("Unexpected external request");
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  function request(body: string | ReadableStream<Uint8Array>, headers: Record<string, string> = {}) {
    return new Request("https://ihsaan.network/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body,
      duplex: "half",
    } as RequestInit);
  }

  async function result(req: Request) {
    const response = await POST(req);
    const raw = await response.text();
    const metadata = { status: response.status, contentType: response.headers.get("Content-Type"), body: raw.slice(0, 500) };
    expect(metadata.contentType, JSON.stringify(metadata)).toContain("application/json");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    return { ...metadata, json: JSON.parse(raw) as Record<string, unknown> };
  }

  it("delivers a valid message only to the fixed team recipient", async () => {
    expect(await result(request(JSON.stringify(valid)))).toMatchObject({ status: 200, json: { ok: true } });
    expect(deliveries).toMatchObject([{ to: ["ihsaan@fosis.org.uk"], reply_to: "security@example.com" }]);
  });

  it("rejects an announced oversized JSON body before delivery", async () => {
    const body = JSON.stringify({ ...valid, ignored: "x".repeat(70_000) });
    expect(await result(request(body, { "Content-Length": String(Buffer.byteLength(body)) }))).toMatchObject({ status: 413 });
    expect(deliveries).toEqual([]);
  });

  it("rejects oversized streamed JSON without trusting a declared length", async () => {
    const body = new TextEncoder().encode(JSON.stringify({ ...valid, ignored: "x".repeat(70_000) }));
    let offset = 0;
    const stream = new ReadableStream<Uint8Array>({
      pull(controller) {
        if (offset >= body.length) return controller.close();
        controller.enqueue(body.slice(offset, offset + 8192));
        offset += 8192;
      },
    });
    expect(await result(request(stream, { "Content-Length": "1" }))).toMatchObject({ status: 413 });
    expect(deliveries).toEqual([]);
  });

  it("counts UTF-8 bytes rather than JavaScript characters", async () => {
    const body = JSON.stringify({ ...valid, ignored: "界".repeat(24_000) });
    expect(await result(request(body))).toMatchObject({ status: 413 });
    expect(deliveries).toEqual([]);
  });

  it("rejects a successful verification issued for a different hostname", async () => {
    hostname = "unrelated.example";
    expect(await result(request(JSON.stringify(valid)))).toMatchObject({ status: 403 });
    expect(deliveries).toEqual([]);
  });

  it("fails closed when site verification omits its hostname", async () => {
    hostname = undefined;
    expect(await result(request(JSON.stringify(valid)))).toMatchObject({ status: 403 });
    expect(deliveries).toEqual([]);
  });

  it("preserves local test keys with the hostname observed from Cloudflare", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "1x0000000000000000000000000000000AA");
    hostname = "example.com";
    expect(await result(request(JSON.stringify({ ...valid, turnstileToken: "XXXX.DUMMY.TOKEN.XXXX" })))).toMatchObject({ status: 200 });
    expect(deliveries).toHaveLength(1);
  });

  it("does not trust the dummy-key hostname with a real secret in development", async () => {
    vi.stubEnv("NODE_ENV", "development");
    hostname = "example.com";
    expect(await result(request(JSON.stringify(valid)))).toMatchObject({ status: 403 });
    expect(deliveries).toEqual([]);
  });

  it("does not trust the dummy-key hostname in production even with a test secret", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "1x0000000000000000000000000000000AA");
    hostname = "example.com";
    expect(await result(request(JSON.stringify(valid)))).toMatchObject({ status: 403 });
    expect(deliveries).toEqual([]);
  });

  it("contains email transport failures without disclosing provider diagnostics", async () => {
    mailFails = true;
    const response = await result(request(JSON.stringify(valid)));
    expect(response).toMatchObject({ status: 502, json: { error: "Your message could not be sent." } });
    expect(response.body).not.toContain("Private provider diagnostic");
  });

  it.each(["siteverify", "emails"])("bounds stalled %s requests", async (provider) => {
    const timeout = AbortSignal.timeout.bind(AbortSignal);
    vi.spyOn(AbortSignal, "timeout").mockImplementation(() => timeout(15));
    vi.stubGlobal("fetch", (input: string | URL | Request, init: RequestInit) => {
      if (String(input).endsWith(provider)) {
        return new Promise<Response>((_resolve, reject) => {
          const abort = () => reject(init.signal?.reason);
          if (init.signal?.aborted) abort();
          else init.signal?.addEventListener("abort", abort, { once: true });
        });
      }
      return Promise.resolve(Response.json({ success: true, hostname: "ihsaan.network" }));
    });
    const response = await Promise.race([
      result(request(JSON.stringify(valid))),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 250)),
    ]);
    expect(response, "Provider request did not terminate at its deadline").toMatchObject({ status: 502 });
  });
});
