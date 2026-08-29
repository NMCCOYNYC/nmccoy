const INDEXING_CRAWLERS =
  /Googlebot|Google-InspectionTool|bingbot|BingPreview|DuckDuckBot|Slurp|facebookexternalhit|Twitterbot|LinkedInBot|Pinterestbot|WhatsApp/i;

export function isIndexingCrawler(userAgent?: string | null) {
  return Boolean(userAgent && INDEXING_CRAWLERS.test(userAgent));
}
