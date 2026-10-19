// Selected work: one entry per case study, words from the approved copy deck
// (Home: Selected work). Placeholders until Ced's ads arrive (plan,
// "Placeholders first"); T9 adds the case-study text and the /work/:slug pages.

export type Stage = "TOF" | "MOF" | "BOF";

// The deck's five formats, or the placeholder until Ced names one.
export type Format =
  | "AI storyline ad"
  | "UGC ad"
  | "Talking head with B-roll"
  | "VSL"
  | "Product and offer ad"
  | "[placeholder]";

export type Work = {
  slug: string;
  title: string;
  // Client ads: "a <category> DTC brand", never the name. Ced's own BOF ads: "Spec ad".
  brand: string;
  stage: Stage;
  format: Format;
  // 9:16 WebP in public/media/ (plan T6); null shows the empty frame.
  poster: string | null;
};

export const work: Work[] = [
  {
    slug: "placeholder-tof",
    title: "[placeholder]",
    brand: "a [placeholder] DTC brand",
    stage: "TOF",
    format: "[placeholder]",
    poster: null,
  },
  {
    slug: "placeholder-mof",
    title: "[placeholder]",
    brand: "a [placeholder] DTC brand",
    stage: "MOF",
    format: "[placeholder]",
    poster: null,
  },
  {
    slug: "placeholder-bof",
    title: "[placeholder]",
    brand: "Spec ad",
    stage: "BOF",
    format: "[placeholder]",
    poster: null,
  },
];
