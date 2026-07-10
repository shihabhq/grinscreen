"use client";

import useEmblaCarousel from "embla-carousel-react";
import { LazyVideo } from "@/components/media/LazyVideo";
import { reels } from "@/data/reels";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

const showcaseReels = reels.slice(0, 6);

export function ReelShowcase() {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-4">Our Work</p>
            <h2
              className="font-display font-bold text-fg"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Reels that move people.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="shrink-0 px-6 py-3 rounded-full border border-border text-fg-muted text-sm font-medium hover:border-brand-bright/50 hover:text-brand-bright transition-colors duration-200"
          >
            View All Work →
          </Link>
        </Reveal>
      </div>

      {/* Mobile: horizontal swipeable carousel (1 reel + peek of next) */}
      <div className="md:hidden overflow-hidden pl-6" ref={emblaRef}>
        <div className="flex gap-3">
          {showcaseReels.map((reel) => (
            <div
              key={reel.id}
              className="flex-none rounded-lg overflow-hidden"
              style={{ width: "72vw" }}
            >
              <LazyVideo src={reel.src} poster={reel.poster} title={reel.title} />
            </div>
          ))}
          {/* Trailing spacer so last card doesn't sit flush */}
          <div className="flex-none w-6" />
        </div>
      </div>

      {/* Desktop: 6-column grid */}
      <div className="hidden md:grid md:grid-cols-6 gap-3 max-w-7xl mx-auto px-6">
        {showcaseReels.map((reel, i) => (
          <Reveal key={reel.id} delay={i * 0.07}>
            <div className="rounded-lg overflow-hidden">
              <LazyVideo src={reel.src} poster={reel.poster} title={reel.title} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
