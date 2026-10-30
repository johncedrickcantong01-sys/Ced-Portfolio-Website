// Home and /book copy, word for word from the approved copy deck
// (docs/plans/2026-10-15-website-revamp/copy-deck.md, approved 19 Oct 2026).
// Added words the deck lacks: the headings "About" and "FAQ", the process
// labels "Approval" and "Days" (findings D-T8).
import type { MetaDescriptor } from "react-router";

// The private-share origin (plan T12; www at the public launch), for canonicals, og:url, the schema and the sitemap.
export const siteUrl = "https://work.cedcantong.site";

// One page's search and sharing tags. path ends with the slash Pages serves
// ("/", "/book/"; findings F20). og:image and twitter:card
// come with the share images (plan TM).
export function pageMeta(path: string, title: string, description: string): MetaDescriptor[] {
  const url = siteUrl + path;
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    // One share image for every page: the headline beside four reel frames.
    { property: "og:image", content: `${siteUrl}/media/share.jpg` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}

export const bookCall = { label: "Book a call", href: "/book" };

export const email = "johncedrickcantong01@gmail.com";
export const linkedin = "https://www.linkedin.com/in/john-cedrick-cantong-3284392a4/";

export const nav = {
  name: "Ced Cantong",
  links: [
    { label: "Work", href: "/#work" },
    { label: "How I work", href: "/#how-i-work" },
  ],
};

export const homeMeta = {
  title: "Ced Cantong | DTC video ad editor for every funnel stage",
  description:
    "AI video ad editor for DTC brands and their agencies. UGC, talking head, VSLs, product ads and AI storylines, 1 to 2 days from brief to delivery.",
};

export const hero = {
  headline: "DTC video ad editor for every stage of your funnel",
  subline:
    "I edit UGC, talking head with B-roll, VSLs, product and offer ads, and AI storyline ads, for brands directly or white-label for their agencies.",
  pauseReel: "Pause reel",
  playReel: "Play reel",
};

// The hero carousel (plan TH, TH2): the first 5 s of 24 past ads, muted,
// 540×960, each with its first frame as the poster. Files in
// public/media/reel/. Two rows of 12: reel-01 to 12 on top, 13 to 24 below.
const reelClip = (n: number) => {
  const id = `reel-${String(n).padStart(2, "0")}`;
  // Clips on R2 (it answers range requests, which Safari needs to play video); posters stay here.
  // The second row's clips are _v1 on R2 (the plain names hold a cached 404).
  return { video: `https://assets.cedcantong.site/${id}${n > 12 ? "_v1" : ""}.mp4`, poster: `/media/reel/${id}.webp` };
};
export const heroReel = {
  top: Array.from({ length: 12 }, (_, i) => reelClip(i + 1)),
  bottom: Array.from({ length: 12 }, (_, i) => reelClip(i + 13)),
};

// Each line reads `${figure} ${text}`.
export const proof = [
  { figure: "4", text: "years as a video editor" },
  { figure: "100+", text: "ads produced" },
  { figure: "9", text: "ads in one week" },
  { figure: "1 to 2", text: "days from brief to delivery" },
];

export const workSection = {
  heading: "Selected work",
  intro:
    "Every ad is tagged by funnel stage. TOF ads stop cold viewers and explain the problem, MOF ads give proof and answer doubts, BOF ads close on the product and the offer.",
  note: "Client brands stay unnamed and their products are blurred.",
  // The video buttons' names (plan TV), read out with the ad's format.
  play: "Play",
  pause: "Pause",
  sound: "Sound",
  seek: "Position",
  fullscreen: "Full screen",
  exitFullscreen: "Exit full screen",
  of: "of",
};

export const howIWork = {
  heading: "How I work",
  intro:
    "I'm an AI video ad editor. An ad can start from raw footage, an AI still or a 3D blocking take, and every ad goes through the same five steps.",
  // Four moments from our storyline ads, joined in one video (27.6 s): O-453
  // SC04 from the landing to the younger woman running from the house, O-458
  // SC03's street run (cut before the wall), O-563 SC13's aisle walk and
  // O-477 SC07's car park walk. Each part's approved Director's Desk take sits
  // under its finished clip, both cut on the same frames, so a drag line shows
  // one against the other as they play (Ced, 30 Oct 2026). No product on screen.
  compare: {
    draft: { label: "3D draft", video: "https://assets.cedcantong.site/how-draft_v5.mp4", poster: "/media/how-draft_v5.webp" },
    final: { label: "Final", video: "https://assets.cedcantong.site/how-final_v5.mp4", poster: "/media/how-final_v5.webp" },
    caption: "Four moments from our storyline ads. Drag the line from the 3D draft to the finished ad.",
    handle: "Compare the 3D draft with the final ad",
    play: "Play",
    pause: "Pause",
  },
  approvalLabel: "Approval",
  // approval: the deck's line after "Step n approval:" (step 5 has none).
  steps: [
    {
      name: "Brief",
      text: "You send the product, the offer and the funnel stage. We set the number of ads on the call.",
      approval: "you confirm the brief and the package.",
    },
    {
      name: "Plan",
      text: "I pick the angle and the opening for each ad and plan the edit or the shots.",
      approval: "you approve the plan. For AI shots, you approve the blocking and the look before I spend a credit.",
    },
    {
      name: "Make",
      text: "I cut the footage and make any AI shots, then caption each ad.",
      approval: "none.",
    },
    {
      name: "Review",
      text: "You get the first cut and send notes. The paid pilot includes 2 revision rounds.",
      approval: "you approve the final cut.",
    },
    {
      name: "Delivery",
      text: "Each ad comes captioned in 9:16 and 4:5, plus a clean master without text.",
      approval: null,
    },
  ],
  total: "1 to 2 days from brief to delivery.",
  tools:
    "Tools: Final Cut Pro for the edit, Higgsfield for AI images and video, ElevenLabs for voice, Claude for scripts and prompts, and Blender for 3D.",
  // The running tool dock, copied from the old site (Hermes out, Claude and
  // Blender in, Ced 30 Oct 2026). Hover or tap an icon for its name and line.
  dockLabel: "Tools I use",
  dock: [
    { name: "Final Cut Pro", icon: "final-cut-pro", text: "My core workspace for high-speed timeline editing, precise cuts, and dialing in the perfect video pacing." },
    { name: "Apple Motion", icon: "apple-motion", text: "Where I design custom kinetic typography and subtle visual assets to keep the viewer's eyes locked onto the screen." },
    { name: "Canva Affinity", icon: "affinity", text: "My design ecosystem for quickly knocking out frame mockups, styling high-res vector graphics, and building clean visual assets." },
    { name: "Higgsfield AI", icon: "higgsfield", text: "My secret weapon for generating cinematic B-roll ideas and blending hyper-realistic AI effects directly into real footage." },
    { name: "Claude", icon: "claude", text: "My partner for scripts, shot lists and clip prompts, and the code behind my own production tools." },
    { name: "Blender", icon: "blender", text: "Where I build 3D scenes, props and camera tests that feed the AI shots." },
    { name: "Notion", icon: "notion", text: "The ultimate dashboard for mapping concepts, tracking notes, and running production calendars." },
    { name: "Remotion", icon: "remotion", text: "A powerful engineering tool that lets me programmatically code, automate, and render complex template layouts at scale." },
    { name: "Freeform", icon: "freeform", text: "An infinite digital canvas to brain-dump ideas, map storyboards, and nail down the story arc." },
  ],
};

export const offer = {
  heading: "Packages",
  intro: "Each package lists what it includes. Pricing on the call.",
  packages: [
    {
      name: "Funnel ad pack",
      text: "New ads for one stage of your funnel: TOF, MOF or BOF. Each ad comes captioned in 9:16 and 4:5, plus a clean master without text. We set the number of ads on the call.",
    },
    {
      name: "Creative testing retainer",
      text: "Each month, 6 new concepts and 12 new openings on your proven ads.",
    },
    {
      name: "White-label video ad editing for agencies",
      text: "The same work, delivered under your agency's name and covered by an NDA.",
    },
    {
      name: "Paid pilot",
      text: "3 ads at a fixed price, with 2 revision rounds. AI credits are billed separately.",
    },
    {
      name: "Add-ons",
      text: "Language versions, extra hooks and extra ratios.",
    },
  ],
};

// Confirmed by Ced (30 Oct 2026).
export const trust = {
  heading: "Rights and trust",
  lines: [
    "Commercial-use licences for the tools and models used.",
    "Voice consent.",
    "AI disclosure labels for the US and the EU.",
    "An asset record for each ad.",
  ],
};

export const about = {
  heading: "About",
  portrait: { src: "/media/ced.webp", alt: "Ced Cantong", width: 800, height: 800 },
  lines: [
    "I'm Ced Cantong, a performance creative editor for DTC brands and the agencies that run their ads.",
    "I've edited video for 4 years and produced 100+ ads, 9 of them in one week.",
    "I plan the blocking and camera for AI shots in 3D before any credit is spent.",
  ],
};

export const faq = {
  heading: "FAQ",
  items: [
    { question: "How long does a project take?", answer: "1 to 2 days from brief to delivery." },
    {
      question: "How many revision rounds are included?",
      answer: "The paid pilot includes 2. For other projects, we agree the number on the call.",
    },
    {
      question: "How do you use AI?",
      answer:
        "AI is one of my tools, next to the edit, and AI storyline ads are one format among the others. For AI shots, I plan the blocking and camera in 3D first, then make the stills, clips and voice, and finish them in the edit.",
    },
    {
      question: "Can you work white-label, under NDA?",
      answer: "Yes. For agencies, I deliver under your agency's name, and the work is covered by an NDA.",
    },
    {
      question: "Which languages can you deliver?",
      answer: "English, German and Spanish so far. Each language version is an add-on."
    },
    {
      question: "How does pricing work?",
      answer:
        "Each package is priced on the call, once we know the stage, the formats and the number of ads. The paid pilot is 3 ads at a fixed price, and AI credits are billed separately.",
    },
  ],
};

export const closing = {
  heading: "Need new ads for one stage of your funnel?",
  text: "Book a 30-minute call. We go through the stage, the formats and the package, and I give you the price.",
};

export const book = {
  title: "Book a call with Ced Cantong, DTC video ad editor",
  description:
    "A 30-minute call about new ads for one funnel stage, a testing retainer or white-label video ad editing for your agency. Pricing on the call.",
  heading: "Book a 30-minute call",
  coverIntro: "On the call we cover:",
  cover: [
    "your product, your offer and the funnel stage that needs new ads",
    "which formats fit that stage",
    "the package, the number of ads and the price",
    "for agencies, white-label video ad editing under NDA",
    "the timeline: a project takes 1 to 2 days from brief to delivery",
  ],
  pickTime: "Pick a time",
  // Today's 30-minute event; the iframe loads only after the click.
  calendly: "https://calendly.com/johncedrickcantong01/30min",
  emailIntro: "Or email me at",
};
