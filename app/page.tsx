"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star, ArrowRight, Truck, ShieldCheck, RefreshCw, Headphones, Sparkles, Heart, Eye, ChevronRight, Check, Zap } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, categories } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { type Variants } from "framer-motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const products = [
  {
    id: 1,
    name: "Aether Wireless Headphones",
    category: "electronics",
    price: 189,
    originalPrice: 249,
    rating: 4.8,
    reviewCount: 1240,
    image: "https://bloomaudio.com/cdn/shop/files/kiwi-ears-aether-thumb_1800x1800.webp?v=1741204381",
    badge: "Best Seller",
    description: "Studio-quality sound with 40-hour battery life and adaptive noise cancellation.",
  },
  {
    id: 2,
    name: "Linen Oversized Blazer",
    category: "fashion",
    price: 134,
    originalPrice: undefined,
    rating: 4.6,
    reviewCount: 832,
    image: "https://magiclinen.com/cdn/shop/products/HEBER-blazer-in-natural-melage-ROME-pants-in-natural-melange-OLINDA-top-in-white-1.jpg?v=1717593916&width=1946",
    badge: "New",
    description: "Effortlessly chic tailoring in breathable premium linen. Available in 6 tones.",
  },
  {
    id: 3,
    name: "Ceramic Pour-Over Set",
    category: "home",
    price: 78,
    originalPrice: 95,
    rating: 4.9,
    reviewCount: 567,
    image: "https://m.media-amazon.com/images/I/71iKbFzI7WL._AC_UF894,1000_QL80_.jpg",
    badge: "Sale",
    description: "Hand-thrown stoneware dripper and carafe for the perfect morning ritual.",
  },
  {
    id: 4,
    name: "Vitamin C Radiance Serum",
    category: "beauty",
    price: 62,
    originalPrice: undefined,
    rating: 4.7,
    reviewCount: 2103,
    image: "https://cdn.thewirecutter.com/wp-content/media/2025/03/BEST-VITAMIN-C-SERUMS-SUB-2048px-2067-3x2-1.jpg?auto=webp&quality=75&crop=16:9,smart&width=1024",
    badge: undefined,
    description: "15% stabilised Vitamin C with hyaluronic acid for luminous, even-toned skin.",
  },
  {
    id: 5,
    name: "Merino Trail Running Tee",
    category: "sports",
    price: 89,
    originalPrice: undefined,
    rating: 4.5,
    reviewCount: 418,
    image: "http://www.invisible-company.com/cdn/shop/files/2026-01-Merino-SS-Product-Image-1.jpg?v=1772527283",
    badge: undefined,
    description: "Naturally odour-resistant merino wool engineered for high-output adventures.",
  },
  {
    id: 6,
    name: "Walnut Desk Organiser",
    category: "home",
    price: 115,
    originalPrice: 140,
    rating: 4.8,
    reviewCount: 294,
    image: "https://i.etsystatic.com/18396026/r/il/269bc5/2056444760/il_fullxfull.2056444760_4tcv.jpg",
    badge: "Sale",
    description: "Solid American walnut with brass accents. Keeps your workspace beautifully ordered.",
  },
  {
    id: 7,
    name: "Slim Leather Card Wallet",
    category: "fashion",
    price: 55,
    originalPrice: undefined,
    rating: 4.6,
    reviewCount: 1087,
    image: "https://www.jackgeorges.com/cdn/shop/files/7736honey-lifestyle2.jpg?v=1694620322",
    badge: undefined,
    description: "Full-grain vegetable-tanned leather. Holds 8 cards and ages beautifully.",
  },
  {
    id: 8,
    name: "Smart Fitness Tracker",
    category: "electronics",
    price: 149,
    originalPrice: 199,
    rating: 4.4,
    reviewCount: 3210,
    image: "https://m.media-amazon.com/images/I/61RADUe94LL.jpg",
    badge: "Hot Deal",
    description: "24/7 health monitoring, GPS, and 7-day battery in a featherlight design.",
  },
];

const deals = [
  {
    id: 1,
    name: "Noise-Cancelling Earbuds Pro",
    price: 99,
    originalPrice: 159,
    discount: 38,
    image: "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_UF894,1000_QL80_.jpg",
    timeLeft: "2d 14h",
  },
  {
    id: 2,
    name: "Bamboo Yoga Mat Premium",
    price: 48,
    originalPrice: 79,
    discount: 39,
    image: "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_UF894,1000_QL80_.jpg",
    timeLeft: "1d 6h",
  },
  {
    id: 3,
    name: "Glass Skincare Routine Kit",
    price: 89,
    originalPrice: 145,
    discount: 39,
    image: "https://i.ebayimg.com/images/g/ImEAAOSwZ91gbdVi/s-l1200.jpg",
    timeLeft: "3d 2h",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sophia Laurent",
    role: "Interior Designer",
    avatar: "https://www.peachandlily.com/cdn/shop/files/Image_3_9.jpg?v=1747822799&width=1248",
    rating: 5,
    text: "Lumière has completely changed how I shop. Every product feels intentional — the quality is exceptional and delivery is always faster than expected.",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Product Manager",
    avatar: "https://podcastle.org/wp-content/uploads/2024/09/photo_2024-06-24_16-15-54-660x989.jpg",
    rating: 5,
    text: "I've ordered from dozens of online stores, but Lumière's curation is unmatched. The headphones I bought are genuinely life-changing for deep work.",
  },
  {
    id: 3,
    name: "Amara Osei",
    role: "Wellness Coach",
    avatar: "https://www.stay4skill.com/_next/image?url=https%3A%2F%2Fwugqzhebdtnnuxlxtwlt.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Favatars%2Famara-osei.jpg&w=3840&q=75",
    rating: 5,
    text: "The skincare range is incredible. I love that every product is thoughtfully sourced. My skin has never looked better — and the packaging is gorgeous.",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Express Shipping",
    description: "Complimentary 2-day shipping on all orders over $75. Same-day dispatch before 2 PM.",
  },
  {
    icon: ShieldCheck,
    title: "Authenticity Guaranteed",
    description: "Every product is verified and sourced directly from brands. Zero counterfeits, ever.",
  },
  {
    icon: RefreshCw,
    title: "60-Day Free Returns",
    description: "Changed your mind? Return anything within 60 days, no questions asked.",
  },
  {
    icon: Headphones,
    title: "Concierge Support",
    description: "Real humans available 7 days a week via chat, email, or phone. Average reply: 4 min.",
  },
];

const stats = [
  { value: "2.4M+", label: "Happy Customers" },
  { value: "18K+", label: "Curated Products" },
  { value: "4.9★", label: "Average Rating" },
  { value: "98%", label: "Satisfaction Rate" },
];

// ─── Badge colour helper ─────────────────────────────────────────────────────

function badgeClass(badge: string) {
  if (badge === "Sale" || badge === "Hot Deal") return "bg-rose-500 text-white";
  if (badge === "New") return "bg-emerald-500 text-white";
  if (badge === "Best Seller") return "bg-amber-500 text-white";
  return "bg-indigo-600 text-white";
}

// ─── Star renderer ───────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-neutral-200 text-neutral-200"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Product Card ────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    window.dispatchEvent(
      new CustomEvent("cartUpdate", { detail: { count: 1 } })
    );
    setTimeout(() => setAdded(false), 1800);
  };

  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-neutral-100 transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-neutral-50 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setWished((w) => !w)}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${
              wished
                ? "bg-rose-500 text-white"
                : "bg-white text-neutral-600 hover:text-rose-500"
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${wished ? "fill-white" : ""}`} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-full bg-white text-neutral-600 hover:text-indigo-600 flex items-center justify-center shadow-md transition-colors"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
        </div>
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass(product.badge)}`}
          >
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute bottom-3 left-3 text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-600">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs font-medium text-indigo-500 uppercase tracking-wider mb-1 capitalize">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-neutral-900 leading-snug mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-neutral-500 leading-relaxed mb-3 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <Stars rating={product.rating} />
          <span className="text-xs text-neutral-500">
            ({(product.reviewCount ?? 0).toLocaleString()})
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-neutral-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-colors ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" /> Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const heroCardVariant: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.3 + i * 0.12 },
    }),
  };

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-indigo-50 via-white to-violet-50 pt-20 pb-16 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-violet-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Summer Collection 2025 — Now Live
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-900 leading-[1.08] tracking-tight mb-6"
            >
              Style that{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                speaks
              </span>{" "}
              for itself.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              {APP_TAGLINE} Discover premium fashion, tech, home goods, and
              beauty — all rigorously curated so you never have to compromise.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-colors"
              >
                Shop the Collection <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#categories"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#categories")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold px-7 py-3.5 rounded-xl border border-neutral-200 shadow-sm transition-colors"
              >
                Browse Categories
              </motion.a>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-6 mt-10 justify-center lg:justify-start"
            >
              {stats.slice(0, 3).map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <p className="text-xl font-extrabold text-neutral-900">{s.value}</p>
                  <p className="text-xs text-neutral-500">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — floating product cards */}
          <div className="relative hidden lg:flex items-center justify-center h-[520px]">
            {/* Main hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
              className="relative w-80 h-96 rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://yoitzi.com/cdn/shop/t/1/assets/yoitzi-hero-products.png?v=27799219983593975061779917649"
                alt="Curated lifestyle products"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3">
                <p className="text-xs font-semibold text-neutral-900">Aether Headphones</p>
                <div className="flex items-center justify-between mt-1">
                  <Stars rating={4.8} />
                  <span className="text-sm font-bold text-indigo-600">$189</span>
                </div>
              </div>
            </motion.div>

            {/* Floating card 1 */}
            <motion.div
              custom={0}
              variants={heroCardVariant}
              initial="hidden"
              animate="visible"
              className="absolute -left-4 top-12 bg-white rounded-2xl shadow-xl p-3 w-44 border border-neutral-100"
            >
              <img
                src="https://m.media-amazon.com/images/I/71iKbFzI7WL._AC_UF894,1000_QL80_.jpg"
                alt="Ceramic Pour-Over"
                className="w-full h-24 object-cover rounded-xl mb-2"
              />
              <p className="text-xs font-semibold text-neutral-800 line-clamp-1">Ceramic Pour-Over Set</p>
              <p className="text-xs text-indigo-600 font-bold mt-0.5">$78</p>
            </motion.div>

            {/* Floating card 2 */}
            <motion.div
              custom={1}
              variants={heroCardVariant}
              initial="hidden"
              animate="visible"
              className="absolute -right-6 top-8 bg-white rounded-2xl shadow-xl p-3 w-40 border border-neutral-100"
            >
              <img
                src="https://cdn.thewirecutter.com/wp-content/media/2025/03/BEST-VITAMIN-C-SERUMS-SUB-2048px-2067-3x2-1.jpg?auto=webp&quality=75&crop=16:9,smart&width=1024"
                alt="Vitamin C Serum"
                className="w-full h-20 object-cover rounded-xl mb-2"
              />
              <p className="text-xs font-semibold text-neutral-800 line-clamp-1">Radiance Serum</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-xs text-neutral-500">4.7</span>
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              custom={2}
              variants={heroCardVariant}
              initial="hidden"
              animate="visible"
              className="absolute -right-2 bottom-20 bg-indigo-600 text-white rounded-2xl shadow-xl px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-300" />
                <div>
                  <p className="text-xs font-bold">Flash Sale</p>
                  <p className="text-xs opacity-80">Up to 40% off</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-neutral-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {valueProps.map((vp) => (
              <motion.div
                key={vp.title}
                variants={fadeInUp}
                className="flex items-start gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center flex-shrink-0 transition-colors">
                  <vp.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 mb-1">{vp.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{vp.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <section id="categories" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
              Browse by Category
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mt-2">
              Find your perfect match
            </h2>
            <p className="text-neutral-500 mt-3 max-w-xl mx-auto">
              From cutting-edge electronics to timeless fashion — every category is hand-picked for quality and design.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                variants={scaleIn}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${
                  activeCategory === cat.id
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200"
                    : "bg-white text-neutral-700 border-neutral-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────────────────── */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
                Featured Products
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mt-2">
                Curated just for you
              </h2>
            </div>
            <a
              href="#products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors group"
            >
              View all products
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {(filtered ?? []).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-center py-20 text-neutral-400"
            >
              <p className="text-lg font-medium">No products in this category yet.</p>
              <p className="text-sm mt-1">Check back soon — new arrivals weekly.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── DEALS ────────────────────────────────────────────────────────── */}
      <section id="deals" className="py-20 bg-gradient-to-br from-indigo-600 to-violet-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              Limited Time Offers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Flash Deals — Don't Miss Out
            </h2>
            <p className="text-indigo-200 mt-3 max-w-xl mx-auto">
              Deeply discounted picks, refreshed every 48 hours. Grab them before they're gone.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {deals.map((deal) => (
              <motion.div
                key={deal.id}
                variants={scaleIn}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl group"
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-neutral-100">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    -{deal.discount}%
                  </span>
                  <span className="absolute top-3 right-3 bg-black/70 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    ⏱ {deal.timeLeft}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-neutral-900 mb-2 line-clamp-1">{deal.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-extrabold text-neutral-900">${deal.price}</span>
                      <span className="text-sm text-neutral-400 line-through">${deal.originalPrice}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-xl transition-colors"
                    >
                      Grab Deal
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats bar */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeInUp}
                className="text-center bg-white rounded-2xl p-6 shadow-sm border border-neutral-100"
              >
                <p className="text-3xl font-extrabold text-indigo-600 mb-1">{s.value}</p>
                <p className="text-sm text-neutral-500">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
              Customer Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mt-2">
              Loved by thousands
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex flex-col"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed flex-1 mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover bg-neutral-100"
                  />
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section id="newsletter" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <motion.div variants={fadeInUp} className="relative">
              <span className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Join 240,000+ subscribers
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Get early access & exclusive deals
              </h2>
              <p className="text-indigo-200 mb-8 max-w-lg mx-auto">
                Be the first to know about new arrivals, flash sales, and members-only discounts. Unsubscribe anytime.
              </p>

              {subscribed ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center gap-2 bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl"
                >
                  <Check className="w-5 h-5" />
                  You're on the list — welcome to Lumière!
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-4 py-3 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 bg-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap"
                  >
                    Subscribe Free
                  </motion.button>
                </form>
              )}

              <p className="text-indigo-300 text-xs mt-4">
                No spam, ever. We respect your privacy.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}