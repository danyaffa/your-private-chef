"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  ChevronDown,
  Instagram,
  Facebook,
  Twitter,
  HelpCircle,
  CheckCircle,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const contactCards = [
  {
    icon: <Phone className="w-6 h-6" />,
    label: "Phone",
    value: "+1 (424) 397-3047",
    href: "tel:+14243973047",
    color: "bg-terracotta/10 text-terracotta",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    label: "WhatsApp",
    value: "+1 (424) 397-3047",
    href: "https://wa.me/14243973047",
    color: "bg-sage/10 text-sage",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    label: "Address",
    value: "Atlanta, GA (The Third Space Kitchen)",
    href: "#map",
    color: "bg-terracotta/10 text-terracotta",
  },
];

const subjectOptions = [
  "General Inquiry",
  "Meal Plan Interest",
  "Custom Menu Request",
  "Dietary Consultation",
  "Catering & Events",
  "Partnership Opportunity",
  "Other",
];

const businessHours = [
  { day: "Monday \u2013 Friday", hours: "8:00 AM \u2013 8:00 PM" },
  { day: "Saturday", hours: "9:00 AM \u2013 6:00 PM" },
  { day: "Sunday", hours: "10:00 AM \u2013 4:00 PM" },
];

const faqLinks = [
  { question: "How does the meal delivery work?", href: "/how-it-works" },
  { question: "What meal plans do you offer?", href: "/menu" },
  { question: "Can you accommodate dietary restrictions?", href: "/menu" },
  { question: "What areas do you deliver to?", href: "/how-it-works" },
  { question: "Who is Chef Marcus?", href: "/chef" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-charcoal via-charcoal to-softBrown">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-gold blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-terracotta blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-gold/20 text-goldLight text-sm font-sans tracking-wide">
              We&rsquo;d Love to Hear From You
            </span>
          </motion.div>
          <motion.h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-cream leading-tight"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-goldLight/80 text-lg sm:text-xl font-sans"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
          >
            Questions, custom requests, or ready to start your meal plan? Reach
            out and let&rsquo;s talk.
          </motion.p>
        </div>
      </section>

      {/* ── Contact Info Cards ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {contactCards.map((card, i) => (
            <motion.a
              key={card.label}
              href={card.href}
              target={card.label === "WhatsApp" ? "_blank" : undefined}
              rel={
                card.label === "WhatsApp" ? "noopener noreferrer" : undefined
              }
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-goldLight/20 group block"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={fadeUp}
              custom={i}
            >
              <div
                className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                {card.icon}
              </div>
              <h3 className="font-sans font-semibold text-charcoal text-sm uppercase tracking-wider mb-1">
                {card.label}
              </h3>
              <p className="text-softBrown font-sans text-sm leading-relaxed">
                {card.value}
              </p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── Contact Form & Sidebar ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Form Column */}
          <motion.div
            className="lg:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2
              className="font-serif text-3xl sm:text-4xl text-charcoal mb-2"
              variants={fadeUp}
              custom={0}
            >
              Send Us a Message
            </motion.h2>
            <motion.p
              className="text-softBrown font-sans mb-8"
              variants={fadeUp}
              custom={1}
            >
              Fill out the form below and we&rsquo;ll get back to you within 24
              hours.
            </motion.p>

            {submitted ? (
              <motion.div
                className="bg-sage/10 border border-sage/30 rounded-2xl p-10 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="w-14 h-14 text-sage mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-charcoal mb-2">
                  Message Sent!
                </h3>
                <p className="text-softBrown font-sans mb-6">
                  Thank you for reaching out. Chef Marcus will get back to you
                  shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: "",
                    });
                  }}
                  className="text-gold font-sans font-semibold hover:text-terracotta transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-5"
                variants={fadeUp}
                custom={2}
              >
                {/* Name & Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-sans font-semibold text-charcoal mb-1.5"
                    >
                      Full Name <span className="text-terracotta">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-goldLight/40 bg-white font-sans text-charcoal placeholder:text-softBrown/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-sans font-semibold text-charcoal mb-1.5"
                    >
                      Email Address <span className="text-terracotta">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-goldLight/40 bg-white font-sans text-charcoal placeholder:text-softBrown/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Subject */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-sans font-semibold text-charcoal mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(424) 397-3047"
                      className="w-full px-4 py-3 rounded-xl border border-goldLight/40 bg-white font-sans text-charcoal placeholder:text-softBrown/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-sans font-semibold text-charcoal mb-1.5"
                    >
                      Subject <span className="text-terracotta">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-goldLight/40 bg-white font-sans text-charcoal appearance-none focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors"
                      >
                        <option value="" disabled>
                          Select a subject
                        </option>
                        {subjectOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-softBrown/50 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-sans font-semibold text-charcoal mb-1.5"
                  >
                    Message <span className="text-terracotta">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your dietary needs, preferences, or any questions you have..."
                    className="w-full px-4 py-3 rounded-xl border border-goldLight/40 bg-white font-sans text-charcoal placeholder:text-softBrown/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors resize-none"
                  />
                </div>

                {/* Error */}
                {error && (
                  <p className="text-terracotta text-sm font-sans">{error}</p>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-terracotta text-white font-sans font-semibold px-8 py-3.5 rounded-full hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-4 h-4" />
                  {submitting ? "Sending..." : "Send Message"}
                </motion.button>
              </motion.form>
            )}
          </motion.div>

          {/* Sidebar Column */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Business Hours */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-sm border border-goldLight/20"
              variants={fadeUp}
              custom={0}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-charcoal">
                  Business Hours
                </h3>
              </div>
              <div className="space-y-3">
                {businessHours.map((slot) => (
                  <div
                    key={slot.day}
                    className="flex justify-between items-center font-sans text-sm"
                  >
                    <span className="text-charcoal font-medium">
                      {slot.day}
                    </span>
                    <span className="text-softBrown">{slot.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-goldLight/20">
                <p className="text-xs text-softBrown/70 font-sans">
                  Orders placed after hours will be confirmed the next business
                  day.
                </p>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-sm border border-goldLight/20"
              variants={fadeUp}
              custom={1}
            >
              <h3 className="font-serif text-xl text-charcoal mb-4">
                Follow Us
              </h3>
              <div className="flex gap-3">
                {[
                  {
                    icon: <Instagram className="w-5 h-5" />,
                    label: "Instagram",
                    href: "#",
                    color:
                      "bg-terracotta/10 text-terracotta hover:bg-terracotta hover:text-white",
                  },
                  {
                    icon: <Facebook className="w-5 h-5" />,
                    label: "Facebook",
                    href: "#",
                    color:
                      "bg-gold/10 text-gold hover:bg-gold hover:text-white",
                  },
                  {
                    icon: <Twitter className="w-5 h-5" />,
                    label: "Twitter",
                    href: "#",
                    color:
                      "bg-sage/10 text-sage hover:bg-sage hover:text-white",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`w-11 h-11 rounded-xl ${social.color} flex items-center justify-center transition-all duration-300`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* FAQ Quick Links */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-sm border border-goldLight/20"
              variants={fadeUp}
              custom={2}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-sage/10 text-sage flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-charcoal">
                  Quick Answers
                </h3>
              </div>
              <div className="space-y-2">
                {faqLinks.map((faq) => (
                  <Link
                    key={faq.question}
                    href={faq.href}
                    className="flex items-start gap-2 text-sm font-sans text-softBrown hover:text-gold transition-colors py-1.5 group"
                  >
                    <span className="text-goldLight group-hover:text-gold mt-0.5 flex-shrink-0">
                      &rarr;
                    </span>
                    {faq.question}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Map Placeholder ── */}
      <section id="map" className="bg-warmWhite py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="font-serif text-3xl sm:text-4xl text-charcoal mb-2"
              variants={fadeUp}
              custom={0}
            >
              Find Us
            </motion.h2>
            <motion.p
              className="text-softBrown font-sans"
              variants={fadeUp}
              custom={1}
            >
              The Third Space Kitchen &mdash; Atlanta, Georgia
            </motion.p>
          </motion.div>

          <motion.div
            className="relative w-full aspect-[16/7] sm:aspect-[16/6] rounded-2xl overflow-hidden shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={scaleIn}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-goldLight via-gold to-terracotta flex flex-col items-center justify-center">
              <MapPin className="w-16 h-16 sm:w-20 sm:h-20 text-white/80 mb-3 animate-bounce" />
              <span className="text-white font-serif text-xl sm:text-2xl">
                Atlanta, GA
              </span>
              <span className="text-white/70 font-sans text-sm mt-1">
                The Third Space Kitchen
              </span>
            </div>
            {/* Decorative grid dots */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            className="bg-gradient-to-br from-charcoal to-softBrown rounded-3xl p-10 sm:p-14 shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
          >
            <Phone className="w-10 h-10 text-goldLight/80 mx-auto mb-4" />
            <h2 className="font-serif text-3xl sm:text-4xl text-cream mb-3">
              Ready to Eat Well?
            </h2>
            <p className="text-goldLight/70 font-sans mb-8 max-w-lg mx-auto">
              Whether you have questions or you&rsquo;re ready to start your
              personalized meal plan, Chef Marcus and the team are here for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+14243973047"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-terracotta text-white font-sans font-semibold px-8 py-3.5 rounded-full hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Us Now
              </a>
              <a
                href="https://wa.me/14243973047"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-sage text-white font-sans font-semibold px-8 py-3.5 rounded-full hover:bg-sageDark hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
