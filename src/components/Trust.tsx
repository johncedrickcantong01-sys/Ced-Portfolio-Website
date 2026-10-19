import { placeholder, trust } from "../content/site";

// Rights and trust: written but not confirmed by Ced, so the heading is the
// placeholder marker and each line starts with it.
export default function Trust() {
  return (
    <section aria-labelledby="trust-title" className="px-6 pt-24 font-text text-paper md:px-13 md:pt-32">
      <div className="border-t border-rule pt-6 md:pt-8 lg:grid lg:grid-cols-12 lg:gap-x-6">
        <h2 id="trust-title" className="text-heading font-medium text-dim lg:col-span-4">
          {trust.heading}
        </h2>
        <ul className="mt-8 grid gap-y-5 md:grid-cols-2 md:gap-x-6 lg:col-span-8 lg:mt-0">
          {trust.lines.map((line) => (
            <li key={line} className="max-w-[40ch] text-body text-pretty">
              <span className="text-dim">{placeholder}</span> {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
