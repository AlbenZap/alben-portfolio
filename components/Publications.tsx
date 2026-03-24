'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const publications = [
  {
    index: '01 /',
    accentColor: '#5eead4',
    title: 'Lie Detection Using Facial Analysis, Electrodermal Activity, Pulse and Temperature',
    journal: 'JETIR',
    note: 'Journal of Emerging Technologies and Innovative Research',
    href: 'https://www.jetir.org/view?paper=JETIR2105529',
  },
  {
    index: '02 /',
    accentColor: '#818cf8',
    title: 'Research on Lie Detector Using Facial Analysis and Heartbeat Sensing',
    journal: 'IJARESM',
    note: 'International Journal of All Research Education and Scientific Methods',
    href: 'https://www.ijaresm.com/research-on-lie-detector-using-facial-analysis-and-heartbeat-sensing',
  },
  {
    index: '03 /',
    accentColor: '#38bdf8',
    title: 'Alexa Based Smart Home Monitoring System',
    journal: 'IEJRD',
    note: 'International Engineering Journal for Research and Development',
    href: 'https://iejrd.com/index.php/iejrd/article/view/668',
  },
]

const ExternalIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

export default function Publications() {
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const index = cardsRef.current.indexOf(el as HTMLAnchorElement)
          gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: index * 0.1 })
          observer.unobserve(el)
        })
      },
      { threshold: 0.08 }
    )

    cardsRef.current.forEach((el) => {
      if (!el) return
      gsap.set(el, { opacity: 0, y: 20 })
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="publications"
      style={{
        padding: '40px 40px 120px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <div className="section-label" style={{ marginBottom: '32px' }}>
        // publications
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {publications.map((pub, i) => (
          <a
            key={i}
            ref={(el) => { cardsRef.current[i] = el }}
            href={pub.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              background: '#0f1011',
              border: '1px solid #1a2e2c',
              borderRadius: '4px',
              overflow: 'hidden',
              textDecoration: 'none',
              transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = `${pub.accentColor}45`
              el.style.transform = 'translateY(-2px)'
              el.style.boxShadow = `0 8px 24px ${pub.accentColor}10`
              const icon = el.querySelector('.pub-icon') as HTMLElement
              if (icon) icon.style.color = pub.accentColor
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#1a2e2c'
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'none'
              const icon = el.querySelector('.pub-icon') as HTMLElement
              if (icon) icon.style.color = '#64748b'
            }}
          >
            <div style={{ height: '2px', background: `linear-gradient(to right, ${pub.accentColor}, transparent)` }} />

            <div style={{ padding: '22px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: '12px',
                    color: '#64748b',
                    letterSpacing: '0.8px',
                  }}
                >
                  {pub.index}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: '12px',
                    letterSpacing: '1.5px',
                    color: pub.accentColor,
                    border: `1px solid ${pub.accentColor}40`,
                    padding: '3px 10px',
                    borderRadius: '2px',
                    transition: 'border-color 0.2s ease, background 0.2s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = `${pub.accentColor}80`
                    el.style.background = `${pub.accentColor}12`
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = `${pub.accentColor}40`
                    el.style.background = 'transparent'
                  }}
                >
                  {pub.journal}
                </span>
              </div>

              <div
                style={{
                  fontSize: '14px',
                  color: '#e2e8f0',
                  fontWeight: 500,
                  letterSpacing: '-0.1px',
                  lineHeight: 1.55,
                  marginBottom: '10px',
                }}
              >
                {pub.title}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: '12px',
                    color: '#64748b',
                    letterSpacing: '0.2px',
                  }}
                >
                  {pub.note}
                </div>
                <span
                  className="pub-icon"
                  style={{
                    color: '#64748b',
                    flexShrink: 0,
                    display: 'flex',
                    transition: 'color 0.15s ease',
                  }}
                >
                  <ExternalIcon />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          #publications a > div { padding: 18px 20px !important; }
        }
      `}</style>
    </section>
  )
}
