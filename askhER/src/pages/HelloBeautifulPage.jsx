import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import PageTransition from '../components/PageTransition'
import PrimaryButton from '../components/PrimaryButton'

export default function HelloBeautifulPage() {
  const navigate = useNavigate()

  return (
    <PageShell>
      <PageTransition>
        <div className="relative flex flex-col items-center justify-between min-h-[100dvh] px-6 pt-16 pb-12">

          {/* Heading */}
          <motion.div
            className="text-center space-y-2 mt-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <h1
              className="text-4xl leading-tight"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: 'var(--rose-deep)' }}
            >
              Hello,<br />Beautiful Girl
            </h1>
            <p
              className="text-base mt-3"
              style={{ color: 'var(--text-mid)', fontFamily: "'DM Sans', sans-serif" }}
            >
              Something small, just for you
            </p>
          </motion.div>

          {/* Hero image — page_1.jpeg (cat reaching out) */}
          <motion.div
            className="flex-1 flex items-center justify-center my-8 cursor-pointer"
            onClick={() => navigate('/garden')}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25, type: 'spring', stiffness: 180 }}
            whileTap={{ scale: 0.96 }}
          >
            <motion.img
              src="/images/page_1.jpeg"
              alt="Cute cat reaching out"
              className="w-[240px] h-[280px] object-cover rounded-card"
              style={{
                border: '3px solid var(--rose-blush)',
                boxShadow: 'var(--shadow-rose)',
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* CTA */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <PrimaryButton onClick={() => navigate('/garden')}>
              Open it
            </PrimaryButton>
          </motion.div>

        </div>
      </PageTransition>
    </PageShell>
  )
}
