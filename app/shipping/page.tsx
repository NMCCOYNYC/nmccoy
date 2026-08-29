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
          Orders are carefully packed and typically dispatched within 1–3
          business days. Tracking information will be provided once your order
          is on its way.
        </p>
        <p>
          During occasional studio closures or travel periods, dispatch times
          may be extended. Any temporary delays will be clearly noted on the
          website at the time of purchase.
        </p>

        <h2>Domestic (USA)</h2>
        <p>
          Complimentary standard tracked shipping is included on all U.S.
          orders. Estimated delivery timing will be provided at checkout.
        </p>
        <p>
          Expedited shipping options may be available at checkout for an
          additional fee.
        </p>

        <h2>International</h2>
        <p>
          We ship internationally to select destinations. Shipping rates and
          estimated delivery timing are calculated at checkout and vary by
          destination and customs processing.
        </p>
        <p>
          International duties, taxes, and import fees are not included in the
          order total and are the responsibility of the recipient.
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
