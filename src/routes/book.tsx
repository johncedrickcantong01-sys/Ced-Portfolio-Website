import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import type { Route } from "./+types/book";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { book, email, pageMeta } from "../content/site";

export const meta: Route.MetaFunction = () => pageMeta("/book/", book.title, book.description);

// "Pick a time" is a plain link to Calendly, so it works without JS. With JS,
// the click mounts Calendly inline instead; nothing loads from calendly.com
// before that click.
export default function Book() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLIFrameElement>(null);

  // The link goes away on click, so focus moves to the calendar.
  useEffect(() => {
    if (calendarOpen) calendarRef.current?.focus();
  }, [calendarOpen]);

  function openCalendar(event: MouseEvent<HTMLAnchorElement>) {
    // A new-tab click keeps the browser's own behaviour.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    setCalendarOpen(true);
  }

  return (
    <div className="flex min-h-screen w-full max-w-[100vw] flex-col overflow-x-clip">
      <Navbar />
      <main className="w-full max-w-full grow px-6 pt-16 font-text text-paper md:px-13 md:pt-24">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6">
            <h1 className="text-display font-medium">
              {/* "30-minute" stays on one line */}
              {book.heading.split(/(\S+-\S+)/).map((part, i) =>
                i % 2 ? (
                  <span key={part} className="whitespace-nowrap">
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}
            </h1>
            <p className="mt-10 text-body font-medium md:mt-14">{book.coverIntro}</p>
            <ul className="mt-4 border-t border-rule">
              {book.cover.map((item) => (
                <li key={item} className="border-b border-rule py-3 text-body text-pretty text-dim">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* The call's frame: Pick a time sits in it, and the calendar opens in the same place. */}
          <div className="flex flex-col lg:col-span-6">
            {/* No overflow clip: the calendar takes the corners itself, so its focus ring shows. */}
            <div className="flex min-h-56 flex-1 flex-col justify-end rounded-xl bg-frame outline-1 -outline-offset-1 outline-paper/10 md:rounded-2xl">
              {calendarOpen ? (
                <iframe ref={calendarRef} src={book.calendly} title={book.pickTime} className="focus-ring h-175 w-full rounded-[inherit] bg-paper" />
              ) : (
                <div className="p-4 md:p-10">
                  <a
                    href={book.calendly}
                    onClick={openCalendar}
                    className="focus-ring inline-flex min-h-12 items-center rounded-md bg-paper px-6 text-body font-medium text-bay transition-colors hover:bg-paper/85"
                  >
                    {book.pickTime}
                  </a>
                </div>
              )}
            </div>
            <p className="mt-6 text-small text-dim">
              {book.emailIntro}{" "}
              <a
                translate="no"
                href={`mailto:${email}`}
                className="focus-ring inline-flex min-h-8 items-center text-paper underline decoration-paper/40 underline-offset-4 transition-colors hover:decoration-paper"
              >
                {email}
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
