export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend Engineering",
    description: "API and service design for systems that run unattended in production.",
    items: ["Go (Gin)", "Python (FastAPI)", "REST API design", "WebSockets", "JWT / OAuth2"],
  },
  {
    id: "databases",
    title: "Databases",
    description: "Schema design and query performance under real write/read load.",
    items: [
      "PostgreSQL (EXPLAIN ANALYZE, composite indexes)",
      "Alembic migrations",
      "Redis (cache-aside, Pub/Sub, rate limiting)",
      "BigQuery",
      "SQLite",
    ],
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    description: "Deploying and operating services across AWS and GCP.",
    items: [
      "AWS: EC2, RDS, ElastiCache, S3, Lambda, API Gateway",
      "GCP: Cloud Run, Cloud SQL, Pub/Sub, BigQuery, GCS, IAM",
      "Docker",
      "Nginx",
      "GitHub Actions",
    ],
  },
  {
    id: "distributed",
    title: "Distributed Systems",
    description: "Patterns for correctness when multiple things happen at once.",
    items: [
      "Event-driven architecture",
      "Pub/Sub patterns",
      "Tenant isolation",
      "Idempotency keys",
      "SELECT FOR UPDATE / row locking",
    ],
  },
  {
    id: "ai",
    title: "AI / LLM Systems",
    description: "Using language models as a layer on top of real operational data.",
    items: ["Anthropic Claude API", "OpenAI API", "LLM-augmented analytics services"],
  },
  {
    id: "data",
    title: "Data Engineering",
    description: "Moving data from operational systems into something queryable.",
    items: ["Apache Airflow", "Apache Spark", "ETL pipeline design", "BigQuery warehousing"],
  },
];
