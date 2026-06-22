export const APP_NAME = "Lumière";
export const APP_TAGLINE = "Curated for the modern lifestyle.";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products" },
  { label: "Categories", href: "#categories" },
  { label: "Deals", href: "#deals" },
  { label: "Newsletter", href: "#newsletter" },
];

export const navCTA = {
  label: "Shop Now",
  href: "#products",
};

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  description: string;
}

export type Category = {
  id: string;
  label: string;
  icon: string;
};

export const categories: Category[] = [
  { id: "all", label: "All Products", icon: "✦" },
  { id: "fashion", label: "Fashion", icon: "👗" },
  { id: "electronics", label: "Electronics", icon: "⚡" },
  { id: "home", label: "Home & Living", icon: "🏡" },
  { id: "beauty", label: "Beauty", icon: "✨" },
  { id: "sports", label: "Sports", icon: "🏃" },
];