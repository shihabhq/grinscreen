"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string; // e.g. "54m+", "9.4m+", "25+", "360°"
  className?: string;
}

function parse(raw: string): { target: number; decimals: number; suffix: string } {
  // Extract leading number (int or float), rest is suffix
  const match = raw.match(/^([\d.]+)(.*)$/);
  if (!match) return { target: 0, decimals: 0, suffix: raw };
  const num = parseFloat(match[1]);
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  return { target: num, decimals, suffix: match[2] };
}

export function CountUp({ value, className }: CountUpProps) {
  const { target, decimals, suffix } = parse(value);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const duration = 1600;
        const startTime = performance.now();

        function tick(now: number) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(parseFloat((eased * target).toFixed(decimals)));
          if (progress < 1) requestAnimationFrame(tick);
          else setDisplay(target);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals]);

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.floor(display).toString();

  return (
    <span ref={ref} className={className}>
      {formatted}{suffix}
    </span>
  );
}
