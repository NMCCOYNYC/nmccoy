import {
  hasEarlyAccess,
  isEarlyAccessConfigured,
} from "@/lib/preview-access";

export function isComingSoonEnabled() {
  return process.env.COMING_SOON === "true";
}

export function hasSiteAccess(cookieValue?: string) {
  if (!isComingSoonEnabled()) {
    return true;
  }

  if (!isEarlyAccessConfigured()) {
    return false;
  }

  return hasEarlyAccess(cookieValue);
}
