import { proof } from "../content/site";

// Under the frame, one line of credits per proof point: the figure, then its
// words on the same baseline. Same left edge as the header and the hero text.
export default function ProofStrip() {
  return (
    <section className="bg-bay font-text text-paper">
      <ul className="grid grid-cols-2 gap-x-6 gap-y-6 px-6 pt-8 pb-16 md:px-13 md:pt-10 lg:grid-cols-4 lg:gap-x-10">
        {proof.map((item) => (
          <li key={item.text}>
            <p className="text-small text-dim">
              <span className={`text-figure font-medium ${item.placeholder ? "" : "text-paper"}`}>{item.figure}</span>{" "}
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
