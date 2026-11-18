import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Start a project with Grinscreen Digital. Email, call or WhatsApp our Bangladesh digital marketing team for reels, campaigns, ads and brand management.",
  path: "/contact",
});

const phone = "01886189297";
const phoneDisplay = "01886-189297";
const email = "contactgrinscreen@gmail.com";

const contactMethods = [
  {
    label: "Email",
    value: email,
    href: `mailto:${email}`,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    description: "We reply within 24 hours",
  },
  {
    label: "Call",
    value: phoneDisplay,
    href: `tel:+880${phone}`,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    description: "Available during business hours",
  },
  {
    label: "WhatsApp",
    value: phoneDisplay,
    href: `https://wa.me/880${phone}`,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
    description: "Quick response on WhatsApp",
    external: true,
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: site.socials.facebook,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: site.socials.instagram,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: site.socials.linkedin,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.5 9h3v10.5h-3V9zM6 4.3a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zM9.8 9h2.9v1.4c.4-.8 1.4-1.7 3-1.7 3.1 0 3.8 2 3.8 4.7v6.1h-3v-5.4c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8v5.5h-3V9z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="pt-24">
      <section className="py-20 px-6 max-w-5xl mx-auto">
        {/* Header */}
        <Reveal>
          <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-4">
            Get in Touch
          </p>
          <h1
            className="font-display font-bold text-fg mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Let&apos;s build
            <br />
            something
            <br />
            <span className="text-brand-bright">remarkable.</span>
          </h1>
          <p className="text-fg-muted text-lg leading-relaxed mb-16 max-w-lg">
            Reach out via email, phone, or WhatsApp we&apos;re quick to respond
            and ready to help your brand grow.
          </p>
        </Reveal>

        {/* Book a call */}
        <Reveal>
          <div className="mb-10 flex flex-col gap-5 rounded-2xl border border-brand-bright/30 bg-surface p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl font-semibold text-fg">
                Prefer to talk? Book a free 30-minute call.
              </p>
              <p className="mt-1 text-sm text-fg-muted">
                Pick a time that suits you. We&apos;ll send a Google Meet link.
              </p>
            </div>
            <Link
              href="/book"
              className="inline-flex shrink-0 justify-center rounded-full bg-brand-bright px-7 py-3.5 font-semibold text-white transition-colors duration-200 hover:bg-brand-glow"
            >
              Book a Call
            </Link>
          </div>
        </Reveal>

        {/* Contact method cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20">
          {contactMethods.map((method, i) => (
            <Reveal key={method.label} delay={i * 0.08}>
              <a
                href={method.href}
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noopener noreferrer" : undefined}
                className="group flex flex-col gap-5 p-7 rounded-2xl border border-border bg-surface hover:border-brand-bright/40 hover:bg-surface-2 transition-all duration-300"
              >
                <span className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand-bright group-hover:bg-brand/20 transition-colors duration-300">
                  {method.icon}
                </span>
                <div>
                  <p className="font-mono text-xs text-fg-muted uppercase tracking-widest mb-1">
                    {method.label}
                  </p>
                  <p className="font-display font-semibold text-fg text-lg group-hover:text-brand-bright transition-colors duration-200">
                    {method.value}
                  </p>
                  <p className="text-fg-muted text-sm mt-1">
                    {method.description}
                  </p>
                </div>
                <span className="text-fg-muted group-hover:text-brand-bright transition-colors duration-200 text-sm font-medium">
                  {method.label === "Email"
                    ? "Send email →"
                    : method.label === "Call"
                      ? "Call now →"
                      : "Open WhatsApp →"}
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-16" />

        {/* Social links */}
        <Reveal>
          <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-8">
            Follow Us
          </p>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((social, i) => (
              <Reveal key={social.label} delay={i * 0.06}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Grinscreen Digital on ${social.label}`}
                  title={social.label}
                  className="flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-surface-2 text-fg transition-all duration-300 hover:-translate-y-1 hover:border-brand-bright hover:bg-brand hover:text-white hover:shadow-[0_0_24px_-4px_var(--color-brand-glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-glow"
                >
                  {social.icon}
                </a>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
