import { getScarfBySlug, type Scarf } from "@/lib/products";
import { createCartCheckout } from "./storefront";

export function isCheckoutConfigured(scarf: Scarf) {
  return Boolean(scarf.shopifyCheckoutUrl || scarf.shopifyVariantId);
}

export async function createCheckoutUrl(slug: string) {
  const scarf = getScarfBySlug(slug);

  if (!scarf) {
    throw new Error("Product not found.");
  }

  if (scarf.shopifyCheckoutUrl) {
    return scarf.shopifyCheckoutUrl;
  }

  if (!scarf.shopifyVariantId) {
    throw new Error("Checkout is not configured for this product yet.");
  }

  return createCartCheckout(scarf.shopifyVariantId);
}
