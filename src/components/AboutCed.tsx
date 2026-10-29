import { about } from "../content/site";
import ToolDock from "./ToolDock";

// About: the portrait in the same picture frame as the work, and the three
// lines, the first one as the section's statement, then the tool dock
// (on the old site it sat in About too).
export default function AboutCed() {
  const [first, ...rest] = about.lines;
  return (
    <section aria-labelledby="about-title" className="px-6 pt-24 font-text text-paper md:px-13 md:pt-32">
      <div className="border-t border-rule pt-6 md:pt-8 lg:grid lg:grid-cols-12 lg:gap-x-6">
        <h2 id="about-title" className="text-heading font-medium lg:col-span-4">
          {about.heading}
        </h2>
        <div className="mt-8 md:grid md:grid-cols-12 md:gap-x-6 lg:col-span-8 lg:mt-0 lg:grid-cols-8">
          <img
            src={about.portrait.src}
            alt={about.portrait.alt}
            width={about.portrait.width}
            height={about.portrait.height}
            loading="lazy"
            decoding="async"
            className="aspect-square w-full max-w-64 rounded-xl bg-frame object-cover outline-1 -outline-offset-1 outline-paper/10 md:col-span-4 md:max-w-none md:rounded-2xl lg:col-span-3"
          />
          <div className="mt-8 md:col-span-8 md:mt-0 lg:col-span-5">
            <p className="max-w-[30ch] text-figure leading-[1.25] font-medium text-pretty">{first}</p>
            {rest.map((line) => (
              <p key={line} className="mt-5 max-w-[46ch] text-body text-pretty text-dim">
                {line}
              </p>
            ))}
          </div>
          <div className="md:col-span-12 lg:col-span-8">
            <ToolDock />
          </div>
        </div>
      </div>
    </section>
  );
}
