declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

export const analyticsEvents = {
  collectionVisit: () => trackEvent("collection_visit"),
  productVisit: (slug: string, name: string) =>
    trackEvent("product_visit", { product_slug: slug, product_name: name }),
  checkoutStart: (slug: string) =>
    trackEvent("begin_checkout", { product_slug: slug }),
  emailClick: (location: string) =>
    trackEvent("email_click", { link_location: location }),
  instagramClick: (location: string) =>
    trackEvent("instagram_click", { link_location: location }),
  spotifyClick: () => trackEvent("spotify_click"),
  newsletterSignup: (source: string) =>
    trackEvent("newsletter_signup", { signup_source: source }),
};
