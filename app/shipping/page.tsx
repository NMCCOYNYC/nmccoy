import { siteSettings } from "@/lib/site-settings";
import { Footer } from "@/components/Footer";

export default function ShippingPage() {
  return (
    <>
      <div className="policy-body">
        <p className="eyebrow">Support</p>
        <h1>Shipping & Returns</h1>
        <h2>Pre-order shipping</h2>
        <p>
          All scarves ship <strong>{siteSettings.launchDate}</strong>. Pre-orders
          do not ship early.
        </p>
        <h2>Domestic (USA)</h2>
        <p>
          Complimentary tracked shipping via FedEx or UPS. Delivery 3–5 business
          days from ship date.
        </p>
        <h2>International</h2>
        <p>
          We ship worldwide. Rates calculated at checkout. Delivery 7–14 business
          days. Duties and taxes are the recipient&apos;s responsibility.
        </p>
        <h2>Returns</h2>
        <p>
          Returns accepted for manufacturing defects, shipping damage, or incorrect
          item. Contact hello@nmccoy.com within 7 days with photos.
        </p>
        <h2>Deposit refunds</h2>
        <p>
          Deposits fully refundable until <strong>{siteSettings.refundDeadline}</strong>.
          After July 1, may be applied to a future collection.
        </p>
      </div>
      <Footer />
    </>
  );
}
