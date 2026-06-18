export const site = {
  name: "Danroylex Mboya",
  role: "Backend Engineer",
  location: "Nairobi, Kenya",
  timezone: "GMT+3",
  email: "onyangoroylex@gmail.com",
  github: "https://github.com/MboyaDan",
  linkedin: "https://linkedin.com/in/danroylex",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://danroylex-portfolio.vercel.app",
  // Flip to false to show "not currently available" across the site.
  availableForWork: true,
  currentFocus: "Building Mezani — Multi-tenant Restaurant OS",
  summary:
    "Backend engineer with 5+ years shipping production systems that handle real financial transactions and serve real users at scale.",
  description:
    "Backend engineer in Nairobi specializing in Go, Python, payment infrastructure, and multi-tenant platform architecture. Open to remote roles across the EU, UK, and beyond.",
} as const;

export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/architecture", label: "Architecture" },
  { href: "/writing", label: "Writing" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;
