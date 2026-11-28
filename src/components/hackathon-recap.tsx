"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const PLAYER_ORIGIN = "https://www.youtube-nocookie.com";
const EMBED_SRC = `${PLAYER_ORIGIN}/embed/vzyYxaOxQ5w?enablejsapi=1&rel=0&playsinline=1`;

/**
 * The recap as a poster. The player loads behind the poster once the section is near the screen, so a click plays at
 * once instead of waiting for the embed to load. Privacy-enhanced mode keeps YouTube from setting cookies until the
 * video plays. Visitors who ask to save data load nothing until they click.
 */
export function HackathonRecap() {
  const [playing, setPlaying] = useState(false);
  const [loadPlayer, setLoadPlayer] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const ready = useRef(false);
  const wantsPlay = useRef(false);

  const send = useCallback((message: object) => {
    frame.current?.contentWindow?.postMessage(JSON.stringify(message), PLAYER_ORIGIN);
  }, []);

  const play = useCallback(() => send({ event: "command", func: "playVideo", args: [] }), [send]);

  useEffect(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData || !wrapper.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLoadPlayer(true);
        observer.disconnect();
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(wrapper.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== PLAYER_ORIGIN || event.source !== frame.current?.contentWindow) return;
      ready.current = true;
      if (wantsPlay.current) {
        wantsPlay.current = false;
        play();
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [play]);

  useEffect(() => {
    if (playing) frame.current?.focus();
  }, [playing]);

  /** The player only answers once it has been told someone is listening, so ask until it replies. */
  const onFrameLoad = () => {
    let attempts = 0;
    const poll = window.setInterval(() => {
      attempts += 1;
      if (ready.current || attempts > 40) {
        window.clearInterval(poll);
        return;
      }
      send({ event: "listening", id: "hackathon-recap", channel: "widget" });
    }, 250);
  };

  const start = () => {
    setPlaying(true);
    setLoadPlayer(true);
    if (ready.current) play();
    else wantsPlay.current = true;
  };

  return (
    <>
      <div ref={wrapper} className="relative aspect-video min-h-60 w-full overflow-hidden rounded-[28px] bg-night-2">
        {loadPlayer ? (
          <iframe
            ref={frame}
            className="absolute inset-0 size-full"
            src={EMBED_SRC}
            title="IHSAAN Manchester Hackathon Recap"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            tabIndex={playing ? 0 : -1}
            onLoad={onFrameLoad}
          />
        ) : null}
        {playing ? null : (
          <button
            type="button"
            aria-label="Play IHSAAN Manchester Hackathon Recap"
            aria-describedby="hackathon-recap-caption"
            className="group absolute inset-0 size-full cursor-pointer text-left focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-cream"
            onClick={start}
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
