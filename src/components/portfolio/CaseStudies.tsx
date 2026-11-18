"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { LazyVideo } from "@/components/media/LazyVideo";

/* ─── Types ──────────────────────────────────────────────────── */

type Stat = {
  value: string;
  label: string;
  sub?: string;
};

type CaseStudy = {
  id: string;
  eyebrow: string;
  brand: string;
  logo: { src: string; alt: string };
  tagline: string;
  description: string;
  campaign: string;
  duration: string;
  pillars: string[];
  /** Heading above the pillars list (defaults to "The Strategy"). */
  pillarsTitle?: string;
  problem?: string;
  idea?: string;
  community?: string;
  stats: Stat[];
  insight: string;
  /** Visual strip shown beside the numbers. Swap files here to change it. */
  visuals: Visual[];
};

type Visual =
  | { kind: "image"; src: string; alt: string }
  | { kind: "reel"; src: string; poster: string; alt: string };

/* ─── Data ───────────────────────────────────────────────────── */

const caseStudies: CaseStudy[] = [
  {
    id: "arabika",
    eyebrow: "Case Study 01",
    brand: "Arabika",
    logo: { src: "/clients/arabika-coffee.png", alt: "Arabika Coffee" },
    tagline: "For the Campus,\nBy the Campus.",
    description:
      "Few students knew Arabika Campus existed. We gave it a face, a voice, and a student crowd. Now it's where everyone meets.",
    campaign: "Arabika Campus x GrinScreen",
    duration: "11 Months",
    problem:
      "Students didn't know Campus was there. And they thought Arabika was too expensive for them.",
    idea: "Students skip ads. They watch their friends.",
    pillarsTitle: "What We Did",
    pillars: [
      "Put real BRAC students on camera",
      "Used student jokes and student language",
      "Showed the low student prices clearly",
      "Posted every week, from day one",
    ],
    community:
      "Customers became creators. Creators became regulars. Regulars brought their friends.",
    stats: [
      { value: "60M+", label: "Total Views", sub: "across Facebook & Instagram" },
      { value: "300K+", label: "Interactions", sub: "likes, comments & shares" },
      { value: "$0", label: "Ad Spend", sub: "100% organic" },
      { value: "11", label: "Months", sub: "of posting non-stop" },
    ],
    insight: "60M views. Zero ad spend. Friends beat ads.",
    visuals: [
      { kind: "reel", src: "/reels/reel-1-2.mp4", poster: "/reels/posters/reel-1-2.jpg", alt: "Arabika campus reel" },
      { kind: "reel", src: "/reels/reel-1.mp4", poster: "/reels/posters/reel-1.jpg", alt: "Arabika coffee reel" },
      { kind: "reel", src: "/reels/ambience.mp4", poster: "/reels/posters/ambience.jpg", alt: "Arabika ambience reel" },
    ],
  },
  {
    id: "wooking",
    eyebrow: "Case Study 02",
    brand: "Wooking Street",
    logo: { src: "/clients/ws.png", alt: "Wooking Street" },
    tagline: "Valentine's Day\nOutburst.",
    description:
      "With a warm, engaged audience already in place, we activated hard on Valentine's Day — turning months of relationship-building into a single high-conversion moment that nearly doubled the sales target.",
    campaign: "Valentine's Day Outburst",
    duration: "Seasonal Activation",
    pillars: [
      "Setting the Tone — priming the audience weeks before the date",
      "Memes & Reels for Engagement — viral-first content that spread organically",
      "Value Proposition to an Already-Engaged Audience — converting followers into buyers",
    ],
    stats: [
      { value: "123K", label: "Actual Sales", sub: "on Valentine's Day" },
      { value: "~2×", label: "Target Exceeded", sub: "nearly doubled expectations" },
      { value: "60–70K", label: "Original Target", sub: "set before launch" },
      { value: "75%+", label: "Over Upper Bound", sub: "above ceiling estimate" },
    ],
    insight:
      "Sales nearly doubled because the audience was already warm. The activation didn't need to create demand — it just needed to capture it.",
    visuals: [
      { kind: "image", src: "/statics/wooking-2.webp", alt: "Wooking Street static: the only +2 I will accept" },
      { kind: "image", src: "/statics/wooking-3.webp", alt: "Wooking Street static: Woking Street chat" },
      { kind: "image", src: "/statics/wooking-4.webp", alt: "Wooking Street static: appetizer platter" },
    ],
  },
];

/* ─── Stat card ─────────────────────────────────────────────── */

function StatCard({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="p-5 rounded-xl border border-border bg-surface"
    >
      <p
        className="font-display font-bold text-brand-bright leading-none mb-2"
        style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}
      >
        {stat.value}
      </p>
      <p className="font-semibold text-fg text-sm leading-snug">{stat.label}</p>
      {stat.sub && (
        <p className="font-mono text-fg-muted text-xs mt-1 leading-snug">{stat.sub}</p>
      )}
    </motion.div>
  );
}

/* ─── Visual strip ──────────────────────────────────────────── */

function VisualStrip({ visuals, inView }: { visuals: Visual[]; inView: boolean }) {
  const tilt = ["-rotate-2", "", "rotate-2"];
  const lift = ["mt-4", "-mt-2", "mt-4"];
  return (
    <div className="relative mb-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 inset-y-6 rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(closest-side, var(--color-brand), transparent)" }}
      />
      <div className="relative grid grid-cols-3 gap-3 sm:gap-4">
        {visuals.map((v, i) => (
          <motion.div
            key={v.src}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`${lift[i % 3]}`}
          >
            <div
              className={`${tilt[i % 3]} overflow-hidden rounded-xl border border-border bg-surface shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] transition-all duration-500 hover:rotate-0 hover:scale-[1.04] hover:border-brand-bright/50`}
            >
              {v.kind === "reel" ? (
                <LazyVideo src={v.src} poster={v.poster} title={v.alt} />
              ) : (
                <div className="relative aspect-[4/5]">
                  <Image
                    src={v.src}
                    alt={v.alt}
                    fill
                    sizes="(min-width: 1024px) 18vw, 30vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Case study block ──────────────────────────────────────── */

function CaseStudyBlock({ cs }: { cs: CaseStudy }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">

        {/* ── header row ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-14">
          <motion.p
            className="font-mono text-brand-bright text-xs uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            {cs.eyebrow}
          </motion.p>

          {/* Logo chip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border bg-surface w-fit"
          >
            <div className="bg-white rounded-lg px-2 py-1">
              <Image
                src={cs.logo.src}
                alt={cs.logo.alt}
                width={100}
                height={40}
                className="h-8 w-auto object-contain"
                unoptimized
              />
            </div>
            <span className="font-mono text-fg-muted text-xs">{cs.brand}</span>
          </motion.div>
        </div>

        {/* ── main two-column grid ── */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left column: copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3
              className="font-display font-bold text-fg leading-[1.1] mb-6 whitespace-pre-line"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}
            >
              {cs.tagline}
            </h3>

            <p className="text-fg-muted leading-relaxed mb-10 max-w-md text-[15px]">
              {cs.description}
            </p>

            {/* Campaign meta */}
            <div className="flex flex-wrap gap-6 mb-12">
              <div>
                <p className="font-mono text-xs text-fg-muted uppercase tracking-widest mb-1">Campaign</p>
                <p className="text-fg text-sm font-medium">{cs.campaign}</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="font-mono text-xs text-fg-muted uppercase tracking-widest mb-1">Duration</p>
                <p className="text-fg text-sm font-medium">{cs.duration}</p>
              </div>
            </div>

            {/* Problem / Idea */}
            {(cs.problem || cs.idea) && (
              <div className="mb-12 grid gap-8 sm:grid-cols-2">
                {cs.problem && (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-brand-bright mb-3">
                      The Problem
                    </p>
                    <p className="text-fg-muted text-sm leading-relaxed">{cs.problem}</p>
                  </div>
                )}
                {cs.idea && (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-brand-bright mb-3">
                      The Idea
                    </p>
                    <p className="text-fg-muted text-sm leading-relaxed">{cs.idea}</p>
                  </div>
                )}
              </div>
            )}

            {/* Strategy pillars */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-5">
                {cs.pillarsTitle ?? "The Strategy"}
              </p>
              <ol className="space-y-4">
                {cs.pillars.map((pillar, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.45,
                      delay: 0.3 + i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex gap-4 items-start border-t border-border pt-4"
                  >
                    <span className="font-mono text-brand-bright text-xs shrink-0 pt-0.5 w-5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-fg-muted text-sm leading-relaxed">
                      {pillar}
                    </span>
                  </motion.li>
                ))}
              </ol>
            </div>

            {cs.community && (
              <div className="mt-12">
                <p className="font-mono text-xs uppercase tracking-widest text-brand-bright mb-3">
                  The Community
                </p>
                <p className="text-fg text-sm leading-relaxed">{cs.community}</p>
              </div>
            )}
          </motion.div>

          {/* Right column: numbers */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <VisualStrip visuals={cs.visuals} inView={inView} />

            <p className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-5">
              The Numbers
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {cs.stats.map((stat, i) => (
                <StatCard key={i} stat={stat} delay={0.25 + i * 0.07} />
              ))}
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-fg-muted text-sm leading-relaxed">
                &ldquo;{cs.insight}&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────── */

export function CaseStudies() {
  return (
    <section className="bg-bg">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-5">
            Proven Impact
          </p>
          <h2
            className="font-display font-bold text-fg leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Results that
            <br />
            <span className="text-fg-muted">don&apos;t lie.</span>
          </h2>
          <p className="mt-5 text-fg-muted max-w-lg leading-relaxed text-[15px]">
            Behind every reel is a strategy. Here&apos;s how we turned content
            into measurable growth for two of our clients.
          </p>
        </motion.div>
      </div>

      {caseStudies.map((cs) => (
        <CaseStudyBlock key={cs.id} cs={cs} />
      ))}
    </section>
  );
}
