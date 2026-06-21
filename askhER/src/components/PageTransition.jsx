import { motion } from 'framer-motion'

const variants = {
  initial:  { opacity: 0, y: 24 },
  animate:  { opacity: 1, y: 0,  transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:     { opacity: 0, y: -16, transition: { duration: 0.25, ease: 'easeIn' } },
}

/**
 * PageTransition
 * ──────────────
 * Wrap any page's top-level JSX with this for slide-fade enter/exit.
 * Must be a direct child of AnimatePresence (handled in App.jsx).
 */
export default function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`w-full flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  )
}
