export interface TimelineEntry {
  period: string;
  title: string;
  org: string;
  summary: string;
  tags: string[];
}

export const timeline: TimelineEntry[] = [
  {
    period: "2025 — Present",
    title: "Founder & Backend Engineer",
    org: "ELS Software Solutions (EasyLiving Software)",
    summary:
      "Designing and building production backend systems for SMEs and enterprises across East Africa — multi-tenant platforms, payment infrastructure, and operational tooling.",
    tags: ["Go", "Python", "PostgreSQL", "Redis", "AWS", "GCP"],
  },
  {
    period: "2023 — 2025",
    title: "Backend Engineer (Contract & Independent)",
    org: "Remote — fintech, e-commerce, logistics clients",
    summary:
      "Shipped payment integrations, multi-tenant SaaS backends, and data pipelines for clients operating across East Africa and remote international teams.",
    tags: ["FastAPI", "M-Pesa Daraja", "Docker", "CI/CD"],
  },
  {
    period: "2018 — 2023",
    title: "Backend & Distributed Systems Engineer",
    org: "Async-first remote teams",
    summary:
      "Built and operated backend systems for SaaS and e-commerce products in distributed, async-first engineering teams, with a focus on data correctness and API reliability.",
    tags: ["Go", "Python", "PostgreSQL", "Distributed Systems"],
  },
];

export interface EducationEntry {
  period: string;
  title: string;
  org: string;
}

export const education: EducationEntry[] = [
  {
    period: "Ongoing",
    title: "Cloud-Native Systems (self-directed)",
    org: "GCP: Cloud Run, Pub/Sub, BigQuery — applied via Restaurant Analytics Platform",
  },
];
