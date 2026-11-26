export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
      <h2 className="text-3xl font-bold uppercase sm:text-4xl">{title}</h2>
      {children && <p className="mt-3 text-muted-foreground sm:text-lg">{children}</p>}
    </div>
  );
}
