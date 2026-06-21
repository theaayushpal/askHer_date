import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import PageTransition from '../components/PageTransition'

export default function MadeForYouPage() {
  const navigate = useNavigate()

  // Auto-advance after 3.5s
  useEffect(() => {
    const timer = setTimeout(() => navigate('/garden'), 3500)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <PageShell>
      <PageTransition>
        <div
          className="flex flex-col items-center justify-between min-h-[100dvh] px-6 pt-10 pb-12 cursor-pointer"
          onClick={() => navigate('/garden')}
        >

          {/* Top — Image */}
          <div className="flex-1 flex items-center justify-center w-full pt-6">
            {/*
              REPLACE WITH:
              <img src="/images/simp_2.webp" alt="Cute cartoon character with tears saying AWWWW" ... />
            */}
            <div
              className="w-[280px] h-[300px] rounded-card flex flex-col items-center justify-center gap-3"
              style={{ background: 'var(--rose-mist)', border: '2px dashed var(--rose-blush)' }}
            >
              <span className="text-5xl select-none">🥺</span>
              <p
                className="text-sm font-semibold tracking-wider"
                style={{ color: 'var(--text-soft)', fontFamily: "'DM Sans', sans-serif" }}
              >
                simp_2.webp
              </p>
              <p
                className="text-xl font-bold"
                style={{ color: 'var(--rose-deep)', fontFamily: "'DM Sans', sans-serif" }}
              >
                AWWWW! 🥺
              </p>
            </div>
          </div>

          {/* Bottom — Text */}
          <div className="w-full text-center space-y-4 pb-4">
            <h2
              className="text-3xl leading-snug"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, color: 'var(--rose-deep)' }}
            >
              I made something<br />for you...
            </h2>
            <p
              className="text-base"
              style={{ color: 'var(--text-mid)', fontFamily: "'DM Sans', sans-serif" }}
            >
              because you deserve something nice :)
            </p>

            {/* Auto-advance dots */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: 'var(--rose-primary)',
                    opacity: 0.4 + i * 0.3,
                  }}
                />
              ))}
            </div>
            <p
              className="text-xs"
              style={{ color: 'var(--text-soft)', fontFamily: "'DM Sans', sans-serif" }}
            >
              tap anywhere to continue
            </p>
          </div>

        </div>
      </PageTransition>
    </PageShell>
  )
}
