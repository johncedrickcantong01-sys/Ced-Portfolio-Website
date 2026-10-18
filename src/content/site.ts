// Home copy, word for word from the approved copy deck
// (docs/plans/2026-10-15-website-revamp/copy-deck.md, approved 19 Oct 2026).

export const bookCall = { label: "Book a call", href: "/book" };

export const nav = {
  name: "Ced Cantong",
  links: [
    { label: "Work", href: "#work" },
    { label: "How I work", href: "#how-i-work" },
    { label: "Packages", href: "#packages" },
  ],
};

export const hero = {
  headline: "DTC video ad editor for every stage of your funnel",
  subline:
    "I edit UGC, talking head with B-roll, VSLs, product and offer ads, and AI storyline ads, for brands directly or white-label for their agencies.",
  playWithSound: "Play with sound",
  pauseReel: "Pause reel",
  playReel: "Play reel",
  // Shown in the empty frame until heroReel is set (plan, "Placeholders first").
  reelPlaceholder: "Reel: placeholder",
};

// The muted hero loop: wide from 768 px, tall below, each with its poster
// (WebP, the LCP). Files go in public/media/ (plan T6). null until Ced's ad is cut.
export type HeroReel = { wide: string; tall: string; posterWide: string; posterTall: string };
export const heroReel: HeroReel | null = null;

// The full hero ad with sound, opened by "Play with sound" and loaded only on
// that click. width and height keep its box steady. null until it is hosted.
export type HeroAd = { src: string; width: number; height: number };
export const heroAd: HeroAd | null = null;

// Each line reads `${figure} ${text}`; the last one waits on Ced (deck: [placeholder]).
export const proof = [
  { figure: "50+", text: "ads since August 2026" },
  { figure: "9", text: "ads in one week" },
  { figure: "3 to 5", text: "days from brief to delivery" },
  { figure: "[placeholder]", text: "client result", placeholder: true },
];
