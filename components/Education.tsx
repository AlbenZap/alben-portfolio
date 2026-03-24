'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

const degrees = [
  {
    university: 'Indiana University Bloomington',
    location: 'Bloomington, IN, USA',
    degree: 'Master of Science - Data Science',
    gpa: '3.73 / 4.0',
    year: 'Aug 2024 - May 2026',
    logo: '/logos/iu.svg',
    accentColor: '#7C2529',
  },
  {
    university: 'University of Mumbai',
    location: 'Mumbai, India',
    degree: 'Bachelor of Engineering - Information Technology',
    gpa: '8.54 / 10.0',
    year: 'Aug 2017 - Jun 2021',
    logo: '/logos/mu.svg',
    accentColor: '#1a3a5c',
  },
]

export default function Education() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const index = cardsRef.current.indexOf(el as HTMLDivElement)
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: index * 0.12,
          })
          observer.unobserve(el)
        })
      },
      { threshold: 0.1 }
    )

    cardsRef.current.forEach((el) => {
      if (!el) return
      gsap.set(el, { opacity: 0, y: 24 })
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="education"
      style={{
        padding: '40px 40px 100px',
        maxWidth: '1100px',
        margin: '0 auto',
        minHeight: '100vh',
      }}
    >
      <div className="section-label" style={{ marginBottom: '40px' }}>
        // education
      </div>

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
        className="edu-grid"
      >
        {degrees.map((d, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el }}
            style={{
              background: '#0f1011',
              border: '1px solid #1a2e2c',
              borderRadius: '4px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'border-color 0.25s ease, transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = `${d.accentColor}55`
              el.style.transform = 'translateY(-2px)'
              el.style.boxShadow = `0 8px 24px ${d.accentColor}12`
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#1a2e2c'
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'none'
            }}
          >
            <div
              style={{
                height: '3px',
                background: `linear-gradient(to right, ${d.accentColor}, transparent)`,
              }}
            />

            <div style={{ padding: '28px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
                <Image
                  src={d.logo}
                  alt={d.university}
                  width={44}
                  height={44}
                  style={{ borderRadius: '8px', flexShrink: 0 }}
                />
                <div>
                  <div
                    style={{
                      fontSize: '15px',
                      color: '#e2e8f0',
                      fontWeight: 600,
                      letterSpacing: '-0.2px',
                      lineHeight: 1.3,
                      marginBottom: '4px',
                    }}
                  >
                    {d.university}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-jetbrains), monospace',
                      fontSize: '12px',
                      color: '#64748b',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {d.location}
                  </div>
                </div>
              </div>

              <div style={{ height: '1px', background: '#1a2e2c', marginBottom: '20px' }} />

              <div
                style={{
                  fontSize: '14px',
                  color: '#94a3b8',
                  lineHeight: 1.5,
                  marginBottom: 'auto',
                  paddingBottom: '20px',
                }}
              >
                {d.degree}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: '12px',
                    color: '#5eead4',
                    letterSpacing: '0.5px',
                  }}
                >
                  {d.year}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: '12px',
                    color: 'rgba(94,234,212,0.6)',
                    letterSpacing: '0.3px',
                    background: 'rgba(94,234,212,0.06)',
                    border: '1px solid rgba(94,234,212,0.15)',
                    padding: '3px 10px',
                    borderRadius: '2px',
                  }}
                >
                  GPA {d.gpa}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .edu-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
