"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { reels } from "@/data/reels";

// Reels to cycle through in the hero background
const heroReels = [
  reels.find((r) => r.id === "outlet-opening")!,
  reels.find((r) => r.id === "food")!,
  reels.find((r) => r.id === "zuhrah")!,
  reels.find((r) => r.id === "ambience")!,
  reels.find((r) => r.id === "aug-reel")!,
].filter(Boolean);

const CYCLE_INTERVAL = 8000; // 8 seconds per reel

export function Hero() {
  const prefersReduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadingIndex, setFadingIndex] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (prefersReduced) return;

    // Pre-load all hero videos
    videoRefs.current.forEach((v) => {
      if (v) {
        v.load();
        v.play().catch(() => {});
      }
    });

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % heroReels.length;
        setFadingIndex(prev);
        setTimeout(() => setFadingIndex(null), 1000);
        // Ensure next video is playing
        const nextVideo = videoRefs.current[next];
        if (nextVideo) nextVideo.play().catch(() => {});
        return next;
      });
    }, CYCLE_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [prefersReduced]);

  return (
    <section className="relative min-h-dvh flex items-center overflow-hidden">
      {/* Background reel slideshow */}
      <div className="absolute inset-0 z-0">
        {heroReels.map((reel, i) => (
          <video
            key={reel.id}
            ref={(el) => { videoRefs.current[i] = el; }}
            src={reel.src}
            poster={reel.poster}
            muted
            playsInline
            loop
            preload={i === 0 ? "auto" : "none"}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{
              opacity:
                i === activeIndex
                  ? 0.45
                  : i === fadingIndex
                  ? 0
                  : 0,
              zIndex: i === activeIndex ? 1 : i === fadingIndex ? 0 : -1,
            }}
          />
        ))}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-bg/60 via-bg/30 to-bg" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-bg/80 via-transparent to-bg/80" />
      </div>

      {/* Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none z-10"
        style={{ background: "radial-gradient(circle, #16C138 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="max-w-3xl">
          <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-6">
            360° Digital Marketing Agency
          </p>
          <h1
            className="font-display font-bold text-fg leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
          >
            Reels that rack up{" "}
            <span className="text-brand-bright">millions</span>{" "}
            of views.
          </h1>
          <p className="text-fg-muted text-lg md:text-xl leading-relaxed max-w-xl mb-10">
            From viral short-form video to full-service brand management — we build digital presences that demand attention.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-full bg-brand-bright text-white font-semibold text-base hover:bg-brand-glow transition-colors duration-200"
            >
              Start a Project
            </Link>
            <Link
              href="/portfolio"
              className="px-7 py-3.5 rounded-full border border-border text-fg text-base font-medium hover:border-brand-bright/50 hover:text-brand-bright transition-colors duration-200"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </div>

      {/* Reel dots indicator */}
      {!prefersReduced && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroReels.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: i === activeIndex ? "#16C138" : "rgba(255,255,255,0.3)",
                width: i === activeIndex ? "1.5rem" : "0.375rem",
              }}
              aria-label={`Show reel ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50">
        <span className="font-mono text-xs text-fg-muted uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-brand-bright to-transparent" />
      </div>
    </section>
  );
}
