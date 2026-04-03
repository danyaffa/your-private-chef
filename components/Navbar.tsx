"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CALENDLY_URL = "https://calendly.com/itai-leff/15min";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/chef", label: "Chef Shai" },
  { href: "/contact", label: "Contact" },
  { href: CALENDLY_URL, label: "Book", external: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

          {/* Book CTA */}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center px-5 py-2.5 border border-gold/60 text-gold text-sm font-medium tracking-wider uppercase hover:bg-gold hover:text-darkBg transition-all duration-300"
          >
            Book Time With The Chef
          </a>
        </div>
      </div>

      {/* Centered nav links strip */}
      <div className="border-t border-darkBorder bg-darkBg/95 backdrop-blur-md">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex items-center justify-center gap-1 px-4 py-1.5">
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
    </nav>
  );
}
