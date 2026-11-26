// Single source of truth for resume content shown on the site.
// Update this file when the resume changes.

export const profile = {
  name: "Mike Nguyen",
  title: "Software Engineer II",
  company: "Principal Financial Group",
  location: "Des Moines, Iowa",
  email: "515.miken@gmail.com",
  github: "https://github.com/miken515",
  linkedin: "https://linkedin.com/in/miken515",
  summary:
    "I'm a full-stack engineer who likes the unglamorous parts of software as much as the shiny ones: bridging legacy systems to the cloud, " +
    "untangling COBOL into clean TypeScript, and building React UIs that real customers rely on. I care about tests, fast pipelines, " +
    "and leaving codebases better than I found them. Off the clock you'll find me on the golf course, out on a run, or deep in a video game.",
};

export const highlights = [
  { value: "20%", label: "infra cost cut moving monoliths to serverless" },
  { value: "66%", label: "faster merchant onboarding (30 → 10 min)" },
  { value: "15k+", label: "records/day through services I built" },
];

export type Role = {
  company: string;
  title: string;
  period: string;
  bullets: string[];
  tags: string[];
};

export const experience: Role[] = [
  {
    company: "Principal Financial Group",
    title: "Software Engineer II",
    period: "Nov 2025 – Present",
    bullets: [
      "Architected and deployed AWS Batch jobs that process annuity data at scale, integrating with on-prem IBM MQ to bridge legacy infrastructure and cloud services.",
      "Designed event-driven microservices for asynchronous annuity processing, decoupling on-prem and cloud systems and improving throughput and fault tolerance under peak load.",
      "Spearheaded the migration of legacy Java/Spring monoliths to serverless AWS (Lambda, API Gateway), cutting infrastructure costs by 20%.",
      "Built customer-facing annuity portal pages in React so policyholders can view and interact with real-time annuity data.",
      "Set scalable frontend architecture patterns as technical SME, standardizing component libraries across teams.",
      "Optimized CI/CD pipelines to reduce deployment failures; mentor engineers and interns on system design and testing.",
    ],
    tags: ["AWS Batch", "Lambda", "IBM MQ", "React", "Event-Driven", "CI/CD"],
  },
  {
    company: "Principal Financial Group",
    title: "Software Engineer",
    period: "Apr 2025 – Nov 2025",
    bullets: [
      "Built TypeScript services processing 15,000+ records/day, replacing legacy mainframe workflows with fully tested modern services.",
      "Reverse-engineered COBOL and Java systems into modern equivalents with full feature parity and better maintainability.",
      "Drove TDD adoption with Jest, raising coverage and significantly reducing regressions shipped to production.",
      "Partnered with product, QA, and data teams on reliable data transformation pipelines for downstream systems.",
    ],
    tags: ["TypeScript", "Jest", "TDD", "COBOL → TS", "Data Pipelines"],
  },
  {
    company: "VizyPay",
    title: "Junior Software Developer",
    period: "May 2023 – Apr 2025",
    bullets: [
      "Co-built a CRM from the ground up (database schema, REST API layer, React/Angular frontend), replacing manual sales workflows.",
      "Owned end-to-end delivery of a quoting system for configuring POS hardware and service plans, including catalog, pricing logic, and data model.",
      "Cut merchant onboarding time by 66% (30 → 10 min) by automating end-to-end workflows.",
      "Designed secure REST APIs for business-critical payment systems; built CI/CD pipelines that sped up deployments by 30%.",
    ],
    tags: ["React", "Angular", "Node.js", "REST", "Payments"],
  },
];

export const projects = [
  {
    name: "Distributed Job Queue System",
    description:
      "A fault-tolerant distributed job queue with retry logic, dead-letter queues, and concurrency control for reliable async processing. Worker scaling and queue partitioning improved throughput and cut background task latency.",
    tags: ["Node.js", "AWS SQS", "DLQ", "Concurrency"],
  },
  {
    name: "Full-Stack Web Application",
    description:
      "A production-grade full-stack app deployed on AWS with JWT auth, RESTful APIs, and a responsive, accessible UI, tuned with server-side caching, query optimization, and lazy loading.",
    tags: ["React", "Node.js", "PostgreSQL", "AWS", "JWT"],
  },
];

export const skills = [
  { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "Java", "SQL"] },
  { category: "Frontend", items: ["React", "Angular", "Next.js", "HTML5", "CSS3", "Three.js"] },
  { category: "Backend", items: ["Node.js", "REST APIs", "GraphQL", "Microservices", "Event-Driven Architecture"] },
  { category: "Cloud & DevOps", items: ["AWS Lambda", "API Gateway", "SQS", "AWS Batch", "Docker", "CI/CD", "Serverless"] },
  { category: "Testing & Tools", items: ["Jest", "TDD", "Git", "IBM MQ", "Agile/Scrum"] },
];

export const education = [
  {
    school: "Grand View University",
    degree: "B.S. Computer Science, Minor in Mathematics",
    detail: "GPA 3.8",
    icon: "/icons/grand-view-icon.svg",
  },
  {
    school: "Des Moines Area Community College",
    degree: "Associate in Liberal Arts",
    detail: "",
    icon: "/icons/dmacc-icon.svg",
  },
];
