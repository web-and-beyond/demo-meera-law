import type { Article } from "./article-data";
import { sitePath } from "../site-path";

export function ArticleLayout({ article }: { article: Article }) {
  return (
    <main className="article-page">
      <header className="article-header">
        <a className="brand" href={sitePath()} aria-label="Meera Law home"><span className="brand-mark">ML</span><span>Meera Law</span></a>
        <a href={sitePath("#insights")}>← Back to insights</a>
      </header>
      <article>
        <div className="article-hero">
          <p className="eyebrow">{article.category} · {article.readTime}</p>
          <h1>{article.title}</h1>
          <p>{article.intro}</p>
          <div className="article-meta"><span>Meera Law editorial desk</span><span>Updated August 2026</span></div>
        </div>
        <div className="article-body">
          <aside><span>In this note</span>{article.sections.map((section, index) => <a key={section.heading} href={`#section-${index + 1}`}>0{index + 1} {section.heading}</a>)}</aside>
          <div className="article-content">
            {article.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.heading}><span>0{index + 1}</span><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}
            <div className="article-disclaimer"><strong>Important</strong><p>This fictional article provides general information for demonstration purposes. It is not legal advice and does not create an advocate–client relationship.</p></div>
            <div className="article-cta"><p>Need help understanding your next step?</p><a className="primary-button" href={sitePath("#right-help")}>Use the three-step guide</a></div>
          </div>
        </div>
      </article>
      <footer className="article-footer"><span>© 2026 Meera Law — fictional demonstration website</span><a href={sitePath()}>Return home ↑</a></footer>
    </main>
  );
}
