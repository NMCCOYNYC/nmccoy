import Link from "next/link";
import { siteSettings } from "@/lib/site-settings";
import { Footer } from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shipping & Returns",
  description:
    "NMCCOY shipping and returns policy — complimentary US shipping, international delivery, and limited-edition final sale terms.",
  path: "/shipping",
});

export default function ShippingPage() {
  return (
    <>
      <div className="policy-body">
        <p className="eyebrow">Support</p>
        <h1>Shipping & Returns</h1>

        <h2>Shipping timeline</h2>
        <p>
          All pieces ship <strong>{siteSettings.launchDate}</strong>.
        </p>

        <h2>Domestic (USA)</h2>
        <p>
          Complimentary tracked shipping via FedEx or UPS. Delivery 3–5 business
          days from ship date.
        </p>

        <h2>International</h2>
        <p>
          We ship worldwide. Rates are calculated at checkout. Delivery typically
          takes 7–14 business days. Duties and taxes are the recipient&apos;s
          responsibility.
        </p>

        <h2>Returns</h2>
        <p>
          Because each NMCCOY piece is produced in limited quantities and released
          in small numbered editions, all sales are final.
        </p>
        <p>
          If your order arrives damaged or incorrect, please contact us within 7
          days of delivery at{" "}
          <Link href={`mailto:${siteSettings.contactEmail}`}>
            {siteSettings.contactEmail}
          </Link>{" "}
          and we will work with you to resolve the issue.
        </p>
      </div>
      <Footer />
    </>
  );
}
