// Case studies: one entry per ad, words from the approved copy deck (Home:
// Selected work, and the case-study template). Each entry is a card on the
// home page and a page at /work/<slug>; the prerender list is built from this
// array (react-router.config.ts). Placeholders until Ced's ads arrive (plan,
// "Placeholders first"): text fields show the placeholder marker, media
// fields stay null or empty.
import { placeholder } from "./site";

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
  // "<format> for a <category> DTC brand"; Ced's own BOF ads: "<format>, spec ad".
  title: string;
  // Client ads: "a <category> DTC brand", never the name. Ced's own BOF ads: "Spec ad".
  brand: string;
  stage: Stage;
  format: Format;
  // The year the ad was delivered.
  year: string;
  // The languages delivered.
  languages: string;
  // Days from brief to delivery, from the project files.
  days: string;
  // What the client asked for, in two or three sentences, with no names.
  brief: string;
  // The deadline, the claim rules, the footage or ratios the ad had to work with.
  constraints: string;
  // The steps and the frames shown, with the approval points.
  process: string;
  // The number of ads, cuts and openings, the ratios, captions and the clean master.
  delivered: string;
  // Client numbers as percentages only, if the client allows; null leaves the
  // field off the page. resultSource says where the number comes from; it is
  // not shown, but the repo is public, so no client names or internal paths.
  result: string | null;
  resultSource: string | null;
  // 9:16 WebP in public/media/, under 100 KB (plan T6); null shows the empty frame.
  poster: string | null;
  // 1200x630 JPG in public/media/, under 200 KB (plan T6, used in T10).
  shareImage: string | null;
  // The full ad on assets.cedcantong.site, loaded only on click; null shows no play button.
  video: string | null;
  // Process frames, WebP in public/media/; not on the page yet (each needs its alt text).
  frames: string[];
  // For the VideoObject (T10): ISO 8601 duration ("PT32S") and upload date ("2026-10-19").
  duration: string | null;
  uploadDate: string | null;
};

// The case study's <title>: the entry's title + " | Ced Cantong" (deck: Route
// titles and descriptions).
export function caseTitle(item: Work) {
  return `${item.title} | Ced Cantong`;
}

// The deck's description pattern, filled from the entry; the brand ("a
// <category> DTC brand") stands for "a [category] DTC brand". Ced's spec ads
// have no pattern in the deck yet, so theirs is the placeholder.
export function caseDescription(item: Work) {
  if (item.brand === "Spec ad") return placeholder;
  // The format mid-sentence: "an AI storyline ad", "a talking head with B-roll".
  const format = /^[A-Z][a-z]/.test(item.format) ? item.format[0].toLowerCase() + item.format.slice(1) : item.format;
  const a = format.startsWith("AI") ? "an" : "a";
  return `How I made ${a} ${format} for ${item.brand} at the ${item.stage} stage: the brief, the constraints and what was delivered in ${item.days} days.`;
}

// The case-study template's labels (deck: Case studies, Template).
export const caseStudy = {
  brand: "Brand",
  stage: "Stage",
  format: "Format",
  year: "Year",
  languages: "Languages",
  days: "Days",
  brief: "The brief",
  constraints: "Constraints",
  process: "Process",
  delivered: "Delivered",
  result: "Result",
  next: "Next case",
};

export const work: Work[] = [
  {
    slug: "skincare-storyline-tof",
    title: "AI storyline ad for a skincare DTC brand",
    brand: "a skincare DTC brand",
    stage: "TOF",
    format: "AI storyline ad",
    year: "2026",
    languages: "English",
    days: placeholder,
    brief: placeholder,
    constraints: placeholder,
    process: placeholder,
    delivered: placeholder,
    result: placeholder,
    resultSource: placeholder,
    poster: "/media/work-skincare-storyline-tof.webp",
    shareImage: null,
    video: "https://assets.cedcantong.site/work-skincare-storyline-tof.mp4",
    frames: [],
    duration: "PT4M32S",
    uploadDate: "2026-10-29",
  },
  {
    slug: "skincare-talking-head-mof",
    title: "Talking head with B-roll for a skincare DTC brand",
    brand: "a skincare DTC brand",
    stage: "MOF",
    format: "Talking head with B-roll",
    year: "2026",
    languages: "German",
    days: placeholder,
    brief: placeholder,
    constraints: placeholder,
    process: placeholder,
    delivered: placeholder,
    result: placeholder,
    resultSource: placeholder,
    poster: "/media/work-skincare-talking-head-mof.webp",
    shareImage: null,
    video: "https://assets.cedcantong.site/work-skincare-talking-head-mof.mp4",
    frames: [],
    duration: "PT1M1S",
    uploadDate: "2026-10-29",
  },
  {
    slug: "placeholder-bof",
    title: placeholder,
    brand: "Spec ad",
    stage: "BOF",
    format: placeholder,
    year: placeholder,
    languages: placeholder,
    days: placeholder,
    brief: placeholder,
    constraints: placeholder,
    process: placeholder,
    delivered: placeholder,
    result: placeholder,
    resultSource: placeholder,
    poster: null,
    shareImage: null,
    video: null,
    frames: [],
    duration: null,
    uploadDate: null,
  },
];
