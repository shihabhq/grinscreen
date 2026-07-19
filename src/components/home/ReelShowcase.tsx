"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "motion/react";
import { LazyVideo } from "@/components/media/LazyVideo";
import { Reveal } from "@/components/ui/Reveal";
import { reels } from "@/data/reels";
import Link from "next/link";

const showcaseReels = reels.slice(0, 6);

// ─── Controlled desktop card ──────────────────────────────────────────────────
// Play/pause is driven by the section-level IntersectionObserver so we can
// stagger starts and enforce the concurrency cap from one place.

function ShowcaseCard({
  reel,
  playing,
}: {
  reel: (typeof reels)[0];
  playing: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoActive, setVideoActive] = useState(false);

  // Ref callback: start immediately if already marked playing when element mounts
  const setVideoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node;
      if (node && playing) node.play().catch(() => {});
    },
    [playing],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) video.play().catch(() => {});
    else video.pause();
  }, [playing]);

  return (
    <div className="relative aspect-[9/16] overflow-hidden rounded-lg bg-surface">
      {/* Poster — always rendered; fades once video is decoding */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={reel.poster}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          videoActive ? "opacity-0" : "opacity-100"
        }`}
      />
      <video
        ref={setVideoRef}
        src={reel.src}
        muted
        playsInline
        loop
        preload="none"
        className="h-full w-full object-cover"
        onPlaying={() => setVideoActive(true)}
        onPause={() => setVideoActive(false)}
        aria-label={reel.title}
        disableRemotePlayback
      />
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ReelShowcase() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [playingIndices, setPlayingIndices] = useState<Set<number>>(new Set());

  // Mobile Embla — unchanged (only 1–2 reels visible at once, naturally capped)
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  useEffect(() => {
    if (prefersReduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger-start all reels 800 ms apart.
          // This spreads the download/decode load over time instead of
          // hammering the network with N simultaneous requests.
          timerRefs.current.forEach(clearTimeout);
          timerRefs.current = [];

          for (let i = 0; i < showcaseReels.length; i++) {
            const idx = i;
            timerRefs.current.push(
              setTimeout(() => {
                setPlayingIndices((prev) => new Set([...prev, idx]));
              }, idx * 800),
            );
          }
        } else {
          // Section left the viewport — kill all timers and pause every decoder
          timerRefs.current.forEach(clearTimeout);
          timerRefs.current = [];
          setPlayingIndices(new Set());
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      timerRefs.current.forEach(clearTimeout);
    };
  }, [prefersReduced]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-4">
              Our Work
            </p>
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

      {/* Mobile: horizontal swipeable carousel — LazyVideo is fine here since
          only 1–2 reels are visible at once (naturally capped by Embla) */}
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
          <div className="flex-none w-6" />
        </div>
      </div>

      {/* Desktop: 6-column grid with section-level concurrency control */}
      <div className="hidden md:grid md:grid-cols-6 gap-3 max-w-7xl mx-auto px-6">
        {showcaseReels.map((reel, i) => (
          <Reveal key={reel.id} delay={i * 0.07}>
            {prefersReduced ? (
              // Reduced motion: static poster only, no decoder at all
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={reel.poster}
                alt={reel.title}
                className="w-full aspect-[9/16] object-cover rounded-lg"
              />
            ) : (
              <ShowcaseCard reel={reel} playing={playingIndices.has(i)} />
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
