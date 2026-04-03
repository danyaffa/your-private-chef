"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message.");
    }
  };

  return (
    <main className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 section-pattern opacity-30" />
        <div className="relative max-w-5xl mx-auto px-6 py-28 md:py-36 text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-gold font-semibold tracking-widest uppercase text-sm mb-4"
          >
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl text-charcoal leading-tight mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-sans text-lg md:text-xl text-softBrown max-w-2xl mx-auto leading-relaxed"
          >
            Have a question or ready to start your private chef experience? We&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="lg:col-span-2"
            >
              <motion.span
                variants={fadeUp}
                custom={0}
                className="inline-block text-terracotta font-semibold text-sm uppercase tracking-widest mb-3"
              >
                Reach Out
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="font-serif text-3xl md:text-4xl text-charcoal mb-6 leading-snug"
              >
                Let&apos;s Start a Conversation
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="font-sans text-softBrown leading-relaxed mb-10"
              >
                Whether you have dietary questions, want to discuss a custom menu, or are ready to book your first week — reach out and we&apos;ll get back to you promptly.
              </motion.p>

              <div className="space-y-6">
                {[
                  {
                    icon: <Phone className="w-5 h-5" />,
                    label: "Phone",
                    value: "+1 (424) 397-3047",
                    href: "tel:+14243973047",
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    label: "Email",
                    value: "eat@chefprepforyou.com",
                    href: "mailto:eat@chefprepforyou.com",
                  },
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    label: "Serving",
                    value: "Atlanta, GA & Surrounding Areas",
                    href: null,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    custom={3 + i}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center text-sage flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/40 block mb-1">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-sans text-charcoal hover:text-gold transition-colors duration-200"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="font-sans text-charcoal">{item.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-3"
            >
              {status === "success" ? (
                <div className="bg-sage/10 border border-sage/30 rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-5">
                    <Send className="w-7 h-7 text-sage" />
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal mb-3">
                    Message Sent!
                  </h3>
                  <p className="font-sans text-softBrown leading-relaxed mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn-outline inline-flex items-center gap-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-2"
                      >
                        Name <span className="text-terracotta">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border border-goldLight/30 bg-white text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-2"
                      >
                        Email <span className="text-terracotta">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-goldLight/30 bg-white text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 rounded-xl border border-goldLight/30 bg-white text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-2"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-goldLight/30 bg-white text-charcoal focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200"
                      >
                        <option value="">Select a topic</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Weekly Meal Prep">Weekly Meal Prep</option>
                        <option value="Private Event">Private Event</option>
                        <option value="Dietary Questions">Dietary Questions</option>
                        <option value="Pricing">Pricing</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-2"
                    >
                      Message <span className="text-terracotta">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your needs, dietary preferences, or any questions..."
                      className="w-full px-4 py-3 rounded-xl border border-goldLight/30 bg-white text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200 resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary inline-flex items-center gap-2 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Prefer to Talk Directly?
            </h2>
            <p className="font-sans text-white/60 text-lg mb-8 leading-relaxed">
              Book a free 15-minute consultation and let Chef Shai design a menu that&apos;s uniquely yours.
            </p>
            <a
              href="https://calendly.com/itai-leff/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-gold/60 text-gold font-medium tracking-wider uppercase hover:bg-gold hover:text-darkBg transition-all duration-300 text-lg"
            >
              Book a Consultation <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
