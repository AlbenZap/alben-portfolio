'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const stats = [
  { value: 3, suffix: '+', label: 'years industry', href: '#experience' },
  { value: 6, suffix: '+', label: 'projects', href: '#projects' },
  { value: 8, suffix: '+', label: 'certifications', href: '#skills' },
]

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function About() {
  const textRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const valRefs = useRef<(HTMLDivElement | null)[]>([])
  const triggered = useRef(false)

  useEffect(() => {
    const paras = Array.from(textRef.current?.querySelectorAll('p') ?? [])

    const paraObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const index = paras.indexOf(el as HTMLParagraphElement)
          gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: index * 0.12 })
          paraObserver.unobserve(el)
        })
      },
      { threshold: 0.1 }
    )
    paras.forEach((p) => {
      gsap.set(p, { opacity: 0, y: 24 })
      paraObserver.observe(p)
    })

    const firstCard = cardRefs.current[0]
    if (firstCard) {
      cardRefs.current.forEach((el) => { if (el) gsap.set(el, { opacity: 0, y: 20 }) })

      const statObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting || triggered.current) return
            triggered.current = true

            cardRefs.current.forEach((el, i) => {
              if (!el) return
              gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: i * 0.12 })
            })

            valRefs.current.forEach((el, i) => {
              if (!el) return
              const { value, suffix } = stats[i]
              const obj = { val: 0 }
              gsap.to(obj, {
                val: value,
                duration: 1.8,
                ease: 'power2.out',
                delay: i * 0.18,
                onUpdate() { el.textContent = String(Math.round(obj.val)) },
                onComplete() { el.textContent = value + suffix },
              })
            })

            statObserver.disconnect()
          })
        },
        { threshold: 0.2 }
      )
      statObserver.observe(firstCard)

      return () => { paraObserver.disconnect(); statObserver.disconnect() }
    }

    return () => paraObserver.disconnect()
  }, [])

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14
    e.currentTarget.style.transform = `perspective(520px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`
    e.currentTarget.style.transition = 'border-color 0.2s ease'
  }

  const handleTiltEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = 'rgba(94,234,212,0.35)'
  }

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transition = 'transform 0.5s ease, border-color 0.25s ease'
    e.currentTarget.style.transform = 'perspective(520px) rotateY(0deg) rotateX(0deg) translateY(0)'
    e.currentTarget.style.borderColor = '#1a2e2c'
  }

  return (
    <section
      id="about"
      style={{
        padding: '40px 40px 100px',
        maxWidth: '1100px',
        margin: '0 auto',
        minHeight: '100vh',
      }}
    >
      <div className="section-label" style={{ marginBottom: '32px' }}>
        // about me
      </div>

      <div className="about-top" style={{ display: 'flex', gap: '56px', alignItems: 'flex-start', marginBottom: '56px' }}>
        {/* Photo */}
        <div style={{ flexShrink: 0, alignSelf: 'stretch' }}>
          <div style={{
            width: '200px',
            height: '100%',
            minHeight: '200px',
            borderRadius: '4px',
            border: '1px solid rgba(94,234,212,0.18)',
            overflow: 'hidden',
            boxShadow: '0 0 32px rgba(94,234,212,0.06)',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/photo.jpg"
              alt="Alben Antappan"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
                display: 'block',
                imageRendering: 'auto',
                transform: 'translateZ(0)',
                willChange: 'transform',
              }}
            />
          </div>
        </div>

        {/* Text */}
        <div
          ref={textRef}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}
        >
          <p style={{ fontSize: '17px', color: '#94a3b8', lineHeight: 1.9, textAlign: 'justify' }}>
            I&apos;m a data scientist pursuing my MS in Data Science at Indiana University Bloomington,
            currently doing research at the IU School of Medicine, building the pipelines that turn
            raw neuroimaging data into structured, analysis-ready inputs for large-scale cohort modeling.
          </p>
          <p style={{ fontSize: '17px', color: '#94a3b8', lineHeight: 1.9, textAlign: 'justify' }}>
            Before grad school, I spent three years at Capgemini as a Senior Analyst and Software
            Engineer building financial data systems across 7 business units and 25+ global regions.
            Predictive forecasting models, Power BI dashboards tracking global P&L, Flask APIs,
            optimized SQL pipelines, and an ETL migration to Microsoft Fabric, owning the full stack
            from data to insight.
          </p>
          <p style={{ fontSize: '17px', color: '#94a3b8', lineHeight: 1.9, textAlign: 'justify' }}>
            That&apos;s still true today. I don&apos;t just build models, I build what makes them possible.
          </p>
        </div>
      </div>

      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}
        className="stats-grid"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            ref={(el) => { cardRefs.current[i] = el }}
            onClick={() => scrollTo(stat.href.replace('#', ''))}
            style={{
              background: '#0f1011',
              border: '1px solid #1a2e2c',
              borderRadius: '4px',
              padding: '32px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              willChange: 'transform',
            }}
            onMouseMove={handleTiltMove}
            onMouseEnter={handleTiltEnter}
            onMouseLeave={handleTiltLeave}
          >
            <div
              ref={(el) => { valRefs.current[i] = el }}
              style={{
                fontFamily: 'var(--font-jetbrains), monospace',
                fontSize: '40px',
                color: '#5eead4',
                fontWeight: 500,
                marginBottom: '10px',
                lineHeight: 1,
              }}
            >
              0
            </div>
            <div
              style={{
                fontFamily: 'var(--font-jetbrains), monospace',
                fontSize: '12px',
                letterSpacing: '2px',
                color: '#64748b',
                textTransform: 'uppercase',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .about-top { flex-direction: column !important; }
          .about-top > div:first-child { width: 100% !important; }
          .about-top > div:first-child > div { width: 100% !important; height: 240px !important; }
        }
      `}</style>
    </section>
  )
}
