import { getAllArticles } from '@/lib/markdown';
import BlogClient from './blog';

export default function BlogServer() {
  const articles = getAllArticles();
  
  return <BlogClient articles={articles} />;
}
