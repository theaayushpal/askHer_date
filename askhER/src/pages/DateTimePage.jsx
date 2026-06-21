import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppState } from '../hooks/useAppState'
import PageShell from '../components/PageShell'
import PageTransition from '../components/PageTransition'
import PrimaryButton from '../components/PrimaryButton'

export default function DateTimePage() {
  const navigate = useNavigate()
  const { setDateTime } = useAppState()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [error, setError] = useState('')

  const today   = new Date().toISOString().split('T')[0]
  const isToday = date === today
  const isValid = date !== '' && time !== ''

  const handleConfirm = () => {
    if (!isValid) return
    if (date < today) { setError("That's in the past. Pick a future date."); return }
    setError('')
    setDateTime(date, time)
    navigate('/celebration')
  }

  return (
    <PageShell>
      <PageTransition>
        <div className="flex flex-col min-h-[100dvh] px-6 pt-10 pb-12">

          {/* Image — select_date_and_time_page.jpeg (baby with tongue) */}
          <motion.div
            className="w-full flex justify-center mb-5"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
          >
            <img
              src="/images/select_date_and_time_page.jpeg"
              alt="Baby making a cute face"
              className="w-28 h-28 object-cover rounded-full"
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
              almost there
            </p>
            <h2 className="text-3xl leading-tight"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: 'var(--rose-deep)' }}>
              Select the date and time beautiful girl
            </h2>
          </motion.div>

          {/* Form */}
          <motion.div
            className="flex flex-col gap-6 flex-1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="date-input"
                style={{ color: 'var(--text-mid)', fontFamily: "'DM Sans', sans-serif" }}>
                Pick a date
              </label>
              <input id="date-input" type="date" value={date} min={today}
                onChange={(e) => { setDate(e.target.value); setError('') }} />
              {isToday && (
                <p className="text-xs" style={{ color: 'var(--rose-deep)', fontFamily: "'DM Sans', sans-serif" }}>
                  ooh today? bold move
                </p>
              )}
              {error && (
                <p className="text-xs" style={{ color: '#C0392B', fontFamily: "'DM Sans', sans-serif" }}>
                  {error}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="time-input"
                style={{ color: 'var(--text-mid)', fontFamily: "'DM Sans', sans-serif" }}>
                Pick a time
              </label>
              <input id="time-input" type="time" value={time}
                onChange={(e) => setTime(e.target.value)} />
            </div>
          </motion.div>

          <motion.div
            className="mt-8 w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <PrimaryButton onClick={handleConfirm} disabled={!isValid}>
              {isValid ? 'Confirm' : 'Pick a date and time first'}
            </PrimaryButton>
          </motion.div>

        </div>
      </PageTransition>
    </PageShell>
  )
}
