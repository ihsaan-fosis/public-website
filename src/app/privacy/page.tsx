import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How IHSAAN handles personal information when you contact us or use this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="13 September 2026">
      <section>
        <h2>Who we are</h2>
        <p>IHSAAN is the national careers programme of the Federation of Student Islamic Societies (FOSIS). FOSIS is responsible for the personal information described in this policy. For privacy questions, email <a href="mailto:ihsaan@fosis.org.uk">ihsaan@fosis.org.uk</a>.</p>
      </section>
      <section>
        <h2>Information we receive</h2>
        <p>This website does not use an online contact form, analytics or advertising cookies. If you email us, we receive the information you choose to include, such as your name, email address and enquiry.</p>
      </section>
      <section>
        <h2>Why we use it</h2>
        <p>We use your message to respond to your enquiry, manage programme or partnership discussions, protect our services and meet legal obligations. Our lawful basis will usually be legitimate interests, steps requested before an agreement, consent where requested, or a legal obligation.</p>
      </section>
      <section>
        <h2>Sharing and retention</h2>
        <p>We share personal information only with service providers or team members who need it to handle your enquiry, or where the law requires it. We keep it only as long as needed for that purpose and any applicable legal or safeguarding requirement.</p>
      </section>
      <section>
        <h2>Your rights</h2>
        <p>Depending on the law that applies, you may ask to access, correct, delete, restrict or receive a copy of your personal information, or object to its use. You may also withdraw consent where consent is the basis. Email us to make a request. You can complain to the UK Information Commissioner at <a href="https://ico.org.uk/make-a-complaint/" rel="noopener noreferrer">ico.org.uk</a>.</p>
      </section>
      <section>
        <h2>Changes</h2>
        <p>We will update this page when our data practices change and show the new date above.</p>
      </section>
    </LegalPage>
  );
}
