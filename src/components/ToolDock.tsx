import { useEffect, useState } from "react";
import { howIWork } from "../content/site";

// The running tool dock from the old site: a glass bar of app icons sliding
// left, set twice so the loop never jumps. Hovering pauses it; hover, focus or
// tap an icon to lift it with its name, tap again for its line. Under reduced
// motion (and before hydration) the icons sit still and wrap.
export default function ToolDock() {
  const [moving, setMoving] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    setMoving(!matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const tools = moving ? [...howIWork.dock, ...howIWork.dock] : howIWork.dock;

  return (
    <div className="mt-12">
      <p className="text-small font-medium">{howIWork.dockLabel}</p>
      <div
        className={`relative mt-3 w-full ${moving ? "h-[4.5rem]" : ""}`}
        style={moving ? { clipPath: "inset(-12rem 0 -3rem 0)" } : undefined}
      >
        <div aria-hidden="true" className="absolute inset-0 rounded-3xl border border-paper/10 bg-paper/[0.04] backdrop-blur-xl" />
        {moving && (
          <>
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-30 w-16 rounded-l-3xl bg-linear-to-r from-bay to-transparent md:w-24" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-30 w-16 rounded-r-3xl bg-linear-to-l from-bay to-transparent md:w-24" />
          </>
        )}
        <ul
          className={
            moving
              ? "absolute inset-y-0 left-0 z-20 flex w-max animate-[reel-slide_45s_linear_infinite] items-center hover:[animation-play-state:paused] has-[:focus-visible]:[animation-play-state:paused]"
              : "relative flex flex-wrap items-center gap-2 p-3"
          }
          onMouseLeave={() => setOpen(null)}
        >
          {tools.map((tool, i) => {
            const copy = i >= howIWork.dock.length;
            return (
              <li key={i} aria-hidden={copy || undefined} className="group relative flex h-[4.5rem] flex-col items-center justify-center px-4 hover:z-30 focus-within:z-30">
                <span
                  role="tooltip"
                  className={`pointer-events-none absolute bottom-[6.5rem] flex flex-col items-center rounded-[10px] border border-paper/10 bg-frame/95 px-4 py-1.5 text-[12px] text-paper opacity-0 shadow-2xl backdrop-blur-md transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:opacity-100 group-focus-within:-translate-y-2 group-focus-within:opacity-100 ${
                    open === i ? "w-[17.5rem] whitespace-normal" : "whitespace-nowrap"
                  }`}
                >
                  {open === i ? (
                    <span className="px-1 py-1 text-center">
                      <span className="mb-1 block font-medium text-caption">{tool.name}</span>
                      <span className="block text-[11px] leading-relaxed text-paper/90">{tool.text}</span>
                    </span>
                  ) : (
                    tool.name
                  )}
                  <svg aria-hidden="true" className="absolute top-[98%] h-2 w-3 text-frame/95" viewBox="0 0 10 5" fill="currentColor">
                    <polygon points="0,0 5,5 10,0" />
                  </svg>
                </span>
                <button
                  type="button"
                  tabIndex={copy ? -1 : undefined}
                  aria-label={tool.name}
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="focus-ring size-14 origin-bottom rounded-xl transition-transform duration-300 ease-out group-hover:-translate-y-4 group-hover:scale-[1.6] group-focus-within:-translate-y-4 group-focus-within:scale-[1.6]"
                >
                  <img src={`/media/tools/${tool.icon}.webp`} alt="" width={192} height={192} loading="lazy" className="size-full object-contain drop-shadow-xl" />
                </button>
                <span aria-hidden="true" className="absolute bottom-1 size-1 scale-0 rounded-full bg-paper/40 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
