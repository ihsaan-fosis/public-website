"use client";

import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CONTACT_EMAIL } from "@/content/site";
import { QUERY_TYPES } from "@/lib/contact";
import { buttonClassName } from "./ui";

function isQueryType(value: string | undefined): value is (typeof QUERY_TYPES)[number]["value"] {
  return QUERY_TYPES.some((type) => type.value === value);
}

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "error"; message: string; fields: Record<string, string> };

// Site keys are public. The env override lets `next dev` use Cloudflare's test key, which accepts localhost.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAAFWvhiYlgIlToV8s";

type TurnstileApi = {
  render: (
    element: HTMLElement,
    options: { sitekey: string; callback: (token: string) => void; "expired-callback": () => void; "error-callback": () => void },
  ) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/** Renders the Cloudflare Turnstile check and reports its single-use token. Remount to get a fresh one. */
function TurnstileField({ onToken }: { onToken: (token: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  const mount = useCallback(() => {
    if (widgetId.current !== null || !container.current || !window.turnstile) return;
    widgetId.current = window.turnstile.render(container.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: onToken,
      "expired-callback": () => onToken(""),
      "error-callback": () => onToken(""),
    });
  }, [onToken]);

  useEffect(() => {
    mount();
    return () => {
      if (widgetId.current !== null) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [mount]);

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={mount} />
      <div ref={container} />
    </>
  );
}

const FIELD =
  "mt-2 block w-full rounded-xl bg-white px-4 py-3 text-[15px] text-black ring-1 ring-ink/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const LABEL = "block text-[13px] font-bold text-ink";
const FIELD_ERROR = "mt-1.5 text-[13px] text-ink/80";

export function ContactForm({ defaultQueryType }: { defaultQueryType?: string } = {}) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [turnstileToken, setTurnstileToken] = useState("");
  const [checkAttempt, setCheckAttempt] = useState(0);
  const initialQueryType = isQueryType(defaultQueryType) ? defaultQueryType : undefined;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form)), turnstileToken };
    setStatus({ state: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await response.json()) as { error?: string; fields?: Record<string, string> };
      if (!response.ok) {
        setStatus({ state: "error", message: body.error ?? "Your message could not be sent.", fields: body.fields ?? {} });
        refreshCheck();
        return;
      }
      form.reset();
      setStatus({ state: "sent" });
    } catch {
      setStatus({ state: "error", message: "Your message could not be sent.", fields: {} });
      refreshCheck();
    }
  }

  function refreshCheck() {
    setTurnstileToken("");
    setCheckAttempt((attempt) => attempt + 1);
  }

  const fields = status.state === "error" ? status.fields : {};
  const sending = status.state === "sending";

  return (
    <div className="w-full rounded-[22px] bg-surface p-6 ring-1 ring-ink/15 sm:p-10">
      {status.state === "sent" ? (
        <div role="status">
          <p className="text-xl font-extrabold tracking-[-0.02em] text-ink">Message sent.</p>
          <p className="mt-3 max-w-md text-[15px] leading-7 text-ink/70">
            Thank you. The IHSAAN team will reply to the email address you gave us.
          </p>
          <button
            type="button"
            onClick={() => setStatus({ state: "idle" })}
            className={buttonClassName({ tone: "ghost", className: "mt-6" })}
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate aria-labelledby="conversation-title">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className={LABEL}>
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-invalid={Boolean(fields.name)}
                aria-describedby={fields.name ? "contact-name-error" : undefined}
                className={FIELD}
              />
              {fields.name ? (
                <p id="contact-name-error" className={FIELD_ERROR}>
                  {fields.name}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="contact-email" className={LABEL}>
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-invalid={Boolean(fields.email)}
                aria-describedby={fields.email ? "contact-email-error" : undefined}
                className={FIELD}
              />
              {fields.email ? (
                <p id="contact-email-error" className={FIELD_ERROR}>
                  {fields.email}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="contact-query-type" className={LABEL}>
              What is this about?
            </label>
            <Select name="queryType" required defaultValue={initialQueryType}>
              <SelectTrigger
                id="contact-query-type"
                aria-invalid={Boolean(fields.queryType)}
                aria-describedby={fields.queryType ? "contact-query-type-error" : undefined}
                className="mt-2"
              >
                <SelectValue placeholder="Choose a topic" />
              </SelectTrigger>
              <SelectContent>
                {QUERY_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fields.queryType ? (
              <p id="contact-query-type-error" className={FIELD_ERROR}>
                {fields.queryType}
              </p>
            ) : null}
          </div>

          <div className="mt-5">
            <label htmlFor="contact-message" className={LABEL}>
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              aria-invalid={Boolean(fields.message)}
              aria-describedby={fields.message ? "contact-message-error" : undefined}
              className={FIELD}
            />
            {fields.message ? (
              <p id="contact-message-error" className={FIELD_ERROR}>
                {fields.message}
              </p>
            ) : null}
          </div>

          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="contact-website">Leave this field empty</label>
            <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="mt-5">
            <TurnstileField key={checkAttempt} onToken={setTurnstileToken} />
            {fields.turnstileToken ? <p className={FIELD_ERROR}>{fields.turnstileToken}</p> : null}
          </div>

          {status.state === "error" ? (
            <p role="alert" className="mt-5 text-[14px] font-medium text-ink">
              {status.message}
              {Object.keys(status.fields).length === 0 ? (
                <>
                  {" "}
                  You can also email{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </>
              ) : null}
            </p>
          ) : null}

          <div className="mt-8">
            <button type="submit" disabled={sending} className={buttonClassName({ className: "disabled:opacity-60" })}>
              {sending ? "Sending" : "Send message"}
            </button>
          </div>
        </form>
      )}

      <p className="mt-8 border-t border-ink/10 pt-6 text-[13px] leading-6 text-ink/65">
        Read our{" "}
        <Link href="/privacy" className="text-ink underline underline-offset-4">
          privacy policy
        </Link>{" "}
        before sending personal information.
      </p>
    </div>
  );
}
