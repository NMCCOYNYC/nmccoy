"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPrimaryImage } from "@/lib/products";
import { searchScarves } from "@/lib/search";

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchScarves(query);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }

    inputRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="nav-search" role="dialog" aria-modal="true" aria-label="Search">
      <button type="button" className="nav-search__backdrop" onClick={onClose} />
      <div className="nav-search__panel">
        <form
          className="nav-search__form"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="sr-only" htmlFor="site-search">
            Search the collection
          </label>
          <input
            id="site-search"
            ref={inputRef}
            className="nav-search__input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the collection"
            autoComplete="off"
          />
          <button type="button" className="nav-search__close" onClick={onClose}>
            Close
          </button>
        </form>

        {query.trim() ? (
          results.length ? (
            <ul className="nav-search__results">
              {results.map((scarf) => {
                const image = getPrimaryImage(scarf);
                return (
                  <li key={scarf.slug}>
                    <Link
                      href={`/scarves/${scarf.slug}`}
                      className="nav-search__result"
                      onClick={onClose}
                    >
                      <span className="nav-search__thumb">
                        {image ? (
                          <Image
                            src={image}
                            alt=""
                            fill
                            sizes="64px"
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <span style={{ background: scarf.gradient }} />
                        )}
                      </span>
                      <span>
                        <span className="nav-search__no">{scarf.numberLabel}</span>
                        <span className="nav-search__name">{scarf.name}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="nav-search__empty">No pieces match that search.</p>
          )
        ) : (
          <p className="nav-search__hint">
            Try a name — Wild Mirage, Sundance, or Indigo Dream.
          </p>
        )}
      </div>
    </div>
  );
}
