"use client";

import { useState } from "react";

export function EmailCapture() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="email-capture">
      <p className="eyebrow">Stay close</p>
      <h2>Be first to know</h2>
      <p>Collection drops, studio notes, and early access.</p>
      <form
        className="email-form"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          (e.target as HTMLFormElement).reset();
        }}
      >
        <input type="email" placeholder="Your email address" required />
        <button type="submit">{submitted ? "Thank you" : "Join"}</button>
      </form>
    </section>
  );
}
