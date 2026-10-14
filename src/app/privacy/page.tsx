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
    <LegalPage title="Privacy policy" updated="14 October 2026">
      <section>
        <h2>Who we are</h2>
        <p>IHSAAN provides career programmes and opportunities for Muslim students and graduates across the UK and Ireland. For any privacy question or request, email <a href="mailto:ihsaan@fosis.org.uk">ihsaan@fosis.org.uk</a>.</p>
        <p>This policy covers the IHSAAN website at ihsaan.network, the contact form, emails you send us and photographs from our events shown here. Services we link to, such as Instagram, LinkedIn, TikTok, YouTube, Luma, Google Forms, Notion and My Muslim Mentor, have their own privacy policies.</p>
      </section>
      <section>
        <h2>Information we receive</h2>
        <ul>
          <li><strong>Messages you send us.</strong> If you use the contact form or email us, we receive your name, email address, your message and anything else you choose to include. The contact form also records the topic you choose.</li>
          <li><strong>Technical information.</strong> Like any website, the servers that deliver this site receive your IP address, browser details, the page requested and the time of the request.</li>
          <li><strong>Event photographs.</strong> This website shows photographs taken at IHSAAN events, which may show people who attended.</li>
        </ul>
        <p>This website has no accounts, analytics or advertising.</p>
      </section>
      <section>
        <h2>Contact form</h2>
        <p>When you send a message through the contact form, this website passes your name, email address, chosen topic and message to Resend, the email service we use to deliver it to our team inbox. Resend handles it on our behalf to send that email. We reply to the email address you gave us.</p>
        <p>The form also uses Cloudflare Turnstile to check that a message comes from a person. To do this, Cloudflare receives your IP address and signals about your browser when the form loads and when you send a message.</p>
      </section>
      <section>
        <h2>Forms and registration on other services</h2>
        <p>Some pages link to forms, event registration and guides run on other services, including Luma for event registration, Google Forms for the WhatsApp community and Notion for volunteer openings and career guides. They open on that service&apos;s website. What you enter there is collected by that service and the organisers of that form or event, and is not submitted through this website.</p>
        <p>Those forms can ask for personal information such as your name and contact details. Read what each form asks for and the service&apos;s privacy policy before you submit it.</p>
      </section>
      <section>
        <h2>Cookies and local storage</h2>
        <p>This website does not set cookies of its own. The Cloudflare Turnstile check on the contact form is run by Cloudflare, which may use cookies or similar technologies to do it. If you use the light or dark mode switch, your choice is saved in your browser&apos;s local storage under the name &ldquo;theme&rdquo; so the site remembers it on your next visit. It stays on your device and is not sent to us. You can remove it at any time by clearing your browser&apos;s site data.</p>
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
