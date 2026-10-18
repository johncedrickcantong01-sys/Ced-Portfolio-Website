import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Pause, Play, Volume2, X } from "lucide-react";
import { bookCall, hero, heroAd, heroReel } from "../content/site";

// Footage first: the reel fills an inset frame under the header, and the
// title sits small over its lower-left on a scrim. The top-right corner
// belongs to the reel: its pause button, or the placeholder label until
// Ced's ad is cut.
export default function Hero() {
  const reelRef = useRef<HTMLVideoElement>(null);
  const adDialogRef = useRef<HTMLDialogElement>(null);
  const adRef = useRef<HTMLVideoElement>(null);
  // off: no loop (none set, or reduced motion); the loop shows once it has played.
  const [reel, setReel] = useState<"off" | "loading" | "playing" | "paused">("off");

  // After first paint: the loop for this screen width. Under reduced motion
  // the poster stays and no video loads.
  useEffect(() => {
    const video = reelRef.current;
    if (!heroReel || !video || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.muted = true;
    video.src = matchMedia("(min-width: 768px)").matches ? heroReel.wide : heroReel.tall;
    setReel("loading");
    video.play().catch(() => {});
  }, []);

  function toggleReel() {
    const video = reelRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }

  function openAd() {
    const dialog = adDialogRef.current;
    const ad = adRef.current;
    if (!heroAd || !dialog || !ad) return;
    if (!ad.getAttribute("src")) ad.src = heroAd.src;
    dialog.showModal();
    ad.play().catch(() => {});
  }

  return (
    <section aria-labelledby="hero-title" className="bg-bay px-2 pb-2 font-text text-paper md:px-3 md:pb-3">
      <div className="relative isolate flex h-[calc(100svh_-_var(--header-h)_-_0.5rem)] min-h-[34rem] flex-col justify-end overflow-hidden rounded-xl bg-frame outline-1 -outline-offset-1 outline-paper/10 md:h-[calc(100svh_-_var(--header-h)_-_0.75rem)] md:rounded-2xl">
        {heroReel ? (
          <>
            <picture>
              <source media="(min-width: 768px)" srcSet={heroReel.posterWide} />
              <img
                src={heroReel.posterTall}
                alt=""
                fetchPriority="high"
                className="absolute inset-0 -z-10 size-full object-cover"
              />
            </picture>
            <video
              ref={reelRef}
              muted
              loop
              playsInline
              aria-hidden="true"
              onPlaying={() => setReel("playing")}
              onPause={() => setReel("paused")}
              className={`absolute inset-0 -z-10 size-full object-cover transition-opacity duration-700 ${reel === "playing" || reel === "paused" ? "opacity-100" : "opacity-0"}`}
            />
          </>
        ) : (
          <div aria-hidden="true" className="reel-placeholder absolute inset-0 -z-10" />
        )}

        <div className="absolute top-4 right-4 md:top-10 md:right-10">
          {!heroReel && <p className="text-small text-dim">{hero.reelPlaceholder}</p>}
          {reel !== "off" && (
            <button
              type="button"
              onClick={toggleReel}
              className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-md bg-bay/70 px-4 text-small font-medium backdrop-blur-sm transition-colors hover:bg-bay"
            >
              {reel === "playing" ? <Pause aria-hidden="true" className="size-3.5" /> : <Play aria-hidden="true" className="size-3.5" />}
              {reel === "playing" ? hero.pauseReel : hero.playReel}
            </button>
          )}
        </div>

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
            {heroAd && (
              <button
                type="button"
                onClick={openAd}
                aria-haspopup="dialog"
                className="focus-ring inline-flex min-h-12 items-center gap-2 rounded-md px-5 text-body font-medium ring-1 ring-paper/40 transition-colors ring-inset hover:bg-paper/10"
              >
                <Volume2 aria-hidden="true" className="size-4" />
                {hero.playWithSound}
              </button>
            )}
          </div>
        </div>
      </div>

      {heroAd && (
        <dialog
          ref={adDialogRef}
          aria-label={hero.playWithSound}
          onClose={() => adRef.current?.pause()}
          className="m-auto max-w-none overflow-visible bg-transparent p-0 backdrop:bg-bay/90"
        >
          <button
            type="button"
            onClick={() => adDialogRef.current?.close()}
            aria-label="Close"
            className="focus-ring absolute -top-12 right-0 inline-flex size-10 items-center justify-center rounded-md bg-paper/10 text-paper transition-colors hover:bg-paper/20"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
          <video
            ref={adRef}
            controls
            playsInline
            width={heroAd.width}
            height={heroAd.height}
            className="h-auto max-h-[85svh] w-auto max-w-[calc(100vw_-_2rem)] rounded-xl bg-frame"
          />
        </dialog>
      )}
    </section>
  );
}
