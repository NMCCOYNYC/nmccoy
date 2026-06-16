import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type ContactRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactRequest;

  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const firstName = body.firstName?.trim();
  const lastName = body.lastName?.trim() || "";
  const email = body.email?.trim().toLowerCase();
  const subject = body.subject?.trim() || "General";
  const message = body.message?.trim();

  if (!firstName || !email || !message) {
    return NextResponse.json(
      { error: "First name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  if (isSupabaseConfigured()) {
    const supabase = createSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json(
        { error: "Unable to save your message. Please try again." },
        { status: 500 }
      );
    }

    const { error } = await supabase.from("contact_submissions").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      subject,
      message,
    });

    if (error) {
      console.error("[contact] Supabase insert failed:", error.message);
      return NextResponse.json(
        { error: "Unable to save your message. Please try again." },
        { status: 500 }
      );
    }
  } else {
    console.info("[contact]", { firstName, lastName, email, subject, message });
  }

  return NextResponse.json({ ok: true });
}
