"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const contactInfo = [
  { icon: "📧", label: "Email", value: "info@yourprivatechef.com", href: "mailto:info@yourprivatechef.com" },
  { icon: "📞", label: "Phone", value: "(404) 555-CHEF", href: "tel:+14045552433" },
  { icon: "💬", label: "WhatsApp", value: "+1 (404) 555-2433", href: "https://wa.me/14045552433" },
  { icon: "📍", label: "Kitchen Location", value: "Atlanta, GA — The Third Space Kitchen", href: "#" },
];

const subjects = ["General Inquiry", "Place an Order", "Custom Meal Plan", "Weekly Subscription", "Catering / Events", "Nutrition Consultation", "Other"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-20 px-6 text-center hero-gradient">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-6xl font-serif text-charcoal mb-4">Get In Touch</h1>
          <p className="text-lg text-softBrown max-w-2xl mx-auto">We would love to hear from you. Reach out for orders, questions, or custom meal plans.</p>
        </motion.div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center card-hover shadow-md hover:shadow-xl block"
            >
              <span className="text-4xl block mb-3">{item.icon}</span>
              <h3 className="font-semibold text-charcoal mb-1">{item.label}</h3>
              <p className="text-softBrown text-sm">{item.value}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact Form + Hours */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10">
              <h2 className="text-2xl font-serif text-charcoal mb-6">Send Us a Message</h2>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <span className="text-6xl block mb-4">✅</span>
                  <h3 className="text-2xl font-serif text-charcoal mb-2">Message Sent!</h3>
                  <p className="text-softBrown mb-6">We will get back to you within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" }); }} className="btn-outline text-sm">Send Another Message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Name *</label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-goldLight rounded-xl px-4 py-3 bg-cream/50 text-charcoal" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Email *</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-goldLight rounded-xl px-4 py-3 bg-cream/50 text-charcoal" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Phone</label>
                      <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-goldLight rounded-xl px-4 py-3 bg-cream/50 text-charcoal" placeholder="(xxx) xxx-xxxx" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Subject</label>
                      <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full border border-goldLight rounded-xl px-4 py-3 bg-cream/50 text-charcoal">
                        {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">Message *</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-goldLight rounded-xl px-4 py-3 bg-cream/50 text-charcoal resize-none" placeholder="Tell us what you need..." />
                  </div>
                  <button type="submit" className="btn-primary w-full md:w-auto">Send Message</button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Business Hours */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h3 className="text-xl font-serif text-charcoal mb-4">Business Hours</h3>
              <div className="space-y-3 text-sm">
                {[
                  ["Monday - Friday", "8:00 AM - 8:00 PM"],
                  ["Saturday", "9:00 AM - 6:00 PM"],
                  ["Sunday", "10:00 AM - 4:00 PM"],
                ].map(([day, time]) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-charcoal font-medium">{day}</span>
                    <span className="text-softBrown">{time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-goldLight/50">
                <p className="text-xs text-softBrown">Orders can be placed 24/7 online. Delivery available during business hours.</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-goldLight/30 via-cream to-sageLight/30 rounded-3xl shadow-lg p-8 text-center">
              <span className="text-5xl block mb-3">📍</span>
              <h3 className="text-lg font-serif text-charcoal mb-2">Our Kitchen</h3>
              <p className="text-softBrown text-sm mb-1">The Third Space Kitchen</p>
              <p className="text-softBrown text-sm">Atlanta, Georgia</p>
            </div>

            {/* Social */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h3 className="text-xl font-serif text-charcoal mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { label: "FB", icon: "📘" },
                  { label: "IG", icon: "📸" },
                  { label: "TW", icon: "🐦" },
                  { label: "YT", icon: "▶️" },
                ].map((s) => (
                  <button key={s.label} className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-xl hover:bg-goldLight/30 transition-colors" title={s.label}>
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
