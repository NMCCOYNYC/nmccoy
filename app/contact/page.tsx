import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <div className="contact-wrap">
        <div className="contact-left">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h1>
              We read
              <br />
              everything.
            </h1>
            <p>
              Questions, press, wholesale, or just saying you love the scarves —
              all of it lands with Nichole.
            </p>
          </div>
          <div className="contact-info">
            <div>
              <div className="ci-label">Email</div>
              <div className="ci-val">hello@nmccoy.com</div>
            </div>
            <div>
              <div className="ci-label">Instagram</div>
              <div className="ci-val">@nmccoy.studio</div>
            </div>
            <div>
              <div className="ci-label">Studio</div>
              <div className="ci-val">Arizona, USA</div>
            </div>
          </div>
        </div>
        <div className="contact-right">
          <h2>Send a message</h2>
          <ContactForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
