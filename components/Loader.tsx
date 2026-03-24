'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

type Phase = 'overlay' | 'animate' | 'done'

export default function Loader() {
  const [phase, setPhase] = useState<Phase>('overlay')
  const loaderRef = useRef<HTMLDivElement>(null)
  const barFillRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setPhase('animate')
    return () => { setPhase('overlay') }
  }, [])

  useEffect(() => {
    if (phase !== 'animate') return

    document.body.style.overflow = 'hidden'
    const loader = loaderRef.current
    const barFill = barFillRef.current
    const counter = counterRef.current
    if (!loader || !barFill || !counter) return

    // Animate counter 0 → 100
    const count = { val: 0 }
    gsap.to(count, {
      val: 100,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        counter.textContent = `${Math.round(count.val)}`
      },
    })

    const tl = gsap.timeline()
    tl.to(barFill, { width: '100%', duration: 1.2, ease: 'power2.inOut' })
      .to(loader, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        delay: 0.2,
        onComplete: () => {
          document.body.style.overflow = ''
          setPhase('done')
        },
      })

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [phase])

  if (phase === 'done') return null

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#080909',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
      }}
    >
      {phase === 'animate' && (
        <>
          {/* Counter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '4px',
            }}
          >
            <span
              ref={counterRef}
              style={{
                fontFamily: 'var(--font-jetbrains), monospace',
                fontSize: '48px',
                fontWeight: 300,
                color: '#5eead4',
                lineHeight: 1,
                minWidth: '3ch',
                textAlign: 'right',
              }}
            >
              0
            </span>
            <span
              style={{
                fontFamily: 'var(--font-jetbrains), monospace',
                fontSize: '16px',
                color: 'rgba(94,234,212,0.5)',
                lineHeight: 1,
              }}
            >
              %
            </span>
          </div>

          {/* Progress bar track */}
          <div
            style={{
              width: '260px',
              height: '2px',
              background: '#1a2e2c',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              ref={barFillRef}
              style={{
                height: '100%',
                width: '0%',
                background: 'linear-gradient(to right, #0d9488, #5eead4)',
                borderRadius: '2px',
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}
