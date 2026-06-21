/**
 * SectionLabel
 * ────────────
 * Small uppercase eyebrow label — used above headings.
 */
export default function SectionLabel({ children, className = '' }) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-widest text-text-soft ${className}`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {children}
    </p>
  )
}
