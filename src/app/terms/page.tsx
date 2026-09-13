import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms for using the IHSAAN public website and its career information and resources.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-24 text-[#0A3463] sm:px-8">
      <Link className="font-semibold underline" href="/">IHSAAN home</Link>
      <h1 className="mt-10 text-4xl font-extrabold sm:text-6xl">Terms and conditions</h1>
      <p className="mt-4 text-sm">Last updated: 13 September 2026</p>

      <div className="mt-12 space-y-10 text-base leading-8 text-black">
        <section>
          <h2 className="text-2xl font-bold text-[#0A3463]">Who we are</h2>
          <p className="mt-3">IHSAAN is the national careers programme of the Federation of Student Islamic Societies (FOSIS). These terms apply to the IHSAAN public website.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-[#0A3463]">Using this website</h2>
          <p className="mt-3">By using this website, you agree to use it lawfully and not to interfere with its security, availability or operation. If you do not agree, please stop using the site.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-[#0A3463]">Information and opportunities</h2>
          <p className="mt-3">IHSAAN provides career information, programme details and links for general guidance. We aim to keep them accurate, but opportunities and third-party information can change. Check important details with the relevant provider before relying on them or applying.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-[#0A3463]">External services</h2>
          <p className="mt-3">Links to external websites are provided for convenience. Those services have their own terms and privacy practices, and IHSAAN does not control their content or availability.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-[#0A3463]">Intellectual property</h2>
          <p className="mt-3">Unless stated otherwise, IHSAAN owns or is permitted to use the content and branding on this website. You may view and share links to public pages for personal, non-commercial use. Do not reproduce or commercially exploit site content without permission.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-[#0A3463]">Liability</h2>
          <p className="mt-3">Nothing in these terms excludes liability that cannot legally be excluded. To the extent permitted by law, IHSAAN is not responsible for losses caused by reliance on general website information, external services or events outside our reasonable control.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-[#0A3463]">Contact</h2>
          <p className="mt-3">Questions about these terms can be sent to <a className="underline" href="mailto:ihsaan@fosis.org.uk">ihsaan@fosis.org.uk</a>.</p>
        </section>
      </div>

      <nav className="mt-14 flex gap-6" aria-label="Legal">
        <Link className="underline" href="/privacy">Privacy policy</Link>
        <Link className="underline" href="/contact">Contact</Link>
      </nav>
    </article>
  );
}
