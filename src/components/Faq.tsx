import { faq, placeholder } from "../content/site";

// FAQ as plain text: every question and answer always shown, no accordion,
// no FAQ schema (findings D6).
export default function Faq() {
  return (
    <section aria-labelledby="faq-title" className="px-6 pt-24 font-text text-paper md:px-13 md:pt-32">
      <div className="border-t border-rule pt-6 md:pt-8 lg:grid lg:grid-cols-12 lg:gap-x-6">
        <h2 id="faq-title" className="text-heading font-medium lg:col-span-4">
          {faq.heading}
        </h2>
        <div className="mt-8 grid gap-y-10 md:grid-cols-2 md:gap-x-6 lg:col-span-8 lg:mt-0">
          {faq.items.map((item) => (
            <div key={item.question}>
              <h3 className="text-body font-medium text-pretty">{item.question}</h3>
              <p className="mt-2 max-w-[48ch] text-body text-pretty text-dim">
                {item.answerPlaceholder && <>{placeholder} </>}
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
