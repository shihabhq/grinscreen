"use client";

import type { MouseEvent, ReactNode } from "react";
import { services } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";

const svg = (children: ReactNode) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const icons: Record<string, ReactNode> = {
  // pen nib / identity
  "brand-identity": svg(
    <>
      <path d="m12 3 7 7-7 11L5 10l7-7z" />
      <path d="M12 3v8" />
      <circle cx="12" cy="13" r="1.6" />
    </>,
  ),
  // bars + trend
  "paid-marketing": svg(
    <>
      <path d="M4 20V11M10 20V6M16 20v-6M22 20H2" />
      <path d="m14 5 3-2 3 2" />
      <path d="M17 3v6" />
    </>,
  ),
  // target
  "campaign-planning": svg(
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <path d="m16 8 5-5" />
    </>,
  ),
  // play
  "visual-storytelling": svg(
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="m10 9 5 3-5 3V9z" fill="currentColor" />
    </>,
  ),
  // calendar / management
  "social-media-management": svg(
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M8 3v4M16 3v4M3 10h18" />
      <path d="m9 15 2 2 4-4" />
    </>,
  ),
  // people
  "influencer-community": svg(
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M16 14.2c2.8-.3 5 1.7 5 4.8" />
    </>,
  ),
};

function spotlight(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function Services() {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* soft ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[480px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-deep), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <Reveal>
          <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-4">
            What We Do
          </p>
          <h2
            className="font-display font-bold text-fg mb-14 max-w-3xl"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1.05 }}
          >
            One team. Every move
            <br />
            <span className="text-fg-muted">your brand needs.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.07} className="h-full">
              <article
                onMouseMove={spotlight}
                className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-7 md:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-bright/50"
              >
                {/* cursor spotlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(320px circle at var(--mx, 50%) var(--my, 0%), rgba(43,232,98,0.14), transparent 70%)",
                  }}
                />

                {/* index number */}
                <span className="absolute right-6 top-5 font-mono text-xs tracking-widest text-fg-muted/50 transition-colors duration-300 group-hover:text-brand-bright">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative">
                  <span className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-bright/20 bg-brand/10 text-brand-bright shadow-[0_0_30px_-8px_var(--color-brand-glow)] transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_0_36px_-4px_var(--color-brand-glow)]">
                    {icons[service.id]}
                  </span>

                  <h3 className="font-display font-bold text-fg text-2xl leading-tight mb-1.5">
                    {service.title}
                  </h3>
                  <p className="font-display font-medium text-brand-bright text-base mb-4">
                    {service.tagline}
                  </p>
                  <p className="text-fg-muted text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* bottom accent line */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-brand-bright to-brand-glow transition-all duration-500 group-hover:w-full"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
