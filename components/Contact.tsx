'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.17h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.91 5.91l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 15.92z" />
  </svg>
)

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const contactItems = [
  {
    icon: <PhoneIcon />,
    label: '+1 (812) 778-6696',
    href: 'tel:+18127786696',
    external: false,
  },
  {
    icon: <EmailIcon />,
    label: 'alben.antappan@gmail.com',
    href: 'mailto:alben.antappan@gmail.com',
    external: false,
  },
  {
    icon: <LinkedInIcon />,
    label: 'linkedin.com/in/alben-antappan',
    href: 'https://linkedin.com/in/alben-antappan',
    external: true,
  },
  {
    icon: <GitHubIcon />,
    label: 'github.com/AlbenZap',
    href: 'https://github.com/AlbenZap',
    external: true,
  },
  {
    icon: <LocationIcon />,
    label: 'Bloomington, IN',
    href: null,
    external: false,
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    })

    tl.fromTo(
      headlineRef.current?.querySelectorAll('div') ?? [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 }
    )
      .fromTo(
        linksRef.current?.children ?? [],
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08 },
        '-=0.3'
      )
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: '160px 40px 80px',
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div className="section-label" style={{ marginBottom: '40px' }}>
        // contact
      </div>

      <div ref={headlineRef} style={{ marginBottom: '56px' }}>
        <div
          style={{
            fontSize: 'clamp(24px, 4vw, 32px)',
            color: '#e2e8f0',
            fontWeight: 500,
            letterSpacing: '-0.5px',
            lineHeight: 1.3,
            opacity: 0,
          }}
        >
          The signal is clear.
        </div>
        <div
          style={{
            fontSize: 'clamp(24px, 4vw, 32px)',
            color: '#e2e8f0',
            fontWeight: 500,
            letterSpacing: '-0.5px',
            lineHeight: 1.3,
            opacity: 0,
          }}
        >
          Let&apos;s build something real.
        </div>
      </div>

      <div
        ref={linksRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          marginBottom: '48px',
          width: '100%',
          maxWidth: '360px',
        }}
      >
        {contactItems.map((item) =>
          item.href ? (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px 16px',
                borderRadius: '3px',
                textDecoration: 'none',
                color: '#94a3b8',
                transition: 'background 0.2s ease, color 0.2s ease',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(94,234,212,0.04)'
                el.style.color = '#e2e8f0'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'transparent'
                el.style.color = '#94a3b8'
              }}
            >
              <span style={{ color: '#5eead4', flexShrink: 0, display: 'flex' }}>{item.icon}</span>
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains), monospace',
                  fontSize: '13px',
                  letterSpacing: '0.3px',
                }}
              >
                {item.label}
              </span>
            </a>
          ) : (
            <div
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px 16px',
                opacity: 0,
              }}
            >
              <span style={{ color: '#64748b', flexShrink: 0, display: 'flex' }}>{item.icon}</span>
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains), monospace',
                  fontSize: '13px',
                  color: '#64748b',
                  letterSpacing: '0.3px',
                }}
              >
                {item.label}
              </span>
            </div>
          )
        )}
      </div>

      <div
        style={{
          marginTop: '160px',
          width: '100%',
          textAlign: 'center',
          borderTop: '1px solid #1a2e2c',
          paddingTop: '28px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: '12px',
            color: '#64748b',
            letterSpacing: '1px',
          }}
        >
          © 2026 Alben Antappan - All Rights Reserved
        </span>
      </div>
    </section>
  )
}
