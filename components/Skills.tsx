'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const skillGroups = [
  {
    category: 'Core',
    color: '#5eead4',
    skills: ['Python', 'SQL', 'R', 'Java', 'C/C++', 'Statistical Modeling', 'Feature Engineering', 'Data Wrangling', 'Automation'],
  },
  {
    category: 'Machine Learning',
    color: '#818cf8',
    skills: ['Scikit-Learn', 'PyTorch', 'Pandas', 'NumPy', 'AWS SageMaker'],
  },
  {
    category: 'AI',
    color: '#c084fc',
    skills: ['LLM', 'RAG', 'LangChain', 'LangSmith', 'FAISS', 'HuggingFace'],
  },
  {
    category: 'Data Engineering',
    color: '#fb923c',
    skills: ['PySpark', 'Spark', 'Kafka', 'Airflow', 'dbt', 'ETL', 'Distributed Processing', 'Relational Data Modeling'],
  },
  {
    category: 'Cloud & Platforms',
    color: '#38bdf8',
    skills: ['AWS', 'S3', 'EC2', 'Lambda', 'SageMaker', 'GCP', 'BigQuery', 'Microsoft Azure', 'Microsoft Fabric', 'Snowflake'],
  },
  {
    category: 'Visualization & BI',
    color: '#f472b6',
    skills: ['Power BI', 'Tableau', 'Looker', 'Grafana', 'Plotly', 'Matplotlib', 'Seaborn', 'DAX', 'Power Query'],
  },
  {
    category: 'Backend & APIs',
    color: '#34d399',
    skills: ['Flask', 'FastAPI', 'RESTful API', 'Streamlit'],
  },
  {
    category: 'DevOps & Tools',
    color: '#a78bfa',
    skills: ['Git', 'GitHub Actions', 'CI/CD', 'Docker', 'SLURM', 'Apptainer', 'Bash', 'Shell'],
  },
]

const certGroups = [
  {
    issuer: 'Microsoft',
    color: '#0078d4',
    certs: [
      { name: 'Power BI Data Analyst Associate', verifyUrl: 'https://learn.microsoft.com/en-us/users/albenantappan-6254/credentials/391b0ef913cccf32' },
      { name: 'Azure AI Fundamentals', verifyUrl: 'https://learn.microsoft.com/en-us/users/albenantappan-6254/credentials/8f813456e8156b33' },
    ],
  },
  {
    issuer: 'Google',
    color: '#4285f4',
    certs: [
      { name: 'GCP Professional Machine Learning Engineer', verifyUrl: 'https://www.credly.com/badges/08bf8163-8fd4-413f-9ffd-b7a6ac0ea912' },
      { name: 'IT Automation with Python', verifyUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/4JY9X477GLCV' },
    ],
  },
  {
    issuer: 'Coursera',
    color: '#0056d2',
    certs: [
      { name: 'IBM Data Science Professional Certificate', verifyUrl: 'https://www.credly.com/badges/f830022e-d548-48b7-aac3-4a1e77166215/' },
      { name: 'Deep Learning Specialization', verifyUrl: 'https://www.coursera.org/account/accomplishments/specialization/DXQG9M8GUWC3' },
    ],
  },
  {
    issuer: 'NPTEL',
    color: '#f97316',
    certs: [
      { name: 'Data Science for Engineers', verifyUrl: 'https://archive.nptel.ac.in/noc/E_Certificate/NPTEL19CS60S11690496191029837' },
      { name: 'Cloud Computing', verifyUrl: 'https://archive.nptel.ac.in/noc/Ecertificate/?q=noc19-cs27/NPTEL19CS27S31780125191010147.jpg' },
    ],
  },
]

const VerifyIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

export default function Skills() {
  const groupsRef = useRef<(HTMLDivElement | null)[]>([])
  const certsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const groupObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const index = groupsRef.current.indexOf(el as HTMLDivElement)
          gsap.to(el, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: (index % 3) * 0.07 })
          groupObserver.unobserve(el)
        })
      },
      { threshold: 0.05 }
    )
    groupsRef.current.forEach((el) => {
      if (!el) return
      gsap.set(el, { opacity: 0, y: 18 })
      groupObserver.observe(el)
    })

    const certObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const children = Array.from((entry.target as HTMLElement).children)
          gsap.to(children, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08 })
          certObserver.unobserve(entry.target)
        })
      },
      { threshold: 0.05 }
    )
    if (certsRef.current) {
      Array.from(certsRef.current.children).forEach((c) => gsap.set(c, { opacity: 0, y: 12 }))
      certObserver.observe(certsRef.current)
    }

    return () => { groupObserver.disconnect(); certObserver.disconnect() }
  }, [])

  return (
    <section
      id="skills"
      style={{ padding: '40px 40px', maxWidth: '1100px', margin: '0 auto' }}
    >
      <div className="section-label" style={{ marginBottom: '32px' }}>
        // skills
      </div>

      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '64px' }}
        className="skills-grid"
      >
        {skillGroups.map((group, i) => (
          <div
            key={group.category}
            ref={(el) => { groupsRef.current[i] = el }}
            style={{
              background: '#0f1011',
              border: '1px solid #1a2e2c',
              borderRadius: '4px',
              overflow: 'hidden',
              opacity: 0,
              transition: 'border-color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = `${group.color}40`
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#1a2e2c'
              el.style.transform = 'translateY(0)'
            }}
          >
            <div style={{ height: '2px', background: `linear-gradient(to right, ${group.color}, transparent)` }} />

            <div style={{ padding: '16px 18px 20px' }}>
              <div style={{ marginBottom: '12px' }}>
                <span style={{
                  fontFamily: 'var(--font-jetbrains), monospace',
                  fontSize: '12px',
                  letterSpacing: '2px',
                  color: group.color,
                  textTransform: 'uppercase',
                  opacity: 0.85,
                }}>
                  {group.category}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontFamily: 'var(--font-jetbrains), monospace',
                      fontSize: '11px',
                      color: '#64748b',
                      border: '1px solid #1e293b',
                      padding: '3px 8px',
                      borderRadius: '2px',
                      letterSpacing: '0.2px',
                      transition: 'color 0.15s ease, border-color 0.15s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.color = group.color
                      el.style.borderColor = `${group.color}50`
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.color = '#64748b'
                      el.style.borderColor = '#1e293b'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        fontFamily: 'var(--font-jetbrains), monospace',
        fontSize: '12px',
        letterSpacing: '3px',
        color: '#5eead4',
        textTransform: 'uppercase',
        marginBottom: '24px',
        opacity: 0.7,
      }}>
        Certifications
      </div>

      <div
        ref={certsRef}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}
        className="certs-grid"
      >
        {certGroups.map((group) => (
          <div
            key={group.issuer}
            style={{
              background: '#0f1011',
              border: '1px solid #1a2e2c',
              borderRadius: '4px',
              overflow: 'hidden',
              transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = `${group.color}40`
              el.style.transform = 'translateY(-2px)'
              el.style.boxShadow = `0 8px 20px ${group.color}10`
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#1a2e2c'
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'none'
            }}
          >
            <div style={{ height: '2px', background: `linear-gradient(to right, ${group.color}, transparent)` }} />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '11px 18px',
              borderBottom: '1px solid #1a2e2c',
              background: `${group.color}06`,
            }}>
              <div style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: group.color,
                boxShadow: `0 0 6px ${group.color}77`,
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'var(--font-jetbrains), monospace',
                fontSize: '11px',
                letterSpacing: '2px',
                color: '#94a3b8',
                textTransform: 'uppercase',
              }}>
                {group.issuer}
              </span>
            </div>

            {group.certs.map((cert, j) => (
              <a
                key={cert.name}
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '13px 18px',
                  textDecoration: 'none',
                  borderTop: j > 0 ? '1px solid #1a2e2c' : 'none',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = `${group.color}08`
                  const icon = el.querySelector('.cert-icon') as HTMLElement
                  if (icon) icon.style.color = group.color
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'transparent'
                  const icon = el.querySelector('.cert-icon') as HTMLElement
                  if (icon) icon.style.color = '#475569'
                }}
              >
                <span style={{ fontSize: '13px', color: '#94a3b8', letterSpacing: '-0.1px', lineHeight: 1.4 }}>
                  {cert.name}
                </span>
                <span className="cert-icon" style={{ color: '#475569', transition: 'color 0.15s ease', flexShrink: 0 }}>
                  <VerifyIcon />
                </span>
              </a>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .certs-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
