import Link from "next/link";
import { Logo } from "@/components/Brand";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__logo">
            <Logo light />
          </div>
          <p className="footer__tagline">
            Art-led luxury objects.
            <br />
            Made in Arizona,
            <br />
            printed in Italy.
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
      <div className="footer__bottom">
        <span>© 2026 NMCCOY. All rights reserved.</span>
        <span>Arizona, USA · Made in Italy</span>
      </div>
    </footer>
  );
}
