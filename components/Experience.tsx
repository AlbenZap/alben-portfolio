'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const experiences = [
  {
    accentColor: '#7C2529',
    logo: '/logos/iu-medicine.svg',
    year: 'Nov 2025 - Present',
    institution: 'Indiana University',
    department: 'School of Medicine',
    location: 'Bloomington, IN, USA',
    role: 'Graduate Research Assistant',
    bullets: [
      'Deployed a clinical NLP pipeline on H100 GPU partitions (HPC) using GPT and LLaMA transformer models to extract structured variables from unstructured clinical reports, evaluating output accuracy against expert-labeled ground truth.',
      'Built Python signal denoising and feature extraction modules for multi-modal neuroimaging data (MRI, fMRI, DTI) across 300+ subjects, producing analysis-ready datasets for cohort-level statistical modeling.',
      'Automated neuroimaging preprocessing workflows (fMRIPrep, QSIPrep/QSIRecon) on an HPC cluster, standardizing raw DICOM data to BIDS format to ensure consistent, high-quality inputs across the full subject cohort.',
      'Mapped structural and functional brain connectivity networks across multiple neurological atlases, resolving data grouping anomalies and standardizing hierarchical relational structures to enable accurate downstream statistical analysis and cohort-level modeling.',
    ],
    tags: ['Python', 'LLM', 'NLP', 'HPC', 'SLURM', 'Apptainer', 'Neuroimaging', 'FSL', 'FreeSurfer'],
  },
  {
    accentColor: '#7C2529',
    logo: '/logos/kelley.svg',
    year: 'May - Aug 2025',
    institution: 'Indiana University',
    department: 'Kelley School of Business',
    location: 'Bloomington, IN, USA',
    role: 'Graduate Research Assistant',
    bullets: [
      'Engineered Python ETL pipelines to ingest, clean, and transform large-scale FCC broadband and U.S. Census data across 10,000+ school districts, resolving schema inconsistencies and building the district-level data model.',
      'Built R-based data wrangling pipelines to harmonize 5 quarters of nurse engagement survey data across 70+ hospital units, producing statistical correlation matrix visualizations across 13 dimensions for a healthcare operations study.',
    ],
    tags: ['Python', 'R', 'ETL', 'Data Wrangling', 'Statistical Analysis', 'Data Visualization'],
  },
  {
    accentColor: '#0070AD',
    logo: '/logos/capgemini.svg',
    year: 'Jul 2021 - Jul 2024',
    institution: 'Capgemini',
    department: '',
    location: 'Mumbai, MH, India',
    role: 'Senior Analyst / Software Engineer',
    bullets: [
      'Engineered SQL and Python-based ETL pipelines to automate financial reporting across 7 business units and 25+ global regions, replacing error-prone Excel workflows and improving reporting accuracy by 15%, enabling leadership to make faster, data-driven decisions at scale.',
      'Developed interactive Power BI dashboards tracking global P&L and financial KPIs for senior leadership, backed by Flask APIs and optimized SQL pipelines, cutting ad-hoc reporting requests and delivering real-time business intelligence.',
      'Led end-to-end POC for migrating legacy ETL workflows and analytics dashboards to Microsoft Fabric, redesigning the data transformation layer and validating the full system architecture to reduce query latency and improve scalability.',
      'Tuned ARIMA model parameters and engineered input features for time-series forecasting simulations, validating model performance against holdout data and optimizing execution pipeline to reduce runtime by 25%.',
    ],
    tags: ['Python', 'SQL', 'Flask', 'REST API', 'Power BI', 'ETL', 'Microsoft Fabric', 'ARIMA'],
  },
]

export default function Experience() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const entryDotRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!wrapperRef.current || !lineRef.current || !dotRef.current) return

    gsap.set(lineRef.current, { scaleY: 0 })
    gsap.set(dotRef.current, { y: 0 })

    const maxY = wrapperRef.current.offsetHeight - 12
    const wrapper = wrapperRef.current

    const rawThresholds = entryDotRefs.current.map((el) => {
      if (!el) return 0
      let top = 0
      let node: HTMLElement | null = el
      while (node && node !== wrapper) {
        top += node.offsetTop
        node = node.offsetParent as HTMLElement | null
      }
      return top / maxY
    })
    const thresholds = rawThresholds.map((t, i) => (i === 0 ? 0 : t))

    const checkDots = (p: number) => {
      let current = -1
      thresholds.forEach((t, i) => { if (p >= t) current = i })
      entryDotRefs.current.forEach((el, i) => {
        if (!el) return
        if (i === current) {
          el.classList.add('exp-dot-active')
          el.classList.remove('exp-dot-settled')
        } else if (i < current) {
          el.classList.remove('exp-dot-active')
          el.classList.add('exp-dot-settled')
        } else {
          el.classList.remove('exp-dot-active', 'exp-dot-settled')
        }
      })
    }

    const clearDots = () => {
      entryDotRefs.current.forEach((el) => {
        el?.classList.remove('exp-dot-active', 'exp-dot-settled')
      })
    }

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top 65%',
      end: 'bottom 35%',
      scrub: 1.2,
      onEnter: () => checkDots(0.001),
      onLeaveBack: clearDots,
      onUpdate: (self) => {
        const p = self.progress
        gsap.set(lineRef.current, { scaleY: p })
        gsap.set(dotRef.current, { y: p * maxY })
        checkDots(p)
      },
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const index = cardsRef.current.indexOf(el as HTMLDivElement)
          gsap.to(el, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', delay: index * 0.06 })
          observer.unobserve(el)
        })
      },
      { threshold: 0.08 }
    )

    cardsRef.current.forEach((el) => {
      if (!el) return
      gsap.set(el, { opacity: 0, x: 16 })
      observer.observe(el)
    })

    return () => {
      st.kill()
      observer.disconnect()
    }
  }, [])

  return (
    <section
      id="experience"
      style={{ padding: '40px 40px', maxWidth: '1100px', margin: '0 auto' }}
    >
      <div className="section-label" style={{ marginBottom: '40px' }}>
        // experience
      </div>

      <div
        ref={wrapperRef}
        style={{
          position: 'relative',
          paddingLeft: '24px',
          borderLeft: '1px solid #1a2e2c',
        }}
      >
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            left: '-1px',
            top: 0,
            width: '1px',
            height: '100%',
            background: 'linear-gradient(to bottom, #5eead4, rgba(94,234,212,0.15))',
            transformOrigin: 'top center',
            pointerEvents: 'none',
          }}
        />

        <div
          ref={dotRef}
          style={{
            position: 'absolute',
            left: '-6px',
            top: 0,
            width: '11px',
            height: '11px',
            borderRadius: '50%',
            background: '#080909',
            border: '2px solid #5eead4',
            boxShadow: '0 0 10px rgba(94,234,212,0.8), 0 0 20px rgba(94,234,212,0.3)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {experiences.map((exp, i) => (
            <div key={i} className="exp-row" style={{ display: 'flex', gap: '32px' }}>

              <div
                className="exp-left"
                style={{ width: '152px', flexShrink: 0, paddingTop: '20px', position: 'relative' }}
              >
                <div
                  ref={(el) => { entryDotRefs.current[i] = el }}
                  data-color={exp.accentColor}
                  className="exp-entry-dot"
                  style={{
                    position: 'absolute',
                    left: '-29px',
                    top: '24px',
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: 'rgba(94,234,212,0.3)',
                    zIndex: 3,
                  }}
                />

                <div style={{ marginBottom: '10px' }}>
                  <img
                    src={exp.logo}
                    alt={exp.institution}
                    style={{ width: 'auto', height: '48px', objectFit: 'contain', display: 'block' }}
                  />
                </div>

                <div style={{ fontSize: '13px', fontWeight: 500, color: '#e2e8f0', lineHeight: 1.35, marginBottom: '4px' }}>
                  {exp.institution}
                </div>
                {exp.department && (
                  <div style={{
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: '12px',
                    color: '#64748b',
                    letterSpacing: '0.2px',
                  }}>
                    {exp.department}
                  </div>
                )}

                <div style={{ marginTop: '14px' }}>
                  <div style={{
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: '12px',
                    color: '#5eead4',
                    letterSpacing: '0.3px',
                    marginBottom: '3px',
                  }}>
                    {exp.year}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: '12px',
                    color: '#64748b',
                    letterSpacing: '0.2px',
                  }}>
                    {exp.location}
                  </div>
                </div>
              </div>

              <div
                ref={(el) => { cardsRef.current[i] = el }}
                style={{
                  flex: 1,
                  background: '#0f1011',
                  border: '1px solid #1a2e2c',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  transition: 'border-color 0.25s ease, transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = `${exp.accentColor}55`
                  el.style.transform = 'translateY(-2px)'
                  el.style.boxShadow = `0 8px 24px ${exp.accentColor}12`
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = '#1a2e2c'
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'none'
                }}
              >
                <div style={{ height: '2px', background: `linear-gradient(to right, ${exp.accentColor}, transparent)` }} />

                <div style={{ padding: '20px 24px 24px' }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#e2e8f0',
                    letterSpacing: '-0.1px',
                    marginBottom: '14px',
                  }}>
                    {exp.role}
                  </div>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '18px' }}>
                    {exp.bullets.map((bullet, j) => (
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
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          top: '12px',
                          width: '4px',
                          height: '1px',
                          background: exp.accentColor,
                          opacity: 0.6,
                        }} />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {exp.tags.map((tag) => (
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
                          el.style.borderColor = `${exp.accentColor}70`
                          el.style.background = `${exp.accentColor}12`
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
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .exp-entry-dot {
          transition: background 0.3s ease;
        }
        .exp-dot-active {
          background: rgba(94,234,212,0.95) !important;
          animation: exp-dot-pulse 1.6s ease-in-out infinite;
        }
        .exp-dot-settled {
          background: rgba(94,234,212,0.45) !important;
        }
        @keyframes exp-dot-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(94,234,212,0.55), 0 0 8px rgba(94,234,212,0.6);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(94,234,212,0.0), 0 0 18px rgba(94,234,212,1), 0 0 32px rgba(94,234,212,0.4);
          }
        }
        @media (max-width: 640px) {
          .exp-row { flex-direction: column !important; gap: 8px !important; }
          .exp-left { width: auto !important; padding-top: 0 !important; }
        }
      `}</style>
    </section>
  )
}
