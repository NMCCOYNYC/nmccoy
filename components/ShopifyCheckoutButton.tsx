"use client";

import { useState } from "react";
import { analyticsEvents } from "@/lib/analytics";

type ShopifyCheckoutButtonProps = {
  slug: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  disabledLabel?: string;
};

export function ShopifyCheckoutButton({
  slug,
  label,
  className = "btn btn--dark",
  style,
  disabled = false,
  disabledLabel,
}: ShopifyCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    if (disabled || loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/shopify/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });

      const data = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
      };

      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      analyticsEvents.checkoutStart(slug);
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
    <div>
      <button
        type="button"
        className={className}
        style={{
          width: "100%",
          textAlign: "center",
          padding: "1.1rem",
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "not-allowed" : loading ? "wait" : "pointer",
          ...style,
        }}
        onClick={handleCheckout}
        disabled={disabled || loading}
      >
        {disabled
          ? disabledLabel || label
          : loading
            ? "Redirecting to checkout..."
            : label}
      </button>
      {error ? (
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "12px",
            color: "#99372C",
            lineHeight: 1.5,
          }}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
