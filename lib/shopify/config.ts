const DEFAULT_STORE_DOMAIN = "r10eg8-1u.myshopify.com";

export function getShopifyStoreDomain() {
  return (
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.trim() ||
    DEFAULT_STORE_DOMAIN
  );
}

export function getShopifyStorefrontToken() {
  return process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim() || "";
}

export function isShopifyConfigured() {
  return Boolean(getShopifyStoreDomain() && getShopifyStorefrontToken());
}

export function getShopifyAdminStoreUrl() {
  const handle = getShopifyStoreDomain().replace(".myshopify.com", "");
  return `https://admin.shopify.com/store/${handle}`;
}
