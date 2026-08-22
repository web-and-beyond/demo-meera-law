import type { Metadata } from "next";
import { ArticleLayout } from "../ArticleLayout";
import { articles } from "../article-data";

const article = articles.consultation;
export const metadata: Metadata = {
  title: `${article.title} | Meera Law`, description: article.description,
  openGraph: { title: article.title, description: article.description, images: [] },
  twitter: { title: article.title, description: article.description, images: [] },
};
export default function Page() { return <ArticleLayout article={article} />; }
