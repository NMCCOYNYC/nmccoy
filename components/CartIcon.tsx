"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartProvider";

export function CartIcon() {
  const { count } = useCart();
  const pathname = usePathname();
  const active = pathname.startsWith("/cart");

  return (
    <Link
      href="/cart"
      className={`nav__cart${active ? " is-active" : ""}`}
      aria-label={count ? `Cart, ${count} ${count === 1 ? "item" : "items"}` : "Cart"}
    >
      <svg
        className="nav__cart-icon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6.5 8.5h11l-.9 10.2a1.5 1.5 0 0 1-1.5 1.3H8.9a1.5 1.5 0 0 1-1.5-1.3L6.5 8.5Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M9 8.5V7.2a3 3 0 0 1 6 0v1.3"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      {count > 0 ? <span className="nav__cart-count">{count}</span> : null}
    </Link>
  );
}
