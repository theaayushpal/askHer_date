import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppState } from '../hooks/useAppState'
import PageShell from '../components/PageShell'
import PageTransition from '../components/PageTransition'
import PrimaryButton from '../components/PrimaryButton'

const FLOWERS = [
  { bloom: '🌸', name: 'Cherry Blossom', color: '#F5C6D0', effect: 'spin'   },
  { bloom: '🌺', name: 'Hibiscus',       color: '#E8A0B0', effect: 'bounce' },
  { bloom: '🌷', name: 'Tulip',          color: '#FADADD', effect: 'flip'   },
  { bloom: '🌼', name: 'Daisy',          color: '#FFF9C4', effect: 'wave'   },
  { bloom: '🌻', name: 'Sunflower',      color: '#FFF3CD', effect: 'pop'    },
  { bloom: '💐', name: 'Bouquet',        color: '#F5C6D0', effect: 'shake'  },
  { bloom: '🪷', name: 'Lotus',          color: '#F8BBD0', effect: 'spiral' },
  { bloom: '🌾', name: 'Wheat',          color: '#FFF8E1', effect: 'ping'   },
  { bloom: '🍀', name: 'Clover',         color: '#C8E6C9', effect: 'drop'   },
  { bloom: '🌹', name: 'Rose',           color: '#D4607A', effect: 'rose'   },
]
const TOTAL    = FLOWERS.length
const ROSE_IDX = TOTAL - 1

// ─── Unique emoji animation per effect ───────────────────────────────────────
function getEmojiAnim(effect) {
  switch (effect) {
    case 'spin':    return { scale: [0.3, 1.3, 1],        rotate: [0, 360, 340, 360],         transition: { duration: 0.7 } }
    case 'bounce':  return { scale: [0.3, 1.5, 0.85, 1.1, 1], y: [0, -20, 4, -8, 0],          transition: { duration: 0.75 } }
    case 'flip':    return { scale: [0.3, 1.2, 1],        rotateY: [0, 180, 360],              transition: { duration: 0.7 } }
    case 'wave':    return { scale: [0.3, 1.2, 1],        rotate: [0, -18, 18, -10, 10, 0],   transition: { duration: 0.8 } }
    case 'pop':     return { scale: [0, 1.8, 0.88, 1.05, 1],                                   transition: { duration: 0.55, ease: 'easeOut' } }
    case 'shake':   return { scale: [0.5, 1.2, 1],        x: [0, -12, 12, -8, 8, -4, 4, 0],  transition: { duration: 0.65 } }
    case 'spiral':  return { scale: [0.2, 1.3, 1],        rotate: [0, 720],                   transition: { duration: 0.9, ease: 'easeOut' } }
    case 'ping':    return { scale: [0.3, 1.4, 0.95, 1],  opacity: [0, 1, 1, 1],              transition: { duration: 0.5 } }
    case 'drop':    return { scale: [0.3, 1.2, 1],        y: [-32, 0, -6, 0],                 transition: { duration: 0.6, ease: 'easeOut' } }
    case 'rose':    return { scale: [0.3, 1.9, 0.85, 1.2, 1], rotate: [0, -30, 30, -15, 0],  transition: { duration: 1.05 } }
    default:        return { scale: [0.5, 1.2, 1],                                              transition: { duration: 0.5 } }
  }
}

// ─── Unique burst patterns per effect ────────────────────────────────────────
function getBurstConfig(effect, isRose) {
  // Returns { count, items, getPos(i, count) → {x,y,rotate,scale} }
  const d = isRose ? 72 : 46
  switch (effect) {
    case 'spin':
      // All particles spin outward in a circle
      return {
        items: ['🌸','🌸','✨','🌸','🌸','✨'],
        getPos: (i, n) => {
          const a = (i / n) * 2 * Math.PI
          return { x: Math.cos(a)*d, y: Math.sin(a)*d, rotate: 720, scale: 1.3, opacity: 0 }
        },
      }
    case 'bounce':
      // Particles shoot upward in an arc
      return {
        items: ['🌺','✨','🌺','✨','🌺','✨'],
        getPos: (i, n) => {
          const spread = (i - n/2) * 18
          return { x: spread, y: -70 - Math.abs(spread)*0.3, scale: 1.3, opacity: 0 }
        },
      }
    case 'flip':
      // Particles fan left and right
      return {
        items: ['🌷','✨','🌷','✨'],
        getPos: (i, n) => {
          const side = i % 2 === 0 ? 1 : -1
          return { x: side * (35 + i*10), y: -30 - i*8, rotateY: 360, scale: 1.2, opacity: 0 }
        },
      }
    case 'wave':
      // Particles ripple outward in waves at different distances
      return {
        items: ['🌼','✨','🌼','✨','🌼'],
        getPos: (i, n) => {
          const a = (i / n) * 2 * Math.PI
          const dist = d + (i % 2 === 0 ? 14 : -10)
          return { x: Math.cos(a)*dist, y: Math.sin(a)*dist, scale: 1.2, opacity: 0 }
        },
      }
    case 'pop':
      // Big explosive outward burst, extra distance
      return {
        items: ['🌻','✨','🌻','✨','🌻','✨','🌻','✨'],
        getPos: (i, n) => {
          const a = (i / n) * 2 * Math.PI
          return { x: Math.cos(a)*(d*1.5), y: Math.sin(a)*(d*1.5), scale: 1.6, opacity: 0 }
        },
      }
    case 'shake':
      // Particles scatter chaotically with random offsets
      return {
        items: ['💐','🌸','🌷','🌺','💐'],
        getPos: (i, n) => {
          const a = (i / n) * 2 * Math.PI
          const jitter = (i % 3 - 1) * 12
          return { x: Math.cos(a)*d + jitter, y: Math.sin(a)*d + jitter, scale: 1.2, opacity: 0 }
        },
      }
    case 'spiral':
      // Particles follow a spiral path — offset angle by index
      return {
        items: ['🪷','✨','🪷','✨','🪷','✨'],
        getPos: (i, n) => {
          const a = (i / n) * 2 * Math.PI + i * 0.4
          const r = d * (0.6 + i * 0.08)
          return { x: Math.cos(a)*r, y: Math.sin(a)*r, rotate: i % 2 === 0 ? 360 : -360, scale: 1.2, opacity: 0 }
        },
      }
    case 'ping':
      // Particles shoot outward at increasing distances (ripple)
      return {
        items: ['🌾','✨','🌾','✨'],
        getPos: (i, n) => {
          const a = (i / n) * 2 * Math.PI
          return { x: Math.cos(a)*(d + i*12), y: Math.sin(a)*(d + i*12), scale: 1.0, opacity: 0 }
        },
      }
    case 'drop':
      // Particles drop downward with slight lateral spread
      return {
        items: ['🍀','✨','🍀','✨'],
        getPos: (i, n) => {
          const spread = (i - n/2) * 20
          return { x: spread, y: 55 + i*10, scale: 1.1, opacity: 0 }
        },
      }
    case 'rose':
      // Full 12-particle radial burst + rotation
      return {
        items: ['🌹','✨','💕','🌸','💖','🌺','🌷','💗','✨','🌹','💫','⭐'],
        getPos: (i, n) => {
          const a = (i / n) * 2 * Math.PI
          return {
            x: Math.cos(a)*d, y: Math.sin(a)*d,
            rotate: i % 2 === 0 ? 540 : -540,
            scale: 1.9, opacity: 0,
          }
        },
      }
    default:
      return {
        items: ['✨','✨','✨','✨'],
        getPos: (i, n) => {
          const a = (i / n) * 2 * Math.PI
          return { x: Math.cos(a)*d, y: Math.sin(a)*d, scale: 1, opacity: 0 }
        },
      }
  }
}

// ─── Unique after-glow per effect ────────────────────────────────────────────
function BloomedGlow({ effect, color }) {
  // rose & pop: pulsing glow; spin: shimmer; others: static soft shadow
  if (effect === 'rose') {
    return (
      <motion.div className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ boxShadow: [`0 0 0px ${color}00`, `0 0 26px ${color}99`, `0 0 0px ${color}00`] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    )
  }
  if (effect === 'pop') {
    return (
      <motion.div className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ boxShadow: [`0 0 0px ${color}00`, `0 0 16px ${color}77`, `0 0 0px ${color}00`] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />
    )
  }
  if (effect === 'spin') {
    return (
      <motion.div className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ background: `conic-gradient(from 0deg, ${color}22, ${color}00, ${color}22)` }}
      />
    )
  }
  return null
}

// ─── Unique ring effect per effect type ──────────────────────────────────────
function RingEffect({ active, color, effect }) {
  if (!active) return null

  // spin → single ring
  // bounce → two rings shooting up
  // pop → 3 rings expanding
  // rose → 3 rings at full size
  // others → 1 ring
  const configs = {
    spin:    [{ scale: 2.2, opacity: [0.9, 0], dur: 0.6, delay: 0 }],
    bounce:  [{ scale: 1.8, opacity: [0.8, 0], dur: 0.5, delay: 0 }, { scale: 2.4, opacity: [0.5, 0], dur: 0.7, delay: 0.1 }],
    flip:    [{ scale: 2.0, opacity: [0.7, 0], dur: 0.55, delay: 0 }],
    wave:    [{ scale: 2.0, opacity: [0.8, 0], dur: 0.6, delay: 0 }, { scale: 2.8, opacity: [0.4, 0], dur: 0.85, delay: 0.15 }],
    pop:     [{ scale: 1.6, opacity: [1, 0], dur: 0.5, delay: 0 }, { scale: 2.4, opacity: [0.7, 0], dur: 0.65, delay: 0.1 }, { scale: 3.2, opacity: [0.4, 0], dur: 0.8, delay: 0.2 }],
    shake:   [{ scale: 2.2, opacity: [0.7, 0], dur: 0.6, delay: 0 }],
    spiral:  [{ scale: 2.0, opacity: [0.8, 0], dur: 0.8, delay: 0 }],
    ping:    [{ scale: 1.5, opacity: [1, 0], dur: 0.4, delay: 0 }, { scale: 2.5, opacity: [0.6, 0], dur: 0.6, delay: 0.1 }, { scale: 3.5, opacity: [0.3, 0], dur: 0.8, delay: 0.2 }],
    drop:    [{ scale: 2.0, opacity: [0.7, 0], dur: 0.55, delay: 0 }],
    rose:    [{ scale: 1.8, opacity: [0.9, 0], dur: 0.65, delay: 0 }, { scale: 2.5, opacity: [0.6, 0], dur: 0.85, delay: 0.12 }, { scale: 3.2, opacity: [0.35, 0], dur: 1.0, delay: 0.24 }],
  }
  const rings = configs[effect] || configs.spin

  return (
    <>
      {rings.map((r, i) => (
        <motion.div key={i}
          className="absolute rounded-2xl pointer-events-none"
          style={{ border: `2px solid ${color}`, inset: 0 }}
          initial={{ scale: 0.85, opacity: r.opacity[0] }}
          animate={{ scale: r.scale, opacity: r.opacity[1] }}
          transition={{ duration: r.dur, delay: r.delay, ease: 'easeOut' }}
        />
      ))}
    </>
  )
}

// ─── Burst particles ──────────────────────────────────────────────────────────
function BurstParticles({ active, effect, isRose }) {
  if (!active) return null
  const cfg = getBurstConfig(effect, isRose)
  const dur = isRose ? 1.0 : 0.65
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 20 }}>
      {cfg.items.map((p, i) => (
        <motion.span key={i}
          className="absolute select-none"
          style={{ left: '50%', top: '50%', marginLeft: -8, marginTop: -8, fontSize: isRose ? '1rem' : '0.78rem' }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.3, rotate: 0 }}
          animate={cfg.getPos(i, cfg.items.length)}
          transition={{ duration: dur, ease: 'easeOut', delay: i * 0.025 }}
        >
          {p}
        </motion.span>
      ))}
    </div>
  )
}

// ─── Single flower card ───────────────────────────────────────────────────────
function FlowerCard({ flower, index, bloomed, onBloom }) {
  const isRose = index === ROSE_IDX
  const [burst, setBurst]   = useState(false)
  const [doAnim, setDoAnim] = useState(false)

  const handleTap = () => {
    if (bloomed) return
    onBloom(index)
    setBurst(true)
    setDoAnim(true)
    const dur = isRose ? 1300 : 950
    setTimeout(() => { setBurst(false); setDoAnim(false) }, dur)
  }

  return (
    <motion.button
      onClick={handleTap}
      className="relative flex flex-col items-center justify-center gap-1 rounded-2xl py-3 select-none touch-manipulation overflow-visible"
      style={{
        background: bloomed
          ? isRose ? 'linear-gradient(135deg, #F5C6D0, #E8A0B0)' : flower.color + '55'
          : 'var(--rose-mist)',
        border: `2px solid ${bloomed ? flower.color : 'var(--rose-blush)'}`,
        cursor: bloomed ? 'default' : 'pointer',
        minHeight: '88px',
        boxShadow: bloomed ? `0 4px 14px ${flower.color}44` : 'none',
        transition: 'background 0.3s, border 0.3s, box-shadow 0.3s',
      }}
      whileTap={bloomed ? {} : { scale: 0.84 }}
    >
      <BurstParticles active={burst} effect={flower.effect} isRose={isRose} />
      <RingEffect active={burst} color={flower.color} effect={flower.effect} />
      {bloomed && <BloomedGlow effect={flower.effect} color={flower.color} />}

      <motion.span
        className={isRose ? 'text-4xl' : 'text-3xl'}
        key={bloomed ? 'bloomed' : 'bud'}
        animate={doAnim ? getEmojiAnim(flower.effect) : { scale: 1 }}
      >
        {bloomed ? flower.bloom : '🌱'}
      </motion.span>

      {bloomed ? (
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[9px] font-bold text-center px-1 leading-tight"
          style={{ fontFamily: "'Nunito', sans-serif", color: 'var(--rose-deep)' }}
        >
          {flower.name}
        </motion.span>
      ) : (
        <span className="text-[9px] font-bold"
          style={{ fontFamily: "'Nunito', sans-serif", color: 'var(--text-soft)' }}>
          tap
        </span>
      )}
    </motion.button>
  )
}

// ─── Ambient petals ───────────────────────────────────────────────────────────
const AMBIENT = [
  { startX: 7,  delay: 0,   emoji: '🌸' },
  { startX: 22, delay: 3.5, emoji: '🌷' },
  { startX: 45, delay: 1.2, emoji: '✨' },
  { startX: 63, delay: 5.5, emoji: '🌸' },
  { startX: 80, delay: 2.5, emoji: '💕' },
  { startX: 92, delay: 7,   emoji: '🌺' },
]
function AmbientPetal({ delay, startX, emoji }) {
  return (
    <motion.span
      className="absolute pointer-events-none select-none"
      style={{ left: `${startX}%`, top: '-24px', fontSize: '1rem', opacity: 0.18 }}
      animate={{ y: ['0vh', '112vh'], rotate: [0, 360], opacity: [0.18, 0.18, 0] }}
      transition={{ duration: 10 + Math.random() * 5, delay, repeat: Infinity, repeatDelay: Math.random() * 8 + 5, ease: 'linear' }}
    >
      {emoji}
    </motion.span>
  )
}

// ─── All-bloomed shimmer burst ────────────────────────────────────────────────
function AllBloomedShimmer() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 15 }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.span key={i}
          className="absolute select-none"
          style={{ left: `${5 + (i * 13) % 90}%`, top: `${5 + (i * 17) % 88}%`, fontSize: `${0.8 + (i % 3) * 0.4}rem` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.6, 0] }}
          transition={{ duration: 1.3, delay: i * 0.06, ease: 'easeOut' }}
        >
          ✨
        </motion.span>
      ))}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function FlowerGardenPage() {
  const navigate = useNavigate()
  const { state, bloomFlower } = useAppState()
  const bloomedCount = state.flowersBlooomed.filter(Boolean).length
  const allBloomed   = bloomedCount === TOTAL
  const [shimmer, setShimmer] = useState(false)
  const shimmerShown = useRef(false)

  const handleBloom = (index) => {
    bloomFlower(index)
    if (bloomedCount + 1 === TOTAL && !shimmerShown.current) {
      shimmerShown.current = true
      setShimmer(true)
      setTimeout(() => setShimmer(false), 2000)
    }
  }

  return (
    <PageShell>
      <PageTransition>
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
          {AMBIENT.map((p, i) => <AmbientPetal key={i} {...p} />)}
        </div>
        <AnimatePresence>{shimmer && <AllBloomedShimmer />}</AnimatePresence>

        <div className="relative flex flex-col items-center min-h-[100dvh] px-4 pt-9 pb-10" style={{ zIndex: 1 }}>

          {/* Header */}
          <motion.div className="text-center space-y-1 mb-4 w-full"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--text-soft)', fontFamily: "'DM Sans', sans-serif" }}>
              just for you
            </p>
            <h2 className="text-[1.75rem] leading-tight"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: 'var(--rose-deep)' }}>
              Your Digital Garden
            </h2>
            <p className="text-sm font-medium"
              style={{ color: 'var(--text-mid)', fontFamily: "'DM Sans', sans-serif" }}>
              Tap each bud to make it bloom
            </p>
          </motion.div>

          {/* Progress */}
          <div className="w-full mb-1.5">
            <div className="flex justify-between mb-1">
              <span className="text-xs font-bold" style={{ color: 'var(--text-soft)', fontFamily: "'DM Sans', sans-serif" }}>
                {bloomedCount} of {TOTAL} bloomed
              </span>
              <span className="text-xs font-bold" style={{ color: 'var(--rose-deep)', fontFamily: "'DM Sans', sans-serif" }}>
                {allBloomed ? 'Garden complete!' : `${TOTAL - bloomedCount} left`}
              </span>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--rose-blush)' }}>
              <motion.div className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, var(--rose-primary), var(--rose-deep))' }}
                animate={{ width: `${(bloomedCount / TOTAL) * 100}%` }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Grids 5+5 */}
          <div className="grid grid-cols-5 gap-2 w-full mb-2">
            {FLOWERS.slice(0, 5).map((flower, i) => (
              <FlowerCard key={i} flower={flower} index={i} bloomed={state.flowersBlooomed[i]} onBloom={handleBloom} />
            ))}
          </div>
          <div className="grid grid-cols-5 gap-2 w-full mb-4">
            {FLOWERS.slice(5).map((flower, i) => (
              <FlowerCard key={i+5} flower={flower} index={i+5} bloomed={state.flowersBlooomed[i+5]} onBloom={handleBloom} />
            ))}
          </div>

          {/* All-bloomed card */}
          <AnimatePresence>
            {allBloomed && (
              <motion.div className="w-full rounded-2xl mb-5 overflow-hidden"
                initial={{ opacity: 0, scale: 0.88, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 210 }}
                style={{
                  background: 'linear-gradient(135deg, var(--rose-blush), var(--rose-mist))',
                  border: '2px solid var(--rose-primary)',
                  boxShadow: 'var(--shadow-rose)',
                }}
              >
                <div className="px-5 py-4 flex items-center gap-4">
                  <img
                    src="/images/garden_page.jpeg"
                    alt="Monkey making a heart"
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                    style={{ border: '2px solid var(--rose-primary)' }}
                  />
                  <p className="text-base font-bold"
                    style={{ fontFamily: "'Nunito', sans-serif", color: 'var(--rose-deep)' }}>
                    these flowers are for you hehehe
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <div className="mt-auto w-full">
            <PrimaryButton onClick={() => navigate('/proposal')} disabled={!allBloomed}>
              {allBloomed ? 'Next' : `Bloom all flowers (${bloomedCount}/${TOTAL})`}
            </PrimaryButton>
          </div>

        </div>
      </PageTransition>
    </PageShell>
  )
}
