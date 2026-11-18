import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { CalendlyEmbed } from "@/components/book/CalendlyEmbed";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Book a Call",
  description:
    "Book a free 30-minute call with GrinScreen. Pick a time that suits you and talk reels, campaigns, ads and brand growth with our Bangladesh team.",
  path: "/book",
});

export default function BookPage() {
  return (
    <div className="pt-24">
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-brand-bright">
            Book a Call
          </p>
          <h1
            className="mb-5 font-display font-bold text-fg"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Let&apos;s talk about
            <br />
            <span className="text-brand-bright">your brand.</span>
          </h1>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-fg-muted">
            Pick a time that works for you. It&apos;s a free 30-minute call, and
            we&apos;ll send a Google Meet link as soon as you book.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <CalendlyEmbed />
        </Reveal>

        <p className="mt-6 text-sm text-fg-muted">
          Calendar not loading?{" "}
          <a
            href={site.booking.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-bright underline-offset-4 hover:underline"
          >
            Open the booking page
          </a>{" "}
          or email{" "}
          <a
            href={`mailto:${site.contact.email}`}
            className="text-brand-bright underline-offset-4 hover:underline"
          >
            {site.contact.email}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
