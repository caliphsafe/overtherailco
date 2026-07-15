import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Over The Rail Co. in New Bedford, Massachusetts for wholesale, retail partnerships, sponsorships, and general inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <section className="inner-hero contact-hero">
        <div className="content-shell inner-hero-grid">
          <div>
            <p className="eyebrow">Contact / Over The Rail Co.</p>
            <h1>Let’s talk.<br /><em>From shore to offshore.</em></h1>
          </div>
          <div className="inner-hero-aside">
            <span className="giant-number">NB</span>
            <p>Wholesale opportunities, retail partnerships, event sponsorships, and general inquiries are welcome.</p>
          </div>
        </div>
      </section>

      <section className="contact-main section-pad">
        <div className="content-shell contact-grid">
          <div className="contact-intro">
            <p className="eyebrow">Based in the working waterfront</p>
            <h2>New Bedford,<br />Massachusetts.</h2>
            <p>For wholesale opportunities, retail partnerships, event sponsorships, or general inquiries, we’d love to hear from you.</p>
          </div>

          <div className="contact-cards">
            <a className="contact-card" href="mailto:Adamde1026@overtherailco.com">
              <span className="contact-card-label">Email</span>
              <strong>Adamde1026@overtherailco.com</strong>
              <span className="contact-arrow">↗</span>
            </a>
            <a className="contact-card" href="tel:+17742082273">
              <span className="contact-card-label">Phone</span>
              <strong>(774) 208-2273</strong>
              <span className="contact-arrow">↗</span>
            </a>
            <div className="contact-card">
              <span className="contact-card-label">Based in</span>
              <strong>New Bedford, Massachusetts</strong>
              <span className="contact-arrow">41.6362° N</span>
            </div>
          </div>
        </div>
      </section>

      <section className="social-contact section-pad">
        <div className="content-shell">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Follow the story</p>
              <h2>From the deck,<br />the docks, and beyond.</h2>
            </div>
          </div>
          <div className="social-link-grid">
            <a href="https://www.facebook.com/overtherailco" target="_blank" rel="noreferrer"><span>Facebook</span><strong>Over The Rail Co.</strong><i>↗</i></a>
            <a href="https://www.instagram.com/overtherailco/" target="_blank" rel="noreferrer"><span>Instagram</span><strong>@overtherailco</strong><i>↗</i></a>
            <a href="https://www.tiktok.com/@overtherailco" target="_blank" rel="noreferrer"><span>TikTok</span><strong>@overtherailco</strong><i>↗</i></a>
          </div>
        </div>
      </section>
    </>
  );
}
