import Link from "next/link";
import { FooterLogo } from "@/components/Brand";
import { EmailCapture } from "@/components/EmailCapture";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__logo">
            <FooterLogo />
          </div>
          <p className="footer__tagline">
            Art-led luxury objects.
            <br />
            Designed in New York,
            <br />
            made in Italy.
          </p>
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
