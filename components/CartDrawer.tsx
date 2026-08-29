"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { useDrawer } from "@/components/DrawerProvider";
import { SiteDrawer } from "@/components/SiteDrawer";
import { getPrimaryImage, getScarfBySlug } from "@/lib/products";
import { siteSettings } from "@/lib/site-settings";
import { analyticsEvents } from "@/lib/analytics";

export function CartDrawer() {
  const { items, count, setQuantity, removeItem } = useCart();
  const { closeDrawer } = useDrawer();
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
    0,
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
          : "Unable to start checkout.",
      );
      setLoading(false);
    }
  }

  return (
    <SiteDrawer
      id="cart"
      title={`Cart · ${count}`}
      footer={
        <>
          <Link href="/shipping" onClick={closeDrawer}>
            Shipping & returns
          </Link>
          <Link href="/contact" onClick={closeDrawer}>
            Contact
          </Link>
        </>
      }
    >
      {lines.length === 0 ? (
        <div className="site-drawer__empty">
          <p>You have no pieces in your cart.</p>
          <Link href="/collection" className="btn--underline" onClick={closeDrawer}>
            Explore the collection
          </Link>
        </div>
      ) : (
        <>
          <ul className="drawer-list">
            {lines.map((line) => {
              const image = getPrimaryImage(line.scarf);
              return (
                <li key={line.slug} className="drawer-item">
                  <Link
                    href={`/scarves/${line.slug}`}
                    className="drawer-item__img"
                    onClick={closeDrawer}
                  >
                    {image ? (
                      <Image
                        src={image}
                        alt={line.scarf.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="80px"
                      />
                    ) : (
                      <span
                        className="cart-item__fallback"
                        style={{ background: line.scarf.gradient }}
                      />
                    )}
                  </Link>
                  <div>
                    <p className="drawer-item__no">{line.scarf.numberLabel}</p>
                    <Link
                      href={`/scarves/${line.slug}`}
                      className="drawer-item__name"
                      onClick={closeDrawer}
                    >
                      {line.scarf.name}
                    </Link>
                    <p className="drawer-item__price">
                      ${siteSettings.fullPrice} USD
                    </p>
                    <div className="drawer-item__qty">
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
                      className="drawer-item__remove"
                      onClick={() => removeItem(line.slug)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="drawer-summary">
            <div className="drawer-summary__row">
              <span>Subtotal</span>
              <span>${subtotal} USD</span>
            </div>
            <p className="drawer-summary__note">
              Complimentary tracked shipping in the US. Ships{" "}
              {siteSettings.launchDate}.
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
          </div>
        </>
      )}
    </SiteDrawer>
  );
}
