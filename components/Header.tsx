"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, openCart } = useCart();

  return (
    <>
      <div className="top-ribbon">
        <span>New Bedford, Massachusetts</span>
        <span className="top-ribbon-divider" aria-hidden="true">•</span>
        <span>Built by Fishermen. Worn with Pride.</span>
      </div>

      <header className="site-header">
        <Link className="brand-lockup" href="/" aria-label="Over The Rail Co. home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 56 56" role="img">
              <circle cx="28" cy="28" r="25" />
              <path d="M11 30h34M17 22c5-7 17-7 22 0M18 36c7 5 13 5 20 0M28 13v30" />
            </svg>
          </span>
          <span className="brand-words">
            <strong>OVER THE RAIL</strong>
            <small>CO. · NEW BEDFORD</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className={active ? "is-active" : ""}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <button className="cart-trigger" type="button" onClick={openCart} aria-label="Open shopping cart">
            Cart <span>{cart?.totalQuantity || 0}</span>
          </button>
          <button
            className={`menu-trigger ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <p>Commercial fishing culture. Faith. Family. Hard work.</p>
      </div>
    </>
  );
}
