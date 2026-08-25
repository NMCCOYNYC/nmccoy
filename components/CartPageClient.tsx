"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { getPrimaryImage, getScarfBySlug } from "@/lib/products";
import { siteSettings } from "@/lib/site-settings";
import { analyticsEvents } from "@/lib/analytics";

export function CartPageClient() {
  const { items, setQuantity, removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lines = items
    .map((item) => {
      const scarf = getScarfBySlug(item.slug);
      if (!scarf) return null;
      return { ...item, scarf };
    })
    .filter((line): line is NonNullable<typeof line> => Boolean(line));

  const subtotal = lines.reduce(
    (sum, line) => sum + siteSettings.fullPrice * line.quantity,
    0
  );

  async function handleCheckout() {
    if (!lines.length || loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/shopify/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((line) => ({
            slug: line.slug,
            quantity: line.quantity,
          })),
        }),
      });

      const data = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
      };

      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      analyticsEvents.checkoutStart(lines[0].slug);
      window.location.href = data.checkoutUrl;
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Unable to start checkout."
      );
      setLoading(false);
    }
  }

  return (
    <>
      <section className="cart-page">
        <p className="eyebrow">Cart</p>
        <h1>Your Selection</h1>

        {lines.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <Link href="/collection" className="btn--underline">
              View the Collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {lines.map((line) => {
                const image = getPrimaryImage(line.scarf);
                return (
                  <li key={line.slug} className="cart-item">
                    <Link href={`/scarves/${line.slug}`} className="cart-item__img">
                      {image ? (
                        <Image
                          src={image}
                          alt={line.scarf.name}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="120px"
                        />
                      ) : (
                        <span
                          className="cart-item__fallback"
                          style={{ background: line.scarf.gradient }}
                        />
                      )}
                    </Link>
                    <div className="cart-item__info">
                      <p className="cart-item__no">{line.scarf.numberLabel}</p>
                      <Link href={`/scarves/${line.slug}`} className="cart-item__name">
                        {line.scarf.name}
                      </Link>
                      <p className="cart-item__price">
                        ${siteSettings.fullPrice} USD
                      </p>
                      <div className="cart-item__qty">
                        <button
                          type="button"
                          onClick={() => setQuantity(line.slug, line.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{line.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(line.slug, line.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="cart-item__remove"
                        onClick={() => removeItem(line.slug)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="cart-summary">
              <div className="cart-summary__row">
                <span>Subtotal</span>
                <span>${subtotal} USD</span>
              </div>
              <p className="cart-summary__note">
                Shipping is calculated at checkout.
              </p>
              <button
                type="button"
                className="btn btn--dark"
                onClick={() => void handleCheckout()}
                disabled={loading}
                style={{ width: "100%", padding: "1.1rem" }}
              >
                {loading ? "Redirecting to checkout..." : "Checkout"}
              </button>
              {error ? <p className="cart-summary__error">{error}</p> : null}
              <button
                type="button"
                className="cart-summary__clear"
                onClick={clearCart}
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
}
