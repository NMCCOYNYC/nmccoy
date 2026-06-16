"use client";

import { useState } from "react";
import { analyticsEvents } from "@/lib/analytics";

type EmailCaptureProps = {
  variant?: "default" | "footer";
  source?: string;
};

export function EmailCapture({
  variant = "default",
  source = "website",
}: EmailCaptureProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();

    if (!email) {
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/klaviyo/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to subscribe.");
      }

      setStatus("success");
      setMessage("Thank you — you're on the list.");
      analyticsEvents.newsletterSignup(source);
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  const sectionClass =
    variant === "footer" ? "email-capture email-capture--footer" : "email-capture";

  return (
    <section className={sectionClass} aria-labelledby="email-capture-title">
      <h2 id="email-capture-title" className="email-capture__title">
        Join the Collection List
      </h2>
      <p className="email-capture__copy">
        Receive collection updates, studio notes, and early access to future
        releases.
      </p>
      <form className="email-form" onSubmit={handleSubmit}>
        <label htmlFor={`email-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${variant}`}
          name="email"
          type="email"
          placeholder="Your email address"
          autoComplete="email"
          required
          disabled={status === "loading"}
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading"
            ? "Joining…"
            : status === "success"
              ? "Joined"
              : "Join"}
        </button>
      </form>
      {message ? (
        <p
          className={`email-capture__message${
            status === "error" ? " email-capture__message--error" : ""
          }`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : null}
    </section>
  );
}
