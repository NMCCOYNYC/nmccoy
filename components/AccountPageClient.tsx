"use client";

import { useState } from "react";
import Link from "next/link";
import { useAccount } from "@/components/AccountProvider";
import { Footer } from "@/components/Footer";

type Mode = "signin" | "register";

export function AccountPageClient() {
  const { session, signIn, register, signOut } = useAccount();
  const [mode, setMode] = useState<Mode>("signin");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setLoading(true);
    setError(null);

    try {
      if (mode === "register") {
        await register({
          firstName: String(data.get("firstName") || ""),
          lastName: String(data.get("lastName") || ""),
          email: String(data.get("email") || ""),
          password: String(data.get("password") || ""),
        });
      } else {
        await signIn(
          String(data.get("email") || ""),
          String(data.get("password") || ""),
        );
      }
      form.reset();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to continue.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="account-page">
        <p className="eyebrow">Account</p>
        {session ? (
          <>
            <h1>Welcome{session.firstName ? `, ${session.firstName}` : ""}</h1>
            <p className="account-page__lede">
              You are signed in as {session.email}. Favorites stay saved on this
              device.
            </p>
            <div className="account-page__actions">
              <Link href="/favorites" className="btn btn--dark">
                View favorites
              </Link>
              <Link href="/collection" className="btn btn--outline">
                Continue shopping
              </Link>
              <button type="button" className="btn--underline" onClick={signOut}>
                Sign out
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>{mode === "signin" ? "Sign in" : "Create account"}</h1>
            <p className="account-page__lede">
              Save favorites and keep your details on this device. Checkout
              remains through Shopify.
            </p>
            <div className="account-page__tabs">
              <button
                type="button"
                className={mode === "signin" ? "is-active" : undefined}
                onClick={() => {
                  setMode("signin");
                  setError(null);
                }}
              >
                Sign in
              </button>
              <button
                type="button"
                className={mode === "register" ? "is-active" : undefined}
                onClick={() => {
                  setMode("register");
                  setError(null);
                }}
              >
                Create account
              </button>
            </div>
            <form className="account-form" onSubmit={(event) => void handleSubmit(event)}>
              {mode === "register" ? (
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="account-first-name">
                      First name
                    </label>
                    <input
                      id="account-first-name"
                      name="firstName"
                      type="text"
                      className="form-input"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="account-last-name">
                      Last name
                    </label>
                    <input
                      id="account-last-name"
                      name="lastName"
                      type="text"
                      className="form-input"
                      disabled={loading}
                    />
                  </div>
                </div>
              ) : null}
              <div className="form-field">
                <label className="form-label" htmlFor="account-email">
                  Email
                </label>
                <input
                  id="account-email"
                  name="email"
                  type="email"
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="account-password">
                  Password
                </label>
                <input
                  id="account-password"
                  name="password"
                  type="password"
                  className="form-input"
                  required
                  minLength={mode === "register" ? 8 : undefined}
                  disabled={loading}
                />
              </div>
              {error ? <p className="account-form__error">{error}</p> : null}
              <button
                type="submit"
                className="btn btn--dark"
                disabled={loading}
                style={{ width: "100%", padding: "1.1rem" }}
              >
                {loading
                  ? "Please wait..."
                  : mode === "signin"
                    ? "Sign in"
                    : "Create account"}
              </button>
            </form>
          </>
        )}
      </section>
      <Footer />
    </>
  );
}
