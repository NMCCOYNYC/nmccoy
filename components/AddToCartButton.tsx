"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";

type AddToCartButtonProps = {
  slug: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  disabledLabel?: string;
};

export function AddToCartButton({
  slug,
  label,
  className = "btn btn--dark",
  style,
  disabled = false,
  disabledLabel,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (disabled) return;
    addItem(slug, 1);
    setAdded(true);
    router.push("/cart");
  }

  return (
    <button
      type="button"
      className={className}
      style={{
        width: "100%",
        textAlign: "center",
        padding: "1.1rem",
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
      onClick={handleAdd}
      disabled={disabled}
    >
      {disabled ? disabledLabel || label : added ? "Added — viewing cart" : label}
    </button>
  );
}
