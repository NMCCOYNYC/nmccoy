import { isIndexingCrawler } from "@/lib/crawlers";
import {
  hasEarlyAccess,
  isEarlyAccessConfigured,
} from "@/lib/preview-access";

export function isComingSoonEnabled() {
  return false;
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

export function canViewFullSite(
  cookieValue?: string,
  userAgent?: string | null,
) {
  return hasSiteAccess(cookieValue) || isIndexingCrawler(userAgent);
}
