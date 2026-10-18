import { proof } from "../content/site";

// Each proof point reads as one line of credits: the figure in the title face,
// the words after it on the same baseline.
export default function ProofStrip() {
  return (
    <section className="bg-bay font-text text-paper">
      <ul className="mx-auto grid max-w-[1440px] gap-x-12 px-5 pt-8 pb-12 md:grid-cols-2 md:px-12 lg:grid-cols-4">
        {proof.map((item) => (
          <li key={item.text} className="border-t border-rule pt-4 pb-6">
            <p className="text-body text-dim">
              <span className={`font-title text-figure ${item.placeholder ? "" : "text-paper"}`}>{item.figure}</span>{" "}
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
