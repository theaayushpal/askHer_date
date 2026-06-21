/**
 * PageShell
 * ─────────
 * The outer wrapper for every page.
 * - Constrains width to 430px (iPhone 14 Pro max)
 * - Centers on desktop (shows rose-mist gutter)
 * - Full dvh height, flex-col layout
 * - Warm white background on the card itself
 */
export default function PageShell({ children, className = '' }) {
  return (
    <div
      className={`
        relative w-full max-w-[430px] min-h-[100dvh]
        mx-auto flex flex-col
        bg-warm-white overflow-x-hidden
        ${className}
      `}
    >
      {children}
    </div>
  )
}
