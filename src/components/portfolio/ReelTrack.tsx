"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { LazyVideo } from "@/components/media/LazyVideo";
import { reels, type Reel } from "@/data/reels";

// ─── Desktop reel card ────────────────────────────────────────────────────────
// `mounted`  controls whether the <video> element exists in the DOM at all.
// `playing`  controls whether it is currently playing.
//
// IntersectionObserver cannot track CSS-transformed positions, so both flags
// are driven by the parent using getBoundingClientRect() (which DOES honour
// transforms) on every scroll tick.

interface DesktopReelCardProps {
  reel: Reel;
  /** Whether the <video> element should exist in the DOM (lazy-mount). */
  mounted: boolean;
  /** Whether the video should be playing right now. */
  playing: boolean;
  onClick: () => void;
  setRef: (el: HTMLButtonElement | null) => void;
}

function DesktopReelCard({
  reel,
  mounted,
  playing,
  onClick,
  setRef,
}: DesktopReelCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Track whether the video element is actively decoding so we can hide the poster
  const [videoActive, setVideoActive] = useState(false);

  // Ref callback: if the video element mounts while playing=true, start immediately.
  // A plain useRef + useEffect([playing]) would miss this because the effect
  // fires before the element is attached.
  const setVideoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node;
      if (node && playing) {
        node.play().catch(() => {});
      }
    },
    [playing],
  );

  // Sync play / pause when the playing prop changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [playing]);

  // Clear active state when the video element is unmounted so the poster
  // reappears if the card re-mounts later
  useEffect(() => {
    if (!mounted) setVideoActive(false);
  }, [mounted]);

  return (
    <button
      ref={setRef}
      onClick={onClick}
      className="group relative block flex-none cursor-pointer overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-glow"
      style={{ width: "clamp(200px, 20vw, 300px)" }}
      aria-label={`View ${reel.title}${reel.client ? ` – ${reel.client}` : ""} in fullscreen`}
    >
      <div className="relative aspect-[9/16] overflow-hidden bg-surface">
        {/* Poster — always present; fades out only while video is decoding */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={reel.poster}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            mounted && videoActive ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Video element — only mounted when this card is near the viewport.
            Unmounting frees the decoder and cancels any in-flight download. */}
        {mounted && (
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
        )}
      </div>

      {/* Hover: dark veil */}
      <div className="pointer-events-none absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Hover: title strip */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="truncate font-mono text-xs text-white">{reel.title}</p>
        {reel.client && (
          <p className="font-mono text-xs text-white/55">{reel.client}</p>
        )}
      </div>

      {/* Hover: expand icon */}
      <div className="pointer-events-none absolute right-3 top-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8.5 1H12v3.5M4.5 12H1V8.5M12 1l-5 5M1 12l5-5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

// How many videos play at the same time at most.
// Cards closest to the viewport centre are preferred.
const MAX_CONCURRENT = 3;

// Cards within this many pixels beyond the viewport edge get their <video>
// element mounted (lazy pre-load buffer).
const MOUNT_MARGIN = 400;

export function ReelTrack() {
  const prefersReduced = useReducedMotion();
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);

  // Desktop scroll-jacking ───────────────────────────────────────────────────
  const driverRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [travelDistance, setTravelDistance] = useState(3000);

  useEffect(() => {
    if (prefersReduced) return;
    const calculate = () => {
      if (!stripRef.current) return;
      const travel = Math.max(
        0,
        stripRef.current.scrollWidth - window.innerWidth,
      );
      setTravelDistance(travel);
    };
    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, [prefersReduced]);

  const { scrollYProgress } = useScroll({
    target: driverRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -travelDistance]);

  // mounted: Set of card indices whose <video> elements exist in the DOM.
  //   — Cards within MOUNT_MARGIN px of the viewport get a <video> element.
  //   — Cards further away get unmounted to free decoder memory & stop downloads.
  // playing: Set of up to MAX_CONCURRENT indices, chosen by proximity to centre.
  const [mountedIndices, setMountedIndices] = useState<Set<number>>(
    () => new Set([0, 1, 2, 3, 4, 5]),
  );
  const [playingIndices, setPlayingIndices] = useState<Set<number>>(
    () => new Set([0, 1, 2]),
  );

  const updateVisibility = useCallback(() => {
    if (prefersReduced) return;

    const vw = window.innerWidth;
    const centre = vw / 2;

    const nextMounted = new Set<number>();
    const visible: Array<{ index: number; distFromCentre: number }> = [];

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const { left, right } = card.getBoundingClientRect();

      // Mount if within MOUNT_MARGIN px of the viewport edges
      if (right > -MOUNT_MARGIN && left < vw + MOUNT_MARGIN) {
        nextMounted.add(i);
      }

      // Track cards that are substantially visible for play selection
      if (right > 30 && left < vw - 30) {
        const cardCentre = (left + right) / 2;
        visible.push({ index: i, distFromCentre: Math.abs(cardCentre - centre) });
      }
    });

    // Sort visible cards by distance from viewport centre; play the closest N
    visible.sort((a, b) => a.distFromCentre - b.distFromCentre);
    const nextPlaying = new Set(
      visible.slice(0, MAX_CONCURRENT).map((v) => v.index),
    );

    setMountedIndices(nextMounted);
    setPlayingIndices(nextPlaying);
  }, [prefersReduced]);

  useMotionValueEvent(x, "change", updateVisibility);

  // Initial visibility pass after mount and after travelDistance is measured
  useEffect(() => {
    updateVisibility();
  }, [updateVisibility, travelDistance]);

  // Pause all desktop videos while lightbox is open; restore on close
  useEffect(() => {
    if (selectedReel) {
      setPlayingIndices(new Set());
    } else {
      updateVisibility();
    }
  }, [selectedReel, updateVisibility]);

  // Mobile Embla carousel ────────────────────────────────────────────────────
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  // Lightbox ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedReel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const video = lightboxVideoRef.current;
    if (!video) return;
    if (selectedReel) {
      video.load();
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [selectedReel]);

  useEffect(() => {
    document.body.style.overflow = selectedReel ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedReel]);

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Desktop ──────────────────────────────────────────────────────── */}

      {prefersReduced ? (
        // Reduced motion: plain overflow-x scroll, no scroll-jacking
        <div className="no-scrollbar hidden overflow-x-auto pl-6 md:block">
          <div className="flex gap-3 pb-4">
            {reels.map((reel) => (
              <button
                key={reel.id}
                className="relative block flex-none overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-glow"
                style={{ width: "clamp(200px, 20vw, 300px)" }}
                onClick={() => setSelectedReel(reel)}
                aria-label={`View ${reel.title}`}
              >
                <LazyVideo
                  src={reel.src}
                  poster={reel.poster}
                  title={reel.title}
                />
              </button>
            ))}
            <div className="flex-none w-6" />
          </div>
        </div>
      ) : (
        // Sticky scroll-jacked horizontal section.
        // Driver height = 100vh + travel distance so scrolling through it
        // reveals all reels before the page continues to the next section.
        <div
          ref={driverRef}
          className="relative hidden md:block"
          style={{ height: `calc(100vh + ${travelDistance}px)` }}
          aria-label="Reel showcase — scroll to explore"
        >
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <motion.div
              ref={stripRef}
              style={{ x }}
              className="flex gap-3 pl-6"
            >
              {reels.map((reel, i) => (
                <DesktopReelCard
                  key={reel.id}
                  reel={reel}
                  mounted={mountedIndices.has(i)}
                  playing={playingIndices.has(i)}
                  onClick={() => setSelectedReel(reel)}
                  setRef={(el) => {
                    cardRefs.current[i] = el;
                  }}
                />
              ))}
              <div className="flex-none w-6" />
            </motion.div>
          </div>
        </div>
      )}

      {/* ── Mobile: swipeable Embla carousel — unchanged ─────────────────── */}
      <div className="overflow-hidden pl-6 md:hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {reels.map((reel) => (
            <button
              key={reel.id}
              className="relative block flex-none overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-glow"
              style={{ width: "66vw" }}
              onClick={() => setSelectedReel(reel)}
              aria-label={`View ${reel.title}`}
            >
              <LazyVideo
                src={reel.src}
                poster={reel.poster}
                title={reel.title}
              />
            </button>
          ))}
          <div className="flex-none w-6" />
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={() => setSelectedReel(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative w-full max-w-[390px]"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={() => setSelectedReel(null)}
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Close lightbox"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 2l12 12M14 2L2 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <video
                ref={lightboxVideoRef}
                src={selectedReel.src}
                poster={selectedReel.poster}
                muted
                playsInline
                loop
                preload="auto"
                controls
                className="w-full aspect-[9/16] rounded-2xl object-cover"
                aria-label={selectedReel.title}
                disableRemotePlayback
              />

              <div className="mt-3">
                <p className="font-display font-semibold text-white text-sm">
                  {selectedReel.title}
                </p>
                {selectedReel.client && (
                  <p className="mt-0.5 font-mono text-xs text-white/50">
                    {selectedReel.client}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
