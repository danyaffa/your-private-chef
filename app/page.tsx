"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import TestimonialCard from "../components/TestimonialCard";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const steps = [
  {
    num: 1,
    icon: "🎨",
    title: "Choose Your Style",
    desc: "Health-focused, gourmet, high-protein, keto, Mediterranean — pick what suits your lifestyle.",
  },
  {
    num: 2,
    icon: "📝",
    title: "Submit Preferences",
    desc: "Tell us your dietary needs, allergies, flavor preferences, and calorie goals.",
  },
  {
    num: 3,
    icon: "👨‍🍳",
    title: "Chef Prepares",
    desc: "Our professional chef crafts your meals in our licensed kitchen with fresh, quality ingredients.",
  },
  {
    num: 4,
    icon: "🚗",
    title: "Delivered Fresh",
    desc: "Meals arrive at your door, perfectly packaged and ready to heat and enjoy.",
  },
];

const featuredOptions = [
  {
    icon: "📅",
    title: "Weekly Meal Plans",
    desc: "Curated weekly menus tailored to your goals. Save time, eat well, and never wonder what's for dinner again.",
    gradient: "from-[#FFF8F0] to-[#F5E6D3]",
    href: "/menu",
  },
  {
    icon: "🍽️",
    title: "One-Time Gourmet Orders",
    desc: "Special occasion or just craving something extraordinary? Order a single gourmet meal whenever you like.",
    gradient: "from-[#FFF8F0] to-[#E8D5C4]",
    href: "/order",
  },
  {
    icon: "🥗",
    title: "Health-Focused Meals",
    desc: "Balanced macros, whole ingredients, and chef-level flavor. Eating healthy has never tasted this good.",
    gradient: "from-[#F0F7F1] to-[#D9EAD9]",
    href: "/menu",
  },
  {
    icon: "💊",
    title: "Custom Diet Support",
    desc: "GLP-1 friendly, high-protein, low-carb, post-surgery soft foods — we build meals around your medical and wellness needs.",
    gradient: "from-[#FFF5F0] to-[#F5DDD3]",
    href: "/meal-builder",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    quote:
      "I lost 32 pounds in four months without ever feeling like I was on a diet. The food is restaurant-quality and my energy levels have never been higher.",
    rating: 5,
    transformation: "Lost 32 lbs in 4 months",
  },
  {
    name: "James R.",
    quote:
      "As someone on GLP-1 medication, finding the right meals was a struggle. Your Private Chef made it effortless — perfectly portioned, nutrient-dense, and absolutely delicious.",
    rating: 5,
    transformation: "GLP-1 journey made easy",
  },
  {
    name: "Priya K.",
    quote:
      "I used to spend my entire Sunday meal prepping. Now I get chef-prepared meals delivered and have my weekends back. My whole family loves the food.",
    rating: 5,
    transformation: "Reclaimed 8+ hours per week",
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <>
      {/* ============================================================ */}
      {/*  HERO SECTION                                                */}
      {/* ============================================================ */}
      <section className="hero-gradient relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#C8986E]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-[#7A9E7E]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center lg:text-left"
            >
              <motion.h1
                custom={0}
                variants={fadeUp}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-charcoal leading-[1.1] tracking-tight"
              >
                Your Private Chef{" "}
                <span className="text-gold">— Delivered</span>
              </motion.h1>

              <motion.p
                custom={1}
                variants={fadeUp}
                className="mt-5 sm:mt-6 text-lg sm:text-xl text-softBrown max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                Custom meals, prepared in our professional kitchen, crafted just
                for you. Healthy, delicious, and delivered fresh to your door.
              </motion.p>

              <motion.div
                custom={2}
                variants={fadeUp}
                className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  href="/order"
                  className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-goldDark text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-colors shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/30"
                >
                  Order Your Meal
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/meal-builder"
                  className="inline-flex items-center justify-center gap-2 border-2 border-gold text-gold hover:bg-gold hover:text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all"
                >
                  Build AI Meal Plan
                  <span aria-hidden="true">✨</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — Decorative food illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-[#C8986E]/20 via-[#E8C9A0]/30 to-[#C67D5B]/20 flex items-center justify-center shadow-2xl shadow-gold/10">
                {/* Inner circle */}
                <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-white/80 to-[#FFF8F0] flex flex-col items-center justify-center shadow-inner">
                  <span className="text-6xl sm:text-7xl md:text-8xl" role="img" aria-label="Fork and knife">
                    🍽️
                  </span>
                  <p className="font-serif text-gold text-lg sm:text-xl font-semibold mt-3 tracking-wide">
                    Chef Crafted
                  </p>
                  <p className="text-softBrown text-sm mt-1">
                    Fresh &bull; Local &bull; Yours
                  </p>
                </div>

                {/* Floating accents */}
                <motion.span
                  className="absolute top-4 right-8 text-3xl sm:text-4xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  🌿
                </motion.span>
                <motion.span
                  className="absolute bottom-8 left-4 text-3xl sm:text-4xl"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                >
                  🍋
                </motion.span>
                <motion.span
                  className="absolute top-1/2 -left-2 text-2xl sm:text-3xl"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 1 }}
                >
                  🫒
                </motion.span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HOW IT WORKS                                                */}
      {/* ============================================================ */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.p custom={0} variants={fadeUp} className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
              Simple Process
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal"
            >
              How It Works
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} className="mt-4 text-softBrown max-w-2xl mx-auto text-lg">
              From your preferences to your plate in four easy steps.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                custom={i}
                variants={fadeUp}
                className="relative text-center group"
              >
                {/* Connector line (hidden on mobile, visible on lg) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[calc(100%-20%)] h-[2px] bg-gradient-to-r from-gold/40 to-gold/10" />
                )}

                {/* Number circle */}
                <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-gold to-goldDark flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-gold/20 mb-5 relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {step.num}
                </div>

                {/* Icon */}
                <span className="text-3xl block mb-3">{step.icon}</span>

                {/* Title */}
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-softBrown text-sm leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mt-12"
          >
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-gold hover:text-goldDark font-semibold text-lg transition-colors group"
            >
              See full details
              <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FEATURED OPTIONS                                            */}
      {/* ============================================================ */}
      <section className="bg-cream py-16 sm:py-20 lg:py-24 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.p custom={0} variants={fadeUp} className="text-sage font-semibold text-sm uppercase tracking-widest mb-3">
              What We Offer
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal"
            >
              Featured Options
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} className="mt-4 text-softBrown max-w-2xl mx-auto text-lg">
              Whether you need weekly meals or a one-time feast, we have a plan that fits your life.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-6 lg:gap-8"
          >
            {featuredOptions.map((option, i) => (
              <motion.div
                key={option.title}
                custom={i}
                variants={fadeUp}
                className={`bg-gradient-to-br ${option.gradient} rounded-3xl p-8 lg:p-10 border border-goldLight/20 shadow-sm hover:shadow-lg hover:shadow-gold/10 transition-all duration-300 group`}
              >
                <span className="text-4xl block mb-4">{option.icon}</span>
                <h3 className="font-serif text-2xl font-semibold text-charcoal mb-3 group-hover:text-gold transition-colors">
                  {option.title}
                </h3>
                <p className="text-softBrown leading-relaxed mb-6">
                  {option.desc}
                </p>
                <Link
                  href={option.href}
                  className="inline-flex items-center gap-2 text-gold hover:text-goldDark font-semibold transition-colors group/link"
                >
                  Learn More
                  <span className="group-hover/link:translate-x-1 transition-transform" aria-hidden="true">
                    →
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TESTIMONIALS                                                */}
      {/* ============================================================ */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.p custom={0} variants={fadeUp} className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-3">
              Real Results
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal"
            >
              What Our Clients Say
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} className="mt-4 text-softBrown max-w-2xl mx-auto text-lg">
              Real stories from people who transformed their health and lifestyle with our meals.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {testimonials.map((t, i) => (
              <motion.div key={t.name} custom={i} variants={fadeUp}>
                <TestimonialCard
                  name={t.name}
                  quote={t.quote}
                  rating={t.rating}
                  transformation={t.transformation}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  EMAIL CAPTURE                                               */}
      {/* ============================================================ */}
      <section className="sage-gradient py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              Get Your Custom Meal Plan
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-white/85 text-lg mb-8 max-w-xl mx-auto"
            >
              Drop your email and we will send you a personalized meal plan
              consultation — completely free. No spam, just delicious
              possibilities.
            </motion.p>
            <motion.form
              custom={2}
              variants={fadeUp}
              onSubmit={handleEmailSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="flex-1 px-5 py-4 rounded-2xl bg-white/95 text-charcoal placeholder:text-softBrown/50 focus:outline-none focus:ring-2 focus:ring-white/60 text-base shadow-sm"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gold hover:bg-goldDark text-white font-semibold rounded-2xl transition-colors shadow-lg shadow-gold/25 text-base whitespace-nowrap"
              >
                {submitted ? "Thank You! ✓" : "Get My Plan"}
              </button>
            </motion.form>
            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/90 mt-4 text-sm font-medium"
              >
                We will be in touch shortly with your personalized plan!
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA BANNER                                                  */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-r from-[#C8986E] via-[#D4A87A] to-[#C67D5B] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Ready to eat like royalty?
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-white/85 text-lg mb-8 max-w-2xl mx-auto"
            >
              Let our chef prepare your next meal. Premium ingredients,
              personalized recipes, delivered fresh.
            </motion.p>
            <motion.div custom={2} variants={fadeUp}>
              <Link
                href="/order"
                className="inline-flex items-center justify-center gap-2 bg-white text-gold hover:bg-cream font-bold px-10 py-4 rounded-2xl text-lg transition-colors shadow-xl shadow-black/10 hover:shadow-2xl"
              >
                Order Now
                <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
