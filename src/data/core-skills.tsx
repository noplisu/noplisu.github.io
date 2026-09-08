export interface CoreSkill {
  name: string;
  detail: string;
}

const coreSkills: CoreSkill[] = [
  { name: 'TypeScript / Node.js / NestJS', detail: 'Primary stack for modern APIs and services' },
  { name: 'React / Next.js', detail: 'Product UIs and full-stack frontends' },
  { name: 'Ruby on Rails', detail: 'Long-running production backends and modernization' },
  { name: 'Python / Go', detail: 'AI pipelines, SDKs, and compliance tooling' },
  { name: 'PostgreSQL / Redis / OpenSearch', detail: 'Data, caching, and search infrastructure' },
  { name: 'AI / RAG / LLM tooling', detail: 'Document pipelines, embeddings, and tool calling' },
  { name: 'AWS / Docker / Terraform', detail: 'Cloud infrastructure and CI/CD' },
  { name: 'E-Invoicing', detail: 'KSeF, ZUGFeRD, Factur-X, and GOBL' },
];

export default coreSkills;
