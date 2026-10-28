import { useEffect, useRef, useState } from "react";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { placeholder, workSection } from "../content/site";
import { work, type Work } from "../content/work";

// Selected work as a video showcase (plan TV): each ad plays muted in its 9:16
// frame while it is on screen, with pause and sound buttons on top, like the
// old site. Sound is on for one ad at a time. On phones the credits sit beside
// the frame; from 1024 px the heading keeps the left rail.
export default function WorkGrid() {
  const [sound, setSound] = useState<string | null>(null);

  return (
    <section id="work" aria-labelledby="work-title" className="px-6 pt-24 font-text text-paper md:px-13 md:pt-32">
      <div className="border-t border-rule pt-6 md:pt-8 lg:grid lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-4">
          <h2 id="work-title" className="text-heading font-medium text-balance">
            {workSection.heading}
          </h2>
          <p className="mt-6 max-w-[46ch] text-body text-pretty text-dim">{workSection.intro}</p>
          <p className="mt-4 max-w-[46ch] text-body text-pretty text-dim">{workSection.note}</p>
        </div>
        <ul className="mt-12 grid gap-y-8 md:grid-cols-3 md:gap-x-6 lg:col-span-8 lg:mt-0">
          {work.map((item) => (
            <li key={item.slug} className="flex items-end gap-5 md:block">
              <AdFrame item={item} soundOn={sound === item.slug} setSound={setSound} />
              <div className="min-w-0 md:mt-5">
                <p className="flex flex-wrap gap-x-3 text-small">
                  <span className="font-medium text-paper">{item.stage}</span>
                  <span className="text-dim">{item.brand}</span>
                </p>
                <h3
                  className={`mt-3 text-figure leading-[1.15] font-medium text-balance ${item.format === placeholder ? "text-dim" : "text-paper"}`}
                >
                  {item.format}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const frame =
  "relative aspect-9/16 w-[42%] shrink-0 rounded-xl outline-1 -outline-offset-1 outline-paper/10 md:w-full md:rounded-2xl";
const button =
  "focus-ring inline-flex size-10 items-center justify-center rounded-full bg-bay/70 backdrop-blur-sm transition-colors hover:bg-bay";

// One ad. Nothing loads until the frame reaches the screen; it plays while at
// least half of it shows and pauses off screen, unless the visitor paused it.
// Under reduced motion it waits for the play button and starts with sound.
function AdFrame({
  item,
  soundOn,
  setSound,
}: {
  item: Work;
  soundOn: boolean;
  setSound: (slug: string | null) => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [full, setFull] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const video = ref.current;
    if (!video || !item.video) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !video.getAttribute("src")) video.src = item.video!;
        if (entry.intersectionRatio >= 0.5 && !pausedRef.current) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: [0, 0.5] },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [item.video]);

  useEffect(() => {
    if (ref.current) ref.current.muted = !soundOn;
  }, [soundOn]);

  function start(withSound: boolean) {
    const video = ref.current;
    if (!video || !item.video) return;
    if (!video.getAttribute("src")) video.src = item.video;
    if (withSound) setSound(item.slug);
    setStill(false);
    setPaused(false);
    video.play().catch(() => {});
  }

  function togglePause() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) start(false);
    else {
      setPaused(true);
      video.pause();
    }
  }

  useEffect(() => {
    const onChange = () => setFull(document.fullscreenElement === frameRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Fullscreen takes the whole frame so the bar and buttons stay; iPhone
  // Safari has no element fullscreen, so it gets its own video player.
  function toggleFull() {
    const box = frameRef.current;
    const video = ref.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!box || !video) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      return;
    }
    start(true);
    if (box.requestFullscreen) box.requestFullscreen().catch(() => {});
    else video.webkitEnterFullscreen?.();
  }

  function toggleSound() {
    if (soundOn) setSound(null);
    else start(true);
  }

  if (!item.video) {
    return <div aria-hidden="true" className={`${frame} reel-placeholder after:rounded-[inherit]`} />;
  }

  return (
    <div ref={frameRef} className={`${frame} bg-frame [&:fullscreen_video]:object-contain`}>
      <video
        ref={ref}
        poster={item.poster ?? undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-label={item.format}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        className="absolute inset-0 size-full rounded-[inherit] object-cover"
      />
      {duration > 0 && (
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 rounded-b-[inherit] bg-gradient-to-t from-bay/90 to-transparent px-3 pt-8 pb-3">
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={time}
            onChange={(e) => {
              if (ref.current) ref.current.currentTime = Number(e.target.value);
            }}
            aria-label={`${workSection.seek}: ${item.format}`}
            aria-valuetext={`${clock(time)} ${workSection.of} ${clock(duration)}`}
            className="focus-ring order-2 h-1 w-full cursor-pointer accent-caption"
          />
          <div className="order-1 flex items-center justify-between">
            <span aria-hidden="true" className="font-mono text-[0.6875rem] text-paper/90 tabular-nums">
              {clock(time)} / {clock(duration)}
            </span>
            <button
              type="button"
              onClick={toggleFull}
              aria-label={`${full ? workSection.exitFullscreen : workSection.fullscreen}: ${item.format}`}
              className="focus-ring -m-2 inline-flex size-9 items-center justify-center rounded-full"
            >
              {full ? <Minimize aria-hidden="true" className="size-4" /> : <Maximize aria-hidden="true" className="size-4" />}
            </button>
          </div>
        </div>
      )}
      {still ? (
        <button
          type="button"
          onClick={() => start(true)}
          aria-label={`${workSection.play}: ${item.format}`}
          className="focus-ring absolute inset-0 flex items-center justify-center rounded-[inherit]"
        >
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-bay/70 backdrop-blur-sm">
            <Play aria-hidden="true" className="size-5" />
          </span>
        </button>
      ) : (
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            type="button"
            onClick={togglePause}
            aria-label={`${playing ? workSection.pause : workSection.play}: ${item.format}`}
            className={button}
          >
            {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
          </button>
          <button
            type="button"
            onClick={toggleSound}
            aria-label={`${workSection.sound}: ${item.format}`}
            aria-pressed={soundOn}
            className={button}
          >
            {soundOn ? <Volume2 aria-hidden="true" className="size-4 text-caption" /> : <VolumeX aria-hidden="true" className="size-4" />}
          </button>
        </div>
      )}
    </div>
  );
}

// 272.4 → "4:32".
function clock(seconds: number) {
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
