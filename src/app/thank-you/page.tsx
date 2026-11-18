import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "You're Booked",
  description: "Your call with Grinscreen Digital is confirmed.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="pt-24">
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <span className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-brand/15 text-brand-bright shadow-[0_0_30px_-8px_var(--color-brand-glow)]">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m5 12 5 5 9-10" />
          </svg>
        </span>
        <h1
          className="mb-4 font-display font-bold text-fg"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05 }}
        >
          You&apos;re <span className="text-brand-bright">booked.</span>
        </h1>
        <p className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-fg-muted">
          Check your email for the confirmation and Google Meet link.
          We&apos;re looking forward to talking.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/portfolio"
            className="rounded-full bg-brand-bright px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-glow"
          >
            See Our Work
          </Link>
          <a
            href={site.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-7 py-3.5 font-medium text-fg transition-colors hover:border-brand-bright/50 hover:text-brand-bright"
          >
            Follow on Instagram
          </a>
        </div>
      </section>
    </div>
  );
}
