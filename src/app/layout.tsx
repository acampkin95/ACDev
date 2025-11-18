import type { Metadata } from "next";
import Link from "next/link";
import { Inter, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MobileNav from "@/components/MobileNav";
import Analytics from "@/components/Analytics";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["700", "800"] });
const plex = IBM_Plex_Sans({ variable: "--font-plex", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "600", "700"] });

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
const themeScript = `
  try {
    const stored = localStorage.getItem('ac-theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const theme = stored || (prefersLight ? 'light' : 'dark');
    document.documentElement.dataset.theme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = 'dark';
  }
`;

export const metadata: Metadata = {
  title: {
    default: "ACDev — AI Solutions & Consultancy",
    template: "%s | ACDev",
  },
  description:
    "Modern AI solutions: custom software, websites, MCP, AI workflows, and IT consultancy. Based in Perth, WA.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "ACDev — AI Solutions & Consultancy",
    description:
      "Modern AI solutions: custom software, websites, MCP, AI workflows, and IT consultancy.",
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "ACDev",
    images: [`${siteUrl}/og`],
  },
  twitter: {
    card: "summary_large_image",
    title: "ACDev — AI Solutions & Consultancy",
    description:
      "Modern AI solutions: custom software, websites, MCP, AI workflows, and IT consultancy.",
    images: [`${siteUrl}/og`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${plex.variable} ${jetbrains.variable} bg-[var(--background)] text-[var(--text-primary)] antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ACDev",
              url: siteUrl,
              description:
                "Modern AI solutions: custom software, websites, MCP, AI workflows, and IT consultancy. Based in Perth, WA.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Perth",
                addressRegion: "WA",
                addressCountry: "AU",
              },
              foundingDate: "2025",
            }),
          }}
        />
        <header className="sticky top-0 z-40 border-b border-[var(--border-soft)]/60 bg-[var(--surface)]/80 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="eyebrow">AC</span>
              <span className="text-lg text-[var(--text-primary)]">Dev</span>
              <span className="tag hidden md:inline-flex">
                <span className="dot" />
                Since 2025
              </span>
            </Link>
            <nav className="hidden gap-4 text-sm font-medium md:flex">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  className="nav-link"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/contact"
                className="btn-primary hidden text-sm md:inline-flex"
              >
                Start a Project
              </Link>
              <MobileNav />
            </div>
          </div>
        </header>
        <main>{children}</main>
        <Analytics />
        <footer className="border-t border-[var(--border-soft)] bg-[var(--surface)]/70 py-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3 text-sm text-[var(--text-muted)]">
              <p className="text-lg text-[var(--text-primary)]">ACDev</p>
              <p>AI solutions & consultancy. Perth · Remote friendly.</p>
              <p>© {new Date().getFullYear()} ACDev. All rights reserved.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm text-[var(--text-muted)] md:grid-cols-3">
              <div>
                <p className="eyebrow mb-3">Work</p>
                <div className="flex flex-col gap-2">
                  <Link href="/services" className="hover:text-[var(--text-primary)]">Services</Link>
                  <Link href="/solutions" className="hover:text-[var(--text-primary)]">Solutions</Link>
                  <Link href="/work" className="hover:text-[var(--text-primary)]">Case studies</Link>
                </div>
              </div>
              <div>
                <p className="eyebrow mb-3">Resources</p>
                <div className="flex flex-col gap-2">
                  <Link href="/blog" className="hover:text-[var(--text-primary)]">Blog</Link>
                  <Link href="/contact" className="hover:text-[var(--text-primary)]">Contact</Link>
                  <a href="/admin" className="hover:text-[var(--text-primary)]">CMS</a>
                </div>
              </div>
              <div>
                <p className="eyebrow mb-3">Connect</p>
                <div className="flex flex-col gap-2">
                  <a href="mailto:hello@acdev.studio" className="hover:text-[var(--text-primary)]">hello@acdev.studio</a>
                  <p className="text-[var(--text-muted)]">+61 8 1234 5678</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}


