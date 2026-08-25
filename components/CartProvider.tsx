"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CART_MAX_QTY,
  CART_STORAGE_KEY,
  countCartItems,
  parseCartItems,
  type CartItem,
} from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(parseCartItems(window.localStorage.getItem(CART_STORAGE_KEY)));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback((slug: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.slug === slug);
      if (!existing) {
        return [...prev, { slug, quantity: Math.min(CART_MAX_QTY, quantity) }];
      }

      return prev.map((item) =>
        item.slug === slug
          ? {
              ...item,
              quantity: Math.min(CART_MAX_QTY, item.quantity + quantity),
            }
          : item
      );
    });
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setItems((prev) => {
      if (quantity < 1) {
        return prev.filter((item) => item.slug !== slug);
      }

      return prev.map((item) =>
        item.slug === slug
          ? { ...item, quantity: Math.min(CART_MAX_QTY, quantity) }
          : item
      );
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((item) => item.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      count: countCartItems(items),
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }),
    [items, addItem, setQuantity, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
