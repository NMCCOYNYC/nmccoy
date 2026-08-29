"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ACCOUNTS_STORAGE_KEY,
  SESSION_STORAGE_KEY,
  digestPassword,
  normalizeEmail,
  parseAccounts,
  parseSession,
  toSession,
  type AccountSession,
} from "@/lib/account";

type AccountContextValue = {
  session: AccountSession | null;
  isOpen: boolean;
  openAccount: () => void;
  closeAccount: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  register: (input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  signOut: () => void;
};

const AccountContext = createContext<AccountContextValue | null>(null);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AccountSession | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(parseSession(window.localStorage.getItem(SESSION_STORAGE_KEY)));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (session) {
      window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } else {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, [session, ready]);

  const signIn = useCallback(async (email: string, password: string) => {
    const accounts = parseAccounts(
      window.localStorage.getItem(ACCOUNTS_STORAGE_KEY),
    );
    const normalized = normalizeEmail(email);
    const account = accounts.find((item) => item.email === normalized);
    if (!account) {
      throw new Error("No account found for that email.");
    }

    const digest = await digestPassword(normalized, password);
    if (digest !== account.passwordDigest) {
      throw new Error("That password does not match.");
    }

    setSession(toSession(account));
  }, []);

  const register = useCallback(
    async (input: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }) => {
      const accounts = parseAccounts(
        window.localStorage.getItem(ACCOUNTS_STORAGE_KEY),
      );
      const email = normalizeEmail(input.email);
      if (accounts.some((item) => item.email === email)) {
        throw new Error("An account with that email already exists.");
      }
      if (input.password.length < 8) {
        throw new Error("Use at least 8 characters for your password.");
      }

      const account = {
        email,
        firstName: input.firstName.trim(),
        lastName: input.lastName.trim(),
        passwordDigest: await digestPassword(email, input.password),
      };

      window.localStorage.setItem(
        ACCOUNTS_STORAGE_KEY,
        JSON.stringify([...accounts, account]),
      );
      setSession(toSession(account));
    },
    [],
  );

  const signOut = useCallback(() => setSession(null), []);
  const openAccount = useCallback(() => setIsOpen(true), []);
  const closeAccount = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      session,
      isOpen,
      openAccount,
      closeAccount,
      signIn,
      register,
      signOut,
    }),
    [session, isOpen, openAccount, closeAccount, signIn, register, signOut],
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within AccountProvider");
  }
  return context;
}
