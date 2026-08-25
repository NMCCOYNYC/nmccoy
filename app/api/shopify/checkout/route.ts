import { NextResponse } from "next/server";
import {
  createCheckoutFromItems,
  createCheckoutUrl,
} from "@/lib/shopify/checkout";

type CheckoutRequest = {
  slug?: string;
  items?: Array<{ slug?: string; quantity?: number }>;
};

export async function POST(request: Request) {
  let body: CheckoutRequest;

  try {
    body = (await request.json()) as CheckoutRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const items = (body.items || [])
    .filter((item) => typeof item.slug === "string" && item.slug)
    .map((item) => ({
      slug: item.slug as string,
      quantity: Math.max(1, Number(item.quantity) || 1),
    }));

  try {
    const checkoutUrl = items.length
      ? await createCheckoutFromItems(items)
      : body.slug
        ? await createCheckoutUrl(body.slug)
        : null;

    if (!checkoutUrl) {
      return NextResponse.json(
        { error: "Provide a product or cart items." },
        { status: 400 }
      );
    }

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to start checkout.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
