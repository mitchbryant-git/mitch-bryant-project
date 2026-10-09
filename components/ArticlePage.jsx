import Image from 'next/image';
import Link from 'next/link';
import styles from './ArticlePage.module.css';
import { HeaderPageLinks } from './HeaderPageLinks';

function InlineCopy({ text, primaryAction = false }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const tone = link[2].includes('/tuesday-type') ? 'blue' : link[2].includes('/your-number') ? 'purple' : link[2].includes('/growth-lab') ? 'orange' : link[2].includes('/hecs-debt-calculator') ? 'mint' : null;
      return <a key={index} href={link[2]} className={primaryAction ? styles.primaryAction : tone ? `${styles.moduleLink} ${styles[tone]}` : undefined}>{link[1]}</a>;
    }
    if (part.startsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    return part;
  });
}

export function ArticlePage({ article }) {
  const isAbout = article.slug === 'about';
  const url = `https://allthatsnext.com/${article.slug}`;
  const schema = {
    '@context': 'https://schema.org', '@type': article.slug === 'about' ? 'AboutPage' : 'WebPage',
    '@id': `${url}#webpage`, url, name: article.metadata.title, description: article.metadata.description,
    isPartOf: { '@id': 'https://allthatsnext.com/#website' },
    publisher: { '@id': 'https://allthatsnext.com/#organization' },
  };
  return <div className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <a className="skip-link" href="#article-content">Skip to content</a>
    <header className={styles.header}>
      <Link href="/" aria-label="All That's Next home"><Image src="/assets/brand/all-thats-next-lockup-web-v1.png" alt="All That's Next" width={1651} height={324} className={styles.logo} priority /></Link>
      <div className={styles.headerActions}><nav aria-label="Primary navigation"><Link href="/#modules">Tools</Link></nav><HeaderPageLinks currentPage={article.slug} /></div>
    </header>
    <main id="article-content" className={styles.main}>
      <p className={styles.label}>{article.label}</p>
      <h1>{article.blocks[0].heading}</h1>
      <div className={styles.rail} aria-hidden="true"><i /><i /><i /><i /></div>
      <article className={styles.article}>
        {article.blocks.map((block, index) => {
          const isLast = index === article.blocks.length - 1;
          const isStory = isAbout && index === 1;
          const isMethod = isAbout && index === 2;
          const tone = !isAbout && index > 0 && !isLast ? ['blue', 'purple', 'orange'][index - 1] : null;
          return <section className={`${styles.section} ${index === 0 ? styles.intro : ''} ${isStory ? styles.story : ''} ${isMethod ? styles.method : ''} ${isLast ? styles.nextMove : ''} ${tone ? `${styles.step} ${styles[tone]}` : ''}`} key={block.heading}>
            {index > 0 && <div className={styles.sectionHeading}>
              <h2>{block.heading}</h2>
            </div>}
            <div className={isMethod ? styles.methodGrid : styles.sectionBody}>
              {block.paragraphs.map((text, paragraph) => {
                const methodTone = isMethod && paragraph < 3 ? ['blue', 'purple', 'orange'][paragraph] : null;
                return methodTone ? <div key={paragraph} className={`${styles.methodCard} ${styles[methodTone]}`}>
                  <h3>{['Design', 'Price', 'Build'][paragraph]}</h3>
                  <p><InlineCopy text={text.replace(/^\*\*[^*]+\*\*\s*/, '')} /></p>
                </div> : <p key={paragraph} className={isStory && paragraph === 0 ? styles.storyLead : text === "Prepared by All That's Next" ? styles.byline : undefined}><InlineCopy text={text} primaryAction={isLast && /^\[[^\]]+\]\([^)]+\)$/.test(text)} /></p>;
              })}
            </div>
          </section>;
        })}
      </article>
    </main>
    <footer className={styles.footer}><span>All That&apos;s Next</span><Link href="/#modules">Explore the tools</Link><Link href="/about">About</Link><Link href="/life-after-school">Life after school</Link><a href="mailto:hello@mitchbryant.com">Contact Mitch</a></footer>
  </div>;
}
