"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/chef", label: "Chef" },
  { href: "/order", label: "Order" },
  { href: "/contact", label: "Contact" },
  { href: "/ai-meal-builder", label: "AI Meal Builder" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-md shadow-goldLight/10"
          : "bg-cream/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-2xl md:text-3xl" role="img" aria-label="Chef">
              👨‍🍳
            </span>
            <span className="font-serif text-lg md:text-xl font-bold text-charcoal tracking-tight">
              Your Private{" "}
              <span className="text-gold group-hover:text-goldDark transition-colors duration-200">
                Chef
              </span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-softBrown hover:text-goldDark transition-colors duration-200 rounded-lg hover:bg-goldLight/15 group"
              >
                {link.label}
                <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/order"
              className="hidden lg:inline-flex items-center px-5 py-2.5 bg-gold text-white text-sm font-semibold rounded-full shadow-md shadow-gold/20 hover:bg-goldDark hover:shadow-lg active:scale-95 transition-all duration-200"
            >
              Order Now
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-goldLight/15 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <motion.span
                  animate={
                    isOpen
                      ? { rotate: 45, y: 9, backgroundColor: "#C8986E" }
                      : { rotate: 0, y: 0, backgroundColor: "#3D3D3D" }
                  }
                  transition={{ duration: 0.3 }}
                  className="block w-full h-[2px] rounded-full origin-center"
                />
                <motion.span
                  animate={
                    isOpen
                      ? { opacity: 0, scaleX: 0 }
                      : { opacity: 1, scaleX: 1 }
                  }
                  transition={{ duration: 0.2 }}
                  className="block w-full h-[2px] bg-charcoal rounded-full"
                />
                <motion.span
                  animate={
                    isOpen
                      ? { rotate: -45, y: -9, backgroundColor: "#C8986E" }
                      : { rotate: 0, y: 0, backgroundColor: "#3D3D3D" }
                  }
                  transition={{ duration: 0.3 }}
                  className="block w-full h-[2px] rounded-full origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 top-16 md:top-20 bg-charcoal/30 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-16 md:top-20 right-0 bottom-0 w-72 sm:w-80 bg-cream shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex-1 overflow-y-auto py-6 px-5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-softBrown hover:text-goldDark hover:bg-goldLight/15 rounded-xl font-medium transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.04 + 0.1 }}
                className="p-5 border-t border-goldLight/20"
              >
                <Link
                  href="/order"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-5 py-3 bg-gold text-white font-semibold rounded-full shadow-md hover:bg-goldDark transition-all duration-200"
                >
                  Order Now
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
