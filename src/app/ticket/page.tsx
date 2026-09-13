import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Join IHSAAN as a student, mentor, volunteer or partner and help Muslim talent build meaningful, faith-conscious careers.",
  alternates: { canonical: "/ticket" },
  openGraph: {
    title: "Get Involved | IHSAAN",
    description: "Join IHSAAN as a student, mentor, volunteer or partner.",
    url: "/ticket",
  },
};

const routes = [
  {
    title: "Students",
    body: "Join career conferences, hackathons and internship programmes, and use free career guides and opportunities.",
  },
  {
    title: "Professionals",
    body: "Volunteer your experience, mentor emerging Muslim talent or contribute as a speaker and role model.",
  },
  {
    title: "Organisations",
    body: "Partner with IHSAAN to host or sponsor programmes, share opportunities and connect with faith-driven talent.",
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#0a3463]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-7 sm:px-8">
        <Link className="text-xl font-extrabold" href="/">IHSAAN</Link>
        <nav className="flex gap-5 text-sm font-semibold" aria-label="Primary">
          <Link href="/about">Our story</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <section className="bg-[#0a3463] px-5 py-24 text-center text-white sm:px-8 sm:py-32">
        <p className="font-semibold uppercase tracking-widest text-[#e8dff0]">Build with us</p>
        <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-extrabold uppercase sm:text-7xl">Get involved</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8">Students, professionals and organisations all have a part to play in elevating faith-driven talent.</p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-20 sm:px-8 lg:grid-cols-3" aria-labelledby="ways-to-help">
        <h2 className="sr-only" id="ways-to-help">Ways to get involved</h2>
        {routes.map((route) => (
          <article className="rounded-2xl bg-white p-8 shadow-sm" key={route.title}>
            <h3 className="text-2xl font-bold">{route.title}</h3>
            <p className="mt-4 leading-7 text-black">{route.body}</p>
          </article>
        ))}
      </section>

      <section className="px-5 pb-24 text-center sm:px-8">
        <h2 className="text-3xl font-extrabold">Start a conversation</h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-black">Tell us how you would like to take part. We will direct you to the right programme or partnership route.</p>
        <Link className="mt-8 inline-flex rounded-full bg-[#0a3463] px-7 py-4 font-semibold text-white" href="/contact">Contact IHSAAN</Link>
      </section>

      <footer className="bg-[#0a3463] px-5 py-8 text-center text-white">
        <nav className="flex justify-center gap-6" aria-label="Legal">
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms and conditions</Link>
        </nav>
      </footer>
    </div>
  );
}
