"use client";
import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  website?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePayload(payload: ContactPayload) {
  if (payload.name.length < 2) return "Please enter your name.";
  if (!emailPattern.test(payload.email)) return "Please provide a valid email address.";
  if (payload.message.length < 20) return "Project details should be at least 20 characters.";
  return null;
}

function serialize(form: HTMLFormElement): ContactPayload {
  const formData = new FormData(form);
  const getValue = (field: string) => {
    const value = formData.get(field);
    return typeof value === "string" ? value.trim() : "";
  };
  return {
    name: getValue("name"),
    email: getValue("email"),
    company: getValue("company") || undefined,
    message: getValue("message"),
    website: getValue("website"),
  };
}

export default function ContactForm() {
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = serialize(form);
    const validationError = validatePayload(payload);
    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(body?.message ?? "We couldn't submit your message. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (error) {
      console.error("Contact form submission failed", error);
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4 md:max-w-xl" aria-live="polite">
      <div className="hidden" aria-hidden="true">
        <label className="mb-1 block text-sm text-[var(--text-muted)]" htmlFor="website">
          Website
        </label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-[var(--text-muted)]" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          maxLength={120}
          autoComplete="name"
          className="w-full rounded-xl border border-[var(--border-soft)] bg-[var(--panel)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-[var(--text-muted)]" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          className="w-full rounded-xl border border-[var(--border-soft)] bg-[var(--panel)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-[var(--text-muted)]" htmlFor="company">
          Company
        </label>
        <input
          id="company"
          name="company"
          maxLength={140}
          autoComplete="organization"
          className="w-full rounded-xl border border-[var(--border-soft)] bg-[var(--panel)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-[var(--text-muted)]" htmlFor="message">
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          minLength={20}
          maxLength={2000}
          className="w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--panel)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30"
        />
      </div>
      <button
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="btn-primary inline-flex items-center justify-center disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
      {status === "success" && (
        <p className="text-sm text-[var(--accent)]">Thanks! We&apos;ll be in touch within one business day.</p>
      )}
      {status === "error" && errorMessage && <p className="text-sm text-[var(--accent-strong)]">{errorMessage}</p>}
    </form>
  );
}
