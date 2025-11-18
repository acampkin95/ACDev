type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({ eyebrow, title, description, align = "left" }: Props) {
  const alignment = align === "center" ? "text-center" : "text-left";
  return (
    <div className={`space-y-3 ${alignment}`}>
      <p className="eyebrow text-xs">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
        {title}
      </h2>
      {description && <p className="max-w-3xl text-base text-[var(--text-muted)]">{description}</p>}
    </div>
  );
}

