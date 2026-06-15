"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="form-row">
        <div className="form-field">
          <label className="form-label">First name</label>
          <input type="text" className="form-input" required />
        </div>
        <div className="form-field">
          <label className="form-label">Last name</label>
          <input type="text" className="form-input" />
        </div>
      </div>
      <div className="form-field">
        <label className="form-label">Email</label>
        <input type="email" className="form-input" required />
      </div>
      <div className="form-field">
        <label className="form-label">Subject</label>
        <select className="form-input" defaultValue="Pre-order question">
          <option>Pre-order question</option>
          <option>Shipping inquiry</option>
          <option>Press / media</option>
          <option>Wholesale</option>
          <option>General</option>
        </select>
      </div>
      <div className="form-field">
        <label className="form-label">Message</label>
        <textarea className="form-input" />
      </div>
      <button
        type="submit"
        className="btn btn--dark"
        style={{ width: "100%", textAlign: "center", padding: "1.1rem" }}
        disabled={sent}
      >
        {sent ? "Sent — thank you" : "Send Message"}
      </button>
    </form>
  );
}
