import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How IHSAAN handles personal information when you contact us or use this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-24 text-[#0A3463] sm:px-8">
      <Link className="font-semibold underline" href="/">IHSAAN home</Link>
      <h1 className="mt-10 text-4xl font-extrabold sm:text-6xl">Privacy policy</h1>
      <p className="mt-4 text-sm">Last updated: 13 September 2026</p>

      <div className="mt-12 space-y-10 text-base leading-8 text-black">
        <section>
          <h2 className="text-2xl font-bold text-[#0A3463]">Who we are</h2>
          <p className="mt-3">IHSAAN is the national careers programme of the Federation of Student Islamic Societies (FOSIS). FOSIS is responsible for the personal information described in this policy. For privacy questions, email <a className="underline" href="mailto:ihsaan@fosis.org.uk">ihsaan@fosis.org.uk</a>.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-[#0A3463]">Information we receive</h2>
          <p className="mt-3">This website does not use an online contact form, analytics or advertising cookies. If you email us, we receive the information you choose to include, such as your name, email address and enquiry.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-[#0A3463]">Why we use it</h2>
          <p className="mt-3">We use your message to respond to your enquiry, manage programme or partnership discussions, protect our services and meet legal obligations. Our lawful basis will usually be legitimate interests, steps requested before an agreement, consent where requested, or a legal obligation.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-[#0A3463]">Sharing and retention</h2>
          <p className="mt-3">We share personal information only with service providers or team members who need it to handle your enquiry, or where the law requires it. We keep it only as long as needed for that purpose and any applicable legal or safeguarding requirement.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-[#0A3463]">Your rights</h2>
          <p className="mt-3">Depending on the law that applies, you may ask to access, correct, delete, restrict or receive a copy of your personal information, or object to its use. You may also withdraw consent where consent is the basis. Email us to make a request. You can complain to the UK Information Commissioner at <a className="underline" href="https://ico.org.uk/make-a-complaint/" rel="noopener noreferrer">ico.org.uk</a>.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-[#0A3463]">Changes</h2>
          <p className="mt-3">We will update this page when our data practices change and show the new date above.</p>
        </section>
      </div>

      <nav className="mt-14 flex gap-6" aria-label="Legal">
        <Link className="underline" href="/terms">Terms and conditions</Link>
        <Link className="underline" href="/contact">Contact</Link>
      </nav>
    </article>
  );
}
