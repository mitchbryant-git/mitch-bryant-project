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
        <a className="brand-lockup" href="#top" aria-label="Mitch Bryant home">
          <span className="brand-mark">MB</span>
          <span>
            <strong>Mitch Bryant</strong>
            <small>Life Console</small>
          </span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#modules">Modules</a>
          <a href="#method">The method</a>
          <a href="#about">Why Mitch</a>
        </nav>

        <ColourBars compact />
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero__visual">
            <div className="hero__console-frame">
              <span className="console-frame__label">MB-01 // System ready</span>
              <Image
                src="/assets/console/mb01-console-empty-three-quarter-v1.webp"
                alt="Cream MB-01 Life Console ready for a module"
                width={1280}
                height={653}
                priority
                sizes="(max-width: 820px) 94vw, 52vw"
                className="hero__console-image"
              />
              <span className="console-frame__status">
                <span className="status-light" aria-hidden="true" />
                Ready for your next move
              </span>
            </div>
          </div>

          <div className="hero__copy">
            <p className="equipment-label">A life-design system for what comes next</p>
            <h1>
              School ends.
              <span>Then what?</span>
            </h1>
            <p className="hero__lede">
              Figure out who you&apos;re becoming, what your life could look like, and how to fund it.
              Sharp tools, straight answers, no lectures.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#modules">
                Choose your next move <span aria-hidden="true">↓</span>
              </a>
              <a className="text-link text-link--light" href="#about">
                Why I built this <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="hero__system-note">
              <ColourBars compact />
              <span>Four modules. One life-first operating system.</span>
            </div>
          </div>
        </section>

        <ModuleBay />

        <section className="method-section" id="method">
          <div className="section-intro section-intro--wide">
            <p className="equipment-label equipment-label--dark">The Life-First Method</p>
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

        <section className="about-section" id="about">
          <div className="about-section__statement">
            <p className="equipment-label">Builder profile // Mitch Bryant</p>
            <h2>I did what looked smart. It wasn&apos;t my life.</h2>
            <div className="about-section__signal" aria-hidden="true">
              MB
            </div>
          </div>

          <div className="about-section__story">
            <p>
              I chose the sensible degree, became a tax accountant and followed the path I thought I was
              supposed to want. From the outside, it looked right. From the inside, I knew it wasn&apos;t.
            </p>
            <p>
              I eventually changed direction and rebuilt. Now I&apos;m making the tools I wish I had at 16,
              before years and money were tied to somebody else&apos;s version of success.
            </p>
            <p className="about-section__promise">
              I won&apos;t tell you who to become. I&apos;ll help you see the options clearly enough to choose.
            </p>
          </div>
        </section>

        <section className="final-callout">
          <div>
            <p className="equipment-label equipment-label--dark">System ready</p>
            <h2>Your future isn&apos;t one giant decision.</h2>
            <p>It&apos;s the next useful move. Start with a tool that makes one part clearer.</p>
          </div>
          <a className="button button--ink" href="#modules">
            Open the module bay <span aria-hidden="true">↑</span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="brand-lockup brand-lockup--footer">
          <span className="brand-mark">MB</span>
          <span>
            <strong>Mitch Bryant</strong>
            <small>Built for the next move</small>
          </span>
        </div>
        <div className="site-footer__links">
          <a href="https://www.tiktok.com/@itsmitchbryant">TikTok</a>
          <a href="https://www.instagram.com/itsmitchbryant">Instagram</a>
          <a href="mailto:hello@mitchbryant.com">Email</a>
        </div>
        <p>© {new Date().getFullYear()} Mitch Bryant</p>
      </footer>
    </div>
  );
}
