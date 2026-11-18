"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function HackathonRecap() {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <div className="relative aspect-video min-h-60 w-full overflow-hidden rounded-[28px] bg-night-2">
        {playing ? (
          <iframe
            ref={(player) => { player?.focus(); }}
            className="absolute inset-0 size-full"
            src="https://www.youtube.com/embed/vzyYxaOxQ5w?autoplay=1&rel=0&playsinline=1"
            title="IHSAAN Manchester Hackathon Recap"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            aria-label="Play IHSAAN Manchester Hackathon Recap"
            aria-describedby="hackathon-recap-caption"
            className="group absolute inset-0 size-full cursor-pointer text-left focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-cream"
            onClick={() => setPlaying(true)}
          >
            <Image
              src="/media/hackathon-recap-cover.webp"
              alt=""
              fill
              sizes="(min-width: 1280px) 1200px, (min-width: 640px) calc(100vw - 80px), calc(100vw - 40px)"
              className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-night/15" />
            <span className="absolute inset-x-5 bottom-5 max-w-lg text-cream sm:inset-x-10 sm:bottom-10 lg:left-14 lg:bottom-14">
              <span className="block text-2xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Manchester in motion.
              </span>
              <span id="hackathon-recap-caption" className="mt-2 block text-sm leading-snug text-cream/90 sm:mt-3 sm:text-base">
                A quick look at the teams, mentors, and ideas that turned a weekend challenge into working solutions.
              </span>
            </span>
            <span aria-hidden="true" className="absolute top-5 right-5 grid size-12 place-items-center rounded-full bg-cream text-night sm:right-8 sm:top-8 sm:size-16 lg:top-1/2 lg:right-auto lg:left-1/2 lg:size-20 lg:-translate-1/2">
              <Play className="size-5 translate-x-px fill-current sm:size-7" />
            </span>
          </button>
        )}
      </div>
      <noscript>
        <a className="mt-3 inline-block font-medium text-ink underline underline-offset-4" href="https://youtu.be/vzyYxaOxQ5w">
          Watch the recap on YouTube
        </a>
      </noscript>
    </>
  );
}
