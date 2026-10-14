import { POST } from "./route";

const valid = {
  name: "Aisha Khan",
  email: "aisha@example.com",
  queryType: "mentoring",
  message: "How do I become a mentor?",
  turnstileToken: "token",
};

function post(body: unknown) {
  return POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "CF-Connecting-IP": "203.0.113.7" },
      body: JSON.stringify(body),
    }),
  );
}

function siteverify(success: boolean) {
  return Response.json({ success });
}

describe("POST /api/contact", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "ts_secret");
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("emails the team with the visitor as reply-to", async () => {
    fetchMock.mockResolvedValueOnce(siteverify(true)).mockResolvedValueOnce(new Response("{}", { status: 200 }));
    const response = await post(valid);
    expect(response.status).toBe(200);
    const [verifyUrl, verifyInit] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(verifyUrl).toBe("https://challenges.cloudflare.com/turnstile/v0/siteverify");
    expect(JSON.parse(verifyInit.body as string)).toEqual({
      secret: "ts_secret",
      response: "token",
      remoteip: "203.0.113.7",
    });
    const [url, init] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer re_test");
    expect(JSON.parse(init.body as string)).toEqual({
      from: "IHSAAN Website <contact@ihsaan.network>",
      to: ["ihsaan@fosis.org.uk"],
      reply_to: "aisha@example.com",
      subject: "[Mentoring] Aisha Khan",
      text: "Query type: Mentoring\nName: Aisha Khan\nEmail: aisha@example.com\n\nHow do I become a mentor?",
    });
  });

  it("returns field errors without sending", async () => {
    const response = await post({ ...valid, email: "nope" });
    expect(response.status).toBe(422);
    expect((await response.json()).fields).toEqual({ email: "Enter a valid email address." });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("drops honeypot submissions silently", async () => {
    const response = await post({ ...valid, website: "https://spam.example" });
    expect(response.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("reports a missing API key as 503", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    expect((await post(valid)).status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fails closed when the Turnstile secret is missing", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    expect((await post(valid)).status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a failed security check without sending", async () => {
    fetchMock.mockResolvedValueOnce(siteverify(false));
    const response = await post(valid);
    expect(response.status).toBe(403);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("reports an unreachable Turnstile as 502 without sending", async () => {
    fetchMock.mockRejectedValueOnce(new Error("network down"));
    expect((await post(valid)).status).toBe(502);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("requires a Turnstile token", async () => {
    const response = await post({ ...valid, turnstileToken: "" });
    expect(response.status).toBe(422);
    expect((await response.json()).fields).toEqual({ turnstileToken: "Complete the security check." });
  });

  it("reports a Resend rejection as 502", async () => {
    fetchMock.mockResolvedValueOnce(siteverify(true)).mockResolvedValueOnce(new Response("{}", { status: 403 }));
    expect((await post(valid)).status).toBe(502);
  });
});
