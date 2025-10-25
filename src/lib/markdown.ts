import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ArticleMetadata {
  title: string;
  description: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: 'technical' | 'tutorial' | 'case-study' | 'opinion';
  featured: boolean;
  readingTime: number;
  slug: string;
  image?: string;
}

export interface Article extends ArticleMetadata {
  content: string;
}

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export function getAllArticles(): Article[] {
  try {
    const fileNames = fs.readdirSync(articlesDirectory);
    const articles = fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => {
        const fullPath = path.join(articlesDirectory, name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          ...data as ArticleMetadata,
          content,
        } as Article;
      })
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return articles;
  } catch (error) {
    console.error('Error reading articles:', error);
    return [];
  }
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      ...data as ArticleMetadata,
      content,
    } as Article;
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter(article => article.featured);
}
