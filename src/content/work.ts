// The ads in Selected work (plan TV, 29 Oct 2026: a video showcase, no
// case-study pages). Each entry is one card on the home page.

export type Stage = "TOF" | "MOF" | "BOF";

// The deck's five formats.
export type Format =
  | "AI storyline ad"
  | "UGC ad"
  | "Talking head with B-roll"
  | "VSL"
  | "Product and offer ad";

export type Work = {
  slug: string;
  // Client ads: "a <category> DTC brand", never the name. Ced's own BOF ads: "Spec ad".
  brand: string;
  stage: Stage;
  format: Format;
  // 9:16 WebP in public/media/, under 100 KB (plan T6); the video's poster.
  poster: string | null;
  // The full ad on assets.cedcantong.site, loaded once its card reaches the screen; null shows the empty frame.
  video: string | null;
  // For the VideoObject (TM): ISO 8601 duration ("PT32S") and upload date ("2026-10-19").
  duration: string | null;
  uploadDate: string | null;
};

export const work: Work[] = [
  {
    slug: "skincare-storyline-tof",
    brand: "a skincare DTC brand",
    stage: "TOF",
    format: "AI storyline ad",
    poster: "/media/work-skincare-storyline-tof.webp",
    video: "https://assets.cedcantong.site/work-skincare-storyline-tof.mp4",
    duration: "PT4M32S",
    uploadDate: "2026-10-29",
  },
  {
    slug: "skincare-talking-head-mof",
    brand: "a skincare DTC brand",
    stage: "MOF",
    format: "Talking head with B-roll",
    poster: "/media/work-skincare-talking-head-mof.webp",
    video: "https://assets.cedcantong.site/work-skincare-talking-head-mof.mp4",
    duration: "PT1M1S",
    uploadDate: "2026-10-29",
  },
  {
    slug: "spec-product-bof",
    brand: "Spec ad",
    stage: "BOF",
    format: "Product and offer ad",
    poster: "/media/work-spec-product-bof_v1.webp",
    video: "https://assets.cedcantong.site/work-spec-product-bof_v1.mp4",
    duration: "PT30S",
    uploadDate: "2026-10-30",
  },
];
