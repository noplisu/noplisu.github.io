export interface ExperienceRole {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  link?: string;
}

const experience: ExperienceRole[] = [
  {
    id: 'fractalsoft',
    company: 'Fractal Soft',
    role: 'Technical Leader / Senior Full-Stack Developer',
    period: '2013 – Present',
    location: 'Gliwice, Poland · Remote',
    summary:
      'Lead cross-functional engineering work on client and product platforms—architecture, delivery, modernization, AI pipelines, and multi-country e-invoicing.',
    highlights: [
      'Technical leadership: led cross-functional engineering squads (3–5 developers) through the full SDLC, owning system architecture, technical discovery, and code reviews',
      'Legacy modernization: transitioned Rails 4.2 to 7.x, replaced Ember 1.4/CoffeeScript frontends with React and ES6, updated UI frameworks to Bootstrap 5',
      'AI document audit & procurement: multimodal RAG document pipelines (Python, NestJS) and automated vendor scoring for enterprise client applications',
      'International e-invoicing: compliance infrastructure for KSeF (Poland), ZUGFeRD (Germany), and Factur-X (France) across a microservices architecture',
      'GOBL (open source): core contributor to a Go SDK (275★) for standardized multi-country JSON e-invoicing workflows',
      'High-traffic SaaS: hotel management and e-learning platforms serving millions of users, including A/B experimentation frameworks',
      'Additional delivery: 10+ custom web, AR/VR (Unity/ARKit), and back-office platforms across Fintech, EdTech, and PropTech',
    ],
    technologies: [
      'TypeScript',
      'Node.js',
      'NestJS',
      'React',
      'Ruby on Rails',
      'Python',
      'Go',
      'PostgreSQL',
      'AWS',
      'Docker',
    ],
    link: 'https://fractalsoft.org/team/lisu',
  },
];

export default experience;
