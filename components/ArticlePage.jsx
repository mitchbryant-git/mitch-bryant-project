import Image from 'next/image';
import Link from 'next/link';
import styles from './ArticlePage.module.css';
import { HeaderPageLinks } from './HeaderPageLinks';

function InlineCopy({ text, primaryAction = false }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={index} href={link[2]} className={primaryAction ? 'button button--ink' : undefined}>{link[1]}</a>;
    if (part.startsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    return part;
  });
}

export function ArticlePage({ article }) {
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
      <article>
        {article.blocks.map((block, index) => <section className={styles.section} key={block.heading}>
          {index > 0 && <h2>{block.heading}</h2>}
          {block.paragraphs.map((text, paragraph) => <p key={paragraph}><InlineCopy text={text} primaryAction={index === article.blocks.length - 1 && /^\[[^\]]+\]\([^)]+\)$/.test(text)} /></p>)}
        </section>)}
      </article>
    </main>
    <footer className={styles.footer}><span>All That&apos;s Next</span><Link href="/#modules">Explore the tools</Link><Link href="/about">About</Link><Link href="/life-after-school">Life after school</Link><a href="mailto:hello@mitchbryant.com">Contact Mitch</a></footer>
  </div>;
}
