import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import articles from '@/data/articles';
import Link from 'next/link';
import Image from 'next/image';
import { marked } from 'marked';
import hljs from 'highlight.js';
import SyntaxHighlighter from '@/components/blog/syntax-highlighter';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = articles.find((a) => a.slug === params.slug);
  
  if (!article) {
    notFound();
  }

  // Read the markdown file
  const filePath = path.join(process.cwd(), 'src', article.contentPath);
  const content = await fs.readFile(filePath, 'utf8');

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
            cleanCode = cleanCode.split('\n').map(line => line.trimEnd()).join('\n');
            
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
      <nav className="bg-white shadow-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/#blog" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </nav>

      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
            {article.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            {article.description}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500">
            <span>By {article.author}</span>
            <span>•</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span>{article.readingTime} min read</span>
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
        <article className="prose prose-lg max-w-none">
          <div 
            className="markdown-content"
            dangerouslySetInnerHTML={{ 
              __html: markdownToHtml(content)
            }}
          />
          <SyntaxHighlighter />
        </article>

        {/* Author Bio */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">GL</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{article.author}</h3>
              <p className="text-gray-600">
                Full-Stack Developer & AR/VR Specialist with over a decade of experience building robust applications.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link 
            href="/#blog"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors duration-300"
          >
            ← Back to All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
