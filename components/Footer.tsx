"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CALENDLY_URL = "https://calendly.com/itai-leff/15min?month=2026-03Meet";

export default function Footer() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [appInstalled, setAppInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setAppInstalled(true));
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt && "prompt" in deferredPrompt) {
      (deferredPrompt as { prompt: () => void }).prompt();
      setDeferredPrompt(null);
    }
  };

  return (
    <footer className="bg-darkBg text-cream border-t border-darkBorder">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div>
            <h3 className="font-serif text-xl font-bold text-cream tracking-wider uppercase mb-4">
              Your Private Chef
            </h3>
            <p className="text-cream/50 text-sm leading-relaxed mb-5">
              Private chef meals by Shai Lavi — personally crafted, locally
              sourced, and delivered fresh to your door in Atlanta.
            </p>
            <div className="flex gap-3">
              {[
                { label: "IG", href: "https://instagram.com/third.space.atlanta/" },
                { label: "FB", href: "https://www.facebook.com/foodandstuff123/" },
                { label: "TT", href: "https://tiktok.com/@thirdspaceatl" },
                { label: "LI", href: "https://linkedin.com/company/thethirdspaceatlanta/" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-darkBorder text-cream/50 text-xs font-bold hover:border-gold hover:text-gold transition-all duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-medium text-gold tracking-ultrawide uppercase mb-5">
              Navigate
            </h4>
            <ul className="space-y-2.5 text-sm text-cream/50">
              {[
                { label: "About Us", href: "/about" },
                { label: "Gallery", href: "/gallery" },
                { label: "Chef Shai", href: "/chef" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-gold transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors duration-200"
                >
                  Book a Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-sm font-medium text-gold tracking-ultrawide uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-cream/50">
              <li>
                <a
                  href="tel:+14243973047"
                  className="hover:text-gold transition-colors duration-200"
                >
                  +1 (424) 397-3047
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/14243973047"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors duration-200"
                >
                  WhatsApp
                </a>
              </li>
              {!appInstalled && (
                <li>
                  <button
                    onClick={handleInstallApp}
                    className="text-cream/50 hover:text-gold transition-colors duration-200"
                  >
                    Download the App
                  </button>
                </li>
              )}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-darkBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream/30">
          <p>
            &copy; {new Date().getFullYear()} Your Private Chef. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:text-cream/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-cream/60 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
