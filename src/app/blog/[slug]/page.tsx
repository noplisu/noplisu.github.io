import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/lib/markdown';
import Link from 'next/link';
import hljs from 'highlight.js';
import SyntaxHighlighter from '@/components/blog/syntax-highlighter';
import Navbar from '@/components/navbar';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const markdownToHtml = (markdown: string) => {
    try {
      const p = 'mb-4 text-gray-700 dark:text-gray-300 leading-relaxed';
      const li = 'mb-2 text-gray-700 dark:text-gray-300';
      let html = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

      html = html
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 mt-8">$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 mt-8">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 mt-6">$1</h3>')
        .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 mt-4">$1</h4>')
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, src) => {
          const imageSrc = src.startsWith('/') ? src : `/${src}`;
          return `<div class="my-8 text-center">
            <img src="${imageSrc}" alt="${alt || 'Article Image'}" class="max-w-full h-auto rounded-lg shadow-soft mx-auto" />
          </div>`;
        })
        .replace(/```(\w+)?\n?([\s\S]*?)```/g, (_match, lang, code) => {
          try {
            let cleanCode = code.replace(/^\n+/, '').replace(/\n+$/, '');
            cleanCode = cleanCode.replace(/^\s*\n/, '').replace(/\n\s*$/, '');
            cleanCode = cleanCode.replace(/\n\s*\n\s*\n+/g, '\n\n');
            cleanCode = cleanCode.split('\n').map((line: string) => line.trimEnd()).join('\n');
            const highlighted =
              lang && hljs.getLanguage(lang)
                ? hljs.highlight(cleanCode, { language: lang }).value
                : hljs.highlightAuto(cleanCode).value;
            return `<pre class="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto my-6"><code class="text-sm hljs">${highlighted}</code></pre>`;
          } catch (error) {
            console.error('Highlighting error:', error);
            let fallbackCode = code.replace(/^\n+/, '').replace(/\n+$/, '');
            fallbackCode = fallbackCode.replace(/^\s*\n/, '').replace(/\n\s*$/, '');
            fallbackCode = fallbackCode.replace(/\n\s*\n\s*\n+/g, '\n\n');
            fallbackCode = fallbackCode.split('\n').map((line: string) => line.replace(/\s+$/, '')).join('\n');
            return `<pre class="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto my-6"><code class="text-sm">${fallbackCode}</code></pre>`;
          }
        })
        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">$1</code>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        .replace(/^\- (.*$)/gim, `<li data-list="ul" class="${li}">$1</li>`)
        .replace(/^(\d+)\. (.*$)/gim, `<li data-list="ol" class="${li}">$2</li>`)
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 dark:text-red-500 hover:text-primary-700 dark:hover:text-red-600 underline" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/^---$/gim, '<hr class="my-8 border-gray-300 dark:border-gray-700" />')
        .replace(/(?:<li data-list="ol"[^>]*>[\s\S]*?<\/li>\n*)+/g, (block) =>
          `<ol class="list-decimal pl-6 my-4 space-y-1">${block.replace(/\sdata-list="ol"/g, '')}</ol>`
        )
        .replace(/(?:<li data-list="ul"[^>]*>[\s\S]*?<\/li>\n*)+/g, (block) =>
          `<ul class="list-disc pl-6 my-4 space-y-1">${block.replace(/\sdata-list="ul"/g, '')}</ul>`
        )
        .replace(/\n\n/g, `</p><p class="${p}">`)
        .replace(/^(?!<(?:h[1-6]|p|li|pre|code|hr|div|ol|ul)\b)(.*)$/gim, (_m, line) =>
          line.trim() === '' ? '' : `<p class="${p}">${line}</p>`
        );

      return html;
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return markdown;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
      <Navbar />

      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <Link
          href="/#blog"
          className="inline-flex items-center text-primary-600 dark:text-red-500 hover:text-primary-700 dark:hover:text-red-600 font-medium transition-colors duration-300 mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Blog
        </Link>
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-red-900/30 text-primary-800 dark:text-red-300 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary-600 dark:bg-red-600 rounded-full mr-2"></span>
            {article.category.replace('-', ' ').toUpperCase()}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            {article.description}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary dark:bg-gradient-primary-dark rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">GL</span>
              </div>
              <span className="font-medium">By {article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{article.readingTime} min read</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-100 dark:bg-red-900/30 text-primary-800 dark:text-red-300 text-sm rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Article Content */}
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft dark:shadow-hard p-8 lg:p-12 border border-gray-100 dark:border-gray-700">
          <div 
            className="markdown-content prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-primary-600 dark:prose-a:text-red-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-code:bg-gray-100 dark:prose-code:bg-gray-700 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100 dark:prose-pre:text-gray-200 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-hr:border-gray-300 dark:prose-hr:border-gray-700"
            dangerouslySetInnerHTML={{ 
              __html: markdownToHtml(article.content)
            }}
          />
          <SyntaxHighlighter />
        </article>

        {/* Author Bio */}
        <div className="mt-16 bg-gradient-to-r from-primary-50 dark:from-gray-800 to-blue-50 dark:to-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-20 h-20 bg-gradient-primary dark:bg-gradient-primary-dark rounded-full flex items-center justify-center shadow-soft dark:shadow-glow-red">
              <span className="text-white font-bold text-2xl">GL</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{article.author}</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Full-Stack Developer & AR/VR Specialist with over a decade of experience building robust applications. 
                Passionate about modernizing legacy systems and creating innovative solutions.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary-100 dark:bg-red-900/30 text-primary-800 dark:text-red-300 text-sm rounded-full font-medium">Full-Stack</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full font-medium">AR/VR</span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm rounded-full font-medium">Rails</span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm rounded-full font-medium">React</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link 
            href="/#blog"
            className="inline-flex items-center px-8 py-4 bg-gradient-primary dark:bg-gradient-primary-dark text-white font-semibold rounded-full shadow-soft dark:shadow-glow-red hover:shadow-glow dark:hover:shadow-glow-red-dark transform hover:-translate-y-1 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
