import { CONTACT_EMAIL } from "@/content/site";
import { buildContactEmail, contactSchema } from "@/lib/contact";
import { verifyTurnstile } from "@/lib/turnstile";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM = "IHSAAN Website <contact@ihsaan.network>";

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Send the form as JSON." }, 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fields = Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message]));
    if ("website" in fields) return json({ ok: true }, 200);
    return json({ error: "Check the highlighted fields.", fields }, 422);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!apiKey || !turnstileSecret) {
    console.error("contact: RESEND_API_KEY or TURNSTILE_SECRET_KEY is not set");
    return json({ error: "Messages cannot be sent right now." }, 503);
  }

  let human: boolean;
  try {
    human = await verifyTurnstile(parsed.data.turnstileToken, turnstileSecret, request.headers.get("CF-Connecting-IP"));
  } catch (error) {
    console.error("contact: Turnstile verification unavailable", error);
    return json({ error: "Your message could not be sent." }, 502);
  }
  if (!human) return json({ error: "The security check failed. Please try again." }, 403);

  const { subject, text } = buildContactEmail(parsed.data);
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [CONTACT_EMAIL], reply_to: parsed.data.email, subject, text }),
  });

  if (!response.ok) {
    console.error("contact: Resend rejected the message", response.status);
    return json({ error: "Your message could not be sent." }, 502);
  }
  return json({ ok: true }, 200);
}
