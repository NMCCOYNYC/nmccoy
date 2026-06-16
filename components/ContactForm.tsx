"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to send message.");
      }

      setStatus("success");
      setMessage("Thank you — your message has been sent.");
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label className="form-label" htmlFor="contact-first-name">
            First name
          </label>
          <input
            id="contact-first-name"
            name="firstName"
            type="text"
            className="form-input"
            required
            disabled={status === "loading"}
          />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="contact-last-name">
            Last name
          </label>
          <input
            id="contact-last-name"
            name="lastName"
            type="text"
            className="form-input"
            disabled={status === "loading"}
          />
        </div>
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="contact-email">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          className="form-input"
          required
          disabled={status === "loading"}
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="contact-subject">
          Subject
        </label>
        <select
          id="contact-subject"
          name="subject"
          className="form-input"
          defaultValue="Order question"
          disabled={status === "loading"}
        >
          <option>Order question</option>
          <option>Shipping inquiry</option>
          <option>Press / media</option>
          <option>Wholesale</option>
          <option>General</option>
        </select>
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="form-input"
          required
          disabled={status === "loading"}
        />
      </div>
      <button
        type="submit"
        className="btn btn--dark"
        style={{ width: "100%", textAlign: "center", padding: "1.1rem" }}
        disabled={status === "loading" || status === "success"}
      >
        {status === "loading"
          ? "Sending…"
          : status === "success"
            ? "Sent — thank you"
            : "Send Message"}
      </button>
      {message ? (
        <p
          className={`form-message${
            status === "error" ? " form-message--error" : ""
          }`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
