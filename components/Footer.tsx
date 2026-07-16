import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-claim">
        <p className="eyebrow">The working waterfront, represented.</p>
        <h2>Built by fishermen.<br />Worn with pride.</h2>
      </div>

      <div className="footer-grid">
        <div>
          <p className="footer-label">Explore</p>
          <Link href="/shop">Shop</Link>
          <Link href="/about">Our Story</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <p className="footer-label">Social</p>
          <a href="https://www.instagram.com/overtherailco/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.facebook.com/share/1Dxz9xsAcq/?mibextid=wwXIfr" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://www.tiktok.com/@overtherailco" target="_blank" rel="noreferrer">TikTok</a>
        </div>
        <div>
          <p className="footer-label">Contact</p>
          <a href="mailto:Adamde1026@overtherailco.com">Adamde1026@overtherailco.com</a>
          <a href="tel:+17742082273">(774) 208-2273</a>
          <span>New Bedford, Massachusetts</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Over The Rail Co.</span>
        <span>We represent a way of life.</span>
      </div>
    </footer>
  );
}
