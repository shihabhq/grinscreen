import type { Metadata } from "next";
import { statics } from "@/data/statics";
import { clients } from "@/data/clients";
import { reels } from "@/data/reels";
import { ReelTrack } from "@/components/portfolio/ReelTrack";
import { StaticsCarousel } from "@/components/portfolio/StaticsCarousel";
import { CaseStudies } from "@/components/portfolio/CaseStudies";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Reels, static designs, and clients  Grinscreen Digital's full portfolio of digital marketing work.",
};

export default function PortfolioPage() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-4">
            Now Showing
          </p>
          <h1
            className="font-display font-bold text-fg"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Don&apos;t just take
            <br />
            <span className="text-fg-muted">our word for it.</span>
          </h1>
        </Reveal>
      </section>

      {/* Reels */}
      <section className="pb-24">
        {/* Heading */}
        <div className="px-6 max-w-7xl mx-auto mb-10">
          <Reveal>
            <div className="flex items-end gap-4">
              <h2 className="font-display font-semibold text-fg text-2xl">
                Reels
               
              </h2>
              {/* Scroll hint — desktop only */}
              <span className="hidden md:flex items-center gap-1.5 font-mono text-xs text-fg-muted mb-0.5">
                scroll to explore
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true">
                  <path d="M5 1v14M1 10l4 5 4-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </Reveal>
        </div>

        {/* Horizontal track (desktop) / swipeable carousel (mobile) */}
        <ReelTrack />
      </section>

      {/* Static designs  multi-image auto-advancing carousel */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <Reveal>
            <h2 className="font-display font-semibold text-fg text-2xl">
              Static Designs
            </h2>
          </Reveal>
        </div>
        <StaticsCarousel />
      </section>

      {/* Case Studies */}
      <CaseStudies />

      {/* Client wall */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12">
            <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-4">
              Our Clients
            </p>
            <h2
              className="font-display font-bold text-fg"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              {clients.length}+ brands,
              <br />
              <span className="text-fg-muted">one goal.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
            {clients.map((client, i) => (
              <Reveal key={client.id} delay={Math.min(i * 0.03, 0.4)}>
                <div className="flex items-center justify-center p-3 rounded-xl bg-white/90 hover:bg-white transition-colors duration-200 group">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={120}
                    height={72}
                    className="max-h-14 w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-300"
                    unoptimized
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
