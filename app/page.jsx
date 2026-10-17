import Image from "next/image";
import { ModuleBay } from "@/components/homepage/ModuleBay";
import { WhyATN } from "@/components/homepage/WhyATN";
import { ClosingCTA, SiteFooter } from "@/components/homepage/SiteEnding";
import { HeaderPageLinks } from "@/components/HeaderPageLinks";
import { HeroConsole } from "@/components/homepage/HeroConsole";
import { HomepageScrollMotion } from "@/components/homepage/HomepageScrollMotion";
import styles from "./HomepageHero.module.css";

const homepageTitle = "All That’s Next | Life Design for Ages 16–19";
const homepageDescription =
  "School ends. Then what? Your future is more than a job title. Explore who you want to become, decide your ideal life, and start building it.";
const homepageShareImage = "/assets/console/mb01-console-empty-three-quarter-v1.webp";

export const metadata = {
  title: homepageTitle,
  description: homepageDescription,
  verification: {
    other: { "msvalidate.01": "A93A08FECAE7AD48131CA518090D0CF9" },
  },
  openGraph: {
    title: homepageTitle,
    description: homepageDescription,
    url: "/",
    siteName: "All That's Next",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: homepageShareImage,
        width: 1280,
        height: 653,
        alt: "The All That's Next MB-01 Life Console",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homepageTitle,
    description: homepageDescription,
    images: [homepageShareImage],
  },
};

export default function Home() {
  return (
    <div className="life-console-site">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className={`site-header ${styles.header}`}>
        <a className="brand-lockup" href="#top" aria-label="All That’s Next home">
          <Image
            src="/assets/brand/all-thats-next-lockup-web-v1.png"
            alt="All That’s Next"
            width={1651}
            height={324}
            priority
            className="brand-lockup__image brand-lockup__image--wide"
          />
          <Image
            src="/icon-512.png"
            alt=""
            width={512}
            height={512}
            priority
            className="brand-lockup__image brand-lockup__image--mark"
          />
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#modules">Modules</a>
          <a href="#method">The method</a>
          <a href="#why">Why ATN</a>
        </nav>

        <HeaderPageLinks />
      </header>

      <main id="main-content">
        <section className={styles.hero} id="top">
          <div className={styles.layout}>
            <div className={styles.copy}>
              <div className={styles.intro}>
                <p className={styles.eyebrow}>Your life. Your next move.</p>
                <h1>School ends.<br /><span>Then what?</span></h1>
              </div>
              <div className={styles.supportingCopy}>
                <p className={styles.statement}>
                  Everyone asks what you want to be.<br />
                  Nobody asks how you want to live.
                </p>
                <p className={styles.support}>
                  Start there.<br />Find your direction.<br />Make a move.
                </p>
              </div>
              <div className={styles.actions}>
                <a className={styles.primary} href="#modules">
                  Choose your next move <span aria-hidden="true">&#8595;</span>
                </a>
                <a className={styles.founderLink} href="#founder">
                  Why All That&apos;s Next <span aria-hidden="true">&#8599;</span>
                </a>
              </div>
            </div>
            <div className={styles.showcase}>
              <div className={styles.journey} aria-label="How the Life Console works">
                {[
                  ["blue", "Pick a focus"],
                  ["mint", "Load a module"],
                  ["pink", "Make a move"],
                  ["yellow", "Learn. Go again."],
                ].map(([colour, label]) => (
                  <div key={colour}>
                    <span className={styles.marker} style={{ backgroundColor: `var(--${colour})` }} aria-hidden="true" />
                    <p>{label}</p>
                  </div>
                ))}
              </div>
              <HeroConsole className={styles.console} />
            </div>
          </div>
        </section>

        <ModuleBay />

        <WhyATN />

        <ClosingCTA />
      </main>

      <SiteFooter />
      <HomepageScrollMotion />
    </div>
  );
}
