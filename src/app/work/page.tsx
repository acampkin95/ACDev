import Link from "next/link";
import { hasPage, getPage } from "@/lib/pages";
import SafeMDX from "@/components/SafeMDX";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getSiteContent, getIconComponent } from "@/lib/site";

export const metadata = {
  title: "Work",
  description: "Selected case studies and results from ACDev projects.",
};

export default function WorkPage() {
  if (hasPage("work")) {
    const page = getPage("work");
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

  const { featuredProjects, testimonials, processSteps } = getSiteContent();

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading
        eyebrow="Case studies"
        title="Selected outcomes from recent partnerships."
        description="Across support, ops, analytics, and product teams, ACDev ships measurable impact. More references on request."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.05} className="card flex flex-col justify-between p-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]">{project.stack.join(" · ")}</p>
              <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">{project.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{project.summary}</p>
            </div>
            <p className="mt-4 text-sm font-medium text-[var(--text-primary)]">{project.result}</p>
          </Reveal>
        ))}
      </div>

      <section className="mt-20 grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.author} delay={index * 0.05} className="card p-6">
            <p className="text-lg text-[var(--text-primary)]">“{testimonial.quote}”</p>
            <p className="mt-4 text-sm font-semibold text-[var(--text-primary)]">{testimonial.author}</p>
            <p className="text-sm text-[var(--text-muted)]">{testimonial.role}</p>
          </Reveal>
        ))}
      </section>

      <section className="mt-20 space-y-10 rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel)] p-8">
        <SectionHeading
          eyebrow="How we work"
          title="A transparent rhythm keeps teams aligned."
          description="Regular demos, shared rituals, and enablement leave your teams ready to run with the work."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {processSteps.map((step, index) => {
            const Icon = getIconComponent(step.icon);
            return (
              <Reveal key={step.title} delay={index * 0.05} className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">{step.duration}</p>
                <div className="mt-2 flex items-center gap-2 text-[var(--text-primary)]">
                  <Icon className="h-5 w-5 text-[var(--accent)]" />
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                </div>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{step.description}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <div className="mt-24 flex flex-wrap items-center gap-4 rounded-2xl border border-[var(--border-soft)] bg-[var(--panel)] px-6 py-8">
        <div className="flex-1">
          <p className="text-sm uppercase tracking-[0.4em] text-[var(--text-muted)]">Let’s collaborate</p>
          <h3 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">Book a walkthrough of relevant work.</h3>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Share a few goals and we’ll curate case studies plus an approach for your team.
          </p>
        </div>
        <Link
          href="/contact"
          className="rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)] px-5 py-3 font-semibold text-white shadow-lg shadow-[var(--glow)]"
        >
          Book a discovery call
        </Link>
      </div>
    </div>
  );
}
