import { about } from "../content/site";
import ToolDock from "./ToolDock";

// About: the heading, then the portrait (in the same picture frame as the
// work) beside the three lines, the first one as the section's statement,
// held together in the middle of the page, then the tool dock under them at
// the same narrower width (on the old site it sat in About too).
export default function AboutCed() {
  const [first, ...rest] = about.lines;
  return (
    <section aria-labelledby="about-title" className="px-6 pt-24 font-text text-paper md:px-13 md:pt-32">
      <div className="border-t border-rule pt-6 md:pt-8">
        <h2 id="about-title" className="text-heading font-medium">
          {about.heading}
        </h2>
        <div className="mx-auto max-w-4xl">
          <div className="mt-8 md:mt-12 md:flex md:items-center md:gap-x-10">
            <img
              src={about.portrait.src}
              alt={about.portrait.alt}
              width={about.portrait.width}
              height={about.portrait.height}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full max-w-64 shrink-0 rounded-xl bg-frame object-cover outline-1 -outline-offset-1 outline-paper/10 md:w-72 md:max-w-none md:rounded-2xl"
            />
            <div className="mt-8 md:mt-0">
              <p className="max-w-[30ch] text-figure leading-[1.25] font-medium text-pretty">{first}</p>
              {rest.map((line) => (
                <p key={line} className="mt-5 max-w-[46ch] text-body text-pretty text-dim">
                  {line}
                </p>
              ))}
            </div>
          </div>
          <ToolDock />
        </div>
      </div>
    </section>
  );
}
