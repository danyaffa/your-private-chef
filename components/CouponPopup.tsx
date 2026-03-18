"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function CouponPopup() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/coupon-claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      // fail silently
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-charcoal/10 flex items-center justify-center text-charcoal/60 hover:bg-charcoal/20 hover:text-charcoal transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top gradient banner */}
            <div className="bg-gradient-to-r from-gold via-terracotta to-gold px-6 py-8 text-center">
              <span className="text-5xl block mb-2">🎉</span>
              <p className="text-white/90 font-sans text-sm tracking-wide uppercase">
                First Order? Welcome!
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold mt-1">
                Get 10% Off
              </h2>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              {submitted ? (
                <div className="text-center py-4">
                  <span className="text-5xl block mb-3">🎊</span>
                  <h3 className="font-serif text-2xl text-charcoal mb-2">
                    Your Coupon is Ready!
                  </h3>
                  <div className="bg-cream rounded-xl p-4 mb-4">
                    <p className="text-sm text-softBrown mb-1">Your coupon code:</p>
                    <p className="font-mono text-2xl font-bold text-gold tracking-widest">
                      WELCOME10
                    </p>
                  </div>
                  <p className="text-softBrown text-sm">
                    Use this code at checkout for 10% off your first order.
                    We&apos;ll also send it to your phone!
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-4 px-6 py-2.5 bg-gold text-white font-semibold rounded-full hover:bg-goldDark transition-colors text-sm"
                  >
                    Start Ordering
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-softBrown text-sm text-center mb-5">
                    Enter your details below to claim your discount coupon.
                    First orders only &mdash; we won&apos;t spam you!
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="First name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl border border-goldLight/40 bg-cream/30 font-sans text-charcoal placeholder:text-softBrown/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors text-sm"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="email"
                        placeholder="Your email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 rounded-xl border border-goldLight/40 bg-cream/30 font-sans text-charcoal placeholder:text-softBrown/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors text-sm"
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 rounded-xl border border-goldLight/40 bg-cream/30 font-sans text-charcoal placeholder:text-softBrown/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 bg-gradient-to-r from-gold to-terracotta text-white font-semibold rounded-xl hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-60 text-sm uppercase tracking-wider"
                    >
                      {submitting ? "Claiming..." : "Get Coupon"}
                    </button>
                  </form>
                  <p className="text-xs text-softBrown/50 text-center mt-3 leading-relaxed">
                    First orders only. We won&apos;t call to sell! We&apos;ll
                    send your coupon and occasional specials. Unsubscribe
                    anytime.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
