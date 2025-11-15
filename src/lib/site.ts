import fs from "fs";
import path from "path";
import {
  BrainCircuit,
  Workflow,
  Bot,
  Cable,
  Sparkles,
  Shield,
  ShieldCheck,
  Timer,
  CircuitBoard,
  LineChart,
  Code,
  Globe,
} from "lucide-react";

const SETTINGS_PATH = path.join(process.cwd(), "content", "settings", "site.json");

export const iconLibrary = {
  brain: BrainCircuit,
  workflow: Workflow,
  bot: Bot,
  cable: Cable,
  sparkles: Sparkles,
  shield: Shield,
  shieldCheck: ShieldCheck,
  timer: Timer,
  circuit: CircuitBoard,
  chart: LineChart,
  code: Code,
  globe: Globe,
} as const;

export type IconName = keyof typeof iconLibrary;

type Highlight = { label: string; value: string };
type Metric = { value: string; label: string };
type Bulleted = { title: string; icon: IconName; description: string; bullets: string[] };
type SolutionTheme = { name: string; icon: IconName; summary: string; bullets: string[] };
type Project = { title: string; summary: string; stack: string[]; result: string };
type ProcessStep = { title: string; duration: string; icon: IconName; description: string };
type Testimonial = { quote: string; author: string; role: string };
type ContactDetail = { label: string; value: string };

export type SiteContent = {
  heroHighlights: Highlight[];
  heroMetrics: Metric[];
  serviceStacks: Bulleted[];
  solutionThemes: SolutionTheme[];
  featuredProjects: Project[];
  processSteps: ProcessStep[];
  testimonials: Testimonial[];
  guardrails: string[];
  playbooks: string[];
  contactDetails: ContactDetail[];
};

const fallbackContent: SiteContent = {
  heroHighlights: [
    { label: "Practice areas", value: "AI systems · Agentic workflows · Automation" },
    { label: "Engagements", value: "Product, platform & enablement roadmaps" },
    { label: "Remote friendly", value: "Perth, Western Australia · Working globally" },
  ],
  heroMetrics: [
    { value: "6–8 weeks", label: "Average rollout from discovery to launch" },
    { value: "40%+", label: "Ticket deflection after MCP knowledge providers" },
    { value: "3x faster", label: "Decision cycles with observability + automation" },
  ],
  serviceStacks: [
    {
      title: "Product & platform builds",
      icon: "code",
      description: "Launch net-new experiences, portals, and internal tooling across web and mobile.",
      bullets: ["MVPs & betas", "Design systems & shared components", "Cloud-native + observability"],
    },
    {
      title: "Web & content experiences",
      icon: "globe",
      description: "SEO-friendly marketing sites with CMS workflows and measurement out of the box.",
      bullets: ["Next.js + MDX + CMS", "Performance & analytics", "Personalisation hooks"],
    },
    {
      title: "Workflow & automation",
      icon: "workflow",
      description: "Agentic orchestration linking SaaS tools, data sources, and humans.",
      bullets: ["Approvals & SLAs", "Monitoring & fallbacks", "Data governance"],
    },
    {
      title: "MCP solutions",
      icon: "brain",
      description: "Operationalise Model Context Protocol providers, tools, and knowledge retrieval.",
      bullets: ["Pipelines & sync", "Policy + RBAC", "Telemetry & evaluation"],
    },
    {
      title: "Enablement & training",
      icon: "sparkles",
      description: "Change programs to help teams adopt AI workflows with confidence.",
      bullets: ["Capability assessments", "Playbooks", "Office hours & coaching"],
    },
  ],
  solutionThemes: [
    {
      name: "Knowledge MCP Providers",
      icon: "brain",
      summary: "Ground assistants and copilots in your own data with governance baked in.",
      bullets: ["Vector pipelines", "Access controls", "Living documentation"],
    },
    {
      name: "Workflow Automation",
      icon: "workflow",
      summary: "Agentic workflows orchestrating approvals, escalations and notifications.",
      bullets: ["Human-in-loop", "Observability", "Audit ready"],
    },
    {
      name: "Customer Assistants",
      icon: "bot",
      summary: "On-brand assistants spanning chat, voice, and in-product embeds.",
      bullets: ["Escalations", "Analytics", "Omni-channel"],
    },
    {
      name: "Systems Integration",
      icon: "cable",
      summary: "Connect CRMs, ERPs, billing, and data warehouses for insight loops.",
      bullets: ["Connectors", "Webhooks", "ETL pipelines"],
    },
    {
      name: "Enablement & Training",
      icon: "sparkles",
      summary: "Bring teams along with playbooks, co-building and office hours.",
      bullets: ["Workshops", "Playbooks", "Office hours"],
    },
    {
      name: "Safety & Governance",
      icon: "shield",
      summary: "Risk reviews, policy, and monitoring to keep leadership confident.",
      bullets: ["Policy kits", "Monitoring", "Red-teaming"],
    },
  ],
  featuredProjects: [
    {
      title: "Support knowledge MCP",
      summary: "Centralised technical knowledge, policies, and runbooks for support teams.",
      stack: ["MCP", "RAG", "Azure"],
      result: "40% ticket deflection, avg response down to 45 seconds.",
    },
    {
      title: "Agentic ops automations",
      summary: "Ops team co-pilot for triaging alerts, gathering context, and proposing fixes.",
      stack: ["Workflows", "Approvals", "Observability"],
      result: "60% reduction in manual triage and escalations.",
    },
    {
      title: "Insights assistant",
      summary: "Natural language layer over analytics warehouse with scheduled digests.",
      stack: ["LLM", "Warehouses", "Connectors"],
      result: "Exec dashboards in minutes, adoption across 5 teams.",
    },
  ],
  processSteps: [
    {
      title: "Discovery & roadmapping",
      duration: "Week 1–2",
      icon: "timer",
      description: "Immersive workshops mapping systems, goals, risks, and success metrics with your teams.",
    },
    {
      title: "Pilot build",
      duration: "Week 3–6",
      icon: "circuit",
      description: "Rapid build cycles with weekly showcases, pairing with internal engineers and SMEs.",
    },
    {
      title: "Launch & enablement",
      duration: "Week 7–8",
      icon: "chart",
      description: "Rollout support, measurement, training, and operational readiness playbooks.",
    },
  ],
  testimonials: [
    {
      quote:
        "ACDev took ambiguous goals and turned them into a shipped MCP provider our support org uses every day. Thoughtful patterns, great collaboration.",
      author: "Elise Navarro",
      role: "Director of Support, SaaS scale-up",
    },
    {
      quote:
        "The automation playbooks accelerated our ops transformation. The team pairs deeply with internal engineers and leaves us with maintainable systems.",
      author: "Noah Reyes",
      role: "COO, Enterprise services",
    },
  ],
  guardrails: [
    "Design reviews with product, legal, and security partners.",
    "Observability across latency, cost, and safety events.",
    "Evaluation harnesses to benchmark quality vs. spend.",
    "Runbooks for fallback, escalation, and support.",
  ],
  playbooks: [
    "Discovery & research sprints with your stakeholders",
    "Architecture + experience blueprints ready for internal teams",
    "Co-building with engineers, designers, and SMEs",
    "Operational readiness runbooks, observability, and training",
  ],
  contactDetails: [
    { label: "Reply time", value: "under 1 business day" },
    { label: "Availability", value: "APAC · AMER friendly" },
    { label: "Email", value: "hello@acdev.studio" },
  ],
};

let cachedContent: SiteContent | null = null;

function loadSiteContent(): SiteContent {
  if (cachedContent) return cachedContent;
  if (fs.existsSync(SETTINGS_PATH)) {
    try {
      const raw = fs.readFileSync(SETTINGS_PATH, "utf8");
      const parsed = JSON.parse(raw) as Partial<SiteContent>;
      cachedContent = {
        ...fallbackContent,
        ...parsed,
      };
      return cachedContent;
    } catch (error) {
      console.error("Failed to parse site settings, falling back to defaults", error);
    }
  }
  cachedContent = fallbackContent;
  return cachedContent;
}

export function getSiteContent(): SiteContent {
  return loadSiteContent();
}

export function getIconComponent(name: IconName) {
  return iconLibrary[name] ?? Sparkles;
}
