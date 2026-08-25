import { getScarfBySlug, type Scarf } from "@/lib/products";
import { createCartCheckout } from "./storefront";

export function isCheckoutConfigured(scarf: Scarf) {
  return Boolean(scarf.shopifyCheckoutUrl || scarf.shopifyVariantId);
}

export async function createCheckoutUrl(slug: string) {
  return createCheckoutFromItems([{ slug, quantity: 1 }]);
}

export async function createCheckoutFromItems(
  items: Array<{ slug: string; quantity: number }>
) {
  const lines = items
    .map((item) => {
      const scarf = getScarfBySlug(item.slug);
      if (!scarf?.shopifyVariantId) return null;
      return {
        variantId: scarf.shopifyVariantId,
        quantity: Math.max(1, item.quantity),
      };
    })
    .filter((line): line is { variantId: string; quantity: number } =>
      Boolean(line)
    );

  if (!lines.length) {
    throw new Error("Checkout is not configured for these pieces yet.");
  }

  return createCartCheckout(lines);
}
