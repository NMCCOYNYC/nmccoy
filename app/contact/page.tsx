import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { siteSettings } from "@/lib/site-settings";
import { pageMetadata } from "@/lib/seo";
import { TrackedLink } from "@/components/AnalyticsHelpers";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact NMCCOY for inquiries about collections, orders, collaborations, or press.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <div className="contact-wrap">
        <div className="contact-left">
          <div>
            <p className="eyebrow">Contact</p>
            <h1>Get in Touch</h1>
            <p className="contact-left__intro">
              For inquiries regarding collections, orders, collaborations, or
              press, reach out directly or send a message using the form.
            </p>
            <div className="contact-info">
              <div>
                <p className="ci-label">Email</p>
                <p className="ci-val">
                  <TrackedLink
                    href={`mailto:${siteSettings.contactEmail}`}
                    event="email"
                    location="contact_page"
                  >
                    {siteSettings.contactEmail}
                  </TrackedLink>
                </p>
              </div>
              <div>
                <p className="ci-label">Instagram</p>
                <p className="ci-val">
                  <TrackedLink
                    href={siteSettings.instagramUrl}
                    event="instagram"
                    location="contact_page"
                    external
                  >
                    {siteSettings.instagramHandle}
                  </TrackedLink>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-right">
          <h2>Send a Message</h2>
          <ContactForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
