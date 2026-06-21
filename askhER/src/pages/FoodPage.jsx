import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppState } from '../hooks/useAppState'
import PageShell from '../components/PageShell'
import PageTransition from '../components/PageTransition'
import PrimaryButton from '../components/PrimaryButton'

const FOODS = [
  { id: 'pizza',                  label: 'Pizza' },
  { id: 'waffle',                 label: 'Waffle' },
  { id: 'pasta',                  label: 'Pasta' },
  { id: 'chole-bhature',          label: 'Chole Bhature' },
  { id: 'dosa-with-filter-coffee',label: 'Dosa with Filter Coffee' },
  { id: 'other',                  label: 'Other' },
]

export default function FoodPage() {
  const navigate = useNavigate()
  const { state, toggleFood } = useAppState()
  const selected = state.selectedFoods
  const [otherText, setOtherText] = useState('')
  const hasOther = selected.includes('other')
  const canContinue = selected.length > 0 && (!hasOther || otherText.trim().length > 0)

  return (
    <PageShell>
      <PageTransition>
        <div className="flex flex-col items-center min-h-[100dvh] px-6 pt-10 pb-12">

          {/* Image — food_page.jpeg (kitten with heart crown) */}
          <motion.div
            className="w-full flex justify-center mb-5"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
          >
            <img
              src="/images/food_page.jpeg"
              alt="Cute kitten with hearts"
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
              another important question
            </p>
            <h2 className="text-3xl leading-tight"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: 'var(--rose-deep)' }}>
              Select the food for our date hehe
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-mid)', fontFamily: "'DM Sans', sans-serif" }}>
              Pick as many as you want
            </p>
          </motion.div>

          {/* Food list */}
          <div className="flex flex-col gap-3 w-full mb-4">
            {FOODS.map((food, i) => {
              const isSelected = selected.includes(food.id)
              return (
                <motion.button
                  key={food.id}
                  onClick={() => toggleFood(food.id)}
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
                    {food.label}
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
            {hasOther && (
              <motion.div className="w-full mb-4"
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}>
                <input type="text" placeholder="Tell me what you want" value={otherText} maxLength={60}
                  onChange={(e) => setOtherText(e.target.value)} autoFocus
                  className="w-full rounded-2xl px-5 py-4 text-base outline-none"
                  style={{ fontFamily: "'DM Sans', sans-serif", background: 'var(--rose-mist)', border: '2px solid var(--rose-primary)', color: 'var(--text-dark)' }} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto w-full pt-2">
            <PrimaryButton onClick={() => navigate('/mwah')} disabled={!canContinue}>
              {canContinue ? 'Next' : 'Pick at least one'}
            </PrimaryButton>
          </div>

        </div>
      </PageTransition>
    </PageShell>
  )
}
