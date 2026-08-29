"use client";

import { useAccount } from "@/components/AccountProvider";
import { useDrawer } from "@/components/DrawerProvider";

export function AccountIcon({ onOpen }: { onOpen?: () => void }) {
  const { session } = useAccount();
  const { isOpen, openDrawer } = useDrawer();

  return (
    <button
      type="button"
      className={`nav__icon nav__icon--account${isOpen("account") ? " is-active" : ""}`}
      aria-label={session ? "Account" : "Sign in"}
      aria-expanded={isOpen("account")}
      onClick={() => {
        onOpen?.();
        openDrawer("account");
      }}
    >
      <svg
        className="nav__icon-svg"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M5.5 18.5c.8-3 3.3-4.6 6.5-4.6s5.7 1.6 6.5 4.6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
