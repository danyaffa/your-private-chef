"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Leaf,
  Heart,
  Sparkles,
  User,
  ChefHat,
  ShieldCheck,
  Apple,
  UtensilsCrossed,
  ArrowRight,
  X,
  Check,
} from "lucide-react";

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

const values = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Quality",
    description:
      "Every ingredient is hand-selected for freshness and flavor. We never cut corners.",
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Freshness",
    description:
      "Meals are prepared the same day they're delivered — never frozen, never reheated.",
  },
  {
    icon: <User className="w-8 h-8" />,
    title: "Personalization",
    description:
      "Your meals are built around your dietary needs, goals, and taste preferences.",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Health",
    description:
      "Nutrient-dense, balanced meals that support your wellness journey every day.",
  },
];

const differences = [
  {
    theirs: "Mass-produced in factories",
    ours: "Personally crafted by a professional chef",
  },
  {
    theirs: "One-size-fits-all menus",
    ours: "Custom per client dietary needs & goals",
  },
  {
    theirs: "Reheated & sitting in delivery bags",
    ours: "Restaurant-quality, prepared fresh daily",
  },
  {
    theirs: "Anonymous kitchen, unknown cooks",
    ours: "A dedicated chef who knows your name",
  },
];

export default function AboutPage() {
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
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl text-charcoal leading-tight mb-6"
          >
            About Your Private Chef
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-sans text-lg md:text-xl text-softBrown max-w-2xl mx-auto leading-relaxed"
          >
            Real food, made with real care — by a chef who treats every meal
            like it&apos;s for family.
          </motion.p>
        </div>
      </section>

      {/* Chef Story */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Image placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-goldLight/60 to-gold/30 flex items-center justify-center overflow-hidden shadow-xl">
                <ChefHat className="w-28 h-28 text-gold/50" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-xl bg-sage/20 -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-xl bg-terracotta/10 -z-10" />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <span className="inline-block text-terracotta font-semibold text-sm uppercase tracking-widest mb-3">
                Meet the Chef
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6 leading-snug">
                A Passion for Food, Perfected Over Years
              </h2>
              <div className="space-y-4 font-sans text-softBrown leading-relaxed text-base md:text-lg">
                <p>
                  With years of professional culinary experience — including
                  time honing craft at{" "}
                  <span className="font-semibold text-charcoal">
                    The Third Space Atlanta
                  </span>{" "}
                  — our chef brings restaurant-level expertise directly to your
                  table.
                </p>
                <p>
                  This isn&apos;t a side hustle or a hobby kitchen. It&apos;s a
                  deep, lifelong passion for creating food that nourishes the
                  body and delights the senses. Every dish is approached with
                  the same intention: make something you&apos;d be proud to
                  serve to the people you love most.
                </p>
                <p>
                  From classic comfort food to globally inspired plates, each
                  meal is thoughtfully composed with bold flavors, beautiful
                  presentation, and your personal preferences at the center.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality & Freshness */}
      <section className="bg-white/60 py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-sage font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Our Promise
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl md:text-4xl text-charcoal mb-6"
            >
              Quality &amp; Freshness, Every Single Day
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="font-sans text-softBrown text-lg max-w-2xl mx-auto mb-14 leading-relaxed"
            >
              We believe that great meals start with great ingredients. That&apos;s
              why we source farm-to-table produce, premium proteins, and
              wholesome staples — prepared fresh daily in our professional
              kitchen.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                icon: <Apple className="w-7 h-7" />,
                title: "Farm-to-Table Ingredients",
                text: "We prioritize locally sourced, seasonal produce and ethically raised proteins to ensure every bite is packed with natural flavor and nutrition.",
              },
              {
                icon: <Sparkles className="w-7 h-7" />,
                title: "Prepared Fresh Daily",
                text: "Nothing sits overnight. Your meals are cooked the same day they reach your door, so you taste the difference from the very first bite.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-cream rounded-2xl p-8 text-left shadow-sm border border-goldLight/30 card-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-sage/10 flex items-center justify-center text-sage mb-5">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-softBrown leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
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
              The Difference
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl md:text-4xl text-charcoal mb-4"
            >
              What Makes Us Different
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="font-sans text-softBrown text-lg max-w-2xl mx-auto leading-relaxed"
            >
              We&apos;re not UberEats. We&apos;re not a meal kit. Here&apos;s
              how Your Private Chef stands apart.
            </motion.p>
          </motion.div>

          <div className="space-y-5">
            {differences.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="grid md:grid-cols-2 gap-4"
              >
                {/* Theirs */}
                <div className="flex items-start gap-4 bg-white/70 rounded-xl p-5 border border-red-200/50">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-red-300 block mb-1">
                      Typical Delivery / Meal Kits
                    </span>
                    <p className="font-sans text-softBrown">{row.theirs}</p>
                  </div>
                </div>
                {/* Ours */}
                <div className="flex items-start gap-4 bg-sage/5 rounded-xl p-5 border border-sage/20">
                  <div className="w-8 h-8 rounded-full bg-sage/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-sage" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-sage block mb-1">
                      Your Private Chef
                    </span>
                    <p className="font-sans text-charcoal font-medium">
                      {row.ours}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-charcoal py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
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
              className="inline-block text-goldLight font-semibold text-sm uppercase tracking-widest mb-3"
            >
              What We Stand For
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl md:text-4xl text-white mb-4"
            >
              Our Core Values
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-white/5 backdrop-blur rounded-2xl p-7 border border-white/10 text-center card-hover"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-gold/15 flex items-center justify-center text-goldLight mb-5">
                  {v.icon}
                </div>
                <h3 className="font-serif text-xl text-white mb-2">
                  {v.title}
                </h3>
                <p className="font-sans text-white/60 text-sm leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
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
            <UtensilsCrossed className="w-10 h-10 text-gold mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              Ready to Taste the Difference?
            </h2>
            <p className="font-sans text-softBrown text-lg mb-8 leading-relaxed">
              Experience restaurant-quality meals made just for you — delivered
              fresh to your door.
            </p>
            <Link
              href="/order"
              className="btn-primary inline-flex items-center gap-2 text-lg"
            >
              Order Now <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
