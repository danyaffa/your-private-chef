"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Category = "All" | "High Protein" | "Mediterranean" | "Weight Loss" | "Gourmet" | "Family";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category[];
  gradient: string;
  emoji: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Grilled Herb Chicken with Quinoa & Roasted Vegetables",
    description:
      "Tender herb-marinated chicken breast served on a bed of fluffy quinoa with seasonal roasted vegetables and a lemon-herb drizzle.",
    price: 18,
    category: ["High Protein"],
    gradient: "from-amber-200 via-orange-100 to-yellow-100",
    emoji: "🍗",
  },
  {
    id: 2,
    name: "Mediterranean Salmon Bowl",
    description:
      "Wild-caught salmon over mixed greens with kalamata olives, cherry tomatoes, cucumber, feta, and a bright lemon-tahini dressing.",
    price: 22,
    category: ["Mediterranean", "High Protein"],
    gradient: "from-rose-200 via-pink-100 to-orange-100",
    emoji: "🐟",
  },
  {
    id: 3,
    name: "Lean Protein Power Plate",
    description:
      "A balanced trio of grilled chicken, turkey meatballs, and egg whites with sweet potato and steamed broccoli.",
    price: 20,
    category: ["High Protein", "Weight Loss"],
    gradient: "from-emerald-200 via-green-100 to-lime-100",
    emoji: "💪",
  },
  {
    id: 4,
    name: "Thai Basil Stir-Fry with Brown Rice",
    description:
      "Aromatic Thai basil stir-fry with crisp vegetables, tofu or chicken, in a savory garlic-chili sauce over nutty brown rice.",
    price: 17,
    category: ["Mediterranean"],
    gradient: "from-lime-200 via-emerald-100 to-teal-100",
    emoji: "🥘",
  },
  {
    id: 5,
    name: "GLP-1 Support Meal",
    description:
      "Low glycemic, high protein meal designed to support GLP-1 medication. Lean proteins, complex carbs, and fiber-rich vegetables.",
    price: 24,
    category: ["Weight Loss", "High Protein"],
    gradient: "from-violet-200 via-purple-100 to-fuchsia-100",
    emoji: "🥗",
  },
  {
    id: 6,
    name: "Gourmet Steak with Truffle Mashed Potatoes",
    description:
      "Prime grass-fed steak cooked to perfection, served with velvety truffle-infused mashed potatoes and grilled asparagus.",
    price: 32,
    category: ["Gourmet"],
    gradient: "from-red-300 via-rose-200 to-amber-100",
    emoji: "🥩",
  },
  {
    id: 7,
    name: "Vegan Buddha Bowl",
    description:
      "A nourishing bowl of roasted chickpeas, sweet potato, avocado, quinoa, pickled onions, and creamy tahini dressing.",
    price: 16,
    category: ["Mediterranean", "Weight Loss"],
    gradient: "from-teal-200 via-cyan-100 to-sky-100",
    emoji: "🥑",
  },
  {
    id: 8,
    name: "Grilled Shrimp Caesar",
    description:
      "Plump grilled shrimp atop crisp romaine with house-made Caesar dressing, shaved parmesan, and garlic croutons.",
    price: 19,
    category: ["High Protein", "Mediterranean"],
    gradient: "from-yellow-200 via-amber-100 to-orange-100",
    emoji: "🦐",
  },
  {
    id: 9,
    name: "Keto Plate",
    description:
      "Grilled chicken thigh, ripe avocado, mixed greens, bacon crumbles, and a creamy ranch drizzle. Ultra low-carb.",
    price: 21,
    category: ["Weight Loss", "High Protein"],
    gradient: "from-green-200 via-emerald-100 to-teal-100",
    emoji: "🥬",
  },
  {
    id: 10,
    name: "Family Feast - Herb Roasted Chicken for 4",
    description:
      "A whole herb-roasted chicken with roasted root vegetables, garlic bread, and a fresh garden salad. Feeds the whole family.",
    price: 48,
    category: ["Family", "Gourmet"],
    gradient: "from-orange-300 via-amber-200 to-yellow-100",
    emoji: "🍖",
  },
  {
    id: 11,
    name: "Mediterranean Mezze Platter",
    description:
      "A generous spread of hummus, baba ganoush, falafel, pita, tabbouleh, and marinated olives. Perfect for sharing.",
    price: 26,
    category: ["Mediterranean", "Family"],
    gradient: "from-amber-300 via-yellow-200 to-lime-100",
    emoji: "🧆",
  },
  {
    id: 12,
    name: "Breakfast Power Bowl",
    description:
      "Scrambled eggs, turkey sausage, roasted sweet potato, sauteed spinach, and avocado with a drizzle of hot honey.",
    price: 15,
    category: ["High Protein"],
    gradient: "from-sky-200 via-indigo-100 to-violet-100",
    emoji: "🍳",
  },
];

const categories: Category[] = [
  "All",
  "High Protein",
  "Mediterranean",
  "Weight Loss",
  "Gourmet",
  "Family",
];

const categoryColors: Record<string, string> = {
  "High Protein": "bg-emerald-100 text-emerald-700",
  Mediterranean: "bg-sky-100 text-sky-700",
  "Weight Loss": "bg-violet-100 text-violet-700",
  Gourmet: "bg-rose-100 text-rose-700",
  Family: "bg-amber-100 text-amber-700",
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category.includes(activeCategory));

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-[#F5E6D3] to-goldLight">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #C8986E 0.5px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />
        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gold font-semibold tracking-widest uppercase text-sm mb-4"
          >
            Crafted with Love
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-charcoal mb-6"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-softBrown max-w-2xl mx-auto leading-relaxed"
          >
            Our menu is never fixed &mdash; every meal is custom-crafted for you.
            Here are some of our most popular styles:
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-0 z-30 bg-cream/90 backdrop-blur-md border-b border-goldLight/40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide justify-center flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                  ${
                    activeCategory === cat
                      ? "bg-gold text-white shadow-lg shadow-gold/25"
                      : "bg-white text-charcoal hover:bg-goldLight/30 border border-goldLight/50"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Gradient Image Area */}
                <div
                  className={`relative h-48 bg-gradient-to-br ${item.gradient} flex items-center justify-center overflow-hidden`}
                >
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-500">
                    {item.emoji}
                  </span>
                  {/* Price Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                    <span className="text-charcoal font-bold text-lg">
                      ${item.price}
                    </span>
                  </div>
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-300" />
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Category Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.category.map((cat) => (
                      <span
                        key={cat}
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${categoryColors[cat]}`}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-serif text-lg text-charcoal mb-2 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-sm text-softBrown/80 leading-relaxed mb-4 flex-1">
                    {item.description}
                  </p>

                  <Link
                    href="/order"
                    className="inline-flex items-center justify-center w-full py-2.5 rounded-full bg-gold/10 text-gold font-semibold text-sm hover:bg-gold hover:text-white transition-all duration-300 border border-gold/20 hover:border-gold"
                  >
                    Order This
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-softBrown text-lg">
              No items in this category yet. Check back soon!
            </p>
          </div>
        )}
      </section>

      {/* Pricing Note */}
      <section className="max-w-4xl mx-auto px-6 pb-8">
        <div className="bg-white border border-goldLight/40 rounded-2xl p-6 text-center">
          <p className="text-softBrown text-sm">
            <span className="text-gold font-semibold">Note:</span> Prices shown
            are starting prices. Custom modifications are always available &mdash;
            just let us know your preferences.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-charcoal to-[#2A2A2A] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Want Something Completely Custom?
            </h2>
            <p className="text-goldLight text-lg mb-8 leading-relaxed">
              Our chef loves a challenge. Tell us your dietary needs, flavor
              preferences, or dream meal &mdash; and we&apos;ll make it happen.
            </p>
            <Link
              href="/order"
              className="inline-block bg-gold text-white font-semibold py-3.5 px-10 rounded-full hover:bg-goldDark transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 text-lg"
            >
              Build Your Custom Meal
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
