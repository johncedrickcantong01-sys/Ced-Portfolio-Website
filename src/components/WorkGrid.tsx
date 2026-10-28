import { Link } from "react-router";
import { placeholder, workSection } from "../content/site";
import { work } from "../content/work";

// Selected work as title cards: each ad is a 9:16 picture frame (the hero's
// frame, smaller), with its credits under it. On phones the credits sit
// beside the frame, so the three ads read as one short list. From 1024 px the
// heading keeps the left rail and the frames fill the rest.
export default function WorkGrid() {
  return (
    <section id="work" aria-labelledby="work-title" className="px-6 pt-24 font-text text-paper md:px-13 md:pt-32">
      <div className="border-t border-rule pt-6 md:pt-8 lg:grid lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-4">
          <h2 id="work-title" className="text-heading font-medium text-balance">
            {workSection.heading}
          </h2>
          <p className="mt-6 max-w-[46ch] text-body text-pretty text-dim">{workSection.intro}</p>
          <p className="mt-4 max-w-[46ch] text-body text-pretty text-dim">{workSection.note}</p>
        </div>
        <ul className="mt-12 grid gap-y-8 md:grid-cols-3 md:gap-x-6 lg:col-span-8 lg:mt-0">
          {work.map((item) => (
            <li key={item.slug}>
              <Link
                to={`/work/${item.slug}`}
                className="group focus-ring flex items-end gap-5 rounded-xl md:block md:rounded-2xl"
              >
                {item.poster ? (
                  <img
                    src={item.poster}
                    alt=""
                    width={720}
                    height={1280}
                    loading="lazy"
                    decoding="async"
                    className="aspect-9/16 w-[42%] shrink-0 rounded-xl object-cover outline-1 -outline-offset-1 outline-paper/10 transition-[outline-color] group-hover:outline-paper/40 md:w-full md:rounded-2xl"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="reel-placeholder relative aspect-9/16 w-[42%] shrink-0 overflow-hidden rounded-xl outline-1 -outline-offset-1 outline-paper/10 transition-[outline-color] group-hover:outline-paper/40 md:w-full md:rounded-2xl"
                  />
                )}
                <div className="min-w-0 md:mt-5">
                  <p className="flex flex-wrap gap-x-3 text-small">
                    <span className="font-medium text-paper">{item.stage}</span>
                    <span className="text-dim">{item.format}</span>
                  </p>
                  <p className="text-small text-dim">{item.brand}</p>
                  <h3
                    className={`mt-3 text-figure leading-[1.15] font-medium text-balance decoration-1 underline-offset-4 group-hover:underline ${item.title === placeholder ? "text-dim" : "text-paper"}`}
                  >
                    {item.title}
                  </h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
