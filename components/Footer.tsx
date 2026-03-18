"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CALENDLY_URL = "https://calendly.com/itai-leff/15min?month=2026-03Meet";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      // silently fail for newsletter
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-darkBg text-cream border-t border-darkBorder">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
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
                { label: "IG", href: "#" },
                { label: "FB", href: "#" },
                { label: "TW", href: "#" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
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
                { label: "How It Works", href: "/how-it-works" },
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

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-sm font-medium text-gold tracking-ultrawide uppercase mb-5">
              Stay Updated
            </h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email here*"
                className="w-full px-4 py-3 bg-transparent border border-darkBorder text-cream text-sm placeholder:text-cream/30 focus:border-gold focus:ring-0 transition-colors"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-4 py-3 border border-gold/60 text-gold text-sm font-medium tracking-wider uppercase hover:bg-gold hover:text-darkBg transition-all duration-300 disabled:opacity-50"
              >
                {submitted ? "Thank You!" : submitting ? "..." : "Subscribe"}
              </button>
            </form>
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
