"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */
const CALENDLY_URL = "https://calendly.com/itai-leff/15min";
const THIRD_SPACE_URL = "https://www.thethirdspaceatlanta.com";

const foodPhotos = [
  "0203DA92-08DA-4CD5-9F13-169870BBB71B.JPG",
  "4D9736A4-B0EF-45F9-A571-D699521FF774.JPG",
  "74B6B138-A94D-44CE-9023-378C9AB53565.JPG",
  "8967B85D-8AA1-4C0D-B806-12B0B8E5C867.JPG",
  "9504B70E-D13D-4A95-A443-75F4FDE93E96.JPG",
  "B13B53D7-0036-44E9-9F58-D112B1B57323.JPG",
  "D0E5EFCE-47A0-4F97-844E-32BB5D3EB7B5.JPG",
  "F3075F03-F88F-4451-8E87-95C4BB56D49F.JPG",
  "F84A51B8-0E50-47FF-AFBA-0943FF2EAFAA.JPG",
];

const steps = [
  {
    num: 1,
    icon: "",
    title: "Book a Call",
    desc: "Schedule a free 15-minute consultation. We\u2019ll learn about your preferences, dietary needs, and schedule.",
  },
  {
    num: 2,
    icon: "",
    title: "Meet the Chef",
    desc: "Join Shai at The Third Space Restaurant (or via Zoom) for a personal tasting and to plan your custom menu.",
  },
  {
    num: 3,
    icon: "",
    title: "Fresh to Your Door",
    desc: "Receive your personally crafted meals delivered weekly — plated and ready to enjoy.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  const [availableSpots, setAvailableSpots] = useState(6);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const res = await fetch("/api/admin/availability");
        if (res.ok) {
          const data = await res.json();
          if (data.spots !== undefined) setAvailableSpots(data.spots);
        }
      } catch {
        // Use default
      }
    };
    fetchSpots();
  }, []);

  return (
    <>
      {/* ============================================================ */}
      {/*  HERO SECTION                                                */}
      {/* ============================================================ */}
      <section className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={`/food-photos/${foodPhotos[0]}`}
            alt="Chef Shai's cuisine"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              custom={0}
              variants={fadeUp}
              className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-wide"
              style={{ fontVariant: "small-caps" }}
            >
              Your Private Chef
              <span className="block text-gold mt-2">— Delivered</span>
            </motion.h1>

            <motion.p
              custom={1}
              variants={fadeUp}
              className="mt-6 sm:mt-8 text-lg sm:text-xl text-cream/80 max-w-2xl mx-auto leading-relaxed"
            >
              Private chef meals by Shai Lavi — personally crafted, locally
              sourced, and delivered fresh to your door.
            </motion.p>

            <motion.div
              custom={2}
              variants={fadeUp}
              className="mt-10 sm:mt-12"
            >
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-cream/40 text-cream hover:bg-cream/10 font-medium px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg tracking-wider uppercase transition-all duration-300"
              >
                Book Time With The Chef
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  THE EXPERIENCE                                              */}
      {/* ============================================================ */}
      <section id="the-experience" className="bg-darkBg py-20 sm:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.p custom={0} variants={fadeUp} className="text-gold font-medium text-sm uppercase tracking-ultrawide mb-4">
              The Experience
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-10"
              style={{ fontVariant: "small-caps" }}
            >
              This Isn&apos;t Meal Prep
            </motion.h2>
            <motion.div custom={2} variants={fadeUp} className="text-cream/70 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto space-y-6">
              <p>
                This is your personal chef — designing menus around your tastes,
                your dietary needs, your life. Every dish is prepared by Chef Shai
                Lavi using seasonal, locally sourced ingredients and delivered fresh
                to your door weekly.
              </p>
              <p>
                Because every client is different, we start with a conversation. No
                online ordering — just a 15-minute call to understand what you&apos;re
                looking for, followed by an in-person tasting meeting at{" "}
                <a
                  href={THIRD_SPACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-goldLight underline underline-offset-4 decoration-gold/40 transition-colors"
                >
                  The Third Space
                </a>{" "}
                (or via Zoom if needed).
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HOW IT WORKS — 3 STEPS                                     */}
      {/* ============================================================ */}
      <section className="bg-darkCard py-20 sm:py-24 lg:py-32 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p custom={0} variants={fadeUp} className="text-gold font-medium text-sm uppercase tracking-ultrawide mb-4">
              Simple Process
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream"
              style={{ fontVariant: "small-caps" }}
            >
              How It Works
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} className="mt-4 text-cream/60 max-w-2xl mx-auto text-lg">
              From your first call to meals at your table — three simple steps.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                custom={i}
                variants={fadeUp}
                className="relative text-center group"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-10 left-[60%] w-[calc(100%-20%)] h-[1px] bg-gradient-to-r from-gold/30 to-transparent" />
                )}

                {/* Number */}
                <div className="mx-auto w-20 h-20 border border-gold/40 flex items-center justify-center text-gold text-2xl font-serif font-bold mb-6 relative z-10 group-hover:bg-gold/10 transition-all duration-300">
                  {step.num}
                </div>

                <h3 className="font-serif text-xl font-semibold text-cream mb-3 tracking-wide">
                  {step.title}
                </h3>

                <p className="text-cream/60 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>

                {/* Step-specific links */}
                {step.num === 1 && (
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-5 text-gold hover:text-goldLight font-medium text-sm tracking-wider uppercase transition-colors"
                  >
                    Schedule Now <span aria-hidden="true">→</span>
                  </a>
                )}
                {step.num === 2 && (
                  <a
                    href={THIRD_SPACE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-5 text-gold hover:text-goldLight font-medium text-sm tracking-wider uppercase transition-colors"
                  >
                    The Third Space <span aria-hidden="true">→</span>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mt-16"
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gold/60 text-gold hover:bg-gold hover:text-darkBg font-medium px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg tracking-wider uppercase transition-all duration-300"
            >
              Book Time With The Chef
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SCARCITY / URGENCY BANNER                                   */}
      {/* ============================================================ */}
      <section className="bg-darkBg border-y border-darkBorder py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-gold font-medium text-sm uppercase tracking-ultrawide mb-4"
            >
              Limited Availability
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-cream mb-3"
              style={{ fontVariant: "small-caps" }}
            >
              {availableSpots} Openings Available This Month
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-cream/50 text-lg mb-10"
            >
              Secure your spot before they&apos;re gone.
            </motion.p>
            <motion.div custom={3} variants={fadeUp}>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-cream/40 text-cream hover:bg-cream/10 font-medium px-10 py-4 text-lg tracking-wider uppercase transition-all duration-300"
              >
                Book Your Consultation
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PHOTO GALLERY                                               */}
      {/* ============================================================ */}
      <section className="bg-darkCard py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p custom={0} variants={fadeUp} className="text-gold font-medium text-sm uppercase tracking-ultrawide mb-4">
              From Chef Shai&apos;s Kitchen
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream"
              style={{ fontVariant: "small-caps" }}
            >
              A Taste of What Awaits
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} className="mt-4 text-cream/60 max-w-2xl mx-auto text-lg">
              Every dish is crafted with care, using seasonal ingredients and
              inspired by your personal preferences.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            {foodPhotos.map((photo, i) => (
              <motion.div
                key={photo}
                custom={i}
                variants={fadeUp}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setLightboxPhoto(photo)}
              >
                <div className="relative overflow-hidden shadow-md hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500">
                  <Image
                    src={`/food-photos/${photo}`}
                    alt={`Chef Shai's dish ${i + 1}`}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mt-16"
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gold/60 text-gold hover:bg-gold hover:text-darkBg font-medium px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg tracking-wider uppercase transition-all duration-300"
            >
              Book Time With The Chef
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FINAL CTA                                                   */}
      {/* ============================================================ */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`/food-photos/${foodPhotos[3]}`}
            alt="Chef Shai's cuisine"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
              style={{ fontVariant: "small-caps" }}
            >
              Ready to Eat Like Royalty?
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-cream/70 text-lg mb-10 max-w-2xl mx-auto"
            >
              It all starts with a 15-minute conversation. Let Chef Shai design
              a menu that&apos;s uniquely yours.
            </motion.p>
            <motion.div custom={2} variants={fadeUp}>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-cream/40 text-cream hover:bg-cream/10 font-medium px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg tracking-wider uppercase transition-all duration-300"
              >
                Book Time With The Chef
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  LIGHTBOX                                                    */}
      {/* ============================================================ */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxPhoto(null)}
        >
          <button
            className="absolute top-6 right-6 text-cream/60 hover:text-cream text-4xl font-light transition-colors"
            onClick={() => setLightboxPhoto(null)}
            aria-label="Close lightbox"
          >
            &times;
          </button>
          <Image
            src={`/food-photos/${lightboxPhoto}`}
            alt="Chef Shai's dish"
            width={1200}
            height={800}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
