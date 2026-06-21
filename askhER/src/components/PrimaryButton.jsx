/**
 * PrimaryButton
 * ─────────────
 * The main rose CTA button.
 * Props:
 *   onClick   — handler
 *   disabled  — bool (optional)
 *   children  — label content
 *   className — extra tailwind classes (optional)
 */
export default function PrimaryButton({ onClick, disabled = false, children, className = '' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full rounded-full py-4 px-8
        font-dm text-base font-semibold tracking-wide
        text-warm-white
        transition-all duration-200
        select-none touch-manipulation
        ${disabled
          ? 'bg-rose-blush text-text-soft cursor-not-allowed opacity-60'
          : 'bg-rose-deep hover:brightness-105 active:scale-95 shadow-rose cursor-pointer'
        }
        ${className}
      `}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {children}
    </button>
  )
}
