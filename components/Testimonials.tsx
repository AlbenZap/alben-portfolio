'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const QuoteIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.12 }}>
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
)

const testimonials = [
  {
    quote: `I worked with Alben as a research assistant in the Faculty Assistance with Data Science program, where he focused on data analysis - both in Python and R. Alben handled cleaning and merging complex datasets, writing clear and reproducible code, and producing useful summary tables and figures. He communicated well, met deadlines reliably, and asked smart questions that moved the project forward. I would happily work with him again and recommend him for any role involving applied data analysis!`,
    name: 'RJ Niewoehner',
    initials: 'RJ',
    title: 'Assistant Professor of Operations',
    institution: 'Kelley School of Business, Indiana University',
    accentColor: '#5eead4',
    linkedin: 'https://www.linkedin.com/in/alben-antappan/details/recommendations/',
  },
  {
    quote: `I had the pleasure of managing Alben for over three years, and he stands out as one of the most capable and reliable professionals I've worked with.

He brings a strong combination of finance operations expertise and technical skills, including Python, web application development, SQL, Rest APIs, ML and Power BI. He has a natural ability to quickly grasp complex problems and translate them into effective, scalable solutions. Many times, the quality and impact of his work reflected a level of maturity well beyond his experience.

Alben takes full ownership of his work and consistently delivers with minimal to no supervision. Once aligned on the objective, he executes with precision, attention to detail, and a strong sense of accountability. His work is thorough, reliable, and rarely requires rework.

Beyond his technical strengths, he is highly dependable, committed, and someone you can trust with critical responsibilities. He would be a valuable asset to any organization, and I would gladly work with him again.`,
    name: 'Akhil Raghupatruni',
    initials: 'AR',
    title: 'Senior Consultant',
    institution: 'Capgemini',
    accentColor: '#f59e0b',
    linkedin: 'https://www.linkedin.com/in/alben-antappan/details/recommendations/',
  },
]

export default function Testimonials() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const index = cardsRef.current.indexOf(el as HTMLDivElement)
          gsap.to(el, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: index * 0.12 })
          observer.unobserve(el)
        })
      },
      { threshold: 0.08 }
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
      id="recommendations"
      style={{ padding: '40px 40px 60px', maxWidth: '1100px', margin: '0 auto', minHeight: '100vh' }}
    >
      <div className="section-label" style={{ marginBottom: '32px' }}>
        // recommendations
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {testimonials.map((t, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el }}
            style={{
              background: '#0f1011',
              border: '1px solid #1a2e2c',
              borderRadius: '4px',
              overflow: 'hidden',
              transition: 'border-color 0.25s ease, transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = `${t.accentColor}40`
              el.style.transform = 'translateY(-2px)'
              el.style.boxShadow = `0 8px 28px ${t.accentColor}10`
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#1a2e2c'
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'none'
            }}
          >
            <div style={{ height: '2px', background: `linear-gradient(to right, ${t.accentColor}, transparent)` }} />

            <div style={{ padding: '28px 32px 24px' }}>
              <div style={{ position: 'relative', marginBottom: '24px' }}>
                <div style={{ position: 'absolute', top: '-4px', left: '-4px' }}>
                  <QuoteIcon />
                </div>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#94a3b8',
                    lineHeight: 1.85,
                    letterSpacing: '0.1px',
                    fontStyle: 'italic',
                    textAlign: 'justify',
                    margin: 0,
                    paddingTop: '4px',
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div style={{ height: '1px', background: '#1a2e2c', marginBottom: '18px' }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: `${t.accentColor}14`,
                      border: `1px solid ${t.accentColor}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontFamily: 'var(--font-jetbrains), monospace',
                      fontSize: '13px',
                      color: t.accentColor,
                      letterSpacing: '1px',
                    }}
                  >
                    {t.initials}
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#e2e8f0',
                        letterSpacing: '-0.1px',
                        marginBottom: '3px',
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-jetbrains), monospace',
                        fontSize: '13px',
                        color: '#64748b',
                        letterSpacing: '0.2px',
                        lineHeight: 1.5,
                      }}
                    >
                      {t.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-jetbrains), monospace',
                        fontSize: '12px',
                        color: '#475569',
                        letterSpacing: '0.2px',
                      }}
                    >
                      {t.institution}
                    </div>
                  </div>
                </div>

                <a
                  href={t.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#475569',
                    transition: 'color 0.15s ease',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#0a66c2' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#475569' }}
                  title="View on LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
