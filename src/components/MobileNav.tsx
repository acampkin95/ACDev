"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="grid h-10 w-10 place-content-center rounded-full border border-[var(--border-soft)] bg-[var(--panel)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-[68px] z-50 border-b border-[var(--border-soft)] bg-[var(--surface)]/95 pb-6 pt-4 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-4">
            <nav className="grid gap-2 text-sm">
              <Link onClick={() => setOpen(false)} className="rounded-full border border-transparent px-3 py-2 text-[var(--text-muted)] hover:border-[var(--border-soft)] hover:text-[var(--text-primary)]" href="/services">Services</Link>
              <Link onClick={() => setOpen(false)} className="rounded-full border border-transparent px-3 py-2 text-[var(--text-muted)] hover:border-[var(--border-soft)] hover:text-[var(--text-primary)]" href="/solutions">Solutions</Link>
              <Link onClick={() => setOpen(false)} className="rounded-full border border-transparent px-3 py-2 text-[var(--text-muted)] hover:border-[var(--border-soft)] hover:text-[var(--text-primary)]" href="/blog">Blog</Link>
              <Link onClick={() => setOpen(false)} className="rounded-full border border-transparent px-3 py-2 text-[var(--text-muted)] hover:border-[var(--border-soft)] hover:text-[var(--text-primary)]" href="/contact">Contact</Link>
              <Link onClick={() => setOpen(false)} href="/contact" className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)] px-4 py-2 font-semibold text-white shadow-lg shadow-[var(--glow)]">Start a Project</Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
