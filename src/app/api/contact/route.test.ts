import { POST } from "./route";

const valid = {
  name: "Aisha Khan",
  email: "aisha@example.com",
  queryType: "mentoring",
  message: "How do I become a mentor?",
};

function post(body: unknown) {
  return POST(new Request("http://localhost/api/contact", { method: "POST", body: JSON.stringify(body) }));
}

describe("POST /api/contact", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("emails the team with the visitor as reply-to", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
    const response = await post(valid);
    expect(response.status).toBe(200);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
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

  it("reports a Resend rejection as 502", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 403 }));
    expect((await post(valid)).status).toBe(502);
  });
});
