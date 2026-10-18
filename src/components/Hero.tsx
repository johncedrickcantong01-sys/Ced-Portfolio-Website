import { Link } from "react-router";
import { bookCall, hero } from "../content/site";

// The headline set like a title card, then the reel full-bleed under it.
// The reel is a still placeholder until Ced's ads arrive (plan, "Placeholders first").
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-bay font-text text-paper">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 pt-10 pb-12 md:grid-cols-12 md:px-12 md:pt-16 md:pb-16">
        <h1 id="hero-title" className="font-title text-display text-balance md:col-span-12">
          {hero.headline}
        </h1>
        <div className="md:col-span-7 md:col-start-6 lg:col-span-5 lg:col-start-8">
          <p className="max-w-[38ch] text-lead text-dim">{hero.subline}</p>
          <Link
            to={bookCall.href}
            className="focus-ring mt-8 inline-flex min-h-12 items-center rounded-sm bg-caption px-6 text-body font-semibold text-bay transition-colors hover:bg-paper"
          >
            {bookCall.label}
          </Link>
        </div>
      </div>
      <div className="mx-auto flex aspect-[9/16] w-full max-w-[calc(85svh*9/16)] items-center justify-center bg-frame md:aspect-video md:max-w-none">
        <p className="text-small text-dim">Reel: placeholder</p>
      </div>
    </section>
  );
}
