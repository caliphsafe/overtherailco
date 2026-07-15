import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "The story of Over The Rail Co., founded in New Bedford by commercial fisherman Adam DeMedeiros.",
};

export default function AboutPage() {
  return (
    <>
      <section className="inner-hero about-hero">
        <div className="content-shell inner-hero-grid">
          <div>
            <p className="eyebrow">Our story / New Bedford, MA</p>
            <h1>Born offshore.<br />Built for the people<br /><em>behind the catch.</em></h1>
          </div>
          <div className="inner-hero-aside">
            <span className="giant-number">01</span>
            <p>Founded by commercial fisherman Adam DeMedeiros after years spent cutting, washing, and bagging millions of pounds of scallops offshore.</p>
          </div>
        </div>
      </section>

      <section className="about-origin section-pad">
        <div className="content-shell editorial-grid">
          <p className="section-number">THE ORIGIN</p>
          <div className="editorial-copy">
            <p className="eyebrow">From experience, not imagination</p>
            <h2>A brand built by someone who knows the work.</h2>
            <p className="lead-copy">
              Over The Rail Co. was founded in New Bedford, Massachusetts by commercial fisherman Adam DeMedeiros. After spending years offshore cutting, washing, and bagging millions of pounds of scallops, Adam wanted to create something that represented the people behind one of the toughest industries in the world.
            </p>
          </div>
        </div>
      </section>

      <section className="sacrifice-band">
        <div className="content-shell sacrifice-grid">
          <div className="sacrifice-statement">
            <p className="eyebrow">What often goes unseen</p>
            <h2>The industry is built on sacrifice.</h2>
          </div>
          <div className="sacrifice-list">
            <div><span>01</span><p>Long trips offshore</p></div>
            <div><span>02</span><p>Dangerous conditions</p></div>
            <div><span>03</span><p>Missed holidays</p></div>
            <div><span>04</span><p>Generations dedicated to the water</p></div>
          </div>
        </div>
      </section>

      <section className="about-purpose section-pad">
        <div className="content-shell editorial-grid reverse-emphasis">
          <p className="section-number">THE PURPOSE</p>
          <div className="editorial-copy">
            <p className="eyebrow">A brand to call their own</p>
            <h2>Giving the working waterfront a flag to carry.</h2>
            <p className="lead-copy">
              The fishing industry is built on sacrifice. Long trips offshore, dangerous conditions, missed holidays, and generations of families who have dedicated their lives to the water often go unnoticed. Over The Rail Co. was created to give those men and women a brand they could proudly call their own.
            </p>
          </div>
        </div>
      </section>

      <section className="community-panel section-pad">
        <div className="content-shell community-grid">
          <div className="community-title">
            <p className="eyebrow">More than a clothing company</p>
            <h2>A community built around what matters.</h2>
          </div>
          <div className="community-copy">
            <p>
              Today, Over The Rail Co. has grown into more than a clothing company. It has become a community built around faith, family, hard work, and respect for everyone who earns a living with their hands.
            </p>
            <p>
              Every product, every story, and every post is dedicated to preserving the culture of commercial fishing while inspiring the next generation to carry that tradition forward.
            </p>
          </div>
          <div className="belief-grid">
            <article><span>Faith</span><strong>01</strong></article>
            <article><span>Family</span><strong>02</strong></article>
            <article><span>Hard Work</span><strong>03</strong></article>
            <article><span>Respect</span><strong>04</strong></article>
          </div>
        </div>
      </section>

      <section className="about-closing section-pad">
        <div className="content-shell about-closing-inner">
          <p>We don’t just sell apparel.</p>
          <h2>We represent<br /><em>a way of life.</em></h2>
          <Link className="button button-orange" href="/shop">Shop Over The Rail</Link>
        </div>
      </section>
    </>
  );
}
