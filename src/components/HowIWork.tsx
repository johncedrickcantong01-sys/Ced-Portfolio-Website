import { howIWork, placeholder } from "../content/site";

// How I work: one ad's before and after as a strip of three joined frames
// (source, step, finished frame) with the intro beside it as the section's
// statement, then the five steps as segments on one track, like clips on a
// timeline.
export default function HowIWork() {
  return (
    <section
      id="how-i-work"
      aria-labelledby="how-i-work-title"
      className="px-6 pt-24 font-text text-paper md:px-13 md:pt-32"
    >
      <div className="border-t border-rule pt-6 md:pt-8 lg:grid lg:grid-cols-12 lg:gap-x-6">
        <h2 id="how-i-work-title" className="text-heading font-medium text-balance lg:col-span-12">
          {howIWork.heading}
        </h2>
        <p className="mt-6 max-w-[36ch] text-figure leading-[1.25] text-pretty lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:mt-0 lg:self-end">
          {howIWork.intro}
        </p>

        <div className="mt-12 grid grid-cols-3 gap-1 md:mt-16 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:mt-10">
          {howIWork.frames.map((label, i) => (
            <figure key={label}>
              <div
                aria-hidden="true"
                className={`reel-placeholder relative aspect-9/16 overflow-hidden outline-1 -outline-offset-1 outline-paper/10 ${
                  i === 0 ? "rounded-l-xl md:rounded-l-2xl" : ""
                } ${i === howIWork.frames.length - 1 ? "rounded-r-xl md:rounded-r-2xl" : ""}`}
              />
              <figcaption className="mt-3 pr-2 text-small">
                <span className="block font-medium text-paper">{label}</span>
                <span className="block text-dim">{placeholder}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <ol className="mt-16 md:mt-20 lg:col-span-12 lg:grid lg:grid-cols-5 lg:gap-x-6">
          {howIWork.steps.map((step, i) => (
            <li key={step.name} className="border-t border-rule py-6 md:grid md:grid-cols-12 md:gap-x-6 lg:block lg:pb-0">
              <h3 className="text-figure font-medium md:col-span-4">
                <span className="text-dim">{i + 1}</span> {step.name}
              </h3>
              <div className="mt-4 md:col-span-8 md:mt-0 lg:mt-5">
                <p className="max-w-[46ch] text-body text-pretty">{step.text}</p>
                <dl className="mt-4 text-small">
                  {step.approval && (
                    <div>
                      <dt className="inline font-medium">{howIWork.approvalLabel}:</dt>{" "}
                      <dd className="inline text-dim">{step.approval}</dd>
                    </div>
                  )}
                  <div className="mt-1">
                    <dt className="inline font-medium">{howIWork.daysLabel}:</dt>{" "}
                    <dd className="inline text-dim">{placeholder}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 border-t border-rule pt-6 md:mt-16 lg:col-span-12 lg:grid lg:grid-cols-12 lg:gap-x-6">
          <p className="text-figure font-medium lg:col-span-6">{howIWork.total}</p>
          <p className="mt-4 max-w-[60ch] text-small text-pretty text-dim lg:col-span-6 lg:mt-0">{howIWork.tools}</p>
        </div>
      </div>
    </section>
  );
}
