import { NextResponse } from "next/server";
import { createCheckoutUrl } from "@/lib/shopify/checkout";

type CheckoutRequest = {
  slug?: string;
};

export async function POST(request: Request) {
  let body: CheckoutRequest;

  try {
    body = (await request.json()) as CheckoutRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { slug } = body;

  if (!slug) {
    return NextResponse.json(
      { error: "Provide a product slug." },
      { status: 400 }
    );
  }

  try {
    const checkoutUrl = await createCheckoutUrl(slug);
    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to start checkout.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
