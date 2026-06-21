import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppState } from '../hooks/useAppState'
import PageShell from '../components/PageShell'
import PageTransition from '../components/PageTransition'
import PrimaryButton from '../components/PrimaryButton'

const FLAVOURS = [
  { id: 'nic-alphonso',           label: 'NIC Alphonso' },
  { id: 'naturals-mango-tub',     label: 'Naturals Mango Tub' },
  { id: 'magnum-pistachio',       label: 'Magnum Pistachio' },
  { id: 'amul-asli-aam',          label: 'Amul Asli Aam' },
  { id: 'ice-cream-sandwich',     label: 'Ice Cream Sandwich' },
  { id: 'amul-tru-mango-mania',   label: 'Amul Tru Mango Mania' },
  { id: 'hoco-cookies-and-cream', label: 'Hoco Cookies and Cream Cone' },
  { id: 'other',                  label: 'Other' },
]

export default function IceCreamPage() {
  const navigate = useNavigate()
  const { state, setFlavour } = useAppState()
  const selected = state.selectedFlavour
  const [otherText, setOtherText] = useState('')

  const handleSelect = (id) => setFlavour(id === selected ? null : id)

  const handleContinue = () => {
    if (selected === 'other' && otherText.trim()) {
      setFlavour('other:' + otherText.trim())
    }
    navigate('/food')
  }

  const canContinue = selected && (selected !== 'other' || otherText.trim().length > 0)

  return (
    <PageShell>
      <PageTransition>
        <div className="flex flex-col items-center min-h-[100dvh] px-6 pt-10 pb-12">

          {/* Image — ice_cream_page.jpeg (cat with hearts licking lips) */}
          <motion.div
            className="w-full flex justify-center mb-5"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
          >
            <img
              src="/images/ice_cream_page.jpeg"
              alt="Cat licking lips with hearts"
              className="w-32 h-32 object-cover rounded-full"
              style={{ border: '3px solid var(--rose-blush)', boxShadow: 'var(--shadow-rose)' }}
            />
          </motion.div>

          {/* Header */}
          <motion.div
            className="text-center space-y-2 mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--text-soft)', fontFamily: "'DM Sans', sans-serif" }}>
              important question
            </p>
            <h2 className="text-3xl leading-tight"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: 'var(--rose-deep)' }}>
              Which ice cream would you like to have with me
            </h2>
          </motion.div>

          {/* Flavour list */}
          <div className="flex flex-col gap-3 w-full mb-4">
            {FLAVOURS.map((flavour, i) => {
              const isSelected = selected === flavour.id
              return (
                <motion.button
                  key={flavour.id}
                  onClick={() => handleSelect(flavour.id)}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.28 }}
                  className="flex items-center w-full rounded-2xl px-5 py-4 text-left touch-manipulation select-none"
                  style={{
                    background: isSelected ? 'var(--rose-blush)' : 'var(--rose-mist)',
                    border: `2px solid ${isSelected ? 'var(--rose-deep)' : 'var(--rose-blush)'}`,
                    boxShadow: isSelected ? 'var(--shadow-rose)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.16s ease',
                  }}
                >
                  <span className="text-base flex-1"
                    style={{ fontFamily: "'Nunito', sans-serif", fontWeight: isSelected ? 800 : 600, color: isSelected ? 'var(--rose-deep)' : 'var(--text-dark)' }}>
                    {flavour.label}
                  </span>
                  {isSelected && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="text-base flex-shrink-0 ml-2"
                      style={{ color: 'var(--rose-deep)', fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}>
                      ✓
                    </motion.span>
                  )}
                </motion.button>
              )
            })}
          </div>

          <AnimatePresence>
            {selected === 'other' && (
              <motion.div className="w-full mb-4"
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}>
                <input type="text" placeholder="Tell me which one" value={otherText} maxLength={60}
                  onChange={(e) => setOtherText(e.target.value)} autoFocus
                  className="w-full rounded-2xl px-5 py-4 text-base outline-none"
                  style={{ fontFamily: "'DM Sans', sans-serif", background: 'var(--rose-mist)', border: '2px solid var(--rose-primary)', color: 'var(--text-dark)' }} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto w-full pt-2">
            <PrimaryButton onClick={handleContinue} disabled={!canContinue}>
              {canContinue ? 'Next' : 'Pick one first'}
            </PrimaryButton>
          </div>

        </div>
      </PageTransition>
    </PageShell>
  )
}
