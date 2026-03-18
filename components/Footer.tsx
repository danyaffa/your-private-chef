"use client";

import { useState } from "react";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Order", href: "/order" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Private Dining",
  "Meal Prep Plans",
  "Catering Events",
  "AI Meal Builder",
  "Custom Nutrition Plans",
  "Cooking Classes",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Get Your Custom Meal Plan
              </h3>
              <p className="mt-1 text-white/80 text-sm sm:text-base">
                Personalized nutrition delivered to your door. Sign up for a
                free consultation.
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
                className="flex-1 md:w-72 px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25 transition-all text-sm"
              />
              <button
                type="submit"
                className="flex-shrink-0 px-6 py-3 bg-white text-gold font-semibold rounded-full hover:bg-cream active:scale-95 transition-all duration-200 text-sm shadow-md whitespace-nowrap"
              >
                {submitted ? "Thank You!" : submitting ? "..." : "Get Plan"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">👨‍🍳</span>
              <span className="font-serif text-xl font-bold text-goldLight">
                Your Private Chef
              </span>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed mb-6">
              Premium, personalized meals crafted with love and expertise. We
              bring the fine dining experience to your home with farm-fresh
              ingredients and world-class culinary artistry.
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
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-cream/10 text-cream/70 text-xs font-bold hover:bg-gold hover:text-white transition-all duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-goldLight mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-cream/70 hover:text-gold transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-goldLight mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service} className="text-sm text-cream/70">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-goldLight mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5">📍</span>
                <span>
                  123 Culinary Lane,
                  <br />
                  Gourmet City, GC 10001
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">📞</span>
                <a
                  href="tel:+15551234567"
                  className="hover:text-gold transition-colors duration-200"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✉️</span>
                <a
                  href="mailto:hello@yourprivatechef.com"
                  className="hover:text-gold transition-colors duration-200"
                >
                  hello@yourprivatechef.com
                </a>
              </li>
              <li className="mt-3">
                <a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-sage/20 text-sageLight text-sm font-medium rounded-full hover:bg-sage/30 transition-all duration-200"
                >
                  <span>💬</span>
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/50">
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
