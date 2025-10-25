export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: 'open-source' | 'ar-vr' | 'full-stack' | 'business' | 'mobile' | 'game';
  featured: boolean;
  links: {
    live?: string;
    github?: string;
    appStore?: string;
    playStore?: string;
  };
  impact?: string;
  challenges?: string[];
  status: 'completed' | 'in-progress' | 'maintenance' | 'archived';
}

const projects: Project[] = [
  {
    id: 'gobl-ksef',
    title: 'GOBL KSeF',
    description: 'Polish Electronic Invoicing Integration for Global JSON Invoicing Standard',
    longDescription: 'Contributed to the global JSON invoicing standard by building converters for Polish KSeF (National e-Invoice System). Developed JSON to KSeF structure converters in Go, enabling seamless electronic business document exchange for Polish market compliance.',
    image: '/skill-images/go.svg',
    technologies: ['Go', 'JSON Schema', 'KSeF API', 'Financial Compliance', 'REST API'],
    category: 'open-source',
    featured: true,
    links: {
      github: 'https://github.com/invopop/gobl.ksef'
    },
    impact: 'Enables businesses to comply with Polish electronic invoicing regulations through standardized JSON format',
    challenges: [
      'Complex financial compliance requirements',
      'Integration with Polish government systems',
      'JSON schema validation and transformation'
    ],
    status: 'completed'
  },
  {
    id: 'julinek-ar',
    title: 'Julinek AR',
    description: 'Augmented Reality Circus Game',
    longDescription: 'Developed an AR-based educational game for exploring the former circus base. Built with Unity and C#, featuring marker-based AR technology for interactive learning experiences.',
    image: '/skill-images/unity.svg',
    technologies: ['Unity', 'C#', 'ARKit', 'iOS Development', 'AR Foundation'],
    category: 'ar-vr',
    featured: true,
    links: {},
    impact: 'Developed AR educational game using Unity and ARKit, demonstrating expertise in mobile AR development and iOS App Store deployment',
    challenges: [
      'Marker-based AR implementation',
      'iOS App Store submission process',
      'Performance optimization for mobile devices'
    ],
    status: 'archived'
  },
  {
    id: 'amenitiz',
    title: 'Amenitiz',
    description: 'Hotel Management Platform',
    longDescription: 'Contributed to a comprehensive property management platform for short-term rental owners. Worked on backend development in Ruby on Rails and Go, frontend development in React with Storybook, and integration with external services using protobuf communication.',
    image: '/skill-images/rails.svg',
    technologies: ['Ruby on Rails', 'Go', 'React', 'Storybook', 'Protobuf', 'PostgreSQL'],
    category: 'full-stack',
    featured: true,
    links: {
        live: 'https://amenitiz.com'
    },
    impact: 'Contributed to full-stack development using Ruby on Rails, Go, and React, implementing microservices architecture and protobuf communication',
    challenges: [
      'Microservices architecture implementation',
      'Protobuf communication between services',
      'Complex reservation management logic'
    ],
    status: 'completed'
  },
  {
    id: 'nopaperwork',
    title: 'nopaperwork',
    description: 'Business Management Platform',
    longDescription: 'Developed a comprehensive business management application featuring customer service, invoicing, and order management. Implemented Polish e-Invoicing (KSeF) integration and modernized the tech stack from Bootstrap 3 to Bootstrap 5 and Rails 7.x.',
    image: '/skill-images/ember.svg',
    technologies: ['Ruby on Rails', 'Ember.js', 'Bootstrap 5', 'KSeF Integration', 'Swagger', 'PostgreSQL'],
    category: 'business',
    featured: true,
    links: {
      live: 'https://nopaperwork.org'
    },
    impact: 'Led full-stack modernization from Bootstrap 3 to Bootstrap 5 and Rails 7.x, implementing Polish e-Invoicing (KSeF) integration and API documentation',
    challenges: [
      'Legacy system modernization',
      'Polish e-Invoicing compliance',
      'API documentation with Swagger'
    ],
    status: 'maintenance'
  },
  {
    id: 'hitdea',
    title: 'hitdea',
    description: 'Collaborative Idea Management Platform',
    longDescription: 'Built a collaborative web-based platform for idea management using microservices architecture. Implemented Creative Problem Solving (CPS 6.1) methodology with both web and mobile applications.',
    image: '/skill-images/rails.svg',
    technologies: ['Ruby on Rails', 'Ember.js', 'Apache Cordova', 'Microservices', 'REST API', 'PostgreSQL'],
    category: 'full-stack',
    featured: false,
    links: {},
    impact: 'Enabled organizations to gather and process ideas in a creative, productive way',
    challenges: [
      'Microservices architecture design',
      'Cross-platform mobile development',
      'Creative methodology implementation'
    ],
    status: 'archived'
  },
  {
    id: '20-questions-game',
    title: '20 Questions Game',
    description: 'AI Logic Game with Machine Learning',
    longDescription: 'Developed a logic game that learns with every play. Players answer questions asked by the AI, which tries to guess what they are thinking about. Features learning algorithms and comprehensive testing.',
    image: '/skill-images/rails.svg',
    technologies: ['Ruby on Rails', 'JavaScript', 'Machine Learning', 'RSpec', 'PostgreSQL'],
    category: 'game',
    featured: false,
    links: {},
    impact: 'Interactive AI game demonstrating machine learning concepts in an engaging format',
    challenges: [
      'Machine learning algorithm implementation',
      'Game logic design and optimization',
      'Multi-language support and translations'
    ],
    status: 'archived'
  }
];

export default projects;
