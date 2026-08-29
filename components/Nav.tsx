"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountIcon } from "@/components/AccountIcon";
import { CartIcon } from "@/components/CartIcon";
import { FavoritesIcon } from "@/components/FavoritesIcon";
import { SearchOverlay } from "@/components/SearchOverlay";
import { Logo, NavLink } from "@/components/Brand";

const pageLinks = [
  { href: "/collection", label: "Collection" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "Our Story" },
  { href: "/impact", label: "Impact" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`} id="mainNav">
        <div className="nav__side nav__side--left">
          <ul className="nav__links">
            {pageLinks.map((link) => (
              <NavLink key={link.href} href={link.href} active={isActive(link.href)}>
                {link.label}
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="nav__logo">
          <Logo
            onClick={(e) => {
              setMobileOpen(false);
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          />
        </div>
        <div className="nav__side nav__side--right">
          <div className="nav__tools">
            <button
              type="button"
              className={`nav__search-label${searchOpen ? " is-active" : ""}`}
              aria-label="Search"
              aria-expanded={searchOpen}
              onClick={() => {
                setMobileOpen(false);
                setSearchOpen((open) => !open);
              }}
            >
              Search
            </button>
            <AccountIcon />
            <FavoritesIcon />
            <CartIcon />
          </div>
          <button
            type="button"
            className="nav__hamburger"
            aria-label="Open menu"
            onClick={() => {
              setSearchOpen(false);
              setMobileOpen(true);
            }}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <div className={`mobile-nav${mobileOpen ? " open" : ""}`}>
        <button
          type="button"
          className="mobile-close"
          onClick={() => setMobileOpen(false)}
        >
          Close
        </button>
        {pageLinks.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link href="/contact" onClick={() => setMobileOpen(false)}>
          Contact
        </Link>
        <Link href="/favorites" onClick={() => setMobileOpen(false)}>
          Favorites
        </Link>
        <Link href="/account" onClick={() => setMobileOpen(false)}>
          Account
        </Link>
        <Link href="/cart" onClick={() => setMobileOpen(false)}>
          Cart
        </Link>
      </div>
    </>
  );
}
