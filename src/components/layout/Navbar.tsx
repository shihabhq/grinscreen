"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  // Store the pathname at which the drawer was opened.
  // Drawer is visible only when this matches the current pathname.
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Derive open state: drawer is open only on the same page it was toggled.
  const open = openForPath === pathname;

  const toggleOpen = () => setOpenForPath(open ? null : pathname);
  const closeDrawer = () => setOpenForPath(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-bg/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0" onClick={closeDrawer}>
            <Image
              src="/grinscreen/logo.png"
              alt="Grinscreen Digital"
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
              priority
            />
            <span className="font-display font-bold text-fg text-sm tracking-tight hidden sm:block">
              Grinscreen
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "text-sm font-medium transition-colors duration-200",
                  pathname === link.href
                    ? "text-brand-bright"
                    : "text-fg-muted hover:text-fg"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 px-4 py-2 rounded-full bg-brand-bright text-bg text-sm font-semibold hover:bg-brand-glow transition-colors duration-200"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={toggleOpen}
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={clsx(
                "block w-6 h-0.5 bg-fg transition-all duration-300 origin-center",
                open && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={clsx(
                "block w-6 h-0.5 bg-fg transition-all duration-300",
                open && "opacity-0"
              )}
            />
            <span
              className={clsx(
                "block w-6 h-0.5 bg-fg transition-all duration-300 origin-center",
                open && "-translate-y-2 -rotate-45"
              )}
            />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl flex flex-col pt-24 px-8 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={closeDrawer}
                    className={clsx(
                      "block py-4 text-3xl font-display font-bold border-b border-border transition-colors",
                      pathname === link.href ? "text-brand-bright" : "text-fg hover:text-brand-bright"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  onClick={closeDrawer}
                  className="inline-flex px-6 py-3 rounded-full bg-brand-bright text-bg font-semibold text-lg hover:bg-brand-glow transition-colors"
                >
                  Get Started
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
