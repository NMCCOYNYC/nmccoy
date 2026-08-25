export type CartItem = {
  slug: string;
  quantity: number;
};

export const CART_STORAGE_KEY = "nmccoy_cart";
export const CART_MAX_QTY = 40;

export function countCartItems(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function parseCartItems(raw: string | null): CartItem[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (item): item is CartItem =>
          Boolean(
            item &&
              typeof item === "object" &&
              typeof (item as CartItem).slug === "string" &&
              typeof (item as CartItem).quantity === "number"
          )
      )
      .map((item) => ({
        slug: item.slug,
        quantity: Math.min(CART_MAX_QTY, Math.max(1, Math.round(item.quantity))),
      }));
  } catch {
    return [];
  }
}
