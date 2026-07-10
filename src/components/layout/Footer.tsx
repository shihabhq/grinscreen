import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/grinscreen/logo.png"
                alt="Grinscreen Digital"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span className="font-display font-bold text-fg text-lg">Grinscreen Digital</span>
            </Link>
            <p className="text-fg-muted text-sm leading-relaxed max-w-xs">
              360° digital marketing agency. Reels that rack up millions of views.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-mono text-xs text-brand-bright uppercase tracking-widest mb-4">Navigation</p>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-fg-muted text-sm hover:text-fg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div>
            <p className="font-mono text-xs text-brand-bright uppercase tracking-widest mb-4">Follow Us</p>
            <div className="flex flex-col gap-3">
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted text-sm hover:text-fg transition-colors flex items-center gap-2"
              >
                <span>↗</span> Facebook
              </a>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted text-sm hover:text-fg transition-colors flex items-center gap-2"
              >
                <span>↗</span> Instagram
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted text-sm hover:text-fg transition-colors flex items-center gap-2"
              >
                <span>↗</span> LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-fg-muted text-xs">
            © {new Date().getFullYear()} Grinscreen Digital. All rights reserved.
          </p>
          <p className="text-fg-muted text-xs">Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
