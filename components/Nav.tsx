"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CollectionCta, Logo, NavLink } from "@/components/Brand";

const leftLinks = [
  { href: "/collection", label: "Collection" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "Our Story" },
];

const rightLinks = [
  { href: "/impact", label: "Impact" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`} id="mainNav">
        <div className="nav__side nav__side--left">
          <ul className="nav__links">
            {leftLinks.map((link) => (
              <NavLink key={link.href} href={link.href} active={isActive(link.href)}>
                {link.label}
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="nav__logo">
          <Logo />
        </div>
        <div className="nav__side nav__side--right">
          <ul className="nav__links">
            {rightLinks.map((link) => (
              <NavLink key={link.href} href={link.href} active={isActive(link.href)}>
                {link.label}
              </NavLink>
            ))}
          </ul>
          <CollectionCta />
          <button
            type="button"
            className="nav__hamburger"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-nav${mobileOpen ? " open" : ""}`}>
        <button
          type="button"
          className="mobile-close"
          onClick={() => setMobileOpen(false)}
        >
          Close
        </button>
        {[...leftLinks, ...rightLinks].map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link href="/collection" onClick={() => setMobileOpen(false)}>
          Collection
        </Link>
      </div>
    </>
  );
}
