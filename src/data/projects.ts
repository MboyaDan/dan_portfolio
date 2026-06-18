export type DiagramKey =
  | "request-lifecycle"
  | "multi-tenant-saas"
  | "event-driven-pipeline"
  | "mpesa-payment-flow"
  | "websocket-kds";

export interface ProjectSolution {
  title: string;
  detail: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  year: string;
  role: string;
  stack: string[];
  problem: string;
  challenges: string[];
  solutions: ProjectSolution[];
  results: string[];
  diagram: DiagramKey;
  links?: ProjectLink[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "mezani",
    name: "Mezani",
    tagline: "Multi-tenant restaurant operating system",
    summary:
      "A multi-branch restaurant OS handling menus, orders, and live kitchen displays for multiple tenants on shared infrastructure.",
    year: "2025–2026",
    role: "Solo backend & systems design",
    stack: ["Go", "Gin", "PostgreSQL", "Redis", "WebSockets", "FastAPI", "Claude API", "AWS", "Next.js"],
    problem:
      "Independent restaurant groups needed a single platform to run QR ordering, kitchen display, and analytics across multiple branches — without each tenant's data, staff, or traffic interfering with another's.",
    challenges: [
      "Isolating tenant data without the operational cost of separate databases per customer",
      "Delivering kitchen order updates to screens in under 200ms during peak service",
      "Scoping staff permissions across branches, roles, and trial accounts from a single token",
      "Keeping the system close to feature-complete while shipping weekly without destabilizing production",
    ],
    solutions: [
      {
        title: "Schema-per-tenant isolation with scoped claims",
        detail:
          "Each tenant gets its own PostgreSQL schema, while a single Go/Gin API resolves the active schema from JWT claims on every request — so tenant boundaries are enforced before a query is ever built.",
      },
      {
        title: "Redis Pub/Sub-backed kitchen display",
        detail:
          "Order events are published to per-branch Redis channels and fanned out over WebSockets to kitchen displays, keeping delivery consistently under 200ms even with multiple concurrent branches.",
      },
      {
        title: "Claims-driven RBAC across branches and trials",
        detail:
          "A single permissions map, encoded in JWT claims with refresh-token rotation, governs branch selection, manager-level access, and time-boxed trial accounts — no per-request database lookups for authorization.",
      },
      {
        title: "AI operations assistant",
        detail:
          "An assistant (powered via the Claude API) answers natural-language questions about sales and ordering patterns by querying aggregated tenant data — surfacing insights owners would otherwise need a report for.",
      },
    ],
    results: [
      "Sub-200ms order-to-kitchen-display latency under concurrent multi-branch load",
      "Single shared deployment serving isolated tenant data via schema-level boundaries",
      "Refresh-token rotation and RBAC bugs resolved across manager, branch, and trial flows",
      "System brought to near feature-complete status while remaining deployable weekly",
    ],
    diagram: "multi-tenant-saas",
    featured: true,
  },
  {
    slug: "stylerstack",
    name: "StylerStack",
    tagline: "Fashion e-commerce API with M-Pesa payments",
    summary:
      "A FastAPI commerce backend with M-Pesa Daraja payments, role-based access for vendors and admins, and CI/CD on Railway.",
    year: "2024–2025",
    role: "Solo backend engineer",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Docker", "GitHub Actions", "M-Pesa Daraja"],
    problem:
      "A fashion marketplace needed to accept mobile money payments reliably — without risking duplicate charges from retried requests or unverified payment callbacks.",
    challenges: [
      "M-Pesa STK push callbacks can arrive late, out of order, or more than once",
      "Vendors, customers, and admins each need different views of the same orders and inventory",
      "Catalog browsing needed to stay fast as product and order volume grew",
      "Deploys needed to be safe enough to ship without a dedicated ops team",
    ],
    solutions: [
      {
        title: "Idempotent Daraja payment flow",
        detail:
          "Every payment request is issued an idempotency key stored against the order. Incoming Daraja webhooks are signature-verified, then applied as an atomic database upsert keyed on that identifier — so retries and duplicate callbacks settle to a single charge.",
      },
      {
        title: "Cache-aside catalog reads",
        detail:
          "Frequently read product and category data sits behind a Redis cache-aside layer, cutting catalog read latency by roughly 40% during testing without weakening consistency for writes.",
      },
      {
        title: "Role-scoped JWT access",
        detail:
          "Customer, vendor, and admin roles are encoded in JWTs and enforced via FastAPI dependencies, giving each role its own view of orders and inventory from the same API surface.",
      },
      {
        title: "CI/CD to Railway",
        detail:
          "GitHub Actions runs the test suite and builds a Docker image on every push, deploying to Railway so the API ships continuously with a repeatable, auditable pipeline.",
      },
    ],
    results: [
      "Zero duplicate charges observed across repeated and out-of-order Daraja callbacks",
      "~40% reduction in catalog read latency after introducing Redis caching",
      "Three-role access model (customer/vendor/admin) on a single API surface",
      "Continuous deployment to Railway via GitHub Actions",
    ],
    diagram: "mpesa-payment-flow",
    featured: true,
  },
  {
    slug: "restaurant-analytics-platform",
    name: "Restaurant Analytics Platform",
    tagline: "Cloud-native, event-driven analytics on GCP",
    summary:
      "An event-driven pipeline that turns order events into BigQuery-backed revenue and volume insights, narrated by an AI assistant.",
    year: "2025",
    role: "Solo backend engineer · cloud-native learning project",
    stack: ["Go", "Cloud Run", "Pub/Sub", "BigQuery", "Cloud Storage", "OpenAI API", "GitHub Actions"],
    problem:
      "Restaurant operators have order data, but turning it into revenue and volume trends usually means a manual export-and-spreadsheet routine that lags behind the business.",
    challenges: [
      "Reporting workloads shouldn't compete with the latency-sensitive order-taking path",
      "Revenue and volume queries need to stay fast as historical data grows",
      "Raw metrics tables are not useful to a non-technical restaurant owner",
      "The pipeline needed to be deployable and observable without a platform team",
    ],
    solutions: [
      {
        title: "Pub/Sub-decoupled ingestion",
        detail:
          "Order events are published to a Pub/Sub topic the moment they occur. A separate Cloud Run worker subscribes and writes to BigQuery — so reporting load never touches the order-taking path.",
      },
      {
        title: "Partitioned BigQuery tables",
        detail:
          "Order and revenue events land in date-partitioned BigQuery tables, keeping trend queries over weeks or months fast and cost-predictable as data accumulates.",
      },
      {
        title: "Natural-language insight layer",
        detail:
          "A small Go service aggregates BigQuery results and passes them to the OpenAI API to generate plain-language summaries — turning 'revenue by hour' tables into a sentence an owner can act on.",
      },
      {
        title: "CI/CD to Cloud Run",
        detail:
          "GitHub Actions builds and deploys each service to Cloud Run on push, with environment-scoped configuration for staging and production.",
      },
    ],
    results: [
      "Order ingestion fully decoupled from analytics processing via Pub/Sub",
      "Date-partitioned BigQuery schema for revenue and volume trend queries",
      "Aggregated metrics translated into plain-language summaries via an LLM layer",
      "Automated build-and-deploy to Cloud Run on every push",
    ],
    diagram: "event-driven-pipeline",
    featured: true,
  },
  {
    slug: "mgari",
    name: "Mgari",
    tagline: "Car rental booking engine",
    summary:
      "A booking engine that guarantees one vehicle can never be double-booked, with geo-fenced availability and rate-limited APIs.",
    year: "2024",
    role: "Solo backend engineer",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Google Maps API"],
    problem:
      "Two customers booking the same vehicle for overlapping dates at the same moment is the one failure a rental platform cannot tolerate — and availability needs to reflect where a car actually is.",
    challenges: [
      "Concurrent booking requests for the same vehicle and date range must not both succeed",
      "Availability needs to account for a vehicle's current location, not just its calendar",
      "Public booking endpoints need protection from abusive request volume",
      "Booking logic needed to stay correct under load without introducing a queue-based architecture",
    ],
    solutions: [
      {
        title: "Row-level locking for reservations",
        detail:
          "Booking writes use SELECT FOR UPDATE on the vehicle's availability row inside a transaction, so two concurrent requests for overlapping dates serialize correctly — the second always sees the first's reservation.",
      },
      {
        title: "Geo-fenced availability",
        detail:
          "Vehicle locations are checked against requested pickup areas using the Google Maps API, so a car isn't shown as available to a customer it can't realistically reach.",
      },
      {
        title: "Sliding-window rate limiting",
        detail:
          "Public endpoints are rate-limited using Redis INCR with EXPIRE-based sliding windows, keeping booking and search endpoints stable under bursty traffic.",
      },
    ],
    results: [
      "Zero double-bookings under concurrent reservation testing",
      "Location-aware availability using Google Maps geo-fencing",
      "Redis-backed sliding-window rate limiting on public endpoints",
    ],
    diagram: "request-lifecycle",
    featured: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
