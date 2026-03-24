'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const GitHubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const ExternalIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const DiagramIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
)

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const projects = [
  {
    num: '01 /',
    accentColor: '#5eead4',
    title: 'FinSight AI - Retrieval-Augmented LLM System for SEC 10-K Analysis',
    bullets: [
      'Designed and developed a backend document processing service using FastAPI and Docker to ingest and serve SEC 10-K filings from 10,000+ public companies.',
      'Implemented FAISS-based vector indexing with embedding models to enable fast semantic retrieval across large financial documents.',
      'Built a Retrieval-Augmented Generation (RAG) pipeline to support contextual Q&A over long regulatory filings.',
    ],
    tags: ['Python', 'FastAPI', 'Docker', 'FAISS', 'LangChain', 'RAG', 'HuggingFace'],
    github: null,
    dashboard: null,
    diagram: null,
  },
  {
    num: '02 /',
    accentColor: '#38bdf8',
    title: 'Cloud-Based Big Data & MLOps Pipeline (AWS, PySpark)',
    bullets: [
      'Architected an event-driven ETL pipeline using AWS S3 triggers, Lambda, and distributed PySpark processing on EC2 to ingest and process 500,000+ records.',
      'Built orchestration logic for batch processing, failure handling, and job monitoring across distributed compute nodes.',
      'Integrated automated model training workflows using AWS SageMaker and connected outputs to downstream analytics dashboards.',
    ],
    tags: ['AWS', 'PySpark', 'S3', 'EC2', 'Lambda', 'SageMaker', 'MLOps', 'Power BI'],
    github: 'https://github.com/AlbenZap/aws-bigdata-mlops-pipeline',
    dashboard: null,
    diagram: '/images/aws-pipeline.png',
  },
  {
    num: '03 /',
    accentColor: '#f472b6',
    title: 'Public Transit On-Time Performance Dashboard',
    bullets: [
      'Transformed and cleaned millions of GPS and APC transit records (2022-2024) into a centralized analytics platform.',
      'Tracked On-Time Performance across routes, service days, and timeframes to support stakeholder decision-making and open data initiatives.',
    ],
    tags: ['Data Visualization', 'Power BI', 'Power Query', 'DAX'],
    github: 'https://github.com/AlbenZap/indygo-ontime-dashboard',
    dashboard: 'https://app.powerbi.com/view?r=eyJrIjoiY2JhZGFjNGYtNjBhMC00YjQxLWJmMWMtOGJjZGI1YWY4ZTZiIiwidCI6IjExMTNiZTM0LWFlZDEtNGQwMC1hYjRiLWNkZDAyNTEwYmU5MSIsImMiOjN9',
    diagram: null,
  },
  {
    num: '04 /',
    accentColor: '#818cf8',
    title: 'Lie Detection Using Facial Analysis, Electrodermal Activity, Pulse and Temperature',
    bullets: [
      'Developed a real-time classification pipeline integrating ML models, facial recognition, and IoT biosensor data.',
      'Integrated multi-modal biological signals and facial features into a unified predictive model.',
    ],
    tags: ['Python', 'Scikit-Learn', 'Machine Learning', 'OpenCV', 'IoT'],
    github: 'https://github.com/AlbenZap/Lie-Detector',
    dashboard: null,
    diagram: null,
  },
]

function DiagramModal({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '56px 32px 32px',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'fixed', top: '20px', right: '20px',
          background: 'rgba(15,16,17,0.95)',
          border: '1px solid #1a2e2c',
          borderRadius: '3px',
          color: '#94a3b8',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '8px',
          transition: 'color 0.15s ease, border-color 0.15s ease',
          zIndex: 1001,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.color = '#e2e8f0'
          el.style.borderColor = 'rgba(94,234,212,0.35)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.color = '#94a3b8'
          el.style.borderColor = '#1a2e2c'
        }}
      >
        <CloseIcon />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw', maxHeight: '85vh',
          background: '#0f1011',
          border: '1px solid #1a2e2c',
          borderRadius: '6px',
          overflow: 'hidden',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Pipeline Architecture Diagram"
          style={{ display: 'block', maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain' }}
        />
      </div>
    </div>
  )
}

export default function Projects() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [diagramSrc, setDiagramSrc] = useState<string | null>(null)

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
            duration: 0.65,
            ease: 'power3.out',
            delay: (index % 2) * 0.1,
          })
          observer.unobserve(el)
        })
      },
      { threshold: 0.08 }
    )

    cardsRef.current.forEach((el) => {
      if (!el) return
      gsap.set(el, { opacity: 0, y: 28 })
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="projects"
      style={{
        padding: '40px 40px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <div className="section-label" style={{ marginBottom: '32px' }}>
        // projects
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
        }}
        className="projects-grid"
      >
        {projects.map((project, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el }}
            style={{
              background: '#0f1011',
              border: '1px solid #1a2e2c',
              borderRadius: '4px',
              overflow: 'hidden',
              position: 'relative',
              transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
              cursor: project.github ? 'pointer' : 'default',
              display: 'flex',
              flexDirection: 'column',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = `${project.accentColor}55`
              el.style.transform = 'translateY(-4px)'
              el.style.boxShadow = `0 12px 32px ${project.accentColor}14, 0 4px 12px rgba(0,0,0,0.3)`
              const num = el.querySelector('.proj-num') as HTMLElement
              if (num) num.style.color = project.accentColor
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#1a2e2c'
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'none'
              const num = el.querySelector('.proj-num') as HTMLElement
              if (num) num.style.color = '#475569'
            }}
            onClick={(e) => {
              if (!project.github) return
              const target = e.target as HTMLElement
              if (target.closest('button') || target.closest('a')) return
              window.open(project.github, '_blank', 'noopener,noreferrer')
            }}
          >
            <div style={{ height: '2px', background: `linear-gradient(to right, ${project.accentColor}, transparent)`, flexShrink: 0 }} />

            <div style={{ padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div
                  className="proj-num"
                  style={{
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: '11px',
                    color: '#475569',
                    letterSpacing: '1px',
                    transition: 'color 0.25s ease',
                  }}
                >
                  {project.num}
                </div>

                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  {project.diagram && (
                    <button
                      onClick={() => setDiagramSrc(project.diagram!)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        fontFamily: 'var(--font-jetbrains), monospace',
                        fontSize: '11px', letterSpacing: '0.8px',
                        color: '#64748b',
                        background: 'transparent',
                        border: '1px solid #1e293b',
                        borderRadius: '2px',
                        padding: '3px 8px',
                        cursor: 'pointer',
                        transition: 'color 0.15s ease, border-color 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = project.accentColor
                        el.style.borderColor = `${project.accentColor}50`
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = '#64748b'
                        el.style.borderColor = '#1e293b'
                      }}
                    >
                      <DiagramIcon />
                      Architecture
                    </button>
                  )}
                  {project.dashboard && (
                    <a
                      href={project.dashboard}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        fontFamily: 'var(--font-jetbrains), monospace',
                        fontSize: '11px', letterSpacing: '0.8px',
                        color: '#64748b',
                        textDecoration: 'none',
                        border: '1px solid #1e293b',
                        borderRadius: '2px',
                        padding: '3px 8px',
                        transition: 'color 0.15s ease, border-color 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = project.accentColor
                        el.style.borderColor = `${project.accentColor}50`
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = '#64748b'
                        el.style.borderColor = '#1e293b'
                      }}
                    >
                      <ExternalIcon />
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        fontFamily: 'var(--font-jetbrains), monospace',
                        fontSize: '11px', letterSpacing: '0.8px',
                        color: '#64748b',
                        textDecoration: 'none',
                        border: '1px solid #1e293b',
                        borderRadius: '2px',
                        padding: '3px 8px',
                        transition: 'color 0.15s ease, border-color 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = project.accentColor
                        el.style.borderColor = `${project.accentColor}50`
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = '#64748b'
                        el.style.borderColor = '#1e293b'
                      }}
                    >
                      <GitHubIcon />
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              <div
                style={{
                  fontSize: '15px',
                  color: '#e2e8f0',
                  fontWeight: 600,
                  letterSpacing: '-0.2px',
                  marginBottom: '18px',
                  lineHeight: 1.4,
                }}
              >
                {project.title}
              </div>

              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginBottom: '22px',
                  flex: 1,
                }}
              >
                {project.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: '13px',
                      color: '#94a3b8',
                      lineHeight: 1.8,
                      paddingLeft: '12px',
                      position: 'relative',
                      textAlign: 'justify',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '11px',
                        width: '4px',
                        height: '1px',
                        background: project.accentColor,
                        opacity: 0.5,
                      }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-jetbrains), monospace',
                      fontSize: '11px',
                      letterSpacing: '0.5px',
                      color: '#5eead4',
                      border: '1px solid rgba(94,234,212,0.25)',
                      padding: '2px 8px',
                      borderRadius: '2px',
                      display: 'inline-block',
                      transition: 'border-color 0.15s ease, background 0.15s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = `${project.accentColor}70`
                      el.style.background = `${project.accentColor}12`
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'rgba(94,234,212,0.25)'
                      el.style.background = 'transparent'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {diagramSrc && <DiagramModal src={diagramSrc} onClose={() => setDiagramSrc(null)} />}

      <style>{`
        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
