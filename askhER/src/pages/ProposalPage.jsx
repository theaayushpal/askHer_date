import { useNavigate } from 'react-router-dom'
import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import PageShell from '../components/PageShell'
import PageTransition from '../components/PageTransition'
import PrimaryButton from '../components/PrimaryButton'

function getRandomPos(currentX, currentY, containerW, containerH, btnW, btnH) {
  const margin = 16
  const maxX = containerW - btnW - margin
  const maxY = containerH - btnH - margin
  let x, y, attempts = 0
  do {
    x = margin + Math.random() * (maxX - margin)
    y = margin + Math.random() * (maxY - margin)
    attempts++
  } while (attempts < 20 && Math.abs(x - currentX) < 80 && Math.abs(y - currentY) < 80)
  return { x, y }
}

function RunawayNoButton() {
  const containerRef = useRef(null)
  const btnRef       = useRef(null)
  const posRef       = useRef({ x: 0, y: 0 })
  const controls     = useAnimation()
  const [placed, setPlaced] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return
    const cw = containerRef.current.offsetWidth
    const ch = containerRef.current.offsetHeight
    const startX = cw / 2 - 40
    const startY = ch - 80
    posRef.current = { x: startX, y: startY }
    controls.set({ x: startX, y: startY })
    setPlaced(true)
  }, [controls])

  const flee = useCallback(() => {
    if (!containerRef.current || !btnRef.current) return
    const cw = containerRef.current.offsetWidth
    const ch = containerRef.current.offsetHeight
    const bw = btnRef.current.offsetWidth  || 80
    const bh = btnRef.current.offsetHeight || 36
    const { x, y } = getRandomPos(posRef.current.x, posRef.current.y, cw, ch, bw, bh)
    posRef.current = { x, y }
    controls.start({ x, y, transition: { type: 'spring', stiffness: 380, damping: 22, mass: 0.8 } })
  }, [controls])

  useEffect(() => {
    if (!placed) return
    const timerRef = { current: null }
    const scheduleNext = () => {
      timerRef.current = setTimeout(() => { flee(); scheduleNext() }, 2000 + Math.random() * 1500)
    }
    scheduleNext()
    return () => clearTimeout(timerRef.current)
  }, [placed, flee])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      <motion.div ref={btnRef} animate={controls} className="absolute pointer-events-none select-none" style={{ width: 'fit-content' }}>
        <span className="block px-5 py-2 rounded-full text-sm"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: 'var(--text-soft)',
            border: '1px solid var(--rose-blush)',
            background: 'var(--warm-white)',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}>
          no
        </span>
      </motion.div>
    </div>
  )
}

export default function ProposalPage() {
  const navigate = useNavigate()

  return (
    <PageShell>
      <PageTransition>
        <RunawayNoButton />

        <div className="relative flex flex-col items-center justify-between min-h-[100dvh] px-6 pt-12 pb-12" style={{ zIndex: 1 }}>

          {/* Image — simp_3.jpeg (chibi with rose) */}
          <motion.div
            className="flex-1 flex items-center justify-center my-4"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 180 }}
          >
            <img
              src="/images/simp_3.jpeg"
              alt="Cute character presenting a rose"
              className="w-[220px] h-[240px] object-cover rounded-card"
              style={{ border: '3px solid var(--rose-blush)', boxShadow: 'var(--shadow-rose)' }}
            />
          </motion.div>

          {/* Heading */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <h2 className="text-3xl leading-snug"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: 'var(--rose-deep)' }}>
              Will you go on a date with me
            </h2>
          </motion.div>

          {/* Yes button */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <PrimaryButton onClick={() => navigate('/ice-cream')}>
              Yes
            </PrimaryButton>
          </motion.div>

        </div>
      </PageTransition>
    </PageShell>
  )
}
