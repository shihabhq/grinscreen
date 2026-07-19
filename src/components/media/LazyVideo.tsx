"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useReducedMotion } from "motion/react";
import { clsx } from "clsx";

// No concurrent cap  all visible reels autoplay

interface LazyVideoProps {
  src: string;
  poster: string;
  className?: string;
  /** If true, mount the video element immediately (e.g. hero). */
  priority?: boolean;
  title?: string;
}

export function LazyVideo({
  src,
  poster,
  className,
  priority = false,
  title,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // shouldPlay tracks IntersectionObserver intent so the ref callback can fire it
  const shouldPlayRef = useRef(false);
  const [mounted, setMounted] = useState(priority);
  const [playing, setPlaying] = useState(false);
  const prefersReduced = useReducedMotion();

  const tryPlay = useCallback(
    async (video: HTMLVideoElement) => {
      if (prefersReduced) return;
      try {
        await video.play();
      } catch {
        // Autoplay blocked  poster stays visible
      }
    },
    [prefersReduced],
  );

  const doPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) video.pause();
    setPlaying(false);
  }, []);

  // Ref callback: fires when video element mounts/unmounts.
  // If shouldPlay is set (observer already fired), attempt play immediately.
  const setVideoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      (videoRef as React.MutableRefObject<HTMLVideoElement | null>).current =
        node;
      if (node && shouldPlayRef.current) {
        tryPlay(node);
      }
    },
    [tryPlay],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            shouldPlayRef.current = true;
            setMounted(true);
            // If video element already mounted (priority=true), play now
            if (videoRef.current) {
              tryPlay(videoRef.current);
            }
          } else {
            shouldPlayRef.current = false;
            doPause();
          }
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [tryPlay, doPause]);

  // Reduced motion: show poster + play button overlay
  if (prefersReduced) {
    return (
      <div
        ref={containerRef}
        className={clsx(
          "relative overflow-hidden aspect-[9/16] bg-surface",
          className,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt={title ?? "Video poster"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-14 h-14 rounded-full bg-bg/70 backdrop-blur-sm flex items-center justify-center text-fg text-xl">
            ▶
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative overflow-hidden aspect-[9/16] bg-surface",
        className,
      )}
    >
      {/* Poster shown until video is playing */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={title ?? ""}
        className={clsx(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
          playing ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
        aria-hidden={playing}
      />
      {mounted && (
        <video
          ref={setVideoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          loop
          preload="none"
          className="w-full h-full object-cover"
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          aria-label={title}
          disableRemotePlayback
        />
      )}
    </div>
  );
}
