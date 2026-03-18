"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type GalleryCategory = "All" | "Breakfast" | "Lunch" | "Dinner" | "Desserts" | "Special Events";

interface GalleryItem {
  id: number;
  name: string;
  description: string;
  emoji: string;
  category: GalleryCategory;
  gradient: string;
  span: "normal" | "tall" | "wide";
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    name: "Sunrise Power Bowl",
    description: "Acai, granola, fresh berries, and honey drizzle",
    emoji: "🍓",
    category: "Breakfast",
    gradient: "from-rose-300 via-pink-200 to-orange-200",
    span: "tall",
  },
  {
    id: 2,
    name: "Mediterranean Feast",
    description: "Grilled lamb, hummus, warm pita, and tabbouleh",
    emoji: "🥙",
    category: "Lunch",
    gradient: "from-amber-300 via-yellow-200 to-orange-100",
    span: "normal",
  },
  {
    id: 3,
    name: "Pan-Seared Salmon",
    description: "Wild salmon with lemon butter, asparagus, and dill",
    emoji: "🐟",
    category: "Dinner",
    gradient: "from-sky-300 via-cyan-200 to-teal-100",
    span: "normal",
  },
  {
    id: 4,
    name: "Tiramisu Elegance",
    description: "Classic Italian tiramisu with mascarpone and espresso",
    emoji: "🍰",
    category: "Desserts",
    gradient: "from-amber-400 via-yellow-300 to-amber-200",
    span: "normal",
  },
  {
    id: 5,
    name: "Wedding Reception Spread",
    description: "Curated five-course tasting menu for your special day",
    emoji: "🥂",
    category: "Special Events",
    gradient: "from-violet-300 via-purple-200 to-fuchsia-100",
    span: "wide",
  },
  {
    id: 6,
    name: "Avocado Toast Deluxe",
    description: "Sourdough, poached eggs, microgreens, chili flakes",
    emoji: "🥑",
    category: "Breakfast",
    gradient: "from-green-300 via-emerald-200 to-lime-100",
    span: "normal",
  },
  {
    id: 7,
    name: "Grilled Steak Dinner",
    description: "Prime ribeye with truffle fries and red wine reduction",
    emoji: "🥩",
    category: "Dinner",
    gradient: "from-red-400 via-rose-300 to-amber-200",
    span: "tall",
  },
  {
    id: 8,
    name: "Thai Shrimp Salad",
    description: "Crispy shrimp, mango, glass noodles, spicy lime dressing",
    emoji: "🦐",
    category: "Lunch",
    gradient: "from-lime-300 via-emerald-200 to-teal-100",
    span: "normal",
  },
  {
    id: 9,
    name: "Creme Brulee",
    description: "Vanilla bean custard with a perfect caramelized top",
    emoji: "🍮",
    category: "Desserts",
    gradient: "from-yellow-300 via-amber-200 to-orange-100",
    span: "normal",
  },
  {
    id: 10,
    name: "Corporate Gala Dinner",
    description: "Elegant plated service for 200+ guests",
    emoji: "🍽️",
    category: "Special Events",
    gradient: "from-slate-400 via-zinc-300 to-stone-200",
    span: "normal",
  },
  {
    id: 11,
    name: "Fluffy Pancake Stack",
    description: "Buttermilk pancakes, maple syrup, fresh blueberries",
    emoji: "🥞",
    category: "Breakfast",
    gradient: "from-orange-300 via-amber-200 to-yellow-100",
    span: "normal",
  },
  {
    id: 12,
    name: "Herb-Crusted Rack of Lamb",
    description: "Rosemary lamb with roasted vegetables and mint jus",
    emoji: "🍖",
    category: "Dinner",
    gradient: "from-emerald-400 via-green-300 to-lime-200",
    span: "wide",
  },
  {
    id: 13,
    name: "Poke Bowl",
    description: "Fresh ahi tuna, edamame, cucumber, spicy mayo",
    emoji: "🍣",
    category: "Lunch",
    gradient: "from-teal-300 via-cyan-200 to-sky-100",
    span: "normal",
  },
  {
    id: 14,
    name: "Chocolate Lava Cake",
    description: "Warm molten center with vanilla bean ice cream",
    emoji: "🍫",
    category: "Desserts",
    gradient: "from-amber-500 via-orange-400 to-yellow-300",
    span: "tall",
  },
  {
    id: 15,
    name: "Birthday Celebration",
    description: "Custom themed dinner party with personal chef service",
    emoji: "🎂",
    category: "Special Events",
    gradient: "from-pink-400 via-rose-300 to-fuchsia-200",
    span: "normal",
  },
  {
    id: 16,
    name: "Tuscan Pasta Night",
    description: "Handmade pappardelle with wild boar ragu",
    emoji: "🍝",
    category: "Dinner",
    gradient: "from-orange-400 via-red-300 to-rose-200",
    span: "normal",
  },
];

const categories: GalleryCategory[] = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Desserts",
  "Special Events",
];

const categoryEmojis: Record<GalleryCategory, string> = {
  All: "✨",
  Breakfast: "🌅",
  Lunch: "☀️",
  Dinner: "🌙",
  Desserts: "🍰",
  "Special Events": "🎉",
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-[#F5E6D3] to-goldLight">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #C8986E 0.8px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gold font-semibold tracking-widest uppercase text-sm mb-4"
          >
            A Feast for the Eyes
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-charcoal mb-6"
          >
            Our Culinary Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-softBrown max-w-2xl mx-auto leading-relaxed"
          >
            Every dish tells a story. Browse through our collection of
            chef-crafted meals and find your next favorite.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-30 bg-cream/90 backdrop-blur-md border-b border-goldLight/40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide justify-center flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                  ${
                    activeCategory === cat
                      ? "bg-gold text-white shadow-lg shadow-gold/25"
                      : "bg-white text-charcoal hover:bg-goldLight/30 border border-goldLight/50"
                  }
                `}
              >
                <span className="text-base">{categoryEmojis[cat]}</span>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6"
          >
            {filtered.map((item, index) => {
              const heightClass =
                item.span === "tall"
                  ? "h-80 sm:h-96"
                  : item.span === "wide"
                  ? "h-56 sm:h-64"
                  : "h-56 sm:h-72";

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="break-inside-avoid"
                >
                  <div
                    onClick={() => setSelectedItem(item)}
                    className={`
                      group relative ${heightClass} bg-gradient-to-br ${item.gradient}
                      rounded-2xl overflow-hidden cursor-pointer shadow-md
                      hover:shadow-2xl transition-all duration-500 hover:-translate-y-1
                    `}
                  >
                    {/* Decorative pattern overlay */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />

                    {/* Emoji center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl sm:text-8xl opacity-80 group-hover:scale-125 group-hover:opacity-100 transition-all duration-700 ease-out drop-shadow-lg">
                        {item.emoji}
                      </span>
                    </div>

                    {/* Bottom overlay with name */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 sm:p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="inline-block bg-white/20 backdrop-blur-sm text-white/90 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl text-white leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {item.description}
                      </p>
                    </div>

                    {/* Hover border glow */}
                    <div className="absolute inset-0 rounded-2xl ring-0 ring-white/0 group-hover:ring-2 group-hover:ring-white/30 transition-all duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-softBrown text-lg">
              No gallery items in this category yet. Check back soon!
            </p>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedItem(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ duration: 0.4, type: "spring", damping: 25 }}
              className="relative w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 sm:-right-2 text-white/80 hover:text-white transition-colors z-10 flex items-center gap-1.5 text-sm font-medium"
              >
                <span>Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                {/* Image area */}
                <div
                  className={`relative h-72 sm:h-80 bg-gradient-to-br ${selectedItem.gradient} flex items-center justify-center`}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <span className="text-8xl sm:text-9xl drop-shadow-lg">
                    {selectedItem.emoji}
                  </span>
                </div>

                {/* Content area */}
                <div className="p-6 sm:p-8">
                  <span className="inline-block bg-goldLight/30 text-gold text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {selectedItem.category}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-charcoal mb-3">
                    {selectedItem.name}
                  </h2>
                  <p className="text-softBrown text-base leading-relaxed mb-6">
                    {selectedItem.description}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="/order"
                      className="flex-1 inline-flex items-center justify-center py-3 rounded-full bg-gold text-white font-semibold text-sm hover:bg-goldDark transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                    >
                      Order Something Like This
                    </a>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="px-5 py-3 rounded-full border border-goldLight/60 text-softBrown font-medium text-sm hover:bg-goldLight/10 transition-all duration-300"
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
