/**
 * GhostButton
 * ───────────
 * Outlined secondary button — used for "Start over", etc.
 */
export default function GhostButton({ onClick, children, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full rounded-full py-3 px-8
        font-dm text-sm font-medium tracking-wide
        text-text-mid border border-rose-blush
        bg-transparent hover:bg-rose-mist
        transition-all duration-200
        active:scale-95 select-none touch-manipulation cursor-pointer
        ${className}
      `}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {children}
    </button>
  )
}
