import Image from "next/image";
import { ModuleBay } from "@/components/homepage/ModuleBay";

const colourBars = ["blue", "mint", "pink", "yellow"];

function ColourBars({ compact = false }) {
  return (
    <span className={`colour-bars${compact ? " colour-bars--compact" : ""}`} aria-hidden="true">
      {colourBars.map((colour) => (
        <span key={colour} className={`colour-bar colour-bar--${colour}`} />
      ))}
    </span>
  );
}

export default function Home() {
  return (
    <div className="life-console-site">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
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

        <ColourBars compact />
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero__intro">
            <p className="equipment-label">All That&apos;s Next // Life Console</p>
            <h1>
              School ends.
              <span>Then what?</span>
            </h1>
          </div>

          <div className="hero__body">
            <p className="hero__lede">
              Everyone asks what you want to be. Nobody asks how you want to live. Start there. Design your
              life after school—and all that&apos;s next.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#modules">
                Choose your next move <span aria-hidden="true">↓</span>
              </a>
              <a className="text-link text-link--light" href="#why">
                Why All That&apos;s Next <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="hero__showcase">
            <div className="hero__path" aria-label="How the Life Console works">
              <span>
                <strong>01</strong>
                Pick a focus
              </span>
              <span>
                <strong>02</strong>
                Load a module
              </span>
              <span>
                <strong>03</strong>
                Make a move
              </span>
            </div>

            <div className="hero__visual">
              <div className="hero__console-frame">
                <Image
                  src="/assets/console/mb01-console-empty-front-v1.webp"
                  alt="Front view of the cream MB-01 Life Console ready for a module"
                  width={1280}
                  height={653}
                  priority
                  sizes="(max-width: 820px) 94vw, 48vw"
                  className="hero__console-image"
                />
              </div>
            </div>
          </div>
        </section>

        <ModuleBay />

        <section className="method-section" id="method">
          <div className="section-intro section-intro--wide">
            <p className="equipment-label equipment-label--dark">The All That&apos;s Next approach</p>
            <h2>Don&apos;t pick a career and inherit the life that comes with it.</h2>
            <p>Design the life first. Then reverse engineer the career and money needed to fund it.</p>
          </div>

          <div className="method-grid">
            <article className="method-card method-card--blue">
              <span className="method-card__number">01</span>
              <p className="equipment-label equipment-label--dark">Design</p>
              <h3>Picture an ordinary Tuesday you&apos;d actually want.</h3>
              <p>Not a fantasy holiday. Your work, people, place, pace and freedom on a normal day.</p>
            </article>
            <article className="method-card method-card--yellow">
              <span className="method-card__number">02</span>
              <p className="equipment-label equipment-label--dark">Price</p>
              <h3>Put real numbers behind the life.</h3>
              <p>Understand the income, debt and trade-offs before a major decision locks them in.</p>
            </article>
            <article className="method-card method-card--mint">
              <span className="method-card__number">03</span>
              <p className="equipment-label equipment-label--dark">Build</p>
              <h3>Choose the next move, not your entire life.</h3>
              <p>Test a direction, learn what fits and keep moving with your eyes open.</p>
            </article>
          </div>
        </section>

        <section className="about-section" id="why">
          <div className="about-section__statement">
            <p className="equipment-label">Why All That&apos;s Next?</p>
            <h2>The future is more than something you wait for.</h2>
            <Image
              src="/icon-512.png"
              alt=""
              width={512}
              height={512}
              className="about-section__signal"
              aria-hidden="true"
            />
          </div>

          <div className="about-section__story">
            <p>
              “All that&apos;s next” means everything still ahead: the choices you&apos;ll make, the experiences
              you&apos;ll have, the person you&apos;ll become and the life you&apos;ll build.
            </p>
            <p>
              But the future is not only something to wait for. It is something you can shape. Every module
              tackles a different part of what comes next, from understanding yourself and pricing your
              choices to planning a direction and taking the next useful step.
            </p>
            <p className="about-section__promise">
              Different products, one purpose: helping you approach the unknown with greater clarity,
              agency and optimism.
            </p>
          </div>
        </section>

        <section className="founder-section">
          <div>
            <p className="equipment-label equipment-label--dark">Built by Mitch Bryant</p>
            <h2>Tools I wish I had before the sensible path became my path.</h2>
          </div>
          <div className="founder-section__story">
            <p>
              I chose the sensible degree, became a tax accountant and followed the path I thought I was
              supposed to want. From the outside, it looked right. From the inside, I knew it wasn&apos;t.
            </p>
            <p>
              I eventually changed direction and rebuilt. All That&apos;s Next is where I&apos;m making the tools I
              wish I had at 16, before years and money were tied to somebody else&apos;s version of success.
            </p>
            <p className="founder-section__promise">
              I won&apos;t tell you who to become. I&apos;ll help you see the options clearly enough to choose.
            </p>
          </div>
        </section>

        <section className="final-callout">
          <div>
            <p className="equipment-label equipment-label--dark">System ready</p>
            <h2>You don&apos;t need to have your whole life figured out.</h2>
            <p>You just need the tools to start designing all that&apos;s next.</p>
          </div>
          <a className="button button--ink" href="#modules">
            Open the module bay <span aria-hidden="true">↑</span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="brand-lockup brand-lockup--footer">
          <Image
            src="/assets/brand/all-thats-next-lockup-web-v1.png"
            alt="All That’s Next"
            width={1651}
            height={324}
            className="brand-lockup__image brand-lockup__image--footer"
          />
        </div>
        <div className="site-footer__links">
          <a href="https://www.tiktok.com/@itsmitchbryant">TikTok</a>
          <a href="https://www.instagram.com/itsmitchbryant">Instagram</a>
          <a href="mailto:hello@mitchbryant.com">Email Mitch</a>
        </div>
        <p>© {new Date().getFullYear()} All That&apos;s Next</p>
      </footer>
    </div>
  );
}
