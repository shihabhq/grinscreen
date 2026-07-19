import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "About",
  description:
    "Grinscreen Digital  360° digital marketing agency based in Bangladesh. Learn about who we are and what we do.",
};

const process = [
  {
    step: "01",
    title: "Understand",
    description:
      "We learn your brand, audience, and goals  then map out a content strategy built around what actually works on platform.",
  },
  {
    step: "02",
    title: "Create",
    description:
      "Concept, shoot, edit. Our production team handles the full creative process for reels, statics, and campaigns  fast turnaround, no corners cut.",
  },
  {
    step: "03",
    title: "Distribute",
    description:
      "Publish, run ads, track metrics. We manage the channels and handle paid amplification to get your content in front of the right people.",
  },
  {
    step: "04",
    title: "Optimise",
    description:
      "We review performance, double down on what's working, and iterate  continuously improving your content's reach and ROI.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-4">
            Who We Are
          </p>
          <h1
            className="font-display font-bold text-fg mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            360° digital.
            <br />
            <span className="text-fg-muted">Built for the feed.</span>
          </h1>
          <p className="text-fg-muted text-xl leading-relaxed max-w-2xl">
            Grinscreen Digital is a full-service digital marketing agency based
            in Bangladesh. We specialise in short-form video that goes viral,
            backed by the strategy, design, and management to grow brands that
            last.
          </p>
        </Reveal>
      </section>

      {/* Divider */}
      <div className="border-t border-border mx-6" />

      {/* What makes us different */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-4">
              Our Edge
            </p>
            <h2
              className="font-display font-bold text-fg mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Millions of views
              <br />
              isn&apos;t luck.
            </h2>
            <p className="text-fg-muted leading-relaxed mb-4">
              Our reels consistently rack up millions of views because we
              understand how platforms work the algorithm, the hook, the cut,
              the sound design, the caption. Every element is deliberate.
            </p>
            <p className="text-fg-muted leading-relaxed">
              We&apos;ve done it for Pathao, for Dhaka&apos;s top F&amp;B
              brands, for lifestyle labels, and for brands just starting out.
              The playbook works. We execute it at scale.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "29+", label: "Client brands" },
              { value: "15+", label: "Video productions" },
              { value: "Millions", label: "Views delivered" },
              { value: "360°", label: "Service coverage" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="bg-surface border border-border rounded-xl p-6">
                  <p className="font-display font-bold text-brand-bright text-3xl mb-1">
                    {stat.value}
                  </p>
                  <p className="font-mono text-xs text-fg-muted uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12">
            <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-4">
              Services
            </p>
            <h2
              className="font-display font-bold text-fg"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Everything your brand needs.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 0.06}>
                <div className="flex gap-5 p-6 rounded-xl bg-bg border border-border hover:border-brand/30 transition-colors duration-300">
                  <span className="text-xl text-brand-bright shrink-0 mt-0.5">
                    {service.icon}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-fg text-lg mb-2">
                      {service.title}
                    </h3>
                    <p className="text-fg-muted text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-16">
            <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-4">
              How We Work
            </p>
            <h2
              className="font-display font-bold text-fg"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Simple process.
              <br />
              <span className="text-fg-muted">Serious results.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.1}>
                <div className="relative">
                  <p className="font-mono text-5xl font-bold text-brand/20 mb-4">
                    {step.step}
                  </p>
                  <h3 className="font-display font-semibold text-fg text-xl mb-3">
                    {step.title}
                  </h3>
                  <p className="text-fg-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
