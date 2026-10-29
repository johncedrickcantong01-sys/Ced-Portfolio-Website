import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Pause, Play } from "lucide-react";
import { howIWork } from "../content/site";

const { compare } = howIWork;

// One 9:16 frame with the finished ad underneath and the 3D draft on top,
// cut off at a line the viewer drags (or moves with the arrow keys). Both
// play muted and in step: the draft follows the final's clock. They load and
// play only while on screen; under reduced motion they wait for Play.
export default function DraftCompare() {
  const frameRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLVideoElement>(null);
  const draftRef = useRef<HTMLVideoElement>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50);
  const [playing, setPlaying] = useState(false);

  function videos() {
    return [finalRef.current!, draftRef.current!];
  }

  function play() {
    for (const video of videos()) {
      if (!video.getAttribute("src")) video.src = video.dataset.src!;
    }
    draftRef.current!.currentTime = finalRef.current!.currentTime;
    Promise.all(videos().map((video) => video.play()))
      .then(() => setPlaying(true))
      .catch(() => {});
  }

  function pause() {
    for (const video of videos()) video.pause();
    setPlaying(false);
  }

  useEffect(() => {
    const final = finalRef.current!;
    const draft = draftRef.current!;
    const sync = () => {
      if (Math.abs(draft.currentTime - final.currentTime) > 0.1) draft.currentTime = final.currentTime;
    };
    final.addEventListener("timeupdate", sync);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => final.removeEventListener("timeupdate", sync);
    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : pause()));
    observer.observe(frameRef.current!);
    return () => {
      observer.disconnect();
      final.removeEventListener("timeupdate", sync);
    };
  }, []);

  function moveTo(clientX: number) {
    const box = frameRef.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - box.left) / box.width) * 100)));
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("button")) return;
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 10 : 2;
    const next = { ArrowLeft: pos - step, ArrowRight: pos + step, Home: 0, End: 100 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setPos(Math.min(100, Math.max(0, next)));
  }

  const video = "absolute inset-0 size-full object-cover";

  return (
    <figure>
      <div
        ref={frameRef}
        onPointerDown={onPointerDown}
        onPointerMove={(event) => dragging.current && moveTo(event.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        className="relative aspect-9/16 w-full cursor-ew-resize touch-pan-y overflow-hidden rounded-xl bg-frame outline-1 -outline-offset-1 outline-paper/10 select-none md:rounded-2xl"
      >
        <video ref={finalRef} data-src={compare.final.video} poster={compare.final.poster} muted loop playsInline preload="none" className={video} />
        <video
          ref={draftRef}
          data-src={compare.draft.video}
          poster={compare.draft.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className={video}
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />

        <span className="pointer-events-none absolute top-3 left-3 rounded-md bg-bay/70 px-2 py-1 text-small backdrop-blur-sm">{compare.draft.label}</span>
        <span className="pointer-events-none absolute top-3 right-3 rounded-md bg-bay/70 px-2 py-1 text-small backdrop-blur-sm">{compare.final.label}</span>

        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-paper" style={{ left: `${pos}%` }} />
        <div
          role="slider"
          tabIndex={0}
          aria-label={compare.handle}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% ${compare.draft.label}`}
          onKeyDown={onKeyDown}
          className="focus-ring absolute top-1/2 flex size-11 -translate-1/2 items-center justify-center rounded-full bg-paper text-bay shadow-lg"
          style={{ left: `${pos}%` }}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="currentColor">
            <path d="M9 6 3 12l6 6zM15 6l6 6-6 6z" />
          </svg>
        </div>

        <button
          type="button"
          onClick={playing ? pause : play}
          aria-label={playing ? compare.pause : compare.play}
          className="focus-ring absolute bottom-3 left-3 inline-flex size-10 items-center justify-center rounded-md bg-bay/70 backdrop-blur-sm transition-colors hover:bg-bay"
        >
          {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
        </button>
      </div>
      <figcaption className="mt-3 max-w-[40ch] text-small text-pretty text-dim">{compare.caption}</figcaption>
    </figure>
  );
}
