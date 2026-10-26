export type DiagramKey =
  | "request-lifecycle"
  | "multi-tenant-saas"
  | "event-driven-pipeline"
  | "mpesa-payment-flow"
  | "websocket-kds"
  | "hospitality-pos"
  | "admissions-pipeline";

/** Where the project stands today. Shown on cards and case-study headers. */
export type ProjectStatus = "Live" | "Pilot live" | "In build" | "Learning project";

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
  status?: ProjectStatus;
  /** Client or context line, e.g. "Client project · Makueni, Kenya" */
  context?: string;
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
    slug: "zuscar",
    name: "Zuscar",
    tagline: "Hospitality POS and operations system",
    summary:
      "One system for a Kenyan venue's restaurant, bar and guest rooms: orders, kitchen tickets, cashier shifts, stock, bookings and guest folios on a Go modular monolith.",
    year: "2026",
    role: "Lead engineer · Go API, data model, delivery",
    context: "Client project · single venue, Kenya",
    status: "Pilot live",
    stack: ["Go", "Gin", "pgx", "sqlc", "PostgreSQL", "Next.js", "TypeScript", "Docker", "Render", "Vercel", "Supabase"],
    problem:
      "A venue running a restaurant, a bar/club and about 13 guest rooms needed one system for orders, payments, stock and rooms, where every shilling and every bottle can be traced back to a person and a reason, and where a power or network outage doesn't leave holes in the books.",
    challenges: [
      "Two bookings for the same room on overlapping nights must never both succeed, however the requests race",
      "Every stock balance has to be explainable months later, including corrections, transfers and wastage",
      "Retried payment requests on a flaky connection must not double-charge or double-count",
      "Sales written on paper during an outage have to enter the books exactly once, with a trail",
      "Cashiers, waiters, kitchen, managers and the owner each need different access, with no privilege creep",
    ],
    solutions: [
      {
        title: "Overlap-proof bookings enforced by PostgreSQL",
        detail:
          "Reservations carry an exclusion constraint on room_id and a half-open daterange using a GiST index. Overlapping stays are rejected by the database itself, so no application-level check can be raced around.",
      },
      {
        title: "Append-only stock ledger",
        detail:
          "Stock movements are insert-only: a trigger rejects UPDATE and DELETE. Balances are derived from movements, and corrections are compensating entries with a reason. Purchases come in at cost, sales take stock out, and counts, transfers and wastage all leave a row.",
      },
      {
        title: "Integer money and idempotency keys",
        detail:
          "All amounts are stored as integer cents. State-changing payment requests carry an Idempotency-Key that is claimed in the same transaction as the write, so a retried request returns the original result instead of creating a second payment.",
      },
      {
        title: "Outage reconciliation as a first-class flow",
        detail:
          "A paper receipt written while the system was down is entered once by someone holding the reconcile permission. One transaction claims the key, refuses a paper number already entered, writes the sale and the reconciliation record, and logs the audit event. A database check makes an outage sale impossible without its record.",
      },
      {
        title: "Modular monolith with server-side sessions",
        detail:
          "One Go service split into domain modules (orders, sales, inventory, purchasing, rooms, reports), with the API as the only database client. Server-side sessions, Argon2id password hashing, CSRF tokens and account lockout; the Next.js app proxies /api so there is no CORS surface.",
      },
    ],
    results: [
      "Running as a pilot: Go API on Render (Docker), Next.js on Vercel, PostgreSQL on Supabase",
      "Covers POS, kitchen tickets, shifts, receipt printing, voids and refunds, stock and purchasing, rooms, folios, housekeeping and reports with CSV export",
      "29 versioned SQL migrations and 14 architecture decision records",
      "Database tests run against real PostgreSQL in Docker rather than mocks",
    ],
    diagram: "hospitality-pos",
    links: [
      { label: "Backend repo", href: "https://github.com/MboyaDan/zuscar_backend" },
      { label: "Frontend repo", href: "https://github.com/MboyaDan/zuscar_frontend" },
    ],
    featured: true,
  },
  {
    slug: "dakota-training-college",
    name: "Dakota Training College",
    tagline: "College website, online admissions and staff portal",
    summary:
      "Public site, resumable online applications and a staff portal for a five-school college, built on a contract-first Go API with a tested, exactly-once submission path.",
    year: "2026",
    role: "Lead engineer · Go API, data model, security",
    context: "Client project · Makueni, Kenya",
    status: "In build",
    stack: ["Go", "Gin", "pgx", "sqlc", "PostgreSQL", "OpenAPI", "Next.js", "S3 / MinIO", "Playwright", "GitHub Actions", "Docker"],
    problem:
      "A training college with five schools wanted admissions online: a public site staff can update themselves, an application form applicants can leave and come back to on mobile data, and a staff portal to work through enquiries and applications, while handling ID documents and minors' details with care.",
    challenges: [
      "Applicants on mobile data drop connections mid-form and double-tap Submit",
      "Uploaded ID documents and photos are sensitive, and can carry malware or location metadata",
      "Staff edit live content, so drafts must not leak onto the public site or overwrite each other",
      "Under-18 applicants need a guardian step and recorded consent",
      "Frontend and backend have to stay in step as the API grows over roughly twenty build stages",
    ],
    solutions: [
      {
        title: "Autosaving, resumable applications",
        detail:
          "Each step of the form saves on its own. Applicants sign in with passwordless one-time links (single use, 30 minutes, only a hash stored) and can resume by reference without that ever signing anyone in directly.",
      },
      {
        title: "Exactly-once submission",
        detail:
          "Each submit attempt carries an Idempotency-Key, and the submission plus a frozen snapshot of the application are written in one transaction. Concurrency tests caught and fixed a deadlock in sign-in and a hang under simultaneous submits before release.",
      },
      {
        title: "Defensive document handling",
        detail:
          "Files are checked by content, not extension. Photos are re-encoded to strip metadata, scanning sits behind a scanner interface (ClamAV optional), and private files are only reachable through five-minute links bound to one account.",
      },
      {
        title: "Draft and publish with optimistic locking",
        detail:
          "Editing a published item saves a pending version. Every save carries a base version and a mismatch returns 409 instead of silently overwriting a colleague's work. Publishing checks the content is complete first.",
      },
      {
        title: "Contract-first API and hardened sessions",
        detail:
          "openapi.yaml is the contract and frontend types are generated from it. One JSON error shape with a request ID everywhere; sessions in HttpOnly __Host- cookies, HMAC-derived CSRF tokens, Argon2id hashing and lockout after repeated failures.",
      },
    ],
    results: [
      "Public site, staff content and enquiry screens, and the full application flow built and merged (stages 0 to 9 of 21)",
      "124 Playwright end-to-end tests with axe accessibility checks, plus Go integration tests against real PostgreSQL",
      "CI on every pull request: lint, types, unit tests, end-to-end tests against the real stack, and a gitleaks secret scan",
      "Seed data refuses to run against production and migrations are never applied to production automatically",
    ],
    diagram: "admissions-pipeline",
    links: [{ label: "Repository", href: "https://github.com/MboyaDan/dakota-college" }],
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
    status: "Learning project",
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

/** Previous and next case studies, wrapping around, for in-page navigation. */
export function getAdjacentProjects(slug: string): { prev: Project; next: Project } | undefined {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  const n = projects.length;
  return { prev: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] };
}
