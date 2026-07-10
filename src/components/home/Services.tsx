import { services } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-4">What We Do</p>
          <h2
            className="font-display font-bold text-fg mb-16"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Full-spectrum digital.<br />
            <span className="text-fg-muted">From concept to viral.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-bg">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.05}>
              <div className="bg-surface p-8 hover:bg-surface-2 transition-colors duration-300 group h-full">
                <span className="block text-2xl text-brand-bright mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {service.icon}
                </span>
                <h3 className="font-display font-semibold text-fg text-xl mb-3">{service.title}</h3>
                <p className="text-fg-muted text-sm leading-relaxed">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
