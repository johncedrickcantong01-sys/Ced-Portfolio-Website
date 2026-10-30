import { Link } from "react-router";
import { bookCall, offer } from "../content/site";

// The offer as a list, not cards: each package's name, then what it
// includes, one row each between hairlines. No prices: pricing is on the call.
export default function Offer() {
  return (
    <section id="packages" aria-labelledby="packages-title" className="px-6 pt-24 font-text text-paper md:px-13 md:pt-32">
      <div className="border-t border-rule pt-6 md:pt-8 lg:grid lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-4">
          <h2 id="packages-title" className="text-heading font-medium text-balance">
            {offer.heading}
          </h2>
          <p className="mt-6 max-w-[32ch] text-body text-pretty text-dim">{offer.intro}</p>
        </div>
        <div className="mt-10 lg:col-span-8 lg:mt-0">
          <ul className="border-b border-rule">
            {offer.packages.map((item) => (
              <li
                key={item.name}
                className="grid gap-y-3 border-t border-rule py-6 first:border-t-0 first:pt-0 md:grid-cols-12 md:items-baseline lg:grid-cols-8 md:gap-x-6 md:py-8 md:first:pt-0"
              >
                <h3 className="text-figure leading-[1.15] font-medium text-balance md:col-span-4 lg:col-span-3">{item.name}</h3>
                <p className="max-w-[52ch] text-body text-pretty text-dim md:col-span-8 lg:col-span-5">{item.text}</p>
              </li>
            ))}
          </ul>
          <Link
            to={bookCall.href}
            className="focus-ring mt-10 inline-flex min-h-12 items-center rounded-md bg-caption px-6 text-body font-medium text-bay transition-colors hover:bg-paper"
          >
            {bookCall.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
