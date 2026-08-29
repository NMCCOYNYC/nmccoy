import Link from "next/link";
import { FooterLogo } from "@/components/Brand";
import { EmailCapture } from "@/components/EmailCapture";
import { siteSettings } from "@/lib/site-settings";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__logo">
            <FooterLogo />
          </div>
          <p className="footer__tagline">
            Art-led objects.
            <br />
            Designed in New York, made in Italy.
          </p>
          <p className="footer__follow">Follow us</p>
          <a
            href={siteSettings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__ig"
            aria-label="NMCCOY on Instagram"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="4.4" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="17.15" cy="6.85" r="0.85" fill="currentColor" />
            </svg>
          </a>
        </div>
        <div className="footer__col">
          <h4>Collection</h4>
          <ul>
            <li>
              <Link href="/collection">Desert Illusions</Link>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Studio</h4>
          <ul>
            <li>
              <Link href="/about">Our Story</Link>
            </li>
            <li>
              <Link href="/process">Process</Link>
            </li>
            <li>
              <Link href="/impact">Impact</Link>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Support</h4>
          <ul>
            <li>
              <Link href="/shipping">Shipping & Returns</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <EmailCapture variant="footer" source="footer" />
      <div className="footer__bottom">
        <span>© 2026 NMCCOY. All rights reserved.</span>
        <span>New York, USA · Made in Italy</span>
      </div>
    </footer>
  );
}
