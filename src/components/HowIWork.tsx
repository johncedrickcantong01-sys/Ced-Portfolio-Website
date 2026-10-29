import { howIWork } from "../content/site";
import DraftCompare from "./DraftCompare";

// How I work: one ad from its 3D draft to the finished cut in a 9:16 frame
// with a drag line, held beside the intro and the five steps while they
// scroll past (from 1024 px), then the timeline and the tools.
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

        <div className="mt-10 max-w-sm md:mt-12 lg:sticky lg:top-24 lg:col-span-5 lg:mt-10 lg:max-w-[min(100%,calc((100svh-13rem)*9/16))] lg:self-start">
          <DraftCompare />
        </div>

        <div className="mt-12 lg:col-span-6 lg:col-start-7 lg:mt-10">
          <p className="max-w-[36ch] text-figure leading-[1.25] text-pretty">{howIWork.intro}</p>

          <ol className="mt-10 md:mt-12">
            {howIWork.steps.map((step, i) => (
              <li key={step.name} className="border-t border-rule py-6 md:grid md:grid-cols-6 md:gap-x-6">
                <h3 className="text-figure font-medium md:col-span-2">
                  <span className="text-dim">{i + 1}</span> {step.name}
                </h3>
                <div className="mt-4 md:col-span-4 md:mt-0">
                  <p className="max-w-[46ch] text-body text-pretty">{step.text}</p>
                  {step.approval && (
                    <p className="mt-4 text-small">
                      <span className="font-medium">{howIWork.approvalLabel}:</span>{" "}
                      <span className="text-dim">{step.approval}</span>
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div className="border-t border-rule pt-6">
            <p className="text-figure font-medium">{howIWork.total}</p>
            <p className="mt-4 max-w-[60ch] text-small text-pretty text-dim">{howIWork.tools}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
