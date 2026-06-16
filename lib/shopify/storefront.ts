import { getShopifyStoreDomain, getShopifyStorefrontToken } from "./config";

const API_VERSION = "2025-01";

type StorefrontResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export function toVariantGid(variantId: string) {
  if (variantId.startsWith("gid://")) return variantId;
  return `gid://shopify/ProductVariant/${variantId}`;
}

export async function storefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const domain = getShopifyStoreDomain();
  const token = getShopifyStorefrontToken();

  if (!token) {
    throw new Error("Shopify Storefront API token is not configured.");
  }

  const response = await fetch(
    `https://${domain}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Shopify request failed (${response.status}).`);
  }

  const payload = (await response.json()) as StorefrontResponse<T>;

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join(" "));
  }

  if (!payload.data) {
    throw new Error("Shopify returned an empty response.");
  }

  return payload.data;
}

type CartCreateResult = {
  cartCreate: {
    cart: { checkoutUrl: string } | null;
    userErrors: Array<{ field: string[] | null; message: string }>;
  };
};

export async function createCartCheckout(variantId: string) {
  const data = await storefrontFetch<CartCreateResult>(
    `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    {
      input: {
        lines: [{ merchandiseId: toVariantGid(variantId), quantity: 1 }],
      },
    }
  );

  const userError = data.cartCreate.userErrors[0];
  if (userError) {
    throw new Error(userError.message);
  }

  const checkoutUrl = data.cartCreate.cart?.checkoutUrl;
  if (!checkoutUrl) {
    throw new Error("Shopify did not return a checkout URL.");
  }

  return checkoutUrl;
}
