import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms for using the IHSAAN public website and its career information and resources.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms and conditions" updated="13 September 2026">
      <section>
        <h2>Who we are</h2>
        <p>IHSAAN is the national careers programme of the Federation of Student Islamic Societies (FOSIS). These terms apply to the IHSAAN public website.</p>
      </section>
      <section>
        <h2>Using this website</h2>
        <p>By using this website, you agree to use it lawfully and not to interfere with its security, availability or operation. If you do not agree, please stop using the site.</p>
      </section>
      <section>
        <h2>Information and opportunities</h2>
        <p>IHSAAN provides career information, programme details and links for general guidance. We aim to keep them accurate, but opportunities and third-party information can change. Check important details with the relevant provider before relying on them or applying.</p>
      </section>
      <section>
        <h2>External services</h2>
        <p>Links to external websites are provided for convenience. Those services have their own terms and privacy practices, and IHSAAN does not control their content or availability.</p>
      </section>
      <section>
        <h2>Intellectual property</h2>
        <p>Unless stated otherwise, IHSAAN owns or is permitted to use the content and branding on this website. You may view and share links to public pages for personal, non-commercial use. Do not reproduce or commercially exploit site content without permission.</p>
      </section>
      <section>
        <h2>Liability</h2>
        <p>Nothing in these terms excludes liability that cannot legally be excluded. To the extent permitted by law, IHSAAN is not responsible for losses caused by reliance on general website information, external services or events outside our reasonable control.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>Questions about these terms can be sent to <a href="mailto:ihsaan@fosis.org.uk">ihsaan@fosis.org.uk</a>.</p>
      </section>
    </LegalPage>
  );
}
