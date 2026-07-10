import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { value: "15+", label: "Reel productions" },
  { value: "29+", label: "Brand clients" },
  { value: "Millions", label: "Of views delivered" },
  { value: "360°", label: "Marketing coverage" },
];

export function Stats() {
  return (
    <section className="py-24 md:py-32 px-6 bg-deep/30 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, #16C138 0%, transparent 70%)" }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="text-center">
                <p
                  className="font-display font-bold text-brand-bright mb-2"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                >
                  {stat.value}
                </p>
                <p className="font-mono text-fg-muted text-xs uppercase tracking-widest">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
