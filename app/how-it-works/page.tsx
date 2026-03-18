"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  ClipboardList,
  ChefHat,
  Truck,
  ArrowRight,
  Info,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

/* ───── animation helpers ───── */
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

/* ───── data ───── */
const steps = [
  {
    num: "01",
    icon: <Search className="w-8 h-8" />,
    title: "Browse & Choose",
    description:
      "Select your meal style — whether you're focused on health, gourmet dining, high-protein, Mediterranean, comfort food, or something entirely your own.",
    color: "gold" as const,
  },
  {
    num: "02",
    icon: <ClipboardList className="w-8 h-8" />,
    title: "Share Your Preferences",
    description:
      "Tell us about your dietary needs, food allergies, health goals, flavor preferences, and portion sizes. The more we know, the better we cook for you.",
    color: "sage" as const,
  },
  {
    num: "03",
    icon: <ChefHat className="w-8 h-8" />,
    title: "Chef Prepares Your Meal",
    description:
      "Your meals are NOT cooked at your home. They're prepared fresh in our professional kitchen using premium, hand-selected ingredients — with the same care as a fine-dining restaurant.",
    color: "terracotta" as const,
  },
  {
    num: "04",
    icon: <Truck className="w-8 h-8" />,
    title: "Delivered Fresh to Your Door",
    description:
      "Every meal is packaged with care and delivered at your preferred time — still fresh, never frozen, and ready to enjoy the moment it arrives.",
    color: "gold" as const,
  },
];

const colorMap = {
  gold: {
    bg: "bg-gold/10",
    text: "text-gold",
    border: "border-gold/20",
    numBg: "bg-gold",
  },
  sage: {
    bg: "bg-sage/10",
    text: "text-sage",
    border: "border-sage/20",
    numBg: "bg-sage",
  },
  terracotta: {
    bg: "bg-terracotta/10",
    text: "text-terracotta",
    border: "border-terracotta/20",
    numBg: "bg-terracotta",
  },
};

const faqs = [
  {
    q: "Are meals cooked at my home?",
    a: "No. All meals are prepared in our chef's professional kitchen — never at your home. This allows us to maintain the highest standards of food safety, consistency, and quality with every order.",
  },
  {
    q: "How fresh are the meals?",
    a: "Every meal is prepared the same day it's delivered. We never freeze, never batch-cook days in advance, and never reheat. When it arrives at your door, it's as fresh as it gets.",
  },
  {
    q: "Can I customize everything?",
    a: "Absolutely. Every aspect of your meal can be tailored — from ingredients and seasonings to portion sizes and macros. Your Private Chef is built around your preferences, not a generic menu.",
  },
  {
    q: "Do you handle special diets?",
    a: "Yes! We support a wide range of dietary needs including GLP-1 medication support, keto, paleo, vegan, vegetarian, low-sodium, low-sugar, gluten-free, and more. Just tell us what you need.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="border border-goldLight/30 rounded-xl overflow-hidden bg-white/60"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer bg-transparent border-none"
      >
        <h3 className="font-serif text-lg md:text-xl text-charcoal m-0">
          {q}
        </h3>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gold" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="font-sans text-softBrown leading-relaxed px-6 pb-6 pt-0 m-0">
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function HowItWorksPage() {
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
            Simple &amp; Seamless
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl text-charcoal leading-tight mb-6"
          >
            How It Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-sans text-lg md:text-xl text-softBrown max-w-2xl mx-auto leading-relaxed"
          >
            From choosing your meal to enjoying it at home — we handle
            everything so you don&apos;t have to.
          </motion.p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-8">
            {steps.map((step, i) => {
              const c = colorMap[step.color];
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className={`relative rounded-2xl border ${c.border} bg-white/70 p-8 md:p-10 shadow-sm card-hover`}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Number badge */}
                    <div
                      className={`${c.numBg} w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                    >
                      <span className="text-white font-bold text-xl font-sans">
                        {step.num}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`${c.text}`}>{step.icon}</div>
                        <h3 className="font-serif text-2xl md:text-3xl text-charcoal m-0">
                          {step.title}
                        </h3>
                      </div>
                      <p className="font-sans text-softBrown text-base md:text-lg leading-relaxed m-0">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute -bottom-8 left-[2.45rem] w-0.5 h-8 bg-goldLight/40" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Important Callout */}
      <section className="pb-10 md:pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl bg-gradient-to-br from-sage/10 to-sage/5 border border-sage/20 p-8 md:p-10"
          >
            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-sage/15 flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-sage" />
              </div>
              <div>
                <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                  Not a Meal Kit — A Complete Meal
                </h3>
                <p className="font-sans text-softBrown text-base md:text-lg leading-relaxed m-0">
                  Unlike meal kits, we do{" "}
                  <span className="font-bold text-charcoal">
                    ALL the cooking
                  </span>
                  . Your meals arrive{" "}
                  <span className="font-bold text-charcoal">
                    ready to enjoy
                  </span>{" "}
                  — no assembly, no prep, no stress. Just open, plate if you
                  like, and eat. It&apos;s that simple.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white/60 py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-terracotta font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Common Questions
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl md:text-4xl text-charcoal mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="font-sans text-softBrown text-lg leading-relaxed"
            >
              Everything you need to know before your first order.
            </motion.p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <ChefHat className="w-10 h-10 text-gold mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              Ready to Get Started?
            </h2>
            <p className="font-sans text-softBrown text-lg mb-8 leading-relaxed">
              Your first chef-prepared meal is just a few clicks away. No
              subscriptions, no commitments — just great food.
            </p>
            <Link
              href="/order"
              className="btn-primary inline-flex items-center gap-2 text-lg"
            >
              Place Your Order <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
