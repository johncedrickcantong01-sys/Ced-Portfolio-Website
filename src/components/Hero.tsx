import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Pause, Play } from "lucide-react";
import { bookCall, hero, heroReel } from "../content/site";

// Footage first (plan TH): a row of 9:16 ad openings slides through an inset
// frame under the header, and the title sits small over its lower-left on a
// scrim. The row is the set twice, so sliding it by half never jumps. Each
// clip loads and plays only while it shows; the pause button stops the row.
// Under reduced motion (and before hydration) it is a still row you swipe.
export default function Hero() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [moving, setMoving] = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const shown = useRef(new Set<HTMLVideoElement>());

  useEffect(() => {
    const track = trackRef.current;
    if (!track || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMoving(true);
    const observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        const video = target as HTMLVideoElement;
        if (isIntersecting) {
          shown.current.add(video);
          if (!video.getAttribute("src")) video.src = video.dataset.src!;
          if (!pausedRef.current) video.play().catch(() => {});
        } else {
          shown.current.delete(video);
          video.pause();
        }
      }
    });
    track.querySelectorAll("video").forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, []);

  function togglePaused() {
    const next = !paused;
    setPaused(next);
    for (const video of shown.current) {
      if (next) video.pause();
      else video.play().catch(() => {});
    }
  }

  return (
    <section aria-labelledby="hero-title" className="bg-bay px-2 pb-2 font-text text-paper md:px-3 md:pb-3">
      <div className="relative isolate flex h-[calc(100svh_-_var(--header-h)_-_0.5rem)] min-h-[34rem] flex-col justify-end overflow-hidden rounded-xl bg-frame outline-1 -outline-offset-1 outline-paper/10 md:h-[calc(100svh_-_var(--header-h)_-_0.75rem)] md:rounded-2xl">
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 -z-10 h-[62%] py-2 md:h-full md:py-3 ${moving ? "overflow-hidden" : "snap-x overflow-x-auto"}`}
        >
          <ul
            ref={trackRef}
            className={`flex h-full w-max ${moving ? "animate-[reel-slide_90s_linear_infinite]" : ""} ${paused ? "[animation-play-state:paused]" : ""}`}
          >
            {(moving ? [...heroReel, ...heroReel] : heroReel).map((clip, i) => (
              <li key={i} className="h-full shrink-0 snap-start pl-2 md:pl-3">
                <video
                  data-src={clip.video}
                  poster={clip.poster}
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="aspect-9/16 h-full w-auto rounded-lg bg-bay object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
        {/* From 768 px the row runs behind the text, so the left side darkens. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 hidden bg-linear-to-r from-bay/85 via-bay/50 via-45% to-transparent to-75% md:block" />

        {moving && (
          <div className="absolute top-4 right-4 md:top-10 md:right-10">
            <button
              type="button"
              onClick={togglePaused}
              className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-md bg-bay/70 px-4 text-small font-medium backdrop-blur-sm transition-colors hover:bg-bay"
            >
              {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
              {paused ? hero.playReel : hero.pauseReel}
            </button>
          </div>
        )}

        <div className="hero-scrim px-4 pb-5 md:px-10 md:pb-10">
          <h1 id="hero-title" className="max-w-[17ch] text-display font-medium text-balance">
            {hero.headline}
          </h1>
          <p className="mt-4 max-w-[46ch] text-body text-pretty md:mt-6">{hero.subline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-8">
            <Link
              to={bookCall.href}
              className="focus-ring inline-flex min-h-12 items-center rounded-md bg-caption px-6 text-body font-medium text-bay transition-colors hover:bg-paper"
            >
              {bookCall.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
