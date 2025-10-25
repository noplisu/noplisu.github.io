import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/data/articles';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      'technical': 'bg-blue-100 text-blue-800',
      'tutorial': 'bg-green-100 text-green-800',
      'case-study': 'bg-purple-100 text-purple-800',
      'opinion': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link href={`/blog/${article.slug}`}>
      <article className="group bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer">
      {/* Article Image */}
      {article.image && (
        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
          {article.featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-soft">
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
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 mb-2">
              {article.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
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
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 4).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
              >
                #{tag}
              </span>
            ))}
            {article.tags.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                +{article.tags.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Author and Read More */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">GL</span>
            </div>
            <span className="text-sm text-gray-600">{article.author}</span>
          </div>
          <Link 
            href={`/blog/${article.slug}`}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-300"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
    </Link>
  );
}
