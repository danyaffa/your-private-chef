"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChefHat,
  Award,
  Leaf,
  Heart,
  Shield,
  Utensils,
  Star,
  Clock,
  MapPin,
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

export default function ChefPage() {
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
              The Heart Behind Every Dish
            </span>
          </motion.div>
          <motion.h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-cream leading-tight"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
          >
            Meet Your Chef
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-goldLight/80 text-lg sm:text-xl font-sans"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
          >
            Passion, precision, and a personal touch in every bite
          </motion.p>
        </div>
      </section>

      {/* ── Chef Profile Section ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Portrait */}
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={scaleIn}
          >
            <div className="relative mx-auto w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-gold via-terracotta to-sage flex items-center justify-center">
                <span className="text-[120px] sm:text-[160px] select-none">
                  👨‍🍳
                </span>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-2 sm:right-4 bg-white rounded-xl shadow-lg px-5 py-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-terracotta" />
              <span className="font-sans text-charcoal font-semibold text-sm">
                15+ Years Experience
              </span>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.span
              className="inline-block px-3 py-1 mb-3 rounded-full bg-sage/15 text-sage text-xs font-sans font-semibold tracking-wider uppercase"
              variants={fadeUp}
              custom={0}
            >
              Executive Chef &amp; Founder
            </motion.span>
            <motion.h2
              className="font-serif text-3xl sm:text-4xl text-charcoal"
              variants={fadeUp}
              custom={1}
            >
              Chef Marcus
            </motion.h2>
            <motion.p
              className="mt-1 text-gold font-sans font-medium"
              variants={fadeUp}
              custom={2}
            >
              Inspired by The Third Space Atlanta
            </motion.p>
            <motion.div
              className="mt-6 space-y-4 text-softBrown font-sans leading-relaxed"
              variants={fadeUp}
              custom={3}
            >
              <p>
                With over <strong className="text-charcoal">15 years</strong> in
                professional kitchens, Chef Marcus brings a rare blend of
                classical French technique and soulful Southern cuisine to every
                plate he creates.
              </p>
              <p>
                After training under world-class mentors and honing his craft at
                some of Atlanta&apos;s most celebrated restaurants, he founded{" "}
                <strong className="text-charcoal">The Third Space</strong> as a
                creative culinary hub where food meets artistry.
              </p>
              <p>
                His passion for personalized nutrition and gourmet dining drives
                everything he does&mdash;turning everyday meals into
                extraordinary experiences tailored just for you.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Background Story Cards ── */}
      <section className="bg-warmWhite py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.h2
            className="text-center font-serif text-3xl sm:text-4xl text-charcoal mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            A Culinary Journey
          </motion.h2>
          <motion.p
            className="text-center text-softBrown font-sans max-w-xl mx-auto mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            From classical training to your personal kitchen
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Award className="w-7 h-7" />,
                title: "Classical Training",
                text: "Trained in classical French & Southern cuisine under world-renowned chefs",
              },
              {
                icon: <Star className="w-7 h-7" />,
                title: "Top Restaurants",
                text: "Worked at Atlanta\u2019s finest restaurants, earning critical acclaim",
              },
              {
                icon: <Utensils className="w-7 h-7" />,
                title: "The Third Space",
                text: "Founded The Third Space as a creative culinary hub in Atlanta",
              },
              {
                icon: <Heart className="w-7 h-7" />,
                title: "Personalized Dining",
                text: "Passion for personalized nutrition and gourmet dining experiences",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-goldLight/30"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={i}
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="font-serif text-lg text-charcoal mb-2">
                  {card.title}
                </h3>
                <p className="text-softBrown font-sans text-sm leading-relaxed">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Kitchen Section ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2
              className="font-serif text-3xl sm:text-4xl text-charcoal mb-2"
              variants={fadeUp}
              custom={0}
            >
              The Kitchen
            </motion.h2>
            <motion.p
              className="text-gold font-sans font-medium mb-6"
              variants={fadeUp}
              custom={1}
            >
              Where the magic happens
            </motion.p>
            <motion.div
              className="space-y-5"
              variants={fadeUp}
              custom={2}
            >
              {[
                {
                  icon: <ChefHat className="w-5 h-5 text-terracotta" />,
                  label: "Professional Kitchen",
                  desc: "A fully equipped professional-grade kitchen designed for crafting exceptional meals at scale.",
                },
                {
                  icon: <Star className="w-5 h-5 text-terracotta" />,
                  label: "State-of-the-Art Equipment",
                  desc: "Commercial-grade appliances and tools to ensure every dish meets the highest standard.",
                },
                {
                  icon: <Shield className="w-5 h-5 text-terracotta" />,
                  label: "Health & Safety Certified",
                  desc: "Fully certified and regularly inspected to guarantee food safety and cleanliness.",
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-terracotta/10 flex items-center justify-center mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-charcoal">
                      {item.label}
                    </h4>
                    <p className="text-softBrown font-sans text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Kitchen Visual */}
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={scaleIn}
          >
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-goldLight via-gold to-terracotta flex items-center justify-center">
              <div className="text-center">
                <span className="text-[80px] sm:text-[100px] block select-none">
                  🍳
                </span>
                <span className="text-white/90 font-sans text-sm font-medium mt-2 block">
                  The Third Space Kitchen
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Philosophy Section ── */}
      <section className="bg-gradient-to-br from-charcoal via-charcoal to-softBrown py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.span
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-gold/20 text-goldLight text-sm font-sans tracking-wide"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            Our Philosophy
          </motion.span>
          <motion.h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream leading-tight mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            &ldquo;Every meal should be an experience&rdquo;
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto text-goldLight/70 font-sans mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
          >
            Chef Marcus believes that food is more than sustenance&mdash;it is a
            craft, a conversation, and a celebration.
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Leaf className="w-7 h-7" />,
                title: "Farm-to-Table",
                text: "Sourcing the freshest local produce and proteins from trusted farms",
              },
              {
                icon: <Star className="w-7 h-7" />,
                title: "Seasonal Ingredients",
                text: "Menus that celebrate what\u2019s in season for peak flavor and nutrition",
              },
              {
                icon: <Heart className="w-7 h-7" />,
                title: "Custom-Tailored",
                text: "Every meal is designed around your preferences, goals, and dietary needs",
              },
              {
                icon: <Utensils className="w-7 h-7" />,
                title: "Gourmet Quality",
                text: "Restaurant-caliber dishes crafted with care and delivered to your door",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={i}
              >
                <div className="w-12 h-12 rounded-xl bg-gold/20 text-goldLight flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="font-serif text-lg text-cream mb-2">
                  {card.title}
                </h3>
                <p className="text-goldLight/60 font-sans text-sm leading-relaxed">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications & Credentials ── */}
      <section className="bg-warmWhite py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.h2
            className="text-center font-serif text-3xl sm:text-4xl text-charcoal mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            Certifications &amp; Credentials
          </motion.h2>
          <motion.p
            className="text-center text-softBrown font-sans max-w-xl mx-auto mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            Trained, certified, and committed to excellence
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              "ServSafe Food Protection Manager Certified",
              "Classical French Culinary Training",
              "Southern Cuisine Specialist",
              "Nutrition & Dietary Planning",
              "Health & Safety Compliance",
              "Also featured at The Third Space Atlanta",
            ].map((cred, i) => (
              <motion.div
                key={cred}
                className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-sm border border-goldLight/20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeUp}
                custom={i * 0.5}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sage/15 text-sage flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <span className="font-sans text-sm text-charcoal font-medium">
                  {cred}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            className="bg-gradient-to-br from-gold to-terracotta rounded-3xl p-10 sm:p-14 shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
          >
            <MapPin className="w-10 h-10 text-white/80 mx-auto mb-4" />
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-3">
              Let Chef Marcus Create Your Next Meal
            </h2>
            <p className="text-white/80 font-sans mb-8 max-w-lg mx-auto">
              Experience personalized gourmet dining crafted just for you, from
              The Third Space Atlanta kitchen to your table.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-charcoal font-sans font-semibold px-8 py-3.5 rounded-full hover:bg-cream transition-colors shadow-lg"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
