"use client";

import { useFavorites } from "@/components/FavoritesProvider";

export function FavoriteButton({
  slug,
  name,
  variant = "icon",
  className = "",
}: {
  slug: string;
  name?: string;
  variant?: "icon" | "text";
  className?: string;
}) {
  const { has, toggle } = useFavorites();
  const saved = has(slug);

  return (
    <button
      type="button"
      className={`fav-btn fav-btn--${variant}${saved ? " is-saved" : ""}${className ? ` ${className}` : ""}`}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name || "this piece"} from favorites` : `Save ${name || "this piece"} to favorites`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(slug);
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
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
      {variant === "text" ? (
        <span>{saved ? "Saved to favorites" : "Save to favorites"}</span>
      ) : null}
    </button>
  );
}
