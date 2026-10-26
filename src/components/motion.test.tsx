import { act, fireEvent, render, screen } from "@testing-library/react";
import { HeroVideo, MarqueeGroup, RevealObserver } from "./motion";
import { PhotoHero, SectionHeading } from "./ui";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

type Listener = (event: MediaQueryListEvent) => void;

/** A controllable `(prefers-reduced-motion: reduce)` query. */
function reducedMotion(initial: boolean) {
  const listeners = new Set<Listener>();
  const query = {
    matches: initial,
    media: "(prefers-reduced-motion: reduce)",
    addEventListener: (_type: string, listener: Listener) => listeners.add(listener),
    removeEventListener: (_type: string, listener: Listener) => listeners.delete(listener),
  };
  vi.spyOn(window, "matchMedia").mockReturnValue(query as unknown as MediaQueryList);
  return {
    listeners,
    set(matches: boolean) {
      query.matches = matches;
      act(() => listeners.forEach((listener) => listener({ matches } as MediaQueryListEvent)));
    },
  };
}

/** jsdom has no media playback, so play and pause flip state and fire the events a browser would. */
function mockMedia() {
  const paused = new WeakMap<HTMLMediaElement, boolean>();
  vi.spyOn(HTMLMediaElement.prototype, "paused", "get").mockImplementation(function (this: HTMLMediaElement) {
    return paused.get(this) ?? true;
  });
  const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function (this: HTMLMediaElement) {
    paused.set(this, false);
    this.dispatchEvent(new Event("play"));
    return Promise.resolve();
  });
  const pause = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function (this: HTMLMediaElement) {
    paused.set(this, true);
    this.dispatchEvent(new Event("pause"));
  });
  return { play, pause };
}

const VIDEO = { src: "/video.mp4", portraitSrc: "/video-portrait.mp4" };

function zoomLayer(container: HTMLElement) {
  return container.querySelector("video")?.parentElement;
}

describe("HeroVideo", () => {
  afterEach(() => vi.restoreAllMocks());

  it("starts playing when motion is allowed and offers a pause control", () => {
    reducedMotion(false);
    const media = mockMedia();
    const { container } = render(<HeroVideo video={VIDEO} poster="/poster.webp" />);
    const video = container.querySelector("video");

    expect(media.play).toHaveBeenCalledOnce();
    expect(video?.preload).toBe("auto");
    expect(screen.getByRole("button", { name: "Pause background video" })).toBeInTheDocument();
    expect(zoomLayer(container)).not.toHaveClass("[animation-play-state:paused]");
  });

  it("retries play after the first attempt is blocked once media data is ready", async () => {
    reducedMotion(false);
    const paused = new WeakMap<HTMLMediaElement, boolean>();
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function (this: HTMLMediaElement) {
      if (play.mock.calls.length === 1) return Promise.reject(new DOMException("NotAllowedError"));
      paused.set(this, false);
      this.dispatchEvent(new Event("play"));
      return Promise.resolve();
    });
    vi.spyOn(HTMLMediaElement.prototype, "paused", "get").mockImplementation(function (this: HTMLMediaElement) {
      return paused.get(this) ?? true;
    });
    vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(function (this: HTMLMediaElement) {
      queueMicrotask(() => this.dispatchEvent(new Event("loadeddata")));
    });

    render(<HeroVideo video={VIDEO} poster="/poster.webp" />);

    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(play).toHaveBeenCalledTimes(2);
    expect(screen.getByRole("button", { name: "Pause background video" })).toBeInTheDocument();
  });

  it("pauses the video and the zoom from the control, then resumes", () => {
    reducedMotion(false);
    const media = mockMedia();
    const { container } = render(<HeroVideo video={VIDEO} poster="/poster.webp" />);

    fireEvent.click(screen.getByRole("button", { name: "Pause background video" }));
    expect(media.pause).toHaveBeenCalledOnce();
    expect(zoomLayer(container)).toHaveClass("[animation-play-state:paused]");

    fireEvent.click(screen.getByRole("button", { name: "Play background video" }));
    expect(media.play).toHaveBeenCalledTimes(2);
    expect(screen.getByRole("button", { name: "Pause background video" })).toBeInTheDocument();
  });

  it("keeps the poster and never starts or preloads the video for reduced-motion visitors", () => {
    reducedMotion(true);
    const media = mockMedia();
    const { container } = render(<HeroVideo video={VIDEO} poster="/poster.webp" />);
    const video = container.querySelector("video");

    expect(media.play).not.toHaveBeenCalled();
    expect(video).toHaveAttribute("preload", "none");
    expect(video).toHaveAttribute("poster", "/poster.webp");
    expect(video).not.toHaveAttribute("autoplay");
    expect(screen.getByRole("button", { name: "Play background video" })).toBeInTheDocument();
  });

  it("offers the portrait crop to portrait phones and the full frame to everyone else", () => {
    reducedMotion(false);
    mockMedia();
    const { container } = render(<HeroVideo video={VIDEO} poster="/poster.webp" />);
    const sources = [...container.querySelectorAll("video source")].map((source) => [source.getAttribute("src"), source.getAttribute("media")]);
    expect(sources).toEqual([
      ["/video-portrait.mp4", "(max-width: 767px) and (orientation: portrait)"],
      ["/video.mp4", null],
    ]);
  });

  it("still lets reduced-motion visitors choose to play", () => {
    reducedMotion(true);
    const media = mockMedia();
    render(<HeroVideo video={VIDEO} poster="/poster.webp" />);

    fireEvent.click(screen.getByRole("button", { name: "Play background video" }));
    expect(media.play).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Pause background video" })).toBeInTheDocument();
  });

  it("pauses when reduced motion is turned on while the video plays", () => {
    const preference = reducedMotion(false);
    const media = mockMedia();
    render(<HeroVideo video={VIDEO} poster="/poster.webp" />);

    preference.set(true);
    expect(media.pause).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Play background video" })).toBeInTheDocument();
  });

  it("stops listening for preference changes once unmounted", () => {
    const preference = reducedMotion(false);
    mockMedia();
    const { unmount } = render(<HeroVideo video={VIDEO} poster="/poster.webp" />);

    expect(preference.listeners.size).toBe(1);
    unmount();
    expect(preference.listeners.size).toBe(0);
  });
});

describe("MarqueeGroup", () => {
  it("pauses and resumes every row from one control", () => {
    const { container } = render(
      <MarqueeGroup>
        <div className="animate-marquee" />
      </MarqueeGroup>,
    );
    const group = container.firstElementChild;

    expect(group).not.toHaveAttribute("data-paused");
    fireEvent.click(screen.getByRole("button", { name: "Pause partner logos" }));
    expect(group).toHaveAttribute("data-paused", "true");
    fireEvent.click(screen.getByRole("button", { name: "Play partner logos" }));
    expect(group).not.toHaveAttribute("data-paused");
  });
});

describe("RevealObserver", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("reveals each data-reveal target when it intersects", () => {
    const observed: Element[] = [];
    let notify: IntersectionObserverCallback = () => undefined;
    class FiringObserver {
      constructor(callback: IntersectionObserverCallback) {
        notify = callback;
      }
      observe(target: Element) {
        observed.push(target);
      }
      unobserve() {
        return undefined;
      }
      disconnect() {
        return undefined;
      }
    }
    vi.stubGlobal("IntersectionObserver", FiringObserver);

    const { container } = render(
      <>
        <RevealObserver />
        <SectionHeading id="a" title="First" />
        <div data-reveal>Second</div>
      </>,
    );
    const targets = Array.from(container.querySelectorAll<HTMLElement>("[data-reveal]"));
    expect(targets).toHaveLength(2);
    expect(observed).toEqual(expect.arrayContaining(targets));
    expect(targets.some((target) => target.classList.contains("is-visible"))).toBe(false);

    act(() =>
      notify(
        targets.map((target) => ({ isIntersecting: true, target }) as IntersectionObserverEntry),
        {} as IntersectionObserver,
      ),
    );
    expect(targets.every((target) => target.classList.contains("is-visible"))).toBe(true);
  });
});

describe("static decoration", () => {
  it("uses full-width hero copy with gutters that account for the inset frame", () => {
    const { container } = render(<PhotoHero image="/still.webp" title="A still hero" />);
    const copy = container.querySelector(".hero-copy");
    expect(copy).toHaveClass("w-full", "px-5", "sm:px-10", "lg:px-12", "pb-8", "sm:pb-10", "lg:pb-12");
    expect(copy?.className).not.toMatch(/max-w-/);
  });

  it("renders a still-image hero without the continuous zoom", () => {
    const { container } = render(<PhotoHero image="/still.webp" title="A still hero" />);
    expect(container.querySelector(".animate-kenburns")).toBeNull();
    expect(container.querySelector("video")).toBeNull();
  });

});
