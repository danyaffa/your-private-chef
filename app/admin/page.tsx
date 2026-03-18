"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ShieldCheck,
  LogOut,
  UtensilsCrossed,
  Tag,
  ShoppingCart,
  Clock,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  DollarSign,
  CalendarCheck,
} from "lucide-react";

type Tab = "menu" | "coupons" | "orders" | "hours" | "availability";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  active: boolean;
}

interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: string;
  description: string;
  maxUses: number | null;
  usedCount: number;
  active: boolean;
}

interface Order {
  id: string;
  name: string;
  email: string;
  phone: string;
  orderType: string;
  total: number;
  status: string;
  createdAt: string;
}

interface DayHours {
  open: string;
  close: string;
  closed: boolean;
}

type HoursData = Record<string, DayHours>;

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const DEFAULT_HOURS: HoursData = {
  monday: { open: "08:00", close: "20:00", closed: false },
  tuesday: { open: "08:00", close: "20:00", closed: false },
  wednesday: { open: "08:00", close: "20:00", closed: false },
  thursday: { open: "08:00", close: "20:00", closed: false },
  friday: { open: "08:00", close: "20:00", closed: false },
  saturday: { open: "09:00", close: "18:00", closed: false },
  sunday: { open: "10:00", close: "16:00", closed: false },
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [code, setCode] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [tab, setTab] = useState<Tab>("orders");

  // Data states
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [totalClaims, setTotalClaims] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [hours, setHours] = useState<HoursData>(DEFAULT_HOURS);
  const [availableSpots, setAvailableSpots] = useState(6);
  const [spotsSaved, setSpotsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
  const [menuForm, setMenuForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "General",
  });

  const [showCouponForm, setShowCouponForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [couponForm, setCouponForm] = useState({
    code: "",
    discount: "",
    type: "percentage",
    description: "",
    maxUses: "",
  });

  const headers = { "x-admin-code": adminCode };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Invalid code");
      }
      setAdminCode(code);
      setAuthenticated(true);
    } catch (err: unknown) {
      setAuthError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    const h = { "x-admin-code": adminCode };
    try {
      if (tab === "menu") {
        const res = await fetch("/api/admin/menu", { headers: h });
        const data = await res.json();
        setMenuItems(data.items || []);
      } else if (tab === "coupons") {
        const res = await fetch("/api/admin/coupons", { headers: h });
        const data = await res.json();
        setCoupons(data.coupons || []);
        setTotalClaims(data.totalClaims || 0);
      } else if (tab === "orders") {
        const res = await fetch("/api/admin/orders", { headers: h });
        const data = await res.json();
        setOrders(data.orders || []);
        setTotalAmount(data.totalAmount || 0);
      } else if (tab === "hours") {
        const res = await fetch("/api/admin/hours", { headers: h });
        const data = await res.json();
        setHours(data.hours || DEFAULT_HOURS);
      } else if (tab === "availability") {
        const res = await fetch("/api/admin/availability");
        const data = await res.json();
        setAvailableSpots(data.spots ?? 6);
      }
    } catch {
      // silently handle
    } finally {
      setLoading(false);
    }
  }, [adminCode, tab]);

  useEffect(() => {
    if (authenticated) fetchData();
  }, [authenticated, tab, fetchData]);

  // ── Menu CRUD ──
  const handleMenuSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingMenu ? "PUT" : "POST";
    const body = editingMenu
      ? { id: editingMenu.id, ...menuForm }
      : menuForm;
    await fetch("/api/admin/menu", {
      method,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setShowMenuForm(false);
    setEditingMenu(null);
    setMenuForm({ name: "", description: "", price: "", category: "General" });
    fetchData();
  };

  const deleteMenuItem = async (id: string) => {
    await fetch("/api/admin/menu", {
      method: "DELETE",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchData();
  };

  const startEditMenu = (item: MenuItem) => {
    setEditingMenu(item);
    setMenuForm({
      name: item.name,
      description: item.description,
      price: String(item.price),
      category: item.category,
    });
    setShowMenuForm(true);
  };

  // ── Coupon CRUD ──
  const handleCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingCoupon ? "PUT" : "POST";
    const body = editingCoupon
      ? { id: editingCoupon.id, ...couponForm }
      : couponForm;
    await fetch("/api/admin/coupons", {
      method,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setShowCouponForm(false);
    setEditingCoupon(null);
    setCouponForm({
      code: "",
      discount: "",
      type: "percentage",
      description: "",
      maxUses: "",
    });
    fetchData();
  };

  const deleteCoupon = async (id: string) => {
    await fetch("/api/admin/coupons", {
      method: "DELETE",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchData();
  };

  const startEditCoupon = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setCouponForm({
      code: coupon.code,
      discount: String(coupon.discount),
      type: coupon.type,
      description: coupon.description,
      maxUses: coupon.maxUses ? String(coupon.maxUses) : "",
    });
    setShowCouponForm(true);
  };

  const toggleCouponActive = async (coupon: Coupon) => {
    await fetch("/api/admin/coupons", {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ id: coupon.id, active: !coupon.active }),
    });
    fetchData();
  };

  // ── Order status ──
  const updateOrderStatus = async (id: string, status: string) => {
    await fetch("/api/admin/orders", {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchData();
  };

  // ── Hours ──
  const updateHours = async () => {
    await fetch("/api/admin/hours", {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ hours }),
    });
    fetchData();
  };

  const updateDayHours = (day: string, field: string, value: string | boolean) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  // ── Availability ──
  const updateAvailability = async () => {
    await fetch("/api/admin/availability", {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ spots: availableSpots }),
    });
    setSpotsSaved(true);
    setTimeout(() => setSpotsSaved(false), 3000);
  };

  // ── Login Screen ──
  if (!authenticated) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-gold" />
            </div>
            <h1 className="font-serif text-2xl text-charcoal">Admin Access</h1>
            <p className="text-softBrown text-sm mt-1">
              Enter your team code to continue
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Team code"
              required
              className="w-full px-4 py-3 rounded-xl border border-goldLight/40 bg-cream/30 text-charcoal placeholder:text-softBrown/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors"
            />
            {authError && (
              <p className="text-terracotta text-sm">{authError}</p>
            )}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 bg-gold text-white font-semibold rounded-xl hover:bg-goldDark transition-colors disabled:opacity-60"
            >
              {authLoading ? "Verifying..." : "Enter Admin"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // ── Dashboard ──
  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "orders", label: "Orders", icon: <ShoppingCart className="w-4 h-4" /> },
    { key: "menu", label: "Menu & Prices", icon: <UtensilsCrossed className="w-4 h-4" /> },
    { key: "coupons", label: "Coupons", icon: <Tag className="w-4 h-4" /> },
    { key: "hours", label: "Hours", icon: <Clock className="w-4 h-4" /> },
    { key: "availability", label: "Availability", icon: <CalendarCheck className="w-4 h-4" /> },
  ];

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-charcoal text-cream">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-serif text-xl flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold" />
            Admin Dashboard
          </h1>
          <button
            onClick={() => {
              setAuthenticated(false);
              setAdminCode("");
              setCode("");
            }}
            className="flex items-center gap-1.5 text-sm text-cream/60 hover:text-cream transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-goldLight/20 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                tab === t.key
                  ? "border-gold text-gold"
                  : "border-transparent text-charcoal/50 hover:text-charcoal"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-12 text-softBrown">Loading...</div>
        )}

        {/* ═══ ORDERS TAB ═══ */}
        {tab === "orders" && !loading && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-goldLight/20">
                <p className="text-sm text-softBrown">Total Orders</p>
                <p className="text-3xl font-bold text-charcoal">
                  {orders.length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-goldLight/20">
                <p className="text-sm text-softBrown">Total Revenue</p>
                <p className="text-3xl font-bold text-gold flex items-center gap-1">
                  <DollarSign className="w-6 h-6" />
                  {totalAmount.toFixed(2)}
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-goldLight/20">
                <p className="text-sm text-softBrown">Pending</p>
                <p className="text-3xl font-bold text-terracotta">
                  {orders.filter((o) => o.status === "pending").length}
                </p>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-3">
              {orders.length === 0 && (
                <p className="text-center text-softBrown py-8">
                  No orders yet.
                </p>
              )}
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl p-5 shadow-sm border border-goldLight/20"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-charcoal">
                          {order.name}
                        </h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            order.status === "pending"
                              ? "bg-terracotta/10 text-terracotta"
                              : order.status === "confirmed"
                              ? "bg-gold/10 text-gold"
                              : order.status === "completed"
                              ? "bg-sage/10 text-sage"
                              : "bg-charcoal/10 text-charcoal"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-softBrown mt-1">
                        {order.email} &middot; {order.phone}
                      </p>
                      <p className="text-xs text-softBrown/60 mt-1">
                        {order.orderType} &middot;{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-lg font-bold text-gold">
                        ${Number(order.total || 0).toFixed(2)}
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                        className="text-sm border border-goldLight/40 rounded-lg px-2 py-1.5 bg-cream/30 focus:outline-none focus:ring-1 focus:ring-gold/40"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="preparing">Preparing</option>
                        <option value="delivered">Delivered</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ MENU TAB ═══ */}
        {tab === "menu" && !loading && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-charcoal">
                Menu & Price List
              </h2>
              <button
                onClick={() => {
                  setEditingMenu(null);
                  setMenuForm({
                    name: "",
                    description: "",
                    price: "",
                    category: "General",
                  });
                  setShowMenuForm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gold text-white text-sm font-medium rounded-xl hover:bg-goldDark transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            {/* Menu Form Modal */}
            {showMenuForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-xl text-charcoal">
                      {editingMenu ? "Edit Item" : "Add Item"}
                    </h3>
                    <button
                      onClick={() => setShowMenuForm(false)}
                      className="text-charcoal/40 hover:text-charcoal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleMenuSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Item name"
                      value={menuForm.name}
                      onChange={(e) =>
                        setMenuForm({ ...menuForm, name: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl border border-goldLight/40 bg-cream/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                    />
                    <textarea
                      placeholder="Description"
                      value={menuForm.description}
                      onChange={(e) =>
                        setMenuForm({
                          ...menuForm,
                          description: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-goldLight/40 bg-cream/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 resize-none"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={menuForm.price}
                        onChange={(e) =>
                          setMenuForm({ ...menuForm, price: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 rounded-xl border border-goldLight/40 bg-cream/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                      />
                      <select
                        value={menuForm.category}
                        onChange={(e) =>
                          setMenuForm({ ...menuForm, category: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-goldLight/40 bg-cream/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                      >
                        <option value="General">General</option>
                        <option value="High Protein">High Protein</option>
                        <option value="Mediterranean">Mediterranean</option>
                        <option value="Weight Loss">Weight Loss</option>
                        <option value="Gourmet">Gourmet</option>
                        <option value="Family">Family</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Dessert">Dessert</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-gold text-white font-semibold rounded-xl hover:bg-goldDark transition-colors flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {editingMenu ? "Update Item" : "Add Item"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Menu Items List */}
            <div className="space-y-2">
              {menuItems.length === 0 && (
                <p className="text-center text-softBrown py-8">
                  No menu items yet. Add your first item above.
                </p>
              )}
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-goldLight/20 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-charcoal text-sm">
                        {item.name}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-goldLight/20 text-gold">
                        {item.category}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-xs text-softBrown mt-0.5 truncate">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-bold text-gold">
                      ${Number(item.price).toFixed(2)}
                    </span>
                    <button
                      onClick={() => startEditMenu(item)}
                      className="p-1.5 text-charcoal/40 hover:text-gold transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteMenuItem(item.id)}
                      className="p-1.5 text-charcoal/40 hover:text-terracotta transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ COUPONS TAB ═══ */}
        {tab === "coupons" && !loading && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-2xl text-charcoal">
                  Coupons & Promotions
                </h2>
                <p className="text-sm text-softBrown mt-1">
                  Total coupon claims: {totalClaims}
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingCoupon(null);
                  setCouponForm({
                    code: "",
                    discount: "",
                    type: "percentage",
                    description: "",
                    maxUses: "",
                  });
                  setShowCouponForm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gold text-white text-sm font-medium rounded-xl hover:bg-goldDark transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Coupon
              </button>
            </div>

            {/* Coupon Form Modal */}
            {showCouponForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-xl text-charcoal">
                      {editingCoupon ? "Edit Coupon" : "Add Coupon"}
                    </h3>
                    <button
                      onClick={() => setShowCouponForm(false)}
                      className="text-charcoal/40 hover:text-charcoal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleCouponSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Coupon code (e.g. WELCOME10)"
                      value={couponForm.code}
                      onChange={(e) =>
                        setCouponForm({ ...couponForm, code: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl border border-goldLight/40 bg-cream/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 uppercase"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        placeholder="Discount"
                        value={couponForm.discount}
                        onChange={(e) =>
                          setCouponForm({
                            ...couponForm,
                            discount: e.target.value,
                          })
                        }
                        required
                        className="w-full px-4 py-3 rounded-xl border border-goldLight/40 bg-cream/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                      />
                      <select
                        value={couponForm.type}
                        onChange={(e) =>
                          setCouponForm({ ...couponForm, type: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-goldLight/40 bg-cream/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                      >
                        <option value="percentage">% Off</option>
                        <option value="fixed">$ Off</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      placeholder="Description (optional)"
                      value={couponForm.description}
                      onChange={(e) =>
                        setCouponForm({
                          ...couponForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-goldLight/40 bg-cream/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                    />
                    <input
                      type="number"
                      placeholder="Max uses (leave empty for unlimited)"
                      value={couponForm.maxUses}
                      onChange={(e) =>
                        setCouponForm({
                          ...couponForm,
                          maxUses: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-goldLight/40 bg-cream/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 bg-gold text-white font-semibold rounded-xl hover:bg-goldDark transition-colors flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {editingCoupon ? "Update Coupon" : "Add Coupon"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Coupons List */}
            <div className="space-y-2">
              {coupons.length === 0 && (
                <p className="text-center text-softBrown py-8">
                  No coupons yet. Create your first promotion above.
                </p>
              )}
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className={`bg-white rounded-xl p-4 shadow-sm border border-goldLight/20 flex items-center justify-between gap-4 ${
                    !coupon.active ? "opacity-50" : ""
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-gold text-sm">
                        {coupon.code}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-sage/10 text-sage">
                        {coupon.discount}
                        {coupon.type === "percentage" ? "%" : "$"} off
                      </span>
                      {!coupon.active && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-charcoal/10 text-charcoal/50">
                          Inactive
                        </span>
                      )}
                    </div>
                    {coupon.description && (
                      <p className="text-xs text-softBrown mt-0.5">
                        {coupon.description}
                      </p>
                    )}
                    <p className="text-xs text-softBrown/60 mt-0.5">
                      Used: {coupon.usedCount}
                      {coupon.maxUses ? ` / ${coupon.maxUses}` : " (unlimited)"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleCouponActive(coupon)}
                      className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                        coupon.active
                          ? "bg-terracotta/10 text-terracotta hover:bg-terracotta/20"
                          : "bg-sage/10 text-sage hover:bg-sage/20"
                      }`}
                    >
                      {coupon.active ? "Disable" : "Enable"}
                    </button>
                    <button
                      onClick={() => startEditCoupon(coupon)}
                      className="p-1.5 text-charcoal/40 hover:text-gold transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteCoupon(coupon.id)}
                      className="p-1.5 text-charcoal/40 hover:text-terracotta transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ HOURS TAB ═══ */}
        {tab === "hours" && !loading && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-charcoal">
                Operating Hours
              </h2>
              <button
                onClick={updateHours}
                className="flex items-center gap-2 px-4 py-2 bg-gold text-white text-sm font-medium rounded-xl hover:bg-goldDark transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Hours
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-goldLight/20 divide-y divide-goldLight/10">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-between p-4 gap-4"
                >
                  <div className="w-28 flex-shrink-0">
                    <span className="font-medium text-charcoal capitalize text-sm">
                      {day}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 justify-end">
                    <label className="flex items-center gap-2 text-sm text-softBrown cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hours[day]?.closed || false}
                        onChange={(e) =>
                          updateDayHours(day, "closed", e.target.checked)
                        }
                        className="rounded border-goldLight/40 text-gold focus:ring-gold/40"
                      />
                      Closed
                    </label>
                    {!hours[day]?.closed && (
                      <>
                        <input
                          type="time"
                          value={hours[day]?.open || "08:00"}
                          onChange={(e) =>
                            updateDayHours(day, "open", e.target.value)
                          }
                          className="px-3 py-2 rounded-lg border border-goldLight/40 bg-cream/30 text-sm focus:outline-none focus:ring-1 focus:ring-gold/40"
                        />
                        <span className="text-softBrown text-sm">to</span>
                        <input
                          type="time"
                          value={hours[day]?.close || "20:00"}
                          onChange={(e) =>
                            updateDayHours(day, "close", e.target.value)
                          }
                          className="px-3 py-2 rounded-lg border border-goldLight/40 bg-cream/30 text-sm focus:outline-none focus:ring-1 focus:ring-gold/40"
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ AVAILABILITY TAB ═══ */}
        {tab === "availability" && !loading && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-charcoal">
                Monthly Availability
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-goldLight/20 p-6 max-w-md">
              <p className="text-softBrown text-sm mb-4">
                Set the number of available client openings shown on the
                homepage scarcity banner. Update this monthly as availability
                changes.
              </p>

              <label className="block text-sm font-medium text-charcoal mb-2">
                Available Spots This Month
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min={0}
                  max={99}
                  value={availableSpots}
                  onChange={(e) =>
                    setAvailableSpots(Number(e.target.value))
                  }
                  className="w-24 px-4 py-3 rounded-xl border border-goldLight/40 bg-cream/30 text-charcoal text-lg font-bold text-center focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
                <button
                  onClick={updateAvailability}
                  className="flex items-center gap-2 px-6 py-3 bg-gold text-white text-sm font-medium rounded-xl hover:bg-goldDark transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>

              {spotsSaved && (
                <p className="text-sage text-sm mt-3 font-medium">
                  Availability updated successfully!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
