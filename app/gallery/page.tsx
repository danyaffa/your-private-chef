"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const CALENDLY_URL = "https://calendly.com/itai-leff/15min?month=2026-03Meet";

const foodPhotos = [
  "0203DA92-08DA-4CD5-9F13-169870BBB71B.JPG",
  "10664B13-450C-4728-BEDE-F9087E2B335B.JPG",
  "4D9736A4-B0EF-45F9-A571-D699521FF774.JPG",
  "74B6B138-A94D-44CE-9023-378C9AB53565.JPG",
  "8967B85D-8AA1-4C0D-B806-12B0B8E5C867.JPG",
  "9504B70E-D13D-4A95-A443-75F4FDE93E96.JPG",
  "B13B53D7-0036-44E9-9F58-D112B1B57323.JPG",
  "D0E5EFCE-47A0-4F97-844E-32BB5D3EB7B5.JPG",
  "F3075F03-F88F-4451-8E87-95C4BB56D49F.JPG",
  "F84A51B8-0E50-47FF-AFBA-0943FF2EAFAA.JPG",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-darkBg">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-darkBg border-b border-darkBorder">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gold font-medium tracking-ultrawide uppercase text-sm mb-4"
          >
            From Chef Shai&apos;s Kitchen
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream mb-6"
            style={{ fontVariant: "small-caps" }}
          >
            Culinary Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-cream/60 max-w-2xl mx-auto leading-relaxed"
          >
            Every dish is crafted with care, using seasonal ingredients and
            inspired by your personal preferences.
          </motion.p>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6"
        >
          {foodPhotos.map((photo, index) => (
            <motion.div
              key={photo}
              custom={index}
              variants={fadeUp}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative overflow-hidden hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500">
                <Image
                  src={`/food-photos/${photo}`}
                  alt={`Chef Shai's dish ${index + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-cream/50 text-lg mb-6">
            Ready to taste it for yourself?
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gold/60 text-gold hover:bg-gold hover:text-darkBg font-medium px-10 py-4 text-lg tracking-wider uppercase transition-all duration-300"
          >
            Book Time with Shai
          </a>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-6 right-6 text-cream/60 hover:text-cream text-4xl font-light transition-colors"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close lightbox"
            >
              &times;
            </button>
            <Image
              src={`/food-photos/${selectedPhoto}`}
              alt="Chef Shai's dish"
              width={1200}
              height={800}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
