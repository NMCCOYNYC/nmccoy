import { NextResponse } from "next/server";

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

  // Ready for email provider integration (Resend, SendGrid, etc.)
  console.info("[contact]", {
    firstName,
    lastName: body.lastName?.trim() || "",
    email,
    subject,
    message,
  });

  return NextResponse.json({ ok: true });
}
