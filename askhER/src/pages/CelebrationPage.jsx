import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppState } from '../hooks/useAppState'
import PageShell from '../components/PageShell'
import PageTransition from '../components/PageTransition'
import PrimaryButton from '../components/PrimaryButton'
import GhostButton from '../components/GhostButton'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
}

function formatTime(hhmm) {
  if (!hhmm) return ''
  const [h, m] = hhmm.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`
}

// ─── Floating Heart ───────────────────────────────────────────────────────────

const HEARTS = ['💕', '💖', '💗', '💓', '♡', '💝', '🌸', '💕']

function FloatingHeart({ emoji, startX, delay, duration, size }) {
  return (
    <motion.span
      className="absolute select-none pointer-events-none"
      style={{ left: `${startX}%`, bottom: '-40px', fontSize: `${size}px` }}
      initial={{ y: 0, opacity: 0, scale: 0.6 }}
      animate={{
        y: [0, -180, -360, -520],
        opacity: [0, 0.85, 0.85, 0],
        scale: [0.6, 1, 0.9, 0.7],
        x: [0, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 40],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 1,
        ease: 'easeOut',
      }}
    >
      {emoji}
    </motion.span>
  )
}

// ─── Confetti Particle ────────────────────────────────────────────────────────

const CONFETTI_COLORS = ['#E8A0B0', '#F5C6D0', '#D4607A', '#FDE8ED', '#fff', '#FFB3C6']

function ConfettiParticle({ x, delay, color, shape }) {
  const rotation = Math.random() * 360
  const drift = (Math.random() - 0.5) * 120
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: '-12px',
        width: shape === 'rect' ? '8px' : '10px',
        height: shape === 'rect' ? '14px' : '10px',
        borderRadius: shape === 'circle' ? '50%' : shape === 'rect' ? '2px' : '50% 0 50% 0',
        backgroundColor: color,
      }}
      initial={{ y: 0, opacity: 1, rotate: rotation, scale: 1 }}
      animate={{
        y: ['0vh', '110vh'],
        x: [0, drift],
        rotate: [rotation, rotation + (Math.random() > 0.5 ? 540 : -540)],
        opacity: [1, 1, 0.8, 0],
        scale: [1, 0.85],
      }}
      transition={{
        duration: Math.random() * 2 + 3,
        delay,
        ease: 'linear',
        repeat: Infinity,
        repeatDelay: Math.random() * 4 + 3,
      }}
    />
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CelebrationPage() {
  const navigate = useNavigate()
  const { state, resetState } = useAppState()

  const handleRestart = () => {
    resetState()
    navigate('/')
  }

  const handleScreenshot = () => {
    alert('Take a screenshot! 📸\n\nSave this moment and share it on your story 🌸')
  }

  // Pre-generate stable confetti + heart configs
  const confettiPieces = useRef(
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: (i / 28) * 4,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      shape: ['circle', 'rect', 'diamond'][i % 3],
    }))
  ).current

  const heartPieces = useRef(
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      emoji: HEARTS[i % HEARTS.length],
      startX: 8 + (i * 12) % 84,
      delay: i * 0.7,
      duration: 4 + (i % 3),
      size: 14 + (i % 3) * 4,
    }))
  ).current

  return (
    <PageShell>
      <PageTransition>

        {/* ── Confetti Layer ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
          {confettiPieces.map((p) => (
            <ConfettiParticle key={p.id} x={p.x} delay={p.delay} color={p.color} shape={p.shape} />
          ))}
        </div>

        {/* ── Floating Hearts Layer ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
          {heartPieces.map((h) => (
            <FloatingHeart
              key={h.id}
              emoji={h.emoji}
              startX={h.startX}
              delay={h.delay}
              duration={h.duration}
              size={h.size}
            />
          ))}
        </div>

        {/* ── Page Content ── */}
        <div className="relative flex flex-col items-center min-h-[100dvh] px-6 pt-14 pb-12" style={{ zIndex: 2 }}>

          {/* Title block */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1
              className="text-[1.75rem] leading-snug font-bold"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: 'var(--rose-deep)' }}
            >
              Your date with Aayush<br />is confirmed.
            </h1>
          </motion.div>

          {/* Summary Card — Date + Time only */}
          <motion.div
            className="w-full rounded-card p-6 mb-10"
            style={{
              background: 'var(--warm-white)',
              border: '2px solid var(--rose-blush)',
              boxShadow: 'var(--shadow-rose)',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Date row */}
            {state.selectedDate && (
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">📅</span>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: 'var(--text-soft)', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Date
                  </p>
                  <p
                    className="text-base font-semibold"
                    style={{ color: 'var(--text-dark)', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {formatDate(state.selectedDate)}
                  </p>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="my-4" style={{ height: '1px', background: 'var(--rose-blush)' }} />

            {/* Time row */}
            {state.selectedTime && (
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">🕐</span>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: 'var(--text-soft)', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Time
                  </p>
                  <p
                    className="text-base font-semibold"
                    style={{ color: 'var(--text-dark)', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {formatTime(state.selectedTime)}
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* hehehe text */}
          <motion.p
            className="text-2xl mb-10 tracking-wide"
            style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, color: 'var(--rose-deep)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.65, type: 'spring', stiffness: 260 }}
          >
            hehehe
          </motion.p>

          {/* Actions */}
          <motion.div
            className="w-full space-y-3 mt-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <PrimaryButton onClick={handleScreenshot}>
              Save this moment 📸
            </PrimaryButton>
            <GhostButton onClick={handleRestart}>
              Start over ↩
            </GhostButton>
          </motion.div>

        </div>
      </PageTransition>
    </PageShell>
  )
}
