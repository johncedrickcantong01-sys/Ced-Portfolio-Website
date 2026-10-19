import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { hero } from "../content/site";

// One ad in a 9:16 picture frame (the home cards' frame). With a video: its
// poster and a play button; the click swaps in the player in the same box,
// so nothing from the video host loads before it. Without one: the empty
// frame, no button. The poster, the player and the grain take the frame's
// corners themselves (no overflow clip), so the focus ring outside it shows.
const frame = "relative aspect-9/16 w-full rounded-xl outline-1 -outline-offset-1 outline-paper/10 md:rounded-2xl";

export default function VideoFacade({
  title,
  poster,
  video,
}: {
  title: string;
  poster: string | null;
  video: string | null;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // The button goes away on click, so focus moves to the player.
  useEffect(() => {
    if (playing) videoRef.current?.focus();
  }, [playing]);

  if (playing && video) {
    return (
      <div className={`${frame} bg-frame`}>
        <video
          ref={videoRef}
          src={video}
          aria-label={title}
          controls
          autoPlay
          playsInline
          className="focus-ring absolute inset-0 size-full rounded-[inherit] object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`${frame} ${poster ? "bg-frame" : "reel-placeholder after:rounded-[inherit]"}`}>
      {/* The poster is the page's LCP; posters are cut at the ad's 9:16 (plan T6). */}
      {poster && (
        <img
          src={poster}
          alt={title}
          width={720}
          height={1280}
          fetchPriority="high"
          className="absolute inset-0 size-full rounded-[inherit] object-cover"
        />
      )}
      {video && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group focus-ring absolute inset-0 z-10 flex items-end rounded-[inherit] p-4 md:p-6"
        >
          <span className="inline-flex min-h-12 items-center gap-2 rounded-md bg-bay/70 px-5 text-body font-medium text-paper backdrop-blur-sm transition-colors group-hover:bg-bay">
            <Play aria-hidden="true" className="size-4" />
            {hero.playWithSound}
          </span>
        </button>
      )}
    </div>
  );
}
