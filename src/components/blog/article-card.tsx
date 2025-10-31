import Image from 'next/image';
import Link from 'next/link';

interface Article {
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

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      'technical': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      'tutorial': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      'case-study': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
      'opinion': 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="group bg-white dark:bg-gray-800 rounded-2xl shadow-soft dark:shadow-hard hover:shadow-medium dark:hover:shadow-glow-red transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      <Link href={`/blog/${article.slug}`} className="block">
        {/* Article Image */}
        {article.image && (
          <div className="relative h-48 bg-gradient-to-br from-gray-50 dark:from-gray-700 to-gray-100 dark:to-gray-900 overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            />
            {article.featured && (
              <div className="absolute top-4 right-4">
                <span className="bg-gradient-primary dark:bg-gradient-primary-dark text-white px-3 py-1 rounded-full text-sm font-semibold shadow-soft dark:shadow-glow-red">
                  Featured
                </span>
              </div>
            )}
          </div>
        )}

        {/* Article Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-red-500 transition-colors duration-300 mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {formatDate(article.publishedAt)} • {article.readingTime} min read
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                {article.category.replace('-', ' ').toUpperCase()}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {article.excerpt}
          </p>

          {/* Tags */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {article.tags.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md font-medium"
                >
                  #{tag}
                </span>
              ))}
              {article.tags.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md font-medium">
                  +{article.tags.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Author and Read More - Outside the main link */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary dark:bg-gradient-primary-dark rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">GL</span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{article.author}</span>
          </div>
          <Link 
            href={`/blog/${article.slug}`}
            className="text-primary-600 dark:text-red-500 hover:text-primary-700 dark:hover:text-red-600 font-medium text-sm transition-colors duration-300"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}
