export const EARLY_ACCESS_COOKIE = "nmccoy_early_access";
export const EARLY_ACCESS_PATH = "/early-access";

export function isEarlyAccessConfigured() {
  return Boolean(process.env.EARLY_ACCESS_SECRET?.trim());
}

export function hasEarlyAccess(cookieValue?: string) {
  if (!isEarlyAccessConfigured()) {
    return true;
  }

  return cookieValue === "1";
}

export function isValidEarlyAccessKey(key: string | null | undefined) {
  const secret = process.env.EARLY_ACCESS_SECRET?.trim();
  if (!secret || !key) {
    return false;
  }

  return key === secret;
}
