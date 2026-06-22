"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Globe as Facebook, Sparkles, Mail, ArrowRight } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, navLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "#products" },
      { label: "Best Sellers", href: "#products" },
      { label: "Sale & Deals", href: "#deals" },
      { label: "All Categories", href: "#categories" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Shipping Info", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Contact Us", href: "#newsletter" },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

export default function Footer() {
  const pathname = usePathname();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && href !== "#") {
      if (pathname === "/") {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getHref = (href: string) => {
    if (href === "#") return "#";
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300">
      {/* Top wave */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">{APP_NAME}</span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6 max-w-xs">
              {APP_TAGLINE} Premium products, thoughtfully curated for people
              who appreciate quality and design.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-indigo-600 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={getHref(link.href)}
                      onClick={(e) => handleClick(e, link.href)}
                      className="text-sm text-neutral-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-neutral-500">
            <Mail className="w-3.5 h-3.5" />
            <a
              href="mailto:hello@lumiere.shop"
              className="hover:text-indigo-400 transition-colors"
            >
              hello@lumiere.shop
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <a href="#" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-neutral-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-neutral-300 transition-colors">
              Cookie Settings
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}