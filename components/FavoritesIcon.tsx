"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/components/FavoritesProvider";

export function FavoritesIcon() {
  const { count } = useFavorites();
  const pathname = usePathname();
  const active = pathname.startsWith("/favorites");

  return (
    <Link
      href="/favorites"
      className={`nav__icon${active ? " is-active" : ""}`}
      aria-label={
        count
          ? `Favorites, ${count} ${count === 1 ? "piece" : "pieces"}`
          : "Favorites"
      }
    >
      <svg
        className="nav__icon-svg"
        viewBox="0 0 24 24"
        fill={count > 0 ? "currentColor" : "none"}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 19.4s-6.2-3.8-8.1-7.2C2.4 9.9 3.2 6.8 6 6.1c1.7-.4 3.3.3 4 1.7.7-1.4 2.3-2.1 4-1.7 2.8.7 3.6 3.8 2.1 6.1-1.9 3.4-8.1 7.2-8.1 7.2Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      {count > 0 ? <span className="nav__cart-count">{count}</span> : null}
    </Link>
  );
}
