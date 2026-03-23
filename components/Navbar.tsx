"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const CALENDLY_URL = "https://calendly.com/itai-leff/15min";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/chef", label: "Chef Shai" },
  { href: CALENDLY_URL, label: "Book", external: true },
  { href: "/admin", label: "Admin" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-darkBg/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-darkBg/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <span className="font-serif text-xl md:text-2xl font-bold text-cream tracking-ultrawide uppercase">
              Your Private{" "}
              <span className="text-gold group-hover:text-goldLight transition-colors duration-200">
                Chef
              </span>
            </span>
          </Link>

          {/* Desktop Nav Links (xl and up) */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-3 py-2 text-sm font-medium tracking-wider uppercase transition-colors duration-200 hover:text-gold text-cream/70"
                  >
                    {link.label}
                    <span className="absolute bottom-0.5 left-3 right-3 h-[1px] bg-gold rounded-full transition-transform duration-200 origin-left scale-x-0 group-hover:scale-x-100" />
                  </a>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium tracking-wider uppercase transition-colors duration-200 group ${
                    pathname === link.href
                      ? "text-gold"
                      : "text-cream/70 hover:text-gold"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0.5 left-3 right-3 h-[1px] bg-gold rounded-full transition-transform duration-200 origin-left ${
                      pathname === link.href
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right side: Book CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-5 py-2.5 border border-gold/60 text-gold text-sm font-medium tracking-wider uppercase hover:bg-gold hover:text-darkBg transition-all duration-300"
            >
              Book Time With The Chef
            </a>

            {/* Hamburger (visible below xl) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-cream/10 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <motion.span
                  animate={
                    isOpen
                      ? { rotate: 45, y: 9, backgroundColor: "#C8986E" }
                      : { rotate: 0, y: 0, backgroundColor: "#F5F0EB" }
                  }
                  transition={{ duration: 0.3 }}
                  className="block w-full h-[1px] rounded-full origin-center"
                />
                <motion.span
                  animate={
                    isOpen
                      ? { opacity: 0, scaleX: 0 }
                      : { opacity: 1, scaleX: 1 }
                  }
                  transition={{ duration: 0.2 }}
                  className="block w-full h-[1px] bg-cream rounded-full"
                />
                <motion.span
                  animate={
                    isOpen
                      ? { rotate: -45, y: -9, backgroundColor: "#C8986E" }
                      : { rotate: 0, y: 0, backgroundColor: "#F5F0EB" }
                  }
                  transition={{ duration: 0.3 }}
                  className="block w-full h-[1px] rounded-full origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet scrollable nav strip (below xl) */}
      <div className="xl:hidden border-t border-darkBorder bg-darkBg/95 backdrop-blur-md">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1 px-4 py-1.5 min-w-max">
            {navLinks.map((link) => {
              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-medium tracking-wider uppercase rounded-full whitespace-nowrap transition-all duration-200 text-cream/60 hover:text-gold"
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-medium tracking-wider uppercase rounded-full whitespace-nowrap transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-gold/20 text-gold"
                      : "text-cream/60 hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 top-[88px] md:top-[104px] bg-black/60 backdrop-blur-sm xl:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-[88px] md:top-[104px] right-0 bottom-0 w-72 sm:w-80 bg-darkBg shadow-2xl xl:hidden flex flex-col border-l border-darkBorder"
            >
              <div className="flex-1 overflow-y-auto py-4 px-5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 rounded-lg font-medium tracking-wider uppercase transition-colors duration-200 text-sm text-cream/60 hover:text-gold hover:bg-cream/5"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-lg font-medium tracking-wider uppercase transition-colors duration-200 text-sm ${
                          pathname === link.href
                            ? "text-gold bg-gold/10"
                            : "text-cream/60 hover:text-gold hover:bg-cream/5"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.04 + 0.1 }}
                className="p-5 border-t border-darkBorder"
              >
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-5 py-3 border border-gold/60 text-gold font-medium tracking-wider uppercase hover:bg-gold hover:text-darkBg transition-all duration-300"
                >
                  Book Time With The Chef
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
