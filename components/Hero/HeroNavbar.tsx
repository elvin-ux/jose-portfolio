"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Stories", href: "#stories" },
  { label: "About",   href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const linkVariants = {
  hidden:  { opacity: 0, y: -4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export default function HeroNavbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("header")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      const storiesEl = document.getElementById("stories");
      const aboutEl = document.getElementById("about");
      const contactEl = document.getElementById("contact");

      let current = "";
      if (storiesEl && scrollPosition >= storiesEl.offsetTop) {
        current = "#stories";
      }
      if (aboutEl && scrollPosition >= aboutEl.offsetTop) {
        current = "#about";
      }
      if (contactEl && scrollPosition >= contactEl.offsetTop) {
        current = "#contact";
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className="relative z-20 flex items-center justify-between hero-px nav-py flex-shrink-0"
    >
      {/* Brand name — left */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
      >
        <Link
          href="/"
          aria-label="Jose Vincent — Home"
          className="font-sans font-bold uppercase text-[var(--color-text)] tracking-[0.25em] inline-block hover:opacity-75 transition-opacity"
          style={{ fontSize: "0.85rem" }}
        >
          jk_clicks
        </Link>
      </motion.div>

      {/* Navigation & Hamburger — right */}
      <div className="flex items-center gap-8 lg:gap-10">
        <nav role="navigation" aria-label="Primary navigation" className="hidden md:block">
          <motion.ul
            role="list"
            className="flex items-center gap-[56px] list-none"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeSection === href;
              return (
                <motion.li key={href} variants={linkVariants}>
                  <Link
                    href={href}
                    className={`nav-link font-sans font-medium uppercase text-[var(--color-text)] relative inline-block ${isActive ? "active" : ""}`}
                    style={{ fontSize: "0.72rem", letterSpacing: "0.2em" }}
                  >
                    {label}
                    <span className="nav-link-line" aria-hidden="true" />
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>

        {/* Asymmetric Hamburger Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          type="button"
          aria-label="Toggle navigation menu"
          className="flex flex-col gap-[5px] items-end p-2 cursor-pointer focus-visible:outline-1 focus-visible:outline-[var(--color-neutral)] md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block w-6 h-[1px] bg-[var(--color-text)]" />
          <span className="block w-4 h-[1px] bg-[var(--color-text)]" />
          <span className="block w-5 h-[1px] bg-[var(--color-text)]" />
        </motion.button>
      </div>

      {/* Mobile Dropdown Panel Menu */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`} role="navigation" aria-label="Mobile navigation">
        <Link href="#stories" onClick={() => setMenuOpen(false)}>
          Work
        </Link>
        <Link href="#about" onClick={() => setMenuOpen(false)}>
          About
        </Link>
        <Link href="#contact" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>
      </div>
    </header>
  );
}
