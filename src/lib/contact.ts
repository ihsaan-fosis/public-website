import { z } from "zod";

export const QUERY_TYPES = [
  { value: "general", label: "General enquiry" },
  { value: "partnerships", label: "Partnerships and sponsorship" },
  { value: "programmes", label: "Programmes and events" },
  { value: "mentoring", label: "Mentoring" },
  { value: "volunteering", label: "Volunteering" },
  { value: "media", label: "Press and media" },
  { value: "privacy", label: "Privacy and data requests" },
  { value: "other", label: "Something else" },
] as const;

type QueryTypeValue = (typeof QUERY_TYPES)[number]["value"];

const QUERY_TYPE_VALUES = QUERY_TYPES.map((type) => type.value) as [QueryTypeValue, ...QueryTypeValue[]];

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(120, "Keep your name under 120 characters."),
  email: z.email("Enter a valid email address.").max(254, "Enter a valid email address."),
  queryType: z.enum(QUERY_TYPE_VALUES, "Choose what your message is about."),
  message: z.string().trim().min(10, "Write at least a few words.").max(5000, "Keep your message under 5000 characters."),
  website: z.string().max(0).optional(),
  turnstileToken: z.string().min(1, "Complete the security check.").max(2048, "Complete the security check."),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function queryTypeLabel(value: QueryTypeValue): string {
  return QUERY_TYPES.find((type) => type.value === value)?.label ?? value;
}

export function buildContactEmail(input: ContactInput): { subject: string; text: string } {
  const label = queryTypeLabel(input.queryType);
  const name = input.name.replace(/\s+/g, " ");
  return {
    subject: `[${label}] ${name}`,
    text: [`Query type: ${label}`, `Name: ${name}`, `Email: ${input.email}`, "", input.message].join("\n"),
  };
}
