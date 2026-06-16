import { NextResponse } from "next/server";
import {
  isKlaviyoConfigured,
  subscribeToKlaviyoList,
} from "@/lib/klaviyo/subscribe";

type SubscribeRequest = {
  email?: string;
  source?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!isKlaviyoConfigured()) {
    return NextResponse.json(
      { error: "Newsletter signup is not configured yet." },
      { status: 503 }
    );
  }

  let body: SubscribeRequest;

  try {
    body = (await request.json()) as SubscribeRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const source = body.source?.trim() || "website";

  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  try {
    await subscribeToKlaviyoList({ email, source });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to subscribe.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
