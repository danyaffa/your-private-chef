"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface MealCardProps {
  name: string;
  description: string;
  price: number;
  category: string;
  gradient?: string;
}

export default function MealCard({
  name,
  description,
  price,
  category,
  gradient = "from-gold via-terracotta to-goldDark",
}: MealCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md shadow-goldLight/20 border border-goldLight/15 group cursor-pointer"
    >
      {/* Image Placeholder with gradient */}
      <div
        className={`relative h-48 sm:h-56 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}
      >
        {/* Subtle light overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_40%,white_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 to-transparent" />

        <span className="text-5xl select-none drop-shadow-md group-hover:scale-110 transition-transform duration-300">
          🍽️
        </span>

        {/* Category Tag */}
        <span className="absolute top-3 left-3 inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-charcoal rounded-full shadow-sm">
          {category}
        </span>

        {/* Price Badge */}
        <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-goldDark font-bold text-sm px-3 py-1.5 rounded-full shadow-sm">
          ${price.toFixed(2)}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6">
        <h3 className="font-serif text-lg sm:text-xl font-semibold text-charcoal mb-2 group-hover:text-goldDark transition-colors duration-200">
          {name}
        </h3>

        <p className="text-softBrown text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        <Link
          href="/order"
          className="block w-full text-center bg-gold hover:bg-goldDark text-white font-semibold py-2.5 rounded-full transition-colors duration-200 text-sm tracking-wide shadow-sm active:scale-95"
        >
          Order Now
        </Link>
      </div>
    </motion.div>
  );
}
