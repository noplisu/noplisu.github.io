import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/lib/markdown';
import Link from 'next/link';
import Image from 'next/image';
import hljs from 'highlight.js';
import SyntaxHighlighter from '@/components/blog/syntax-highlighter';

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
      // Simple markdown to HTML conversion without complex renderer
      return markdown
        // Headers
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mb-6 mt-8">$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-gray-900 mb-3 mt-6">$1</h3>')
        .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-bold text-gray-900 mb-2 mt-4">$1</h4>')
        
        // Images - render actual images
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
          // Check if it's a relative path and convert to absolute
          const imageSrc = src.startsWith('/') ? src : `/${src}`;
          return `<div class="my-8 text-center">
            <img src="${imageSrc}" alt="${alt || 'Article Image'}" class="max-w-full h-auto rounded-lg shadow-soft mx-auto" />
          </div>`;
        })
        
        // Code blocks with syntax highlighting - handle all formats
        .replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
          try {
            // Remove leading and trailing newlines, but preserve internal structure
            let cleanCode = code;
            
            // Remove leading newlines
            cleanCode = cleanCode.replace(/^\n+/, '');
            // Remove trailing newlines  
            cleanCode = cleanCode.replace(/\n+$/, '');
            
            // Remove any empty lines at the beginning and end
            cleanCode = cleanCode.replace(/^\s*\n/, '').replace(/\n\s*$/, '');
            
            // Remove multiple consecutive empty lines and replace with single newline
            cleanCode = cleanCode.replace(/\n\s*\n\s*\n+/g, '\n\n');
            
            // Remove leading and trailing whitespace from each line
            cleanCode = cleanCode.split('\n').map((line: string) => line.trimEnd()).join('\n');
            
            let highlighted;
            
            if (lang && hljs.getLanguage(lang)) {
              highlighted = hljs.highlight(cleanCode, { language: lang }).value;
            } else {
              highlighted = hljs.highlightAuto(cleanCode).value;
            }
            
            return `<pre class="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto my-6"><code class="text-sm hljs">${highlighted}</code></pre>`;
          } catch (error) {
            console.error('Highlighting error:', error);
            let fallbackCode = code.replace(/^\n+/, '').replace(/\n+$/, '');
            fallbackCode = fallbackCode.replace(/^\s*\n/, '').replace(/\n\s*$/, '');
            return `<pre class="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto my-6"><code class="text-sm">${fallbackCode}</code></pre>`;
          }
        })
        
        // Inline code
        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">$1</code>')
        
        // Bold and italic
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        
        // Lists
        .replace(/^\- (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')
        .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4 mb-2">$2</li>')
        
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 hover:text-primary-700 underline" target="_blank" rel="noopener noreferrer">$1</a>')
        
        // Horizontal rules
        .replace(/^---$/gim, '<hr class="my-8 border-gray-300" />')
        
        // Paragraphs
        .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">')
        .replace(/^(?!<[h|p|li|pre|code|hr|div])(.*$)/gim, '<p class="mb-4 text-gray-700 leading-relaxed">$1</p>');
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return markdown;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-soft sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/#blog" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Blog
          </Link>
        </div>
      </nav>

      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
            {article.category.replace('-', ' ').toUpperCase()}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            {article.description}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
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
              className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Article Content */}
        <article className="bg-white rounded-2xl shadow-soft p-8 lg:p-12">
          <div 
            className="markdown-content prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
            dangerouslySetInnerHTML={{ 
              __html: markdownToHtml(article.content)
            }}
          />
          <SyntaxHighlighter />
        </article>

        {/* Author Bio */}
        <div className="mt-16 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft">
              <span className="text-white font-bold text-2xl">GL</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{article.author}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Full-Stack Developer & AR/VR Specialist with over a decade of experience building robust applications. 
                Passionate about modernizing legacy systems and creating innovative solutions.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full font-medium">Full-Stack</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">AR/VR</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">Rails</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full font-medium">React</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link 
            href="/#blog"
            className="inline-flex items-center px-8 py-4 bg-gradient-primary text-white font-semibold rounded-full shadow-soft hover:shadow-glow transform hover:-translate-y-1 transition-all duration-300"
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
