import { Link } from "react-router";
import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProofStrip from "../components/ProofStrip";
import WorkGrid from "../components/WorkGrid";
import HowIWork from "../components/HowIWork";
import Offer from "../components/Offer";
import Trust from "../components/Trust";
import AboutCed from "../components/AboutCed";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import { about, bookCall, closing, email, homeMeta, offer, pageMeta, siteUrl } from "../content/site";

// The schema says only what the page says: no prices, no ratings, no FAQ
// schema (findings D6). sameAs waits for Ced's profile links (plan TM); no
// areaServed, since the positioning brief names none. schema.org allows
// serviceType only on a Service, not on ProfessionalService, so the four
// packages (the page's names) are Services in makesOffer, with no price.
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
      makesOffer: offer.packages
        .filter((item) => item.name !== "Add-ons")
        .map((item) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: item.name } })),
    },
    {
      "@type": "Person",
      "@id": `${url}#person`,
      name: "Ced Cantong",
      url,
      image,
      jobTitle: "DTC video ad editor",
    },
  ],
};

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
        <Offer />
        <Trust />
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
