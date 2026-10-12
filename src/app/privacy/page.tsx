import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How IHSAAN handles personal information when you contact us, visit this website or attend our events.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="12 October 2026">
      <section>
        <h2>Who we are</h2>
        <p>IHSAAN is the national careers programme of the Federation of Student Islamic Societies (FOSIS). For any privacy question or request, email <a href="mailto:ihsaan@fosis.org.uk">ihsaan@fosis.org.uk</a>.</p>
        <p>This policy covers the IHSAAN website at ihsaan.network, emails you send us and photographs from our events shown here. Services we link to, such as Instagram, LinkedIn, TikTok, YouTube, Luma, Google Forms, Notion, Haqqathons and My Muslim Mentor, have their own privacy policies.</p>
      </section>
      <section>
        <h2>Information we receive</h2>
        <ul>
          <li><strong>Messages you send us.</strong> If you email us, we receive your name, email address, your message and anything else you choose to include.</li>
          <li><strong>Technical information.</strong> Like any website, the servers that deliver this site receive your IP address, browser details, the page requested and the time of the request.</li>
          <li><strong>Event photographs.</strong> This website shows photographs taken at IHSAAN events, which may show people who attended.</li>
        </ul>
        <p>This website has no contact forms, accounts, analytics or advertising.</p>
      </section>
      <section>
        <h2>Cookies and local storage</h2>
        <p>This website does not use cookies. If you use the light or dark mode switch, your choice is saved in your browser&apos;s local storage under the name &ldquo;theme&rdquo; so the site remembers it on your next visit. It stays on your device and is not sent to us. You can remove it at any time by clearing your browser&apos;s site data.</p>
      </section>
      <section>
        <h2>How we use it</h2>
        <ul>
          <li>Messages you send us are used to reply to you and to handle programme or partnership enquiries.</li>
          <li>Technical information is used to deliver pages and protect the website from misuse.</li>
          <li>Event photographs are used to show what our programmes involve.</li>
        </ul>
      </section>
      <section>
        <h2>Event photographs</h2>
        <p>Photographs on this website are not captioned with people&apos;s names. Given the nature of our events, a photograph may suggest someone&apos;s religious belief.</p>
        <p>If you appear in a photograph here and want it removed, email <a href="mailto:ihsaan@fosis.org.uk">ihsaan@fosis.org.uk</a> with the page address and a short description of the photograph.</p>
      </section>
      <section>
        <h2>Your rights</h2>
        <p>Under UK data protection law, and EU law if you live in Ireland, you have the right to:</p>
        <ul>
          <li>ask for a copy of your personal information;</li>
          <li>ask for it to be corrected or deleted;</li>
          <li>ask us to restrict how it is used, or to transfer it to you or another organisation;</li>
          <li>object to its use, including publication of a photograph of you;</li>
          <li>withdraw consent at any time, where we rely on consent.</li>
        </ul>
        <p>Some of these rights depend on the circumstances. To make a request, email <a href="mailto:ihsaan@fosis.org.uk">ihsaan@fosis.org.uk</a>. We may ask for information to confirm your identity. The law generally gives organisations one month to respond.</p>
      </section>
      <section>
        <h2>Complaints</h2>
        <p>If you are unhappy with how your information has been handled, please contact us first. You can also complain to the UK Information Commissioner&apos;s Office at <a href="https://ico.org.uk/make-a-complaint/" rel="noopener noreferrer">ico.org.uk</a>. If you live in Ireland, you can complain to the Data Protection Commission at <a href="https://www.dataprotection.ie/" rel="noopener noreferrer">dataprotection.ie</a>.</p>
      </section>
      <section>
        <h2>Children</h2>
        <p>This website is aimed at university students, graduates, professionals and organisations. If you think we hold information about a child that we should not, contact us.</p>
      </section>
      <section>
        <h2>Email security</h2>
        <p>Email is not a fully secure way to send information, so please avoid including sensitive details in messages to us.</p>
      </section>
      <section>
        <h2>Changes to this policy</h2>
        <p>When this policy changes, the new date will appear at the top of this page.</p>
      </section>
    </LegalPage>
  );
}
