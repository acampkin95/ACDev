import { Code, Globe, Workflow, BrainCircuit, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { hasPage, getPage } from "@/lib/pages";
import SafeMDX from "@/components/SafeMDX";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { processSteps, solutionThemes } from "@/lib/site";

export const metadata = {
  title: "Services",
  description:
    "Custom software, websites, MCP integrations, AI workflows, and consultancy for modern businesses.",
};

const serviceStacks = [
  {
    title: "Product & platform builds",
    icon: Code,
    description: "Launch net-new experiences, portals, and internal tooling across web and mobile.",
    bullets: ["MVPs & betas", "Design systems & shared components", "Cloud-native + observability"],
  },
  {
    title: "Web & content experiences",
    icon: Globe,
    description: "SEO-friendly marketing sites with CMS workflows and measurement out of the box.",
    bullets: ["Next.js + MDX + CMS", "Performance & analytics", "Personalisation hooks"],
  },
  {
    title: "Workflow & automation",
    icon: Workflow,
    description: "Agentic orchestration linking SaaS tools, data sources, and humans.",
    bullets: ["Approvals & SLAs", "Monitoring & fallbacks", "Data governance"],
  },
  {
    title: "MCP solutions",
    icon: BrainCircuit,
    description: "Operationalise Model Context Protocol providers, tools, and knowledge retrieval.",
    bullets: ["Pipelines & sync", "Policy + RBAC", "Telemetry & evaluation"],
  },
  {
    title: "Enablement & training",
    icon: Sparkles,
    description: "Change programs to help teams adopt AI workflows with confidence.",
    bullets: ["Capability assessments", "Playbooks", "Office hours & coaching"],
  },
];

const playbooks = [
  "Discovery & research sprints with your stakeholders",
  "Architecture + experience blueprints ready for internal teams",
  "Co-building with engineers, designers, and SMEs",
  "Operational readiness runbooks, observability, and training",
];

export default function ServicesPage() {
  if (hasPage("services")) {
    const page = getPage("services");
    return (
      <div className="mx-auto max-w-4xl px-4 py-20">
        {page?.title && (
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">{page.title}</h1>
        )}
        {page?.description && <p className="mt-4 text-lg text-[var(--text-muted)]">{page.description}</p>}
        <article className="prose prose-invert mt-8 max-w-none text-[var(--text-primary)]">
          <SafeMDX source={page?.content || ""} />
        </article>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading
        eyebrow="Services"
        title="Product, workflow, and enablement services tuned for AI-forward teams."
        description="Bring ambiguous goals and we’ll partner with your team to define journeys, architecture, and change programs while co-building production-grade systems."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {serviceStacks.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.05} className="card h-full p-6">
            <div className="flex items-center gap-3">
              <service.icon className="h-5 w-5 text-[var(--accent)]" />
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">{service.title}</h3>
            </div>
            <p className="mt-3 text-sm text-[var(--text-muted)]">{service.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--text-muted)]">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  {bullet}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <section className="mt-20 space-y-10 rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel)] p-8">
        <SectionHeading
          eyebrow="Playbooks"
          title="A delivery approach that feels like an embedded team."
          description="Every engagement is run with transparent communication, shared rituals, and reusable artefacts that stay with your organisation."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {playbooks.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4">
              <span className="relative mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border-soft)] text-xs text-[var(--text-muted)]">
                <ArrowRight className="h-3 w-3" />
              </span>
              <p className="text-sm text-[var(--text-muted)]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 space-y-10">
        <SectionHeading
          eyebrow="Solution accelerators"
          title="Productised offerings we can start from day one."
          description="Choose a modular accelerator and we’ll tailor it to your workflows, tools, and success metrics."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {solutionThemes.map((solution, index) => (
            <Reveal key={solution.name} delay={index * 0.05} className="card p-6">
              <div className="flex items-center gap-3">
                <solution.icon className="h-5 w-5 text-[var(--accent)]" />
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">{solution.name}</h3>
              </div>
              <p className="mt-3 text-sm text-[var(--text-muted)]">{solution.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--text-muted)]">
                {solution.bullets.map((bullet) => (
                  <li key={bullet} className="rounded-full border border-[var(--border-soft)] px-3 py-1">
                    {bullet}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-20 space-y-10">
        <SectionHeading
          eyebrow="Engagement rhythm"
          title="From discovery to launch in 6–8 weeks."
          description="Focused, time-boxed phases keep decision cycles fast while leaving you with artefacts to maintain internally."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.05} className="card p-6">
              <div className="flex items-center gap-3">
                <step.icon className="h-5 w-5 text-[var(--accent)]" />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">{step.duration}</p>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-[var(--text-primary)]">{step.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mt-24 flex flex-wrap items-center gap-4 rounded-2xl border border-[var(--border-soft)] bg-[var(--panel)] px-6 py-8">
        <div className="flex-1">
          <p className="text-sm uppercase tracking-[0.4em] text-[var(--text-muted)]">Let&apos;s talk</p>
          <h3 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">Which services unlock your roadmap?</h3>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Share context and we’ll propose a custom mix of build + enablement workstreams.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)] px-5 py-3 text-center font-semibold text-white shadow-lg shadow-[var(--glow)]"
          >
            Book a discovery call
          </Link>
          <Link
            href="/solutions"
            className="rounded-full border border-[var(--border-soft)] px-5 py-3 text-center font-semibold text-[var(--text-primary)]"
          >
            Explore solutions
          </Link>
        </div>
      </div>
    </div>
  );
}
