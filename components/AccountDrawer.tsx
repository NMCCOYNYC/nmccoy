"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount } from "@/components/AccountProvider";
import { siteSettings } from "@/lib/site-settings";

type Mode = "signin" | "register";

export function AccountDrawer() {
  const { session, isOpen, closeAccount, signIn, register, signOut } = useAccount();
  const [mode, setMode] = useState<Mode>("signin");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeAccount();
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeAccount]);

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

  if (!isOpen) return null;

  return (
    <div className="account-drawer" role="dialog" aria-modal="true" aria-label="Welcome">
      <button
        type="button"
        className="account-drawer__backdrop"
        onClick={closeAccount}
        aria-label="Close account"
      />
      <aside className="account-drawer__panel">
        <button type="button" className="account-drawer__close" onClick={closeAccount}>
          Close
        </button>

        {session ? (
          <div className="account-drawer__body">
            <p className="eyebrow">NMCCOY</p>
            <h2>Welcome{session.firstName ? `, ${session.firstName}` : ""}</h2>
            <p className="account-drawer__collection">
              {siteSettings.collectionName} · Collection No. 1
            </p>
            <p className="account-drawer__lede">
              Signed in as {session.email}. Saved pieces and studio notes stay
              with you here.
            </p>
            <div className="account-drawer__actions">
              <Link
                href="/favorites"
                className="btn btn--dark"
                onClick={closeAccount}
              >
                View favorites
              </Link>
              <Link
                href="/collection"
                className="btn btn--outline"
                onClick={closeAccount}
              >
                Explore the collection
              </Link>
              <button type="button" className="btn--underline" onClick={signOut}>
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="account-drawer__body">
            <p className="eyebrow">NMCCOY</p>
            <h2>Welcome</h2>
            <p className="account-drawer__collection">
              {siteSettings.collectionName}
            </p>
            <p className="account-drawer__lede">
              Collection No. 1 launches {siteSettings.launchDate}. Six original
              ink paintings, each in an edition of {siteSettings.editionSize} —
              designed in New York, made in Italy.
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
            <form
              className="account-form"
              onSubmit={(event) => void handleSubmit(event)}
            >
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
            <p className="account-drawer__note">
              Save favorites and be first to the edition. Complimentary tracked
              shipping in the US.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
