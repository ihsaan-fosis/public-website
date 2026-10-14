"use client";

import { useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ButtonLink, PhotoFrame } from "@/components/ui";
import {
  INVOLVEMENT_ACTIONS,
  INVOLVEMENT_AUDIENCES,
  type InvolvementAudience,
} from "@/content/site";

type AudienceFilter = InvolvementAudience | "all";

function isAudienceFilter(value: string): value is AudienceFilter {
  return INVOLVEMENT_AUDIENCES.some((option) => option.value === value);
}

export function InvolvementActions() {
  const [audience, setAudience] = useState<AudienceFilter>("all");

  const actions = useMemo(
    () =>
      audience === "all"
        ? INVOLVEMENT_ACTIONS
        : INVOLVEMENT_ACTIONS.filter((action) => action.audiences.includes(audience)),
    [audience],
  );

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
      <PhotoFrame
        src="/media/gallery/student-conversations.webp"
        alt="Students talking between conference sessions"
        sticky
      />
      <div>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label htmlFor="involvement-audience" className="text-[13px] font-bold text-ink">
            Show steps for
          </label>
          <Select
            value={audience}
            onValueChange={(value) => {
              if (typeof value === "string" && isAudienceFilter(value)) setAudience(value);
            }}
          >
            <SelectTrigger id="involvement-audience" className="w-full sm:w-56" aria-label="Filter by audience">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {INVOLVEMENT_AUDIENCES.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {actions.length === 0 ? (
          <p className="border-t border-ink/10 py-8 text-[15px] leading-7 text-ink/70">
            No steps match this filter. Choose Everyone, or{" "}
            <a href="/contact" className="font-semibold text-ink underline underline-offset-4">
              contact IHSAAN
            </a>
            .
          </p>
        ) : (
          <ul className="border-t border-ink/10">
            {actions.map((action, index) => (
              <li
                key={action.id}
                id={action.id}
                className="flex scroll-mt-24 items-baseline gap-6 border-b border-ink/10 py-8"
              >
                <span aria-hidden className="w-6 shrink-0 text-xs text-ink/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl leading-tight font-medium tracking-[-0.03em] text-ink sm:text-3xl">
                    {action.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-[15px] leading-7 text-ink/70">{action.body}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ButtonLink href={action.cta.href} external={action.cta.external} className="py-3 text-center">
                      {action.cta.label}
                    </ButtonLink>
                    {action.secondary ? (
                      <ButtonLink
                        href={action.secondary.href}
                        external={action.secondary.external}
                        tone="ghost"
                        className="py-3 text-center"
                      >
                        {action.secondary.label}
                      </ButtonLink>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
