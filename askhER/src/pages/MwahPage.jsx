import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppState } from '../hooks/useAppState'
import PageShell from '../components/PageShell'
import PageTransition from '../components/PageTransition'
import PrimaryButton from '../components/PrimaryButton'

const OPTIONS = [0, 1, 50, 100]
const INFINITY_VALUE = 100000000000

export default function MwahPage() {
  const navigate = useNavigate()
  const { state, setMwahCount } = useAppState()
  // -1 = nothing picked yet. Once ANY option is tapped → INFINITY_VALUE. Then locked.
  const isSelected = state.mwahCount === INFINITY_VALUE

  const handleSelect = () => {
    if (isSelected) return  // already locked — ignore all further taps
    setMwahCount(INFINITY_VALUE)
  }

  return (
    <PageShell>
      <PageTransition>
        <div className="flex flex-col items-center min-h-[100dvh] px-6 pt-10 pb-12">

          {/* Image — mwahh_page.jpeg (baby tongue) */}
          <motion.div
            className="w-full flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
          >
            <img
              src="/images/mwahh_page.jpeg"
              alt="Baby giving mwah"
              className="w-36 h-36 object-cover rounded-full"
              style={{ border: '3px solid var(--rose-blush)', boxShadow: 'var(--shadow-rose)' }}
            />
          </motion.div>

          {/* Header */}
          <motion.div
            className="text-center space-y-2 mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--text-soft)', fontFamily: "'DM Sans', sans-serif" }}>
              very important
            </p>
            <h2 className="text-3xl leading-tight"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: 'var(--rose-deep)' }}>
              How many mwah we will have hehehe
            </h2>
          </motion.div>

          {/* Result display */}
          <AnimatePresence mode="wait">
            {isSelected && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.7, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35, type: 'spring', stiffness: 280 }}
                className="mb-8 px-8 py-5 rounded-2xl text-center w-full"
                style={{
                  background: 'linear-gradient(135deg, var(--rose-blush), var(--rose-mist))',
                  border: '2px solid var(--rose-primary)',
                  boxShadow: 'var(--shadow-rose)',
                }}
              >
                <p className="text-2xl font-bold"
                  style={{ fontFamily: "'Nunito', sans-serif", color: 'var(--rose-deep)' }}>
                  10000000+
                </p>
                <p className="text-sm mt-1 font-semibold"
                  style={{ color: 'var(--text-mid)', fontFamily: "'Nunito', sans-serif" }}>
                  okay okay hehehe
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Options — pointer-events: none the whole block after selection */}
          <div
            className="flex flex-col gap-3 w-full"
            style={{ pointerEvents: isSelected ? 'none' : 'auto' }}
          >
            {OPTIONS.map((val, i) => {
              const label = val === 100 ? '100 hehe' : String(val)
              return (
                <motion.button
                  key={val}
                  onClick={handleSelect}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: isSelected ? 0.4 : 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.26 }}
                  className="flex items-center w-full rounded-2xl px-5 py-4 text-left select-none"
                  style={{
                    background: 'var(--rose-mist)',
                    border: '2px solid var(--rose-blush)',
                    cursor: isSelected ? 'default' : 'pointer',
                  }}
                >
                  <span className="text-base flex-1"
                    style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, color: 'var(--text-dark)' }}>
                    {label}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-auto w-full pt-6">
            <PrimaryButton onClick={() => navigate('/when')} disabled={!isSelected}>
              {isSelected ? 'Next' : 'Pick one first'}
            </PrimaryButton>
          </div>

        </div>
      </PageTransition>
    </PageShell>
  )
}
