"use client";

import { useState, FormEvent } from "react";

type OrderType = "one-time" | "weekly" | "custom";
type SpiceLevel = "mild" | "medium" | "spicy";
type DeliveryTime = string;

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  deliveryDate: string;
  deliveryTime: DeliveryTime;
  mealType: string;
  dietaryRestrictions: string[];
  allergies: string;
  spiceLevel: SpiceLevel;
  specialInstructions: string;
  mealsPerWeek: number;
  subscriptionDuration: string;
  extraMeals: number;
  familyPack: boolean;
  nutritionConsultation: boolean;
  customMealPlanning: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const BASE_PRICES: Record<OrderType, number> = {
  "one-time": 89,
  weekly: 149,
  custom: 0,
};

const MEALS_PER_WEEK_PRICES: Record<number, number> = {
  3: 149,
  5: 229,
  7: 299,
};

const DURATION_DISCOUNTS: Record<string, number> = {
  "1-week": 1,
  "1-month": 0.9,
  "3-months": 0.8,
};

const dietaryOptions = [
  "Gluten-free",
  "Dairy-free",
  "Nut-free",
  "Halal",
  "Kosher",
];

const mealTypes = [
  "High Protein",
  "Mediterranean",
  "Weight Loss",
  "Gourmet",
  "Keto",
  "Vegan",
  "Custom",
];

export default function OrderPage() {
  const [orderType, setOrderType] = useState<OrderType>("one-time");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    deliveryDate: "",
    deliveryTime: "12:00 PM",
    mealType: "High Protein",
    dietaryRestrictions: [],
    allergies: "",
    spiceLevel: "medium",
    specialInstructions: "",
    mealsPerWeek: 3,
    subscriptionDuration: "1-week",
    extraMeals: 0,
    familyPack: false,
    nutritionConsultation: false,
    customMealPlanning: false,
  });

  const updateField = <K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const toggleDietaryRestriction = (option: string) => {
    setForm((prev) => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(option)
        ? prev.dietaryRestrictions.filter((r) => r !== option)
        : [...prev.dietaryRestrictions, option],
    }));
  };

  const calculateTotal = () => {
    let subtotal = 0;

    if (orderType === "one-time") {
      subtotal = BASE_PRICES["one-time"];
    } else if (orderType === "weekly") {
      const weeklyBase =
        MEALS_PER_WEEK_PRICES[form.mealsPerWeek] ?? MEALS_PER_WEEK_PRICES[3];
      const discount =
        DURATION_DISCOUNTS[form.subscriptionDuration] ??
        DURATION_DISCOUNTS["1-week"];
      subtotal = weeklyBase * discount;
    }

    subtotal += form.extraMeals * 15;
    if (form.familyPack) subtotal += 25;
    if (form.nutritionConsultation) subtotal += 49;
    if (form.customMealPlanning) subtotal += 79;

    return subtotal;
  };

  const getLineItems = () => {
    const items: { label: string; price: number }[] = [];

    if (orderType === "one-time") {
      items.push({
        label: "One-Time Meal Order",
        price: BASE_PRICES["one-time"],
      });
    } else if (orderType === "weekly") {
      const weeklyBase =
        MEALS_PER_WEEK_PRICES[form.mealsPerWeek] ?? MEALS_PER_WEEK_PRICES[3];
      const discount =
        DURATION_DISCOUNTS[form.subscriptionDuration] ??
        DURATION_DISCOUNTS["1-week"];
      const label = `Weekly Plan (${form.mealsPerWeek} meals/wk)`;
      items.push({ label, price: weeklyBase * discount });
      if (discount < 1) {
        items.push({
          label: `Duration discount (${Math.round((1 - discount) * 100)}% off)`,
          price: 0,
        });
      }
    }

    if (form.extraMeals > 0) {
      items.push({
        label: `Extra Meals x${form.extraMeals}`,
        price: form.extraMeals * 15,
      });
    }
    if (form.familyPack)
      items.push({ label: "Family Pack Upgrade", price: 25 });
    if (form.nutritionConsultation)
      items.push({ label: "Nutrition Consultation", price: 49 });
    if (form.customMealPlanning)
      items.push({ label: "Custom Meal Planning", price: 79 });

    return items;
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Please enter a valid email";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.address.trim()) errs.address = "Delivery address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submitOrder = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          orderType,
          total: calculateTotal(),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to submit order."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      submitOrder();
    }
  };

  const handleCustomPlan = () => {
    setOrderType("custom");
    if (validate()) {
      submitOrder();
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      deliveryDate: "",
      deliveryTime: "12:00 PM",
      mealType: "High Protein",
      dietaryRestrictions: [],
      allergies: "",
      spiceLevel: "medium",
      specialInstructions: "",
      mealsPerWeek: 3,
      subscriptionDuration: "1-week",
      extraMeals: 0,
      familyPack: false,
      nutritionConsultation: false,
      customMealPlanning: false,
    });
    setOrderType("one-time");
    setErrors({});
  };

  /* ───── Success State ───── */
  if (submitted) {
    return (
      <section className="min-h-screen bg-cream py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16">
            <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-sage"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
              {orderType === "custom"
                ? "Custom Plan Request Received!"
                : "Order Placed Successfully!"}
            </h2>
            <p className="text-lg text-charcoal/70 mb-3">
              Thank you,{" "}
              <span className="font-semibold text-gold">{form.name}</span>!
            </p>
            <p className="text-charcoal/60 mb-6 leading-relaxed">
              {orderType === "custom"
                ? "We've received your custom plan request. Our chef will craft a personalized meal plan just for you and reach out within 24 hours."
                : `Your order of $${calculateTotal().toFixed(2)} has been received. We'll contact you at ${form.email} to confirm the details and arrange payment.`}
            </p>
            <div className="bg-cream rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-charcoal mb-3">
                What happens next?
              </h3>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start gap-2">
                  <span className="text-sage font-semibold mt-0.5">1.</span>
                  You&apos;ll receive a confirmation email shortly
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage font-semibold mt-0.5">2.</span>
                  Our team will reach out to finalize your order
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage font-semibold mt-0.5">3.</span>
                  Payment will be processed securely
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage font-semibold mt-0.5">4.</span>
                  Your chef-prepared meals will be delivered fresh
                </li>
              </ul>
            </div>
            <button
              onClick={resetForm}
              className="inline-block bg-gold hover:bg-goldDark text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Place Another Order
            </button>
          </div>
        </div>
      </section>
    );
  }

  const total = calculateTotal();
  const lineItems = getLineItems();

  /* ───── Order Form ───── */
  return (
    <section className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-charcoal via-charcoal to-charcoal/90 text-white py-20 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-terracotta rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-goldLight tracking-widest uppercase text-sm font-semibold mb-4">
            Fresh, Chef-Prepared, Delivered
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Place Your Order
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Choose your perfect plan and let our chefs prepare something
            extraordinary, just for you.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        {/* ── Order Type Selector ── */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-charcoal text-center mb-8">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(
              [
                {
                  key: "one-time" as OrderType,
                  title: "One-Time Order",
                  desc: "Perfect for trying us out or a special occasion",
                  price: "$89",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  ),
                },
                {
                  key: "weekly" as OrderType,
                  title: "Weekly Subscription",
                  desc: "Consistent, healthy meals every week with savings",
                  price: "From $149/wk",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  ),
                },
                {
                  key: "custom" as OrderType,
                  title: "Custom Plan",
                  desc: "Tell us your needs and we'll design a plan for you",
                  price: "Custom",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  ),
                },
              ] as const
            ).map((plan) => (
              <button
                key={plan.key}
                onClick={() => setOrderType(plan.key)}
                className={`relative rounded-2xl p-6 text-left transition-all duration-300 border-2 ${
                  orderType === plan.key
                    ? "border-gold bg-white shadow-lg shadow-gold/10 scale-[1.02]"
                    : "border-transparent bg-white/70 hover:bg-white hover:shadow-md"
                }`}
              >
                {orderType === plan.key && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    orderType === plan.key
                      ? "bg-gold/15 text-gold"
                      : "bg-charcoal/5 text-charcoal/40"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {plan.icon}
                  </svg>
                </div>
                <h3 className="font-bold text-charcoal text-lg mb-1">
                  {plan.title}
                </h3>
                <p className="text-sm text-charcoal/60 mb-3">{plan.desc}</p>
                <p className="text-gold font-bold text-lg">{plan.price}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ── Form + Summary Layout ── */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column -- Form Fields */}
            <div className="lg:col-span-2 space-y-8">
              {/* ── Section 1: Personal Information ── */}
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <h3 className="text-xl font-serif font-bold text-charcoal mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-gold/15 text-gold rounded-lg flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      Full Name <span className="text-terracotta">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.name
                          ? "border-terracotta bg-terracotta/5"
                          : "border-charcoal/15 focus:border-gold"
                      } bg-cream/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors`}
                    />
                    {errors.name && (
                      <p className="text-terracotta text-sm mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      Email <span className="text-terracotta">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.email
                          ? "border-terracotta bg-terracotta/5"
                          : "border-charcoal/15 focus:border-gold"
                      } bg-cream/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors`}
                    />
                    {errors.email && (
                      <p className="text-terracotta text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      Phone <span className="text-terracotta">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="(555) 123-4567"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.phone
                          ? "border-terracotta bg-terracotta/5"
                          : "border-charcoal/15 focus:border-gold"
                      } bg-cream/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors`}
                    />
                    {errors.phone && (
                      <p className="text-terracotta text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Section 2: Delivery Details ── */}
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <h3 className="text-xl font-serif font-bold text-charcoal mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-gold/15 text-gold rounded-lg flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  Delivery Details
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      Delivery Address{" "}
                      <span className="text-terracotta">*</span>
                    </label>
                    <textarea
                      value={form.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      placeholder="Street address, apartment, city, state, zip"
                      rows={3}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.address
                          ? "border-terracotta bg-terracotta/5"
                          : "border-charcoal/15 focus:border-gold"
                      } bg-cream/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors resize-none`}
                    />
                    {errors.address && (
                      <p className="text-terracotta text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        Preferred Delivery Date
                      </label>
                      <input
                        type="date"
                        value={form.deliveryDate}
                        onChange={(e) =>
                          updateField("deliveryDate", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-cream/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">
                        Delivery Time Preference
                      </label>
                      <select
                        value={form.deliveryTime}
                        onChange={(e) =>
                          updateField("deliveryTime", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-cream/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors appearance-none cursor-pointer"
                      >
                        <optgroup label="Morning">
                          <option value="8:00 AM">8:00 AM</option>
                          <option value="8:30 AM">8:30 AM</option>
                          <option value="9:00 AM">9:00 AM</option>
                          <option value="9:30 AM">9:30 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="10:30 AM">10:30 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="11:30 AM">11:30 AM</option>
                        </optgroup>
                        <optgroup label="Afternoon">
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="12:30 PM">12:30 PM</option>
                          <option value="1:00 PM">1:00 PM</option>
                          <option value="1:30 PM">1:30 PM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="2:30 PM">2:30 PM</option>
                          <option value="3:00 PM">3:00 PM</option>
                          <option value="3:30 PM">3:30 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                          <option value="4:30 PM">4:30 PM</option>
                          <option value="5:00 PM">5:00 PM</option>
                        </optgroup>
                        <optgroup label="Evening">
                          <option value="5:30 PM">5:30 PM</option>
                          <option value="6:00 PM">6:00 PM</option>
                          <option value="6:30 PM">6:30 PM</option>
                          <option value="7:00 PM">7:00 PM</option>
                          <option value="7:30 PM">7:30 PM</option>
                          <option value="8:00 PM">8:00 PM</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Section 3: Meal Preferences ── */}
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <h3 className="text-xl font-serif font-bold text-charcoal mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-gold/15 text-gold rounded-lg flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  Meal Preferences
                </h3>
                <div className="space-y-6">
                  {/* Meal Type */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      Meal Type
                    </label>
                    <select
                      value={form.mealType}
                      onChange={(e) => updateField("mealType", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-cream/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors appearance-none cursor-pointer"
                    >
                      {mealTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dietary Restrictions */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-3">
                      Dietary Restrictions
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {dietaryOptions.map((option) => (
                        <label
                          key={option}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer transition-all text-sm font-medium border ${
                            form.dietaryRestrictions.includes(option)
                              ? "bg-sage/15 border-sage text-sage"
                              : "bg-cream/50 border-charcoal/10 text-charcoal/60 hover:border-charcoal/25"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={form.dietaryRestrictions.includes(option)}
                            onChange={() => toggleDietaryRestriction(option)}
                            className="sr-only"
                          />
                          <span
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                              form.dietaryRestrictions.includes(option)
                                ? "border-sage bg-sage"
                                : "border-charcoal/25"
                            }`}
                          >
                            {form.dietaryRestrictions.includes(option) && (
                              <svg
                                className="w-2.5 h-2.5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </span>
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Allergies */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      Allergies
                    </label>
                    <input
                      type="text"
                      value={form.allergies}
                      onChange={(e) => updateField("allergies", e.target.value)}
                      placeholder="List any food allergies"
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-cream/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
                    />
                  </div>

                  {/* Spice Level */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-3">
                      Spice Level
                    </label>
                    <div className="flex gap-3">
                      {(
                        [
                          {
                            key: "mild",
                            label: "Mild",
                            sub: "Gentle flavors",
                          },
                          {
                            key: "medium",
                            label: "Medium",
                            sub: "Balanced heat",
                          },
                          {
                            key: "spicy",
                            label: "Spicy",
                            sub: "Bring the fire",
                          },
                        ] as const
                      ).map((level) => (
                        <button
                          key={level.key}
                          type="button"
                          onClick={() => updateField("spiceLevel", level.key)}
                          className={`flex-1 py-3 px-3 rounded-xl text-center transition-all border-2 ${
                            form.spiceLevel === level.key
                              ? "border-terracotta bg-terracotta/10"
                              : "border-transparent bg-cream/70 hover:bg-cream"
                          }`}
                        >
                          <span
                            className={`block text-sm font-semibold ${
                              form.spiceLevel === level.key
                                ? "text-terracotta"
                                : "text-charcoal/70"
                            }`}
                          >
                            {level.label}
                          </span>
                          <span className="block text-xs text-charcoal/40 mt-0.5">
                            {level.sub}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      Special Instructions
                    </label>
                    <textarea
                      value={form.specialInstructions}
                      onChange={(e) =>
                        updateField("specialInstructions", e.target.value)
                      }
                      placeholder="Any special requests, preferences, or notes for our chef..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-cream/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* ── Section 4: Subscription Options (weekly only) ── */}
              {orderType === "weekly" && (
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                  <h3 className="text-xl font-serif font-bold text-charcoal mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-sage/15 text-sage rounded-lg flex items-center justify-center text-sm font-bold">
                      4
                    </span>
                    Subscription Options
                  </h3>
                  <div className="space-y-6">
                    {/* Meals Per Week */}
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-3">
                        Meals Per Week
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[3, 5, 7].map((count) => (
                          <button
                            key={count}
                            type="button"
                            onClick={() => updateField("mealsPerWeek", count)}
                            className={`py-4 rounded-xl text-center transition-all border-2 ${
                              form.mealsPerWeek === count
                                ? "border-gold bg-gold/10"
                                : "border-charcoal/10 bg-cream/50 hover:border-charcoal/20"
                            }`}
                          >
                            <span
                              className={`block text-2xl font-bold ${
                                form.mealsPerWeek === count
                                  ? "text-gold"
                                  : "text-charcoal/50"
                              }`}
                            >
                              {count}
                            </span>
                            <span className="block text-xs text-charcoal/50 mt-1">
                              meals/week
                            </span>
                            <span
                              className={`block text-sm font-semibold mt-1 ${
                                form.mealsPerWeek === count
                                  ? "text-gold"
                                  : "text-charcoal/40"
                              }`}
                            >
                              ${MEALS_PER_WEEK_PRICES[count]}/wk
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-3">
                        Duration
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { key: "1-week", label: "1 Week", badge: "" },
                          {
                            key: "1-month",
                            label: "1 Month",
                            badge: "Save 10%",
                          },
                          {
                            key: "3-months",
                            label: "3 Months",
                            badge: "Save 20%",
                          },
                        ].map((dur) => (
                          <button
                            key={dur.key}
                            type="button"
                            onClick={() =>
                              updateField("subscriptionDuration", dur.key)
                            }
                            className={`relative py-4 rounded-xl text-center transition-all border-2 ${
                              form.subscriptionDuration === dur.key
                                ? "border-gold bg-gold/10"
                                : "border-charcoal/10 bg-cream/50 hover:border-charcoal/20"
                            }`}
                          >
                            {dur.badge && (
                              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-sage text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                                {dur.badge}
                              </span>
                            )}
                            <span
                              className={`block text-sm font-semibold ${
                                form.subscriptionDuration === dur.key
                                  ? "text-gold"
                                  : "text-charcoal/60"
                              }`}
                            >
                              {dur.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Section 5: Add-ons & Upgrades ── */}
              {orderType !== "custom" && (
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                  <h3 className="text-xl font-serif font-bold text-charcoal mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-terracotta/15 text-terracotta rounded-lg flex items-center justify-center text-sm font-bold">
                      {orderType === "weekly" ? "5" : "4"}
                    </span>
                    Add-ons &amp; Upgrades
                  </h3>
                  <div className="space-y-4">
                    {/* Extra Meals Counter */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-cream/70">
                      <div>
                        <p className="font-medium text-charcoal">
                          Extra Meals
                        </p>
                        <p className="text-sm text-charcoal/50">
                          +$15 per additional meal
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            updateField(
                              "extraMeals",
                              Math.max(0, form.extraMeals - 1)
                            )
                          }
                          className="w-8 h-8 rounded-lg bg-white border border-charcoal/15 flex items-center justify-center text-charcoal/60 hover:border-gold hover:text-gold transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold text-charcoal">
                          {form.extraMeals}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateField("extraMeals", form.extraMeals + 1)
                          }
                          className="w-8 h-8 rounded-lg bg-white border border-charcoal/15 flex items-center justify-center text-charcoal/60 hover:border-gold hover:text-gold transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Toggle Add-ons */}
                    {[
                      {
                        key: "familyPack" as const,
                        label: "Family Pack Upgrade",
                        desc: "Larger portions for the whole family",
                        price: "+$25",
                      },
                      {
                        key: "nutritionConsultation" as const,
                        label: "Nutrition Consultation",
                        desc: "One-on-one session with our nutritionist",
                        price: "$49",
                      },
                      {
                        key: "customMealPlanning" as const,
                        label: "Custom Meal Planning",
                        desc: "Personalized weekly meal plans",
                        price: "$79",
                      },
                    ].map((addon) => (
                      <label
                        key={addon.key}
                        className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                          form[addon.key]
                            ? "bg-gold/10 ring-1 ring-gold/30"
                            : "bg-cream/70 hover:bg-cream"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                              form[addon.key]
                                ? "border-gold bg-gold"
                                : "border-charcoal/25"
                            }`}
                          >
                            {form[addon.key] && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </span>
                          <div>
                            <p className="font-medium text-charcoal">
                              {addon.label}
                            </p>
                            <p className="text-sm text-charcoal/50">
                              {addon.desc}
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold text-gold whitespace-nowrap ml-4">
                          {addon.price}
                        </span>
                        <input
                          type="checkbox"
                          checked={form[addon.key]}
                          onChange={(e) =>
                            updateField(addon.key, e.target.checked)
                          }
                          className="sr-only"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Right Column: Sticky Order Summary ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-serif font-bold text-charcoal mb-5">
                    Order Summary
                  </h3>

                  {orderType === "custom" ? (
                    <div className="text-center py-6">
                      <div className="w-14 h-14 bg-sage/15 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg
                          className="w-7 h-7 text-sage"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </div>
                      <p className="text-charcoal/60 text-sm leading-relaxed">
                        Fill out your preferences and we&apos;ll create a custom
                        plan with personalized pricing.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 mb-5">
                        {lineItems.map((item, i) => (
                          <div
                            key={i}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-charcoal/70">
                              {item.label}
                            </span>
                            {item.price > 0 && (
                              <span className="font-medium text-charcoal">
                                ${item.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-charcoal/10 pt-4 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-charcoal text-lg">
                            Total
                          </span>
                          <span className="font-bold text-gold text-2xl">
                            ${total.toFixed(2)}
                          </span>
                        </div>
                        {orderType === "weekly" && (
                          <p className="text-xs text-charcoal/40 mt-1">
                            per week
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {/* Error */}
                  {submitError && (
                    <p className="text-terracotta text-sm text-center">{submitError}</p>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {orderType === "custom" ? (
                      <button
                        type="button"
                        onClick={handleCustomPlan}
                        disabled={submitting}
                        className="w-full py-3.5 rounded-xl font-semibold text-white bg-sage hover:bg-sageDark transition-colors shadow-sm disabled:opacity-60"
                      >
                        {submitting ? "Submitting..." : "Request Custom Plan"}
                      </button>
                    ) : (
                      <>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-3.5 rounded-xl font-semibold text-white bg-gold hover:bg-goldDark transition-colors shadow-sm disabled:opacity-60"
                        >
                          {submitting ? "Placing Order..." : "Place Order"}
                        </button>
                        <button
                          type="button"
                          onClick={handleCustomPlan}
                          disabled={submitting}
                          className="w-full py-3.5 rounded-xl font-semibold text-sage bg-sage/10 hover:bg-sage/20 transition-colors disabled:opacity-60"
                        >
                          Request Custom Plan
                        </button>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-charcoal/40 text-center mt-4 leading-relaxed">
                    Payment will be processed securely. We&apos;ll contact you
                    to confirm your order.
                  </p>
                </div>

                {/* Trust Signals */}
                <div className="mt-4 p-4 bg-white/60 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3 text-sm text-charcoal/50">
                    <svg
                      className="w-4 h-4 text-sage flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Secure &amp; encrypted
                  </div>
                  <div className="flex items-center gap-3 text-sm text-charcoal/50">
                    <svg
                      className="w-4 h-4 text-sage flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    No payment required now
                  </div>
                  <div className="flex items-center gap-3 text-sm text-charcoal/50">
                    <svg
                      className="w-4 h-4 text-sage flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    100% satisfaction guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
