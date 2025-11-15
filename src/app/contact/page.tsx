import ContactForm from "./ContactForm";
import { hasPage, getPage } from "@/lib/pages";
import SafeMDX from "@/components/SafeMDX";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getSiteContent } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description: "Get in touch to scope your AI project with ACDev.",
};

export default function ContactPage() {
  if (hasPage("contact")) {
    const page = getPage("contact");
    return (
      <div className="mx-auto max-w-6xl px-4 py-20">
        {page?.title && (
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">{page.title}</h1>
        )}
        {page?.description && <p className="mt-4 max-w-3xl text-lg text-[var(--text-muted)]">{page.description}</p>}
        <article className="prose prose-invert mt-8 max-w-none text-[var(--text-primary)]">
          <SafeMDX source={page?.content || ""} />
        </article>
        <div className="mt-10 rounded-3xl border border-[var(--border-soft)] bg-[var(--panel)] p-8">
          <ContactForm />
        </div>
      </div>
    );
  }

  const { contactDetails } = getSiteContent();

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading
        eyebrow="Get in touch"
        title="Let’s scope your roadmap."
        description="Share context about your systems, teams, and goals. We’ll follow up with timing, pricing, and suggested next steps."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <Reveal className="space-y-6">
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">What to expect</h3>
            <p className="mt-3 text-sm text-[var(--text-muted)]">
              We run 45-minute discovery calls to understand goals, current systems, and success criteria. Within a
              week you’ll receive a tailored proposal with options.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--text-muted)]">
              {contactDetails.map((detail) => (
                <li key={detail.label} className="flex items-center justify-between rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-2">
                  <span>{detail.label}</span>
                  <span className="font-medium text-[var(--text-primary)]">{detail.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-[var(--border-soft)] bg-[var(--panel)] p-6">
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">Prefer email?</h4>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Send context to <a className="underline" href="mailto:hello@acdev.studio">hello@acdev.studio</a>
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.4em] text-[var(--text-muted)]">Office</p>
            <p className="text-sm text-[var(--text-muted)]">Perth, Western Australia · Remote friendly</p>
          </div>
        </Reveal>
        <div className="card p-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
