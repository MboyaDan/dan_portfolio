from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable, ListItem, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor

styles = getSampleStyleSheet()
ACCENT = HexColor("#0d9488")
MUTED = HexColor("#5b6270")
FG = HexColor("#11141a")

name_style = ParagraphStyle("Name", parent=styles["Title"], fontSize=22, textColor=FG, spaceAfter=2)
role_style = ParagraphStyle("Role", parent=styles["Normal"], fontSize=11, textColor=ACCENT, fontName="Courier", spaceAfter=6)
contact_style = ParagraphStyle("Contact", parent=styles["Normal"], fontSize=9, textColor=MUTED, fontName="Courier", spaceAfter=12)
summary_style = ParagraphStyle("Summary", parent=styles["Normal"], fontSize=10, textColor=FG, spaceAfter=14, leading=14)
h2_style = ParagraphStyle("H2", parent=styles["Heading2"], fontSize=12, textColor=FG, spaceBefore=12, spaceAfter=6)
job_title_style = ParagraphStyle("JobTitle", parent=styles["Normal"], fontSize=10, textColor=FG, fontName="Helvetica-Bold")
job_meta_style = ParagraphStyle("JobMeta", parent=styles["Normal"], fontSize=9, textColor=ACCENT, fontName="Courier", spaceAfter=2)
body_style = ParagraphStyle("Body", parent=styles["Normal"], fontSize=9.5, textColor=MUTED, leading=13, spaceAfter=4)
tag_style = ParagraphStyle("Tag", parent=styles["Normal"], fontSize=8, textColor=MUTED, fontName="Courier", spaceAfter=10)
skill_cat_style = ParagraphStyle("SkillCat", parent=styles["Normal"], fontSize=10, textColor=FG, fontName="Helvetica-Bold", spaceAfter=2)
skill_item_style = ParagraphStyle("SkillItem", parent=styles["Normal"], fontSize=9, textColor=MUTED, leading=13)

doc = SimpleDocTemplate(
    "/home/claude/portfolio/public/resume.pdf",
    pagesize=letter,
    topMargin=0.75 * inch,
    bottomMargin=0.75 * inch,
    leftMargin=0.85 * inch,
    rightMargin=0.85 * inch,
)

story = []

story.append(Paragraph("Danroylex Mboya", name_style))
story.append(Paragraph("Backend Engineer", role_style))
story.append(Paragraph(
    "Nairobi, Kenya (GMT+3) &nbsp;&middot;&nbsp; onyangoroylex@gmail.com &nbsp;&middot;&nbsp; "
    "github.com/danroylex &nbsp;&middot;&nbsp; linkedin.com/in/danroylex",
    contact_style,
))
story.append(HRFlowable(width="100%", thickness=0.75, color=HexColor("#dde1e8"), spaceAfter=10))

story.append(Paragraph(
    "Backend engineer with 5+ years shipping production systems that handle real financial "
    "transactions and serve real users at scale. Deep expertise in Go (Gin), Python (FastAPI), "
    "PostgreSQL, Redis, and multi-tenant platform architecture, with hands-on M-Pesa Daraja "
    "payment integration experience. Open to remote contract roles across the EU, UK, and beyond.",
    summary_style,
))

story.append(Paragraph("Experience", h2_style))
story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor("#dde1e8"), spaceAfter=8))

experience = [
    {
        "title": "Founder & Backend Engineer",
        "org": "ELS Software Solutions (EasyLiving Software)",
        "period": "2025 — Present",
        "summary": "Designing and building production backend systems for SMEs and enterprises "
                    "across East Africa — multi-tenant platforms, payment infrastructure, and "
                    "operational tooling.",
        "tags": "Go · Python · PostgreSQL · Redis · AWS · GCP",
    },
    {
        "title": "Backend Engineer (Contract & Independent)",
        "org": "Remote — fintech, e-commerce, logistics clients",
        "period": "2023 — 2025",
        "summary": "Shipped payment integrations, multi-tenant SaaS backends, and data pipelines "
                    "for clients operating across East Africa and remote international teams.",
        "tags": "FastAPI · M-Pesa Daraja · Docker · CI/CD",
    },
    {
        "title": "Backend & Distributed Systems Engineer",
        "org": "Async-first remote teams",
        "period": "2018 — 2023",
        "summary": "Built and operated backend systems for SaaS and e-commerce products in "
                    "distributed, async-first engineering teams, with a focus on data correctness "
                    "and API reliability.",
        "tags": "Go · Python · PostgreSQL · Distributed Systems",
    },
]

for job in experience:
    story.append(Paragraph(f"{job['title']} &nbsp;&mdash;&nbsp; {job['period']}", job_title_style))
    story.append(Paragraph(job["org"], job_meta_style))
    story.append(Paragraph(job["summary"], body_style))
    story.append(Paragraph(job["tags"], tag_style))

story.append(Paragraph("Selected Projects", h2_style))
story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor("#dde1e8"), spaceAfter=8))

projects = [
    ("Mezani", "Multi-tenant restaurant OS — Go/Gin, PostgreSQL schema-per-tenant isolation, "
               "Redis Pub/Sub-backed kitchen display under 200ms, Claude API analytics assistant. AWS."),
    ("StylerStack", "Fashion e-commerce API — FastAPI, idempotent M-Pesa Daraja payments with "
                    "signature-verified webhook upserts, Redis cache-aside cutting catalog "
                    "latency ~40%, CI/CD on Railway."),
    ("Restaurant Analytics Platform", "Cloud-native analytics on GCP — event-driven Pub/Sub "
                    "ingestion, partitioned BigQuery tables, OpenAI-powered plain-language "
                    "insights, CI/CD to Cloud Run."),
    ("Mgari", "Car rental booking engine — FastAPI, SELECT FOR UPDATE row locking for zero "
              "double-bookings, Google Maps geo-fenced availability, Redis sliding-window rate limiting."),
]

for title, desc in projects:
    story.append(Paragraph(title, job_title_style))
    story.append(Paragraph(desc, body_style))
    story.append(Spacer(1, 4))

story.append(Paragraph("Technical Expertise", h2_style))
story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor("#dde1e8"), spaceAfter=8))

skills = [
    ("Backend Engineering", "Go (Gin), Python (FastAPI), REST API design, WebSockets, JWT/OAuth2"),
    ("Databases", "PostgreSQL (EXPLAIN ANALYZE, composite indexes, Alembic), Redis (cache-aside, "
                   "Pub/Sub, rate limiting), BigQuery, SQLite"),
    ("Cloud Infrastructure", "AWS (EC2, RDS, ElastiCache, S3, Lambda, API Gateway), GCP (Cloud Run, "
                              "Cloud SQL, Pub/Sub, BigQuery, GCS, IAM), Docker, Nginx, GitHub Actions"),
    ("Distributed Systems", "Event-driven architecture, Pub/Sub patterns, tenant isolation, "
                             "idempotency, SELECT FOR UPDATE"),
    ("AI / LLM Systems", "Anthropic Claude API, OpenAI API, LLM-augmented analytics services"),
    ("Data Engineering", "Apache Airflow, Apache Spark, ETL pipeline design, BigQuery warehousing"),
]

for cat, items in skills:
    story.append(Paragraph(cat, skill_cat_style))
    story.append(Paragraph(items, skill_item_style))
    story.append(Spacer(1, 4))

doc.build(story)
print("done")
