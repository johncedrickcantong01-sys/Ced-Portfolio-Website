import { data, Link } from "react-router";
import type { Route } from "./+types/work";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VideoFacade from "../components/VideoFacade";
import { bookCall, pageMeta, placeholder } from "../content/site";
import { caseDescription, caseStudy, caseTitle, work } from "../content/work";

// Runs at build time only (ssr: false): each work.ts slug is prerendered,
// any other slug is a 404 (on the host, public/404.html answers it).
export function loader({ params }: Route.LoaderArgs) {
  const i = work.findIndex((item) => item.slug === params.slug);
  if (i === -1) throw data(null, { status: 404 });
  return { item: work[i], next: work[(i + 1) % work.length] };
}

export const meta: Route.MetaFunction = ({ loaderData }) =>
  loaderData
    ? pageMeta(`/work/${loaderData.item.slug}/`, caseTitle(loaderData.item), caseDescription(loaderData.item))
    : [{ title: "Page not found | Ced Cantong" }];

// The deck's [placeholder] marker in dim, the rest as it is.
function Fill({ text }: { text: string }) {
  return text.split(/(\[placeholder\])/).map((part, i) =>
    part === placeholder ? (
      <span key={i} className="text-dim">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

// One case study: the ad in its frame first (on the left and sticky beside the
// text from 768 px; from 1024 px in the 4-column rail of the home sections),
// the title and the credits, then the long fields as rows with their label in
// a rail, like the Packages list; then the next case and Book a call.
export default function WorkPage({ loaderData }: Route.ComponentProps) {
  const { item, next } = loaderData;
  const credits = [
    [caseStudy.brand, item.brand],
    [caseStudy.stage, item.stage],
    [caseStudy.format, item.format],
    [caseStudy.year, item.year],
    [caseStudy.languages, item.languages],
    [caseStudy.days, item.days],
  ];
  const rows = [
    [caseStudy.brief, item.brief],
    [caseStudy.constraints, item.constraints],
    [caseStudy.process, item.process],
    [caseStudy.delivered, item.delivered],
    ...(item.result ? [[caseStudy.result, item.result]] : []),
  ];

  return (
    <div className="flex min-h-screen w-full max-w-[100vw] flex-col overflow-x-clip">
      <Navbar />
      <main className="w-full max-w-full grow px-6 pt-10 font-text text-paper md:px-13 md:pt-16">
        <article className="md:grid md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-5 lg:col-span-4">
            {/* Never taller than the screen under the header */}
            <div className="md:sticky md:top-[calc(var(--header-h)+1.5rem)] md:max-w-[calc((100svh_-_var(--header-h)_-_3rem)*9/16)]">
              <VideoFacade title={item.title} poster={item.poster} video={item.video} />
            </div>
          </div>

          <div className="mt-10 md:col-span-7 md:mt-0 lg:col-span-8">
            <h1 className="text-display font-medium text-balance wrap-break-word">
              <Fill text={item.title} />
            </h1>

            <dl className="mt-10 border-t border-rule pt-5 md:mt-14 lg:grid lg:grid-cols-8 lg:gap-x-6">
              {credits.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[7rem_1fr] items-baseline gap-x-4 py-1 lg:col-span-8 lg:grid-cols-subgrid lg:gap-x-6"
                >
                  <dt className="text-small text-dim lg:col-span-3">{label}</dt>
                  <dd className="text-body font-medium lg:col-span-5">
                    <Fill text={value} />
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 md:mt-16">
              {rows.map(([label, text]) => (
                <div
                  key={label}
                  className="border-t border-rule py-6 md:py-8 lg:grid lg:grid-cols-8 lg:items-baseline lg:gap-x-6"
                >
                  <h2 className="text-figure leading-[1.15] font-medium lg:col-span-3">{label}</h2>
                  <p className="mt-3 max-w-[56ch] text-body text-pretty lg:col-span-5 lg:mt-0">
                    <Fill text={text} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* The next case as a small card (frame and credits), then Book a call */}
        <section
          aria-labelledby="next-title"
          className="mt-24 border-t border-rule pt-6 md:mt-32 md:pt-8 lg:grid lg:grid-cols-12 lg:gap-x-6"
        >
          <h2 id="next-title" className="text-heading font-medium lg:col-span-4">
            {caseStudy.next}
          </h2>
          <div className="mt-8 lg:col-span-8 lg:mt-0">
            <Link
              to={`/work/${next.slug}`}
              className="group focus-ring flex max-w-xl items-end gap-5 rounded-xl md:rounded-2xl"
            >
              {next.poster ? (
                <img
                  src={next.poster}
                  alt=""
                  width={720}
                  height={1280}
                  loading="lazy"
                  decoding="async"
                  className="aspect-9/16 w-28 shrink-0 rounded-xl object-cover outline-1 -outline-offset-1 outline-paper/10 transition-[outline-color] group-hover:outline-paper/40 md:w-36 md:rounded-2xl"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="reel-placeholder relative aspect-9/16 w-28 shrink-0 overflow-hidden rounded-xl outline-1 -outline-offset-1 outline-paper/10 transition-[outline-color] group-hover:outline-paper/40 md:w-36 md:rounded-2xl"
                />
              )}
              <div className="min-w-0">
                <p className="text-small font-medium">{next.stage}</p>
                <p className="mt-3 text-figure leading-[1.15] font-medium text-balance wrap-break-word decoration-1 underline-offset-4 group-hover:underline">
                  <Fill text={next.title} />
                </p>
              </div>
            </Link>
            <Link
              to={bookCall.href}
              className="focus-ring mt-12 inline-flex min-h-12 items-center rounded-md bg-caption px-6 text-body font-medium text-bay transition-colors hover:bg-paper"
            >
              {bookCall.label}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
