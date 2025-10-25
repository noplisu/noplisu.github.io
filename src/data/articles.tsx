interface Article {
  id: string;
  title: string;
  description: string;
  contentPath: string; // Path to markdown file
  excerpt: string;
  author: string;
  publishedAt: string; // ISO date string
  updatedAt?: string; // ISO date string
  tags: string[];
  category: 'technical' | 'tutorial' | 'case-study' | 'opinion';
  featured: boolean;
  readingTime: number; // in minutes
  slug: string;
  image?: string;
}

const articles: Article[] = [
  {
    id: 'modernizing-rails',
    title: 'Modernizing Rails Applications: A Practical Guide',
    description: 'A comprehensive guide to modernizing legacy Rails applications, covering everything from Rails upgrades to modern frontend integration.',
    contentPath: '/content/articles/modernizing-rails-applications.md',
    excerpt: 'A comprehensive guide to modernizing legacy Rails applications, covering everything from Rails upgrades to modern frontend integration. Based on real-world experience with production applications.',
    author: 'Grzegorz Lisowski',
    publishedAt: '2024-01-15T10:00:00Z',
    tags: ['Rails', 'Ruby', 'Modernization', 'Web Development', 'Bootstrap', 'Frontend'],
    category: 'technical',
    featured: true,
    readingTime: 12,
    slug: 'modernizing-rails-applications',
    image: '/skill-images/rails.svg'
  }
];

export default articles;
