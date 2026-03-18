"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Goal =
  | "weight-loss"
  | "muscle"
  | "health"
  | "athletic"
  | "glp1"
  | null;

interface Preferences {
  cuisine: string;
  diet: string;
  protein: string;
  calories: number;
}

interface Schedule {
  mealsPerDay: number;
  daysPerWeek: number;
  budget: string;
}

interface Meal {
  name: string;
  description: string;
  calories: number;
  protein: number;
}

interface DayPlan {
  day: string;
  meals: Meal[];
}

/* ------------------------------------------------------------------ */
/*  Hardcoded Meal-Plan Templates                                      */
/* ------------------------------------------------------------------ */

const WEIGHT_LOSS_PLAN: DayPlan[] = [
  {
    day: "Monday",
    meals: [
      { name: "Greek Yogurt Parfait", description: "Low-fat Greek yogurt with berries, chia seeds & a drizzle of honey", calories: 320, protein: 24 },
      { name: "Mediterranean Grilled Chicken Salad", description: "Mixed greens, cucumber, tomato, olives, feta & lemon-herb chicken", calories: 420, protein: 38 },
      { name: "Lemon Herb Baked Salmon", description: "Wild-caught salmon with roasted asparagus & quinoa pilaf", calories: 480, protein: 42 },
    ],
  },
  {
    day: "Tuesday",
    meals: [
      { name: "Spinach & Egg White Omelette", description: "Fluffy egg whites with spinach, tomatoes & a side of whole-grain toast", calories: 290, protein: 26 },
      { name: "Turkey Lettuce Wraps", description: "Lean ground turkey in butter lettuce cups with Asian slaw", calories: 380, protein: 34 },
      { name: "Zucchini Noodle Bolognese", description: "Spiralized zucchini with lean beef marinara & fresh basil", calories: 410, protein: 36 },
    ],
  },
  {
    day: "Wednesday",
    meals: [
      { name: "Overnight Oats Bowl", description: "Rolled oats soaked in almond milk with walnuts, banana & cinnamon", calories: 340, protein: 14 },
      { name: "Shrimp & Avocado Bowl", description: "Grilled shrimp over mixed greens with avocado, mango & citrus dressing", calories: 400, protein: 32 },
      { name: "Herb-Crusted Chicken Breast", description: "Baked chicken breast with steamed broccoli & sweet potato mash", calories: 460, protein: 44 },
    ],
  },
  {
    day: "Thursday",
    meals: [
      { name: "Berry Protein Smoothie", description: "Mixed berries, protein powder, spinach & almond milk", calories: 280, protein: 28 },
      { name: "Quinoa Veggie Power Bowl", description: "Quinoa, roasted chickpeas, kale, sweet potato & tahini dressing", calories: 420, protein: 18 },
      { name: "Grilled Cod with Veggies", description: "Pan-seared cod with roasted Brussels sprouts & wild rice", calories: 440, protein: 38 },
    ],
  },
  {
    day: "Friday",
    meals: [
      { name: "Avocado Toast & Poached Egg", description: "Whole-grain toast with smashed avocado, poached egg & everything seasoning", calories: 350, protein: 16 },
      { name: "Asian Chicken Lettuce Cups", description: "Ground chicken with water chestnuts, hoisin glaze & sesame", calories: 370, protein: 32 },
      { name: "Stuffed Bell Peppers", description: "Bell peppers filled with lean turkey, brown rice & tomato sauce", calories: 430, protein: 34 },
    ],
  },
  {
    day: "Saturday",
    meals: [
      { name: "Cottage Cheese & Fruit Bowl", description: "Low-fat cottage cheese with peaches, granola & a drizzle of honey", calories: 310, protein: 22 },
      { name: "Grilled Chicken Caesar Wrap", description: "Whole-wheat wrap with grilled chicken, romaine & light Caesar", calories: 400, protein: 36 },
      { name: "Baked Tilapia Tacos", description: "Blackened tilapia in corn tortillas with mango salsa & cabbage slaw", calories: 420, protein: 34 },
    ],
  },
  {
    day: "Sunday",
    meals: [
      { name: "Veggie Egg Scramble", description: "Whole eggs with bell peppers, onion, mushroom & a side of fruit", calories: 330, protein: 22 },
      { name: "Lentil & Vegetable Soup", description: "Hearty lentil soup with carrots, celery & crusty whole-grain bread", calories: 380, protein: 20 },
      { name: "Herb Roasted Chicken Thigh", description: "Bone-in chicken thigh with roasted root vegetables & green salad", calories: 470, protein: 40 },
    ],
  },
];

const MUSCLE_PLAN: DayPlan[] = [
  {
    day: "Monday",
    meals: [
      { name: "Steak & Eggs Breakfast", description: "Grilled sirloin steak, three scrambled eggs & sweet potato hash", calories: 620, protein: 52 },
      { name: "Double Chicken Burrito Bowl", description: "Cilantro-lime rice, black beans, double grilled chicken, guacamole & pico", calories: 720, protein: 58 },
      { name: "Teriyaki Salmon Power Plate", description: "Glazed salmon fillet with jasmine rice, edamame & steamed broccoli", calories: 680, protein: 48 },
    ],
  },
  {
    day: "Tuesday",
    meals: [
      { name: "Protein Pancake Stack", description: "Banana-oat protein pancakes with peanut butter & Greek yogurt topping", calories: 580, protein: 44 },
      { name: "BBQ Chicken & Sweet Potato", description: "Smoked chicken breast with baked sweet potato, coleslaw & cornbread", calories: 700, protein: 52 },
      { name: "Lean Beef Stir-Fry", description: "Flank steak with bell peppers, snap peas & brown rice in garlic sauce", calories: 660, protein: 50 },
    ],
  },
  {
    day: "Wednesday",
    meals: [
      { name: "Loaded Oatmeal Bowl", description: "Steel-cut oats with protein powder, almond butter, banana & hemp seeds", calories: 560, protein: 36 },
      { name: "Turkey & Avocado Club", description: "Triple-decker turkey club on sourdough with avocado, bacon & side salad", calories: 680, protein: 48 },
      { name: "Grilled Chicken Parm", description: "Breaded chicken breast with marinara, mozzarella & whole-wheat pasta", calories: 720, protein: 54 },
    ],
  },
  {
    day: "Thursday",
    meals: [
      { name: "Breakfast Burrito Supreme", description: "Flour tortilla with eggs, chorizo, cheese, black beans & salsa verde", calories: 640, protein: 42 },
      { name: "Tuna Poke Bowl", description: "Sushi-grade tuna over rice with avocado, edamame, cucumber & spicy mayo", calories: 620, protein: 44 },
      { name: "Herb-Crusted Ribeye", description: "8oz ribeye with garlic mashed potatoes, grilled asparagus & red wine jus", calories: 780, protein: 56 },
    ],
  },
  {
    day: "Friday",
    meals: [
      { name: "Egg & Sausage McMuffin x2", description: "Homemade English muffin sandwiches with egg, turkey sausage & cheese", calories: 580, protein: 40 },
      { name: "Grilled Chicken Gyro Plate", description: "Seasoned chicken with tzatziki, hummus, pita bread & Greek salad", calories: 680, protein: 50 },
      { name: "Blackened Mahi-Mahi", description: "Cajun-seasoned mahi-mahi with coconut rice, plantains & mango salsa", calories: 640, protein: 46 },
    ],
  },
  {
    day: "Saturday",
    meals: [
      { name: "French Toast Power-Up", description: "Brioche French toast with whipped cream, berries & a side of turkey bacon", calories: 600, protein: 34 },
      { name: "Philly Cheesesteak Bowl", description: "Shaved steak, peppers, onions & provolone over cauliflower rice", calories: 660, protein: 52 },
      { name: "Lamb Kofta Plate", description: "Spiced lamb kofta with couscous, roasted veggies & mint yogurt sauce", calories: 720, protein: 48 },
    ],
  },
  {
    day: "Sunday",
    meals: [
      { name: "Smoked Salmon Benedict", description: "Poached eggs & smoked salmon on English muffin with hollandaise & greens", calories: 560, protein: 38 },
      { name: "Chicken Shawarma Wrap", description: "Marinated chicken in warm pita with pickled turnips, garlic sauce & fries", calories: 700, protein: 46 },
      { name: "Slow-Roasted Prime Rib", description: "Prime rib with Yorkshire pudding, roasted potatoes & horseradish cream", calories: 800, protein: 58 },
    ],
  },
];

const HEALTH_PLAN: DayPlan[] = [
  {
    day: "Monday",
    meals: [
      { name: "Acai Superfood Bowl", description: "Blended acai with granola, fresh fruit, coconut flakes & chia seeds", calories: 380, protein: 12 },
      { name: "Grilled Chicken & Grain Bowl", description: "Farro, roasted vegetables, grilled chicken & lemon-herb vinaigrette", calories: 520, protein: 36 },
      { name: "Miso-Glazed Salmon", description: "Wild salmon with miso glaze, steamed bok choy & brown rice", calories: 540, protein: 40 },
    ],
  },
  {
    day: "Tuesday",
    meals: [
      { name: "Green Power Smoothie", description: "Kale, spinach, banana, mango, flaxseed & coconut water", calories: 320, protein: 10 },
      { name: "Falafel & Hummus Plate", description: "Crispy baked falafel with hummus, tabbouleh, pita & pickled veggies", calories: 500, protein: 22 },
      { name: "Herb Roasted Chicken", description: "Free-range chicken with roasted root vegetables & fresh herb salad", calories: 520, protein: 42 },
    ],
  },
  {
    day: "Wednesday",
    meals: [
      { name: "Chia Pudding Parfait", description: "Chia seeds in coconut milk with passion fruit, mango & toasted almonds", calories: 360, protein: 14 },
      { name: "Pesto Shrimp Pasta", description: "Whole-wheat penne with basil pesto, grilled shrimp & cherry tomatoes", calories: 540, protein: 34 },
      { name: "Stuffed Portobello Mushrooms", description: "Portobellos filled with quinoa, sun-dried tomatoes, spinach & goat cheese", calories: 460, protein: 22 },
    ],
  },
  {
    day: "Thursday",
    meals: [
      { name: "Tropical Overnight Oats", description: "Oats soaked in coconut milk with pineapple, macadamia & toasted coconut", calories: 400, protein: 14 },
      { name: "Nicoise Salad", description: "Seared tuna, hard-boiled egg, green beans, olives & Dijon vinaigrette", calories: 480, protein: 36 },
      { name: "Chicken Tikka Masala", description: "Tender chicken in tomato-cream curry with basmati rice & naan", calories: 560, protein: 38 },
    ],
  },
  {
    day: "Friday",
    meals: [
      { name: "Banana Walnut Oatmeal", description: "Creamy oats with sliced banana, walnuts, cinnamon & a drizzle of maple", calories: 380, protein: 12 },
      { name: "Vietnamese Banh Mi Bowl", description: "Lemongrass chicken, pickled daikon, cucumber, cilantro & rice noodles", calories: 500, protein: 32 },
      { name: "Pan-Seared Sea Bass", description: "Chilean sea bass with sauteed spinach, cherry tomatoes & orzo", calories: 520, protein: 38 },
    ],
  },
  {
    day: "Saturday",
    meals: [
      { name: "Shakshuka", description: "Poached eggs in spiced tomato sauce with feta, herbs & crusty bread", calories: 420, protein: 22 },
      { name: "Grilled Veggie & Halloumi Wrap", description: "Grilled zucchini, eggplant, peppers & halloumi in a spinach wrap", calories: 480, protein: 24 },
      { name: "Moroccan Lamb Tagine", description: "Slow-braised lamb with apricots, almonds, chickpeas & saffron couscous", calories: 580, protein: 40 },
    ],
  },
  {
    day: "Sunday",
    meals: [
      { name: "Smashed Avo & Eggs", description: "Sourdough toast with avocado, soft-boiled eggs, microgreens & dukkah", calories: 400, protein: 18 },
      { name: "Thai Coconut Soup", description: "Tom kha gai with chicken, mushrooms, galangal & jasmine rice", calories: 480, protein: 28 },
      { name: "Tuscan Grilled Chicken", description: "Chicken breast with white bean ragout, sun-dried tomatoes & rapini", calories: 540, protein: 44 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Goal cards data                                                    */
/* ------------------------------------------------------------------ */

const GOALS: {
  id: Goal;
  emoji: string;
  title: string;
  description: string;
  borderColor: string;
  bgHover: string;
}[] = [
  {
    id: "weight-loss",
    emoji: "🔥",
    title: "Weight Loss",
    description: "Calorie-controlled meals designed to help you shed pounds while staying satisfied and nourished.",
    borderColor: "border-terracotta",
    bgHover: "hover:bg-terracotta/5",
  },
  {
    id: "muscle",
    emoji: "💪",
    title: "Muscle Building",
    description: "High-protein, nutrient-dense meals engineered to support muscle growth and recovery.",
    borderColor: "border-sage",
    bgHover: "hover:bg-sage/5",
  },
  {
    id: "health",
    emoji: "🌿",
    title: "General Health & Wellness",
    description: "Balanced, whole-food meals to keep you feeling your best every single day.",
    borderColor: "border-gold",
    bgHover: "hover:bg-gold/5",
  },
  {
    id: "athletic",
    emoji: "⚡",
    title: "Athletic Performance",
    description: "Fuel for peak performance with optimized macros for training and competition.",
    borderColor: "border-sage",
    bgHover: "hover:bg-sage/5",
  },
  {
    id: "glp1",
    emoji: "💊",
    title: "GLP-1 Medication Support",
    description: "Specially portioned, nutrient-rich meals designed for GLP-1 medication users.",
    borderColor: "border-terracotta",
    bgHover: "hover:bg-terracotta/5",
  },
];

/* ------------------------------------------------------------------ */
/*  Option rows for Step 2 & 3                                         */
/* ------------------------------------------------------------------ */

const CUISINES = ["Mediterranean", "Asian", "American", "Latin", "Mixed"];
const DIETS = ["Regular", "Keto", "Vegan", "Vegetarian", "Paleo", "Whole30"];
const PROTEINS = ["Chicken", "Fish", "Beef", "Plant-based", "Mixed"];
const MEALS_PER_DAY = [2, 3, 4, 5];
const DAYS_PER_WEEK = [3, 5, 7];
const BUDGETS: { label: string; range: string; id: string }[] = [
  { id: "economy", label: "Economy", range: "$12 – $15 / meal" },
  { id: "standard", label: "Standard", range: "$16 – $22 / meal" },
  { id: "premium", label: "Premium", range: "$23 – $35 / meal" },
];

/* ------------------------------------------------------------------ */
/*  Reusable small components                                          */
/* ------------------------------------------------------------------ */

function OptionPill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
        selected
          ? "bg-gold text-white border-gold shadow-md scale-105"
          : "bg-white text-charcoal border-goldLight/60 hover:border-gold hover:shadow-sm"
      }`}
    >
      {label}
    </button>
  );
}

function BudgetCard({
  budget,
  selected,
  onClick,
}: {
  budget: { label: string; range: string; id: string };
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 min-w-[140px] p-5 rounded-2xl border-2 text-center transition-all duration-200 ${
        selected
          ? "border-gold bg-gold/10 shadow-lg scale-[1.03]"
          : "border-goldLight/40 bg-white hover:border-gold/50 hover:shadow-md"
      }`}
    >
      <p className="font-bold text-charcoal text-lg">{budget.label}</p>
      <p className="text-sm text-charcoal/60 mt-1">{budget.range}</p>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function MealBuilderPage() {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal>(null);
  const [preferences, setPreferences] = useState<Preferences>({
    cuisine: "Mixed",
    diet: "Regular",
    protein: "Mixed",
    calories: 2000,
  });
  const [schedule, setSchedule] = useState<Schedule>({
    mealsPerDay: 3,
    daysPerWeek: 7,
    budget: "standard",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<DayPlan[] | null>(null);

  /* ---------- helpers ---------- */

  const totalSteps = 4;

  const canNext = (): boolean => {
    if (step === 0) return goal !== null;
    return true;
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      if (goal === "weight-loss" || goal === "glp1") setGeneratedPlan(WEIGHT_LOSS_PLAN);
      else if (goal === "muscle" || goal === "athletic") setGeneratedPlan(MUSCLE_PLAN);
      else setGeneratedPlan(HEALTH_PLAN);
      setIsGenerating(false);
      setStep(3);
    }, 2400);
  };

  const budgetCostPerMeal = schedule.budget === "economy" ? 13.5 : schedule.budget === "standard" ? 19 : 29;
  const estimatedWeeklyCost = (
    budgetCostPerMeal *
    schedule.mealsPerDay *
    schedule.daysPerWeek
  ).toFixed(0);

  /* ---------- animation variants ---------- */

  const pageVariants = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
    exit: { opacity: 0, x: -60, transition: { duration: 0.3, ease: "easeIn" } },
  };

  /* ---------- render ---------- */

  return (
    <div className="min-h-screen bg-cream">
      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-charcoal via-charcoal to-charcoal/90 text-white py-20 px-4">
        {/* decorative sparkles */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <span className="absolute top-8 left-[12%] text-3xl opacity-20 animate-pulse">✨</span>
          <span className="absolute top-16 right-[18%] text-2xl opacity-15 animate-pulse delay-500">✨</span>
          <span className="absolute bottom-10 left-[30%] text-xl opacity-10 animate-pulse delay-1000">⭐</span>
          <span className="absolute top-24 right-[40%] text-lg opacity-10 animate-pulse delay-700">✨</span>
          <span className="absolute bottom-6 right-[10%] text-2xl opacity-15 animate-pulse delay-300">🌟</span>
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-5xl mb-4 block">🪄</span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
              AI Meal Builder
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-xl mx-auto">
              Let our smart system design the perfect meal plan for you
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---- Progress Bar ---- */}
      <div className="max-w-3xl mx-auto px-4 pt-10 pb-2">
        <div className="flex items-center justify-between mb-2">
          {["Your Goal", "Preferences", "Schedule", "Your Plan"].map((label, i) => (
            <div key={label} className="flex flex-col items-center flex-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                  i < step
                    ? "bg-sage text-white"
                    : i === step
                    ? "bg-gold text-white shadow-lg"
                    : "bg-goldLight/30 text-charcoal/40"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span
                className={`text-xs mt-1.5 font-medium transition-colors duration-300 hidden sm:block ${
                  i <= step ? "text-charcoal" : "text-charcoal/40"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
        {/* bar */}
        <div className="h-2 rounded-full bg-goldLight/20 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gold to-terracotta rounded-full"
            initial={false}
            animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* ---- Wizard Content ---- */}
      <div className="max-w-4xl mx-auto px-4 py-8 min-h-[520px]">
        <AnimatePresence mode="wait">
          {/* ========== STEP 1: Choose Goal ========== */}
          {step === 0 && (
            <motion.div key="step-0" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-charcoal mb-2 text-center">
                Choose Your Goal
              </h2>
              <p className="text-charcoal/60 text-center mb-8">
                Select the wellness goal that best describes you.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {GOALS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={`text-left p-6 rounded-2xl border-2 transition-all duration-200 ${g.bgHover} ${
                      goal === g.id
                        ? `${g.borderColor} bg-white shadow-xl scale-[1.02]`
                        : "border-goldLight/30 bg-white hover:shadow-lg"
                    }`}
                  >
                    <span className="text-3xl block mb-3">{g.emoji}</span>
                    <h3 className="font-bold text-lg text-charcoal mb-1">{g.title}</h3>
                    <p className="text-sm text-charcoal/60 leading-relaxed">{g.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========== STEP 2: Dietary Preferences ========== */}
          {step === 1 && (
            <motion.div key="step-1" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-charcoal mb-2 text-center">
                Dietary Preferences
              </h2>
              <p className="text-charcoal/60 text-center mb-8">
                Tell us about your taste and dietary needs.
              </p>

              <div className="space-y-8">
                {/* Cuisine */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-3">Cuisine Preference</label>
                  <div className="flex flex-wrap gap-2">
                    {CUISINES.map((c) => (
                      <OptionPill
                        key={c}
                        label={c}
                        selected={preferences.cuisine === c}
                        onClick={() => setPreferences((p) => ({ ...p, cuisine: c }))}
                      />
                    ))}
                  </div>
                </div>

                {/* Diet type */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-3">Diet Type</label>
                  <div className="flex flex-wrap gap-2">
                    {DIETS.map((d) => (
                      <OptionPill
                        key={d}
                        label={d}
                        selected={preferences.diet === d}
                        onClick={() => setPreferences((p) => ({ ...p, diet: d }))}
                      />
                    ))}
                  </div>
                </div>

                {/* Protein */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-3">Protein Preference</label>
                  <div className="flex flex-wrap gap-2">
                    {PROTEINS.map((pr) => (
                      <OptionPill
                        key={pr}
                        label={pr}
                        selected={preferences.protein === pr}
                        onClick={() => setPreferences((p) => ({ ...p, protein: pr }))}
                      />
                    ))}
                  </div>
                </div>

                {/* Calorie slider */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-3">
                    Daily Calorie Target:{" "}
                    <span className="text-gold font-bold">{preferences.calories} cal</span>
                  </label>
                  <input
                    type="range"
                    min={1200}
                    max={3000}
                    step={50}
                    value={preferences.calories}
                    onChange={(e) =>
                      setPreferences((p) => ({ ...p, calories: Number(e.target.value) }))
                    }
                    className="w-full h-2 rounded-full appearance-none bg-goldLight/40 accent-gold cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-charcoal/40 mt-1">
                    <span>1,200 cal</span>
                    <span>3,000 cal</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========== STEP 3: Schedule & Budget ========== */}
          {step === 2 && (
            <motion.div key="step-2" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-charcoal mb-2 text-center">
                Schedule &amp; Budget
              </h2>
              <p className="text-charcoal/60 text-center mb-8">
                How many meals do you need, and what fits your budget?
              </p>

              <div className="space-y-8">
                {/* Meals per day */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-3">Meals Per Day</label>
                  <div className="flex flex-wrap gap-2">
                    {MEALS_PER_DAY.map((n) => (
                      <OptionPill
                        key={n}
                        label={`${n} meals`}
                        selected={schedule.mealsPerDay === n}
                        onClick={() => setSchedule((s) => ({ ...s, mealsPerDay: n }))}
                      />
                    ))}
                  </div>
                </div>

                {/* Days per week */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-3">Days Per Week</label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS_PER_WEEK.map((n) => (
                      <OptionPill
                        key={n}
                        label={`${n} days`}
                        selected={schedule.daysPerWeek === n}
                        onClick={() => setSchedule((s) => ({ ...s, daysPerWeek: n }))}
                      />
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-3">Budget Range</label>
                  <div className="flex flex-wrap gap-4">
                    {BUDGETS.map((b) => (
                      <BudgetCard
                        key={b.id}
                        budget={b}
                        selected={schedule.budget === b.id}
                        onClick={() => setSchedule((s) => ({ ...s, budget: b.id }))}
                      />
                    ))}
                  </div>
                </div>

                {/* Estimated cost summary */}
                <div className="bg-white rounded-2xl border border-goldLight/40 p-6 text-center shadow-sm">
                  <p className="text-sm text-charcoal/60 mb-1">Estimated Weekly Cost</p>
                  <p className="text-3xl font-bold text-gold">${estimatedWeeklyCost}</p>
                  <p className="text-xs text-charcoal/40 mt-1">
                    {schedule.mealsPerDay} meals &times; {schedule.daysPerWeek} days
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========== STEP 4: Generated Plan ========== */}
          {step === 3 && generatedPlan && (
            <motion.div key="step-3" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-charcoal mb-2 text-center">
                Your Custom Meal Plan
              </h2>
              <p className="text-charcoal/60 text-center mb-8">
                Here&rsquo;s a full week of chef-prepared meals crafted for your{" "}
                <span className="font-semibold text-gold">
                  {GOALS.find((g) => g.id === goal)?.title}
                </span>{" "}
                goal.
              </p>

              {/* Day cards */}
              <div className="space-y-6">
                {generatedPlan.map((day, dayIdx) => {
                  const dailyCals = day.meals.reduce((s, m) => s + m.calories, 0);
                  const dailyProtein = day.meals.reduce((s, m) => s + m.protein, 0);

                  return (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: dayIdx * 0.07 }}
                      className="bg-white rounded-2xl border border-goldLight/30 shadow-sm overflow-hidden"
                    >
                      {/* Day header */}
                      <div className="bg-gradient-to-r from-gold/10 to-sageLight/20 px-6 py-3 flex items-center justify-between">
                        <h3 className="font-bold text-charcoal text-lg">{day.day}</h3>
                        <div className="flex gap-4 text-xs font-medium text-charcoal/60">
                          <span>{dailyCals} cal</span>
                          <span>{dailyProtein}g protein</span>
                        </div>
                      </div>

                      {/* Meals */}
                      <div className="divide-y divide-goldLight/20">
                        {day.meals.map((meal, mealIdx) => (
                          <div key={mealIdx} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                            <div className="flex-1">
                              <p className="font-semibold text-charcoal">{meal.name}</p>
                              <p className="text-sm text-charcoal/55 leading-relaxed">{meal.description}</p>
                            </div>
                            <div className="flex gap-4 text-sm text-charcoal/50 shrink-0">
                              <span className="flex items-center gap-1">
                                <span className="text-terracotta">🔥</span> {meal.calories} cal
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="text-sage">💪</span> {meal.protein}g
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Weekly summary */}
              <div className="mt-8 bg-gradient-to-br from-gold/10 to-sage/10 rounded-2xl border border-goldLight/30 p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-xs text-charcoal/50 mb-1">Avg. Daily Calories</p>
                  <p className="text-xl font-bold text-charcoal">
                    {Math.round(
                      generatedPlan.reduce(
                        (s, d) => s + d.meals.reduce((ms, m) => ms + m.calories, 0),
                        0
                      ) / 7
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-charcoal/50 mb-1">Avg. Daily Protein</p>
                  <p className="text-xl font-bold text-charcoal">
                    {Math.round(
                      generatedPlan.reduce(
                        (s, d) => s + d.meals.reduce((ms, m) => ms + m.protein, 0),
                        0
                      ) / 7
                    )}g
                  </p>
                </div>
                <div>
                  <p className="text-xs text-charcoal/50 mb-1">Meals / Week</p>
                  <p className="text-xl font-bold text-charcoal">
                    {schedule.mealsPerDay * schedule.daysPerWeek}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-charcoal/50 mb-1">Est. Weekly Cost</p>
                  <p className="text-xl font-bold text-gold">${estimatedWeeklyCost}</p>
                </div>
              </div>

              {/* CTA section */}
              <div className="mt-10 bg-white rounded-2xl border border-goldLight/30 p-8 text-center shadow-sm">
                <h3 className="text-xl font-bold font-serif text-charcoal mb-2">
                  Ready to Eat?
                </h3>
                <p className="text-charcoal/60 mb-6 max-w-md mx-auto">
                  Love this plan? Let us bring it to life. Our chefs will prepare every meal fresh and deliver it to your door.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/order"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-terracotta text-white font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                  >
                    🛒 Order This Plan
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 border-2 border-gold text-gold font-semibold px-8 py-3.5 rounded-full hover:bg-gold/5 transition-all duration-200"
                  >
                    ✏️ Customize Further
                  </Link>
                  <button
                    onClick={() => alert("Your meal plan PDF will be available soon! For now, take a screenshot or contact us to get started.")}
                    className="inline-flex items-center justify-center gap-2 border-2 border-charcoal/20 text-charcoal/70 font-semibold px-8 py-3.5 rounded-full hover:bg-charcoal/5 transition-all duration-200"
                  >
                    📄 Download Plan
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---- Loading overlay ---- */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-3xl p-10 text-center shadow-2xl max-w-sm mx-4"
              >
                <motion.span
                  className="text-6xl block mb-4"
                  animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                >
                  🍽️
                </motion.span>
                <h3 className="text-xl font-bold text-charcoal mb-2">Building Your Plan...</h3>
                <p className="text-charcoal/60 text-sm">
                  Our AI chef is designing the perfect meals for you.
                </p>
                <div className="mt-4 flex justify-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full bg-gold"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---- Navigation Buttons ---- */}
      {step < 3 && (
        <div className="max-w-4xl mx-auto px-4 pb-16">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
                step === 0
                  ? "opacity-0 pointer-events-none"
                  : "border-2 border-charcoal/20 text-charcoal hover:bg-charcoal/5"
              }`}
            >
              ← Back
            </button>

            {step < 2 ? (
              <button
                onClick={() => canNext() && setStep((s) => s + 1)}
                disabled={!canNext()}
                className={`px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
                  canNext()
                    ? "bg-gradient-to-r from-gold to-terracotta text-white shadow-lg hover:shadow-xl hover:scale-105"
                    : "bg-goldLight/30 text-charcoal/30 cursor-not-allowed"
                }`}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                className="px-8 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-sage to-gold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                ✨ Generate My Plan
              </button>
            )}
          </div>
        </div>
      )}

      {/* ---- Back to start (on plan view) ---- */}
      {step === 3 && generatedPlan && (
        <div className="max-w-4xl mx-auto px-4 pb-16 text-center">
          <button
            onClick={() => {
              setStep(0);
              setGoal(null);
              setGeneratedPlan(null);
            }}
            className="text-sm text-charcoal/50 hover:text-charcoal underline underline-offset-4 transition-colors"
          >
            ← Start Over with a New Plan
          </button>
        </div>
      )}
    </div>
  );
}
