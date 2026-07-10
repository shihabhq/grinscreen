import Link from "next/link";
import { reels } from "@/data/reels";

export function Hero() {
  const heroReel = reels[0]; // outlet-opening — most impactful

  return (
    <section className="relative min-h-dvh flex items-center overflow-hidden">
      {/* Background reel */}
      <div className="absolute inset-0 z-0">
        <video
          src={heroReel.src}
          poster={heroReel.poster}
          muted
          playsInline
          loop
          autoPlay
          preload="metadata"
          className="w-full h-full object-cover opacity-40"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/30 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-bg/80" />
      </div>

      {/* Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #16C138 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
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
              className="px-7 py-3.5 rounded-full bg-brand-bright text-bg font-semibold text-base hover:bg-brand-glow transition-colors duration-200"
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
        <span className="font-mono text-xs text-fg-muted uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-bright to-transparent" />
      </div>
    </section>
  );
}
