import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Grinscreen Digital. Tell us about your brand and let's build something amazing together.",
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <Reveal>
              <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-4">Get in Touch</p>
              <h1
                className="font-display font-bold text-fg mb-6"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                Let&apos;s build<br />
                something<br />
                <span className="text-brand-bright">remarkable.</span>
              </h1>
              <p className="text-fg-muted text-lg leading-relaxed mb-10 max-w-sm">
                Tell us about your brand and what you&apos;re looking to achieve. We&apos;ll get back to you within 24 hours.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-col gap-4">
                {site.contact.email !== "PLACEHOLDER_EMAIL" && (
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="flex items-center gap-3 text-fg-muted hover:text-fg transition-colors"
                  >
                    <span className="text-brand-bright">@</span>
                    {site.contact.email}
                  </a>
                )}
                <a
                  href={site.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-fg-muted hover:text-fg transition-colors"
                >
                  <span className="text-brand-bright">↗</span>
                  Facebook
                </a>
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-fg-muted hover:text-fg transition-colors"
                >
                  <span className="text-brand-bright">↗</span>
                  Instagram
                </a>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-fg-muted hover:text-fg transition-colors"
                >
                  <span className="text-brand-bright">↗</span>
                  LinkedIn
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
