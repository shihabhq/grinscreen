import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom, #16C138 0%, transparent 60%)" }}
      />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Reveal>
          <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-6">Ready?</p>
          <h2
            className="font-display font-bold text-fg mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Let&apos;s make something<br />
            <span className="text-brand-bright">people can&apos;t ignore.</span>
          </h2>
          <p className="text-fg-muted text-lg mb-10 max-w-xl mx-auto">
            Tell us about your brand. We&apos;ll handle the rest — strategy, content, distribution, and results.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-4 rounded-full bg-brand-bright text-bg font-semibold text-lg hover:bg-brand-glow transition-colors duration-200"
          >
            Start a Project
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
