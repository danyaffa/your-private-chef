"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
    <footer className="bg-charcoal text-cream">
      {/* Email Capture Banner */}
      <div className="bg-gradient-to-r from-goldDark via-gold to-goldDark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Get Your Custom Meal Plan
              </h3>
              <p className="mt-1 text-white/80 text-sm">
                Personalized nutrition delivered to your door.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex w-full md:w-auto gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25 transition-all text-sm"
              />
              <button
                type="submit"
                className="flex-shrink-0 px-5 py-2.5 bg-white text-gold font-semibold rounded-full hover:bg-cream active:scale-95 transition-all duration-200 text-sm shadow-md whitespace-nowrap"
              >
                {submitted ? "Thank You!" : submitting ? "..." : "Get Plan"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">👨‍🍳</span>
              <span className="font-serif text-lg font-bold text-goldLight">
                Your Private Chef
              </span>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed mb-4">
              Premium, personalized meals crafted with love and expertise.
              Farm-fresh ingredients and world-class culinary artistry.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { label: "FB", href: "#" },
                { label: "IG", href: "#" },
                { label: "TW", href: "#" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-cream/10 text-cream/70 text-xs font-bold hover:bg-gold hover:text-white transition-all duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-base font-semibold text-goldLight mb-3">
              Services
            </h4>
            <ul className="space-y-1.5 text-sm text-cream/70">
              {[
                "Private Dining",
                "Meal Prep Plans",
                "Catering Events",
                "AI Meal Builder",
                "Custom Nutrition Plans",
              ].map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base font-semibold text-goldLight mb-3">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-cream/70">
              <li className="flex items-center gap-2">
                <span className="text-gold">📞</span>
                <a
                  href="tel:+14243973047"
                  className="hover:text-gold transition-colors duration-200"
                >
                  +1 (424) 397-3047
                </a>
              </li>
              <li className="flex gap-2 mt-2">
                <a
                  href="https://wa.me/14243973047"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-sage/20 text-sageLight text-sm font-medium rounded-full hover:bg-sage/30 transition-all duration-200"
                >
                  <span>💬</span>
                  WhatsApp Us
                </a>
              </li>
              {!appInstalled && (
                <li className="mt-2">
                  <button
                    onClick={handleInstallApp}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/20 text-goldLight text-sm font-medium rounded-full hover:bg-gold/30 active:scale-95 transition-all duration-200"
                  >
                    <span>📲</span>
                    Download the App
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream/50">
          <p>
            &copy; {new Date().getFullYear()} Your Private Chef. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:text-cream/80 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-cream/80 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
