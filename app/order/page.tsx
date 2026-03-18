"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type OrderType = "one-time" | "weekly" | "custom";

const mealTypes = ["High Protein", "Mediterranean", "Weight Loss", "Gourmet", "Keto", "Vegan", "Custom"];
const restrictions = ["Gluten-free", "Dairy-free", "Nut-free", "Halal", "Kosher"];
const spiceLevels = ["Mild", "Medium", "Spicy"];
const addOns = [
  { id: "extra", label: "Extra Meal", price: 15, desc: "Add an additional meal to your order" },
  { id: "family", label: "Family Pack Upgrade", price: 25, desc: "Double portions for the whole family" },
  { id: "nutrition", label: "Nutrition Consultation", price: 49, desc: "1-on-1 session with our nutritionist" },
  { id: "planning", label: "Custom Meal Planning", price: 79, desc: "Personalized weekly meal blueprint" },
];

export default function OrderPage() {
  const [orderType, setOrderType] = useState<OrderType>("one-time");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", deliveryDate: "", deliveryTime: "Afternoon",
    mealType: "High Protein", dietaryRestrictions: [] as string[], allergies: "", spiceLevel: "Medium",
    instructions: "", mealsPerWeek: 5, duration: "1 month",
  });
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const basePrice = orderType === "one-time" ? 22 : orderType === "weekly" ? form.mealsPerWeek * 18 : 0;
  const addOnTotal = addOns.filter((a) => selectedAddOns.includes(a.id)).reduce((sum, a) => sum + a.price, 0);
  const weeklyMultiplier = orderType === "weekly" ? (form.duration === "1 month" ? 4 : form.duration === "3 months" ? 12 : 1) : 1;
  const total = (basePrice * weeklyMultiplier) + addOnTotal;

  const toggleRestriction = (r: string) => {
    setForm((f) => ({
      ...f,
      dietaryRestrictions: f.dietaryRestrictions.includes(r)
        ? f.dietaryRestrictions.filter((x) => x !== r)
        : [...f.dietaryRestrictions, r],
    }));
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email is required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.address.trim()) errs.address = "Delivery address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">
          <span className="text-7xl block mb-4">🎉</span>
          <h2 className="text-3xl font-serif text-charcoal mb-3">Order Confirmed!</h2>
          <p className="text-softBrown mb-2">Thank you, {form.name}!</p>
          <p className="text-softBrown mb-6">We will contact you at {form.email} to confirm your {orderType === "weekly" ? "subscription" : "order"} details and arrange payment.</p>
          <div className="bg-cream rounded-2xl p-4 mb-6 text-left text-sm">
            <p className="font-semibold text-charcoal mb-2">Order Summary:</p>
            <p className="text-softBrown">Type: {orderType === "one-time" ? "One-Time Order" : orderType === "weekly" ? "Weekly Subscription" : "Custom Plan"}</p>
            <p className="text-softBrown">Meal: {form.mealType}</p>
            <p className="text-softBrown">Delivery: {form.address}</p>
            {total > 0 && <p className="text-gold font-semibold mt-2">Estimated Total: ${total}</p>}
          </div>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="btn-outline text-sm">Back Home</Link>
            <button onClick={() => setSubmitted(false)} className="btn-primary text-sm">Place Another Order</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-20 px-6 text-center hero-gradient">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-6xl font-serif text-charcoal mb-4">Place Your Order</h1>
          <p className="text-lg text-softBrown max-w-2xl mx-auto">Tell us what you want, and Chef Marcus will craft it fresh in our kitchen</p>
        </motion.div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Order Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {([
              { type: "one-time" as OrderType, icon: "🍽️", title: "One-Time Order", desc: "Single delivery, starting at $22" },
              { type: "weekly" as OrderType, icon: "📅", title: "Weekly Subscription", desc: "Recurring meals, save 15%" },
              { type: "custom" as OrderType, icon: "✨", title: "Custom Plan", desc: "Fully tailored to your goals" },
            ]).map((opt) => (
              <button
                key={opt.type}
                onClick={() => setOrderType(opt.type)}
                className={`p-6 rounded-2xl text-left transition-all duration-300 ${
                  orderType === opt.type
                    ? "bg-gold text-white shadow-lg scale-[1.02]"
                    : "bg-white text-charcoal shadow-md hover:shadow-lg"
                }`}
              >
                <span className="text-3xl block mb-2">{opt.icon}</span>
                <h3 className="font-semibold text-lg">{opt.title}</h3>
                <p className={`text-sm mt-1 ${orderType === opt.type ? "text-white/80" : "text-softBrown"}`}>{opt.desc}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Info */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-xl font-serif text-charcoal mb-5 flex items-center gap-2">👤 Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`w-full border rounded-xl px-4 py-3 bg-cream/50 text-charcoal ${errors.name ? "border-red-400" : "border-goldLight"}`} placeholder="Full name" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={`w-full border rounded-xl px-4 py-3 bg-cream/50 text-charcoal ${errors.email ? "border-red-400" : "border-goldLight"}`} placeholder="your@email.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Phone *</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={`w-full border rounded-xl px-4 py-3 bg-cream/50 text-charcoal ${errors.phone ? "border-red-400" : "border-goldLight"}`} placeholder="(xxx) xxx-xxxx" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-xl font-serif text-charcoal mb-5 flex items-center gap-2">🚗 Delivery Details</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Delivery Address *</label>
                  <textarea rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={`w-full border rounded-xl px-4 py-3 bg-cream/50 text-charcoal resize-none ${errors.address ? "border-red-400" : "border-goldLight"}`} placeholder="Full delivery address" />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">Preferred Delivery Date</label>
                    <input type="date" value={form.deliveryDate} onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })} className="w-full border border-goldLight rounded-xl px-4 py-3 bg-cream/50 text-charcoal" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">Delivery Time</label>
                    <div className="flex gap-3">
                      {["Morning", "Afternoon", "Evening"].map((t) => (
                        <button key={t} type="button" onClick={() => setForm({ ...form, deliveryTime: t })} className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${form.deliveryTime === t ? "bg-gold text-white" : "bg-cream text-charcoal border border-goldLight"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Meal Preferences */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-xl font-serif text-charcoal mb-5 flex items-center gap-2">🍽️ Meal Preferences</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Meal Type</label>
                  <select value={form.mealType} onChange={(e) => setForm({ ...form, mealType: e.target.value })} className="w-full border border-goldLight rounded-xl px-4 py-3 bg-cream/50 text-charcoal">
                    {mealTypes.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Dietary Restrictions</label>
                  <div className="flex flex-wrap gap-3">
                    {restrictions.map((r) => (
                      <button key={r} type="button" onClick={() => toggleRestriction(r)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${form.dietaryRestrictions.includes(r) ? "bg-sage text-white" : "bg-cream text-charcoal border border-goldLight"}`}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Allergies</label>
                  <input type="text" value={form.allergies} onChange={(e) => setForm({ ...form, allergies: e.target.value })} className="w-full border border-goldLight rounded-xl px-4 py-3 bg-cream/50 text-charcoal" placeholder="List any allergies..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Spice Level</label>
                  <div className="flex gap-3">
                    {spiceLevels.map((s) => (
                      <button key={s} type="button" onClick={() => setForm({ ...form, spiceLevel: s })} className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${form.spiceLevel === s ? "bg-terracotta text-white" : "bg-cream text-charcoal border border-goldLight"}`}>
                        {s === "Mild" ? "🌶️" : s === "Medium" ? "🌶️🌶️" : "🌶️🌶️🌶️"} {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Special Instructions</label>
                  <textarea rows={3} value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })} className="w-full border border-goldLight rounded-xl px-4 py-3 bg-cream/50 text-charcoal resize-none" placeholder="Any special requests..." />
                </div>
              </div>
            </div>

            {/* Subscription Options */}
            <AnimatePresence>
              {orderType === "weekly" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-white rounded-3xl shadow-lg p-8">
                  <h2 className="text-xl font-serif text-charcoal mb-5 flex items-center gap-2">📅 Subscription Options</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Meals Per Week</label>
                      <div className="flex gap-3">
                        {[3, 5, 7].map((n) => (
                          <button key={n} type="button" onClick={() => setForm({ ...form, mealsPerWeek: n })} className={`flex-1 py-3 rounded-xl font-semibold transition-all ${form.mealsPerWeek === n ? "bg-gold text-white" : "bg-cream text-charcoal border border-goldLight"}`}>
                            {n} meals
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Duration</label>
                      <div className="flex gap-3">
                        {["1 week", "1 month", "3 months"].map((d) => (
                          <button key={d} type="button" onClick={() => setForm({ ...form, duration: d })} className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${form.duration === d ? "bg-gold text-white" : "bg-cream text-charcoal border border-goldLight"}`}>
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Add-ons */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-xl font-serif text-charcoal mb-5 flex items-center gap-2">⭐ Add-Ons & Extras</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addOns.map((addon) => (
                  <button key={addon.id} type="button" onClick={() => toggleAddOn(addon.id)} className={`p-4 rounded-2xl text-left transition-all ${selectedAddOns.includes(addon.id) ? "bg-gold/10 border-2 border-gold" : "bg-cream border-2 border-transparent hover:border-goldLight"}`}>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-charcoal">{addon.label}</h3>
                      <span className="text-gold font-bold">+${addon.price}</span>
                    </div>
                    <p className="text-softBrown text-sm mt-1">{addon.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            {orderType !== "custom" && (
              <div className="bg-gradient-to-br from-gold/10 to-goldLight/20 rounded-3xl shadow-lg p-8">
                <h2 className="text-xl font-serif text-charcoal mb-4">Order Summary</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-softBrown">{orderType === "weekly" ? `${form.mealsPerWeek} meals/week × ${form.duration}` : "One-time order"}</span><span className="text-charcoal font-medium">${basePrice * weeklyMultiplier}</span></div>
                  {addOns.filter((a) => selectedAddOns.includes(a.id)).map((a) => (
                    <div key={a.id} className="flex justify-between"><span className="text-softBrown">{a.label}</span><span className="text-charcoal font-medium">${a.price}</span></div>
                  ))}
                  <div className="border-t border-gold/30 pt-3 mt-3 flex justify-between">
                    <span className="text-charcoal font-semibold text-lg">Estimated Total</span>
                    <span className="text-gold font-bold text-2xl">${total}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button type="submit" className="btn-primary flex-1 text-center py-4 text-lg">
                {orderType === "custom" ? "Request Custom Plan" : "Place Order"}
              </button>
              {orderType !== "custom" && (
                <button type="button" onClick={() => setOrderType("custom")} className="btn-secondary flex-1 text-center py-4 text-lg">
                  Request Custom Plan Instead
                </button>
              )}
            </div>

            <p className="text-center text-softBrown text-sm">Payment will be processed securely. We will contact you to confirm your order details.</p>
          </form>
        </div>
      </section>
    </div>
  );
}
