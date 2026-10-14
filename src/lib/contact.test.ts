import { buildContactEmail, contactSchema } from "./contact";

const valid = {
  name: "Aisha  Khan",
  email: "aisha@example.com",
  queryType: "partnerships",
  message: "We would like to sponsor the next conference.",
  turnstileToken: "token",
};

describe("contact schema", () => {
  it("accepts a complete enquiry", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it.each([
    ["email", { email: "not-an-email" }],
    ["queryType", { queryType: "billing" }],
    ["message", { message: "hi" }],
    ["name", { name: "   " }],
    ["turnstileToken", { turnstileToken: "" }],
  ])("rejects an invalid %s", (field, patch) => {
    const result = contactSchema.safeParse({ ...valid, ...patch });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path[0]).toBe(field);
  });

  it("builds a subject from the query type and a flattened name", () => {
    const email = buildContactEmail(contactSchema.parse(valid));
    expect(email.subject).toBe("[Partnerships and sponsorship] Aisha Khan");
    expect(email.text).toBe(
      "Query type: Partnerships and sponsorship\nName: Aisha Khan\nEmail: aisha@example.com\n\nWe would like to sponsor the next conference.",
    );
  });
});
