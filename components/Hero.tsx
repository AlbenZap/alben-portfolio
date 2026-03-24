'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import dynamic from 'next/dynamic'
const ResumeModal = dynamic(() => import('./ResumeModal'), { ssr: false })

const FULL_NAME = 'Alben Antappan'

export default function Hero() {
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const charTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [visibleChars, setVisibleChars] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(false)
  const [showResume, setShowResume] = useState(false)

  useEffect(() => {
    const words = h1Ref.current?.querySelectorAll('.word') ?? []

    gsap.set(eyebrowRef.current, { opacity: 0, y: 12 })
    gsap.set(words, { opacity: 0, y: 24 })
    gsap.set(subRef.current, { opacity: 0, y: 12 })
    gsap.set(ctaRef.current, { opacity: 0, y: 10 })
    gsap.set(scrollRef.current, { opacity: 0 })

    let i = 0

    const type = () => {
      i++
      setVisibleChars(i)

      if (i < FULL_NAME.length) {
        const delay = 68 + Math.random() * 55 + (FULL_NAME[i - 1] === ' ' ? 80 : 0)
        charTimerRef.current = setTimeout(type, delay)
      } else {
        setTimeout(() => setCursorVisible(false), 900)

        const tl = gsap.timeline({ delay: 0.25 })
        tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
          .to(words, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }, '-=0.3')
          .to(subRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
          .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
          .to(scrollRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2')
      }
    }

    const startTimer = setTimeout(() => {
      setCursorVisible(true)
      type()
    }, 1200)

    return () => {
      clearTimeout(startTimer)
      if (charTimerRef.current) clearTimeout(charTimerRef.current)
    }
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '0 24px',
        background: '#080909',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            right: '-8%',
            width: '55vw',
            height: '55vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(94,234,212,0.05) 0%, transparent 65%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-8%',
            width: '45vw',
            height: '45vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(94,234,212,0.03) 0%, transparent 65%)',
          }}
        />
      </div>

      <div
        style={{
          textAlign: 'center',
          maxWidth: '780px',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 700,
            color: '#e2e8f0',
            letterSpacing: '-1.5px',
            lineHeight: 1.05,
            marginBottom: '24px',
            minHeight: '1.1em',
          }}
        >
          {FULL_NAME.slice(0, visibleChars)}
          {cursorVisible && (
            <span
              style={{
                display: 'inline-block',
                width: 0,
                height: '0.88em',
                borderRight: '2.5px solid #5eead4',
                verticalAlign: 'text-bottom',
                marginLeft: '2px',
                animation: 'hero-cursor-blink 0.65s step-end infinite',
              }}
            />
          )}
        </div>

        <div
          ref={eyebrowRef}
          style={{
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: '13px',
            letterSpacing: '3px',
            color: '#5eead4',
            marginBottom: '40px',
          }}
        >
          // Data Scientist · Analyst · Engineer
        </div>

        <h1
          ref={h1Ref}
          style={{
            fontSize: 'clamp(28px, 4.5vw, 48px)',
            fontWeight: 400,
            letterSpacing: '-0.5px',
            lineHeight: 1.15,
            color: '#94a3b8',
            marginBottom: '28px',
          }}
        >
          <span className="word" style={{ display: 'inline-block', marginRight: '0.25em' }}>From</span>
          <span className="word" style={{ display: 'inline-block', color: '#e2e8f0', marginRight: '0.25em' }}>raw</span>
          <span className="word" style={{ display: 'inline-block', color: '#e2e8f0' }}>signals</span>
          <br />
          <span className="word" style={{ display: 'inline-block', marginRight: '0.25em' }}>to</span>
          <span className="word" style={{ display: 'inline-block', marginRight: '0.25em' }}>real</span>
          <span className="word" style={{ display: 'inline-block', color: '#5eead4' }}>insights.</span>
        </h1>

        <p
          ref={subRef}
          style={{
            fontSize: '17px',
            color: '#64748b',
            lineHeight: 1.8,
            maxWidth: '520px',
            margin: '0 auto 44px',
          }}
        >
          Data scientist who builds the infrastructure behind the analysis, from raw data to
          production-ready models and systems.
        </p>

        <div ref={ctaRef}>
          <button
            onClick={() => setShowResume(true)}
            style={{
              background: 'transparent',
              color: '#5eead4',
              border: '1px solid #5eead4',
              padding: '13px 32px',
              fontSize: '12px',
              fontFamily: 'var(--font-jetbrains), monospace',
              letterSpacing: '1.5px',
              cursor: 'pointer',
              borderRadius: '2px',
              fontWeight: 500,
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.background = 'rgba(94,234,212,0.06)')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.background = 'transparent')}
          >
            View Resume
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#475569',
            textTransform: 'uppercase',
            animation: 'scroll-text-pulse 2.4s ease-in-out infinite',
          }}
        >
          scroll
        </span>
        <div style={{ position: 'relative', width: '1px', height: '44px' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, #334155 0%, transparent 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: '#5eead4',
              boxShadow: '0 0 6px rgba(94,234,212,0.9)',
              animation: 'scroll-dot-travel 1.9s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes hero-cursor-blink {
          0%, 100% { opacity: 1 }
          50% { opacity: 0 }
        }
        @keyframes scroll-text-pulse {
          0%, 100% { opacity: 0.35 }
          50% { opacity: 0.65 }
        }
        @keyframes scroll-dot-travel {
          0%   { top: -2px; opacity: 0 }
          10%  { opacity: 1 }
          75%  { top: 42px; opacity: 0 }
          100% { top: 42px; opacity: 0 }
        }
      `}</style>

      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </section>
  )
}
