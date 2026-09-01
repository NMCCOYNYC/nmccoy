"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useDrawer } from "@/components/DrawerProvider";

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
  const { openDrawer } = useDrawer();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (disabled) return;
    addItem(slug, 1);
    setAdded(true);
    openDrawer("cart");
  }

  return (
    <button
      type="button"
      className={className}
      style={{
        textAlign: "center",
        padding: "1.1rem",
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
      onClick={handleAdd}
      disabled={disabled}
    >
      {disabled ? disabledLabel || label : added ? "Added" : label}
    </button>
  );
}
