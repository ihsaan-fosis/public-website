import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "Terms for using the IHSAAN public website and its career information and resources.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms and conditions" updated="12 October 2026">
      <section>
        <h2>Who we are</h2>
        <p>These terms apply to the IHSAAN website at ihsaan.network. By using this website you agree to these terms. If you do not agree, please do not use it.</p>
      </section>
      <section>
        <h2>Using this website</h2>
        <p>You may use this website for your own personal, non-commercial purposes. You must use it lawfully and must not:</p>
        <ul>
          <li>interfere with its security, availability or operation, or try to gain unauthorised access to it;</li>
          <li>copy, republish or commercially exploit its content, except as these terms allow;</li>
          <li>use it to send unsolicited messages or to misrepresent your connection with IHSAAN.</li>
        </ul>
      </section>
      <section>
        <h2>Information and opportunities</h2>
        <p>IHSAAN provides career information, programme details and links for general guidance. We aim to keep them accurate, but opportunities and third-party information can change. Check important details with the relevant provider before relying on them or applying.</p>
      </section>
      <section>
        <h2>Changes to the website</h2>
        <p>We may change, suspend or withdraw any part of this website at any time, for example to update programme information. We do not guarantee that it will always be available or free from errors.</p>
      </section>
      <section>
        <h2>Intellectual property</h2>
        <p>Unless stated otherwise, IHSAAN owns or is permitted to use the content and branding on this website. You may view it and share links to public pages. Partner names and logos belong to their owners. Do not reproduce any of them without permission from the owner.</p>
      </section>
      <section>
        <h2>Links to other services</h2>
        <p>This website links to services we do not control, such as event booking, social media and partner websites. We do not endorse and are not responsible for their content or availability, and their own terms and privacy policies apply when you use them.</p>
      </section>
      <section>
        <h2>Privacy</h2>
        <p>Our <Link href="/privacy">privacy policy</Link> explains how we handle personal information.</p>
      </section>
      <section>
        <h2>Our responsibility to you</h2>
        <p>Nothing in these terms limits or excludes our liability for death or personal injury caused by our negligence, for fraud or for anything else that cannot be limited or excluded by law.</p>
        <p>This website is provided free of charge for general information. To the extent the law allows, we are not responsible for loss caused by relying on general website information, by external services or by events outside our reasonable control. We are not responsible for losses that were not foreseeable when you used the website.</p>
      </section>
      <section>
        <h2>Accessibility</h2>
        <p>If anything on this website is hard to use, email <a href="mailto:ihsaan@fosis.org.uk">ihsaan@fosis.org.uk</a>.</p>
      </section>
      <section>
        <h2>Changes to these terms</h2>
        <p>We may update these terms from time to time. The date at the top shows when they last changed. Please check this page when you use the website.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>Questions about these terms can be sent to <a href="mailto:ihsaan@fosis.org.uk">ihsaan@fosis.org.uk</a>.</p>
      </section>
    </LegalPage>
  );
}
