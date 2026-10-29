import { Link } from "react-router";
import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProofStrip from "../components/ProofStrip";
import WorkGrid from "../components/WorkGrid";
import HowIWork from "../components/HowIWork";
import AboutCed from "../components/AboutCed";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import { about, bookCall, closing, email, homeMeta, pageMeta, siteUrl } from "../content/site";
import { work } from "../content/work";

// The schema says only what the page says: no prices, no ratings, no FAQ
// schema (findings D6). sameAs waits for Ced's profile links; no
// areaServed, since the positioning brief names none. No makesOffer: the
// packages are discussed on the call, not shown (Ced, 30 Oct 2026).
const url = `${siteUrl}/`;
const image = siteUrl + about.portrait.src;
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${url}#business`,
      name: "Ced Cantong",
      url,
      email,
      image,
      description: homeMeta.description,
      founder: { "@id": `${url}#person` },
    },
    {
      "@type": "Person",
      "@id": `${url}#person`,
      name: "Ced Cantong",
      url,
      image,
      jobTitle: "DTC video ad editor",
    },
    // Each Selected work ad, named and described as its card shows it.
    ...work.map((item) => ({
      "@type": "VideoObject",
      "@id": `${url}#${item.slug}`,
      name: `${item.stage} ${item.format}`,
      description:
        item.brand === "Spec ad"
          ? `${item.stage} ${item.format}, a spec ad by Ced Cantong.`
          : `${item.stage} ${item.format} for ${item.brand}, edited by Ced Cantong.`,
      thumbnailUrl: siteUrl + item.poster,
      contentUrl: item.video,
      duration: item.duration,
      uploadDate: item.uploadDate,
      creator: { "@id": `${url}#person` },
    })),
  ],
};

// The first reel poster is the largest paint on every screen size.
export const links: Route.LinksFunction = () => [
  { rel: "preload", href: "/media/reel/reel-01.webp", as: "image", fetchPriority: "high" },
];

export const meta: Route.MetaFunction = () => [
  ...pageMeta("/", homeMeta.title, homeMeta.description),
  { "script:ld+json": schema },
];

export default function Home() {
  return (
    <div className="flex min-h-screen w-full max-w-[100vw] flex-col overflow-x-clip">
      <Navbar />
      <main className="w-full max-w-full grow overflow-x-clip">
        <Hero />
        <ProofStrip />
        <WorkGrid />
        <HowIWork />
        <AboutCed />
        <Faq />
        {/* Book a call again: the hero's frame closes the page */}
        <section aria-labelledby="closing-title" className="px-2 pt-24 font-text text-paper md:px-3 md:pt-32">
          <div className="rounded-xl bg-frame px-4 pt-24 pb-6 outline-1 -outline-offset-1 outline-paper/10 md:rounded-2xl md:px-10 md:pt-40 md:pb-10">
            <h2 id="closing-title" className="max-w-[17ch] text-display font-medium text-balance">
              {closing.heading}
            </h2>
            <p className="mt-4 max-w-[46ch] text-body text-pretty md:mt-6">{closing.text}</p>
            <Link
              to={bookCall.href}
              className="focus-ring mt-6 inline-flex min-h-12 items-center rounded-md bg-caption px-6 text-body font-medium text-bay transition-colors hover:bg-paper md:mt-8"
            >
              {bookCall.label}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
