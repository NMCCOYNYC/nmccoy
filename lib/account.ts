export const ACCOUNTS_STORAGE_KEY = "nmccoy_accounts";
export const SESSION_STORAGE_KEY = "nmccoy_session";

export type AccountRecord = {
  email: string;
  firstName: string;
  lastName: string;
  passwordDigest: string;
};

export type AccountSession = {
  email: string;
  firstName: string;
  lastName: string;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function digestPassword(email: string, password: string) {
  const payload = new TextEncoder().encode(
    `${normalizeEmail(email)}:${password}`,
  );
  const hash = await crypto.subtle.digest("SHA-256", payload);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function parseAccounts(raw: string | null): AccountRecord[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((account): account is AccountRecord => {
      if (!account || typeof account !== "object") return false;
      const record = account as AccountRecord;
      return (
        typeof record.email === "string" &&
        typeof record.firstName === "string" &&
        typeof record.lastName === "string" &&
        typeof record.passwordDigest === "string"
      );
    });
  } catch {
    return [];
  }
}

export function parseSession(raw: string | null): AccountSession | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const session = parsed as AccountSession;
    if (
      typeof session.email !== "string" ||
      typeof session.firstName !== "string" ||
      typeof session.lastName !== "string"
    ) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function toSession(account: AccountRecord): AccountSession {
  return {
    email: account.email,
    firstName: account.firstName,
    lastName: account.lastName,
  };
}

export { normalizeEmail };
