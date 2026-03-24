'use client'

import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Recommendations', href: '#recommendations' },
  { label: 'Contact', href: '#contact' },
]

const NAV_HEIGHT = 80

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
  window.scrollTo({ top: y, behavior: 'smooth' })
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = ['about', 'experience', 'education', 'projects', 'skills', 'recommendations', 'contact']
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-30% 0px -65% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    scrollToSection(href.replace('#', ''))
  }

  const isActive = (href: string) => active === href.replace('#', '')

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 40px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
        background: scrolled ? 'rgba(8,9,9,0.90)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(94,234,212,0.08)' : '1px solid transparent',
      }}
    >
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        style={{
          fontFamily: 'var(--font-jetbrains), monospace',
          fontSize: '14px',
          color: '#5eead4',
          letterSpacing: '2px',
          textDecoration: 'none',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          transition: 'opacity 0.2s ease',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.75' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
      >
        AA_
      </a>

      <div
        className="hidden-mobile"
        style={{
          position: 'absolute',
          left: '96px',
          top: '22px',
          width: '1px',
          height: '20px',
          background: 'rgba(94,234,212,0.12)',
        }}
      />

      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} className="hidden-mobile">
        {navLinks.map((link) => {
          const id = link.href.replace('#', '')
          const active_ = isActive(link.href)
          const hover_ = hovered === id
          return (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered('')}
              style={{
                fontFamily: 'var(--font-jetbrains), monospace',
                fontSize: '12px',
                letterSpacing: '1.5px',
                color: active_ ? '#5eead4' : hover_ ? '#a5f3eb' : '#7a8ea8',
                background: active_ ? 'rgba(94,234,212,0.06)' : hover_ ? 'rgba(94,234,212,0.04)' : 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '5px 12px',
                borderRadius: '3px',
                transition: 'color 0.2s ease, background 0.2s ease',
                position: 'relative',
              }}
            >
              {link.label}
              <span
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: active_ ? '16px' : '0',
                  height: '1.5px',
                  background: '#5eead4',
                  borderRadius: '1px',
                  transition: 'width 0.3s ease',
                  display: 'block',
                }}
              />
            </button>
          )
        })}
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        className="show-mobile"
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          flexDirection: 'column',
          gap: '5px',
          padding: '4px',
        }}
      >
        <span style={{ display: 'block', width: '20px', height: '1px', background: menuOpen ? '#5eead4' : '#94a3b8', transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
        <span style={{ display: 'block', width: '20px', height: '1px', background: menuOpen ? '#5eead4' : '#94a3b8', transition: 'all 0.2s', opacity: menuOpen ? 0 : 1 }} />
        <span style={{ display: 'block', width: '20px', height: '1px', background: menuOpen ? '#5eead4' : '#94a3b8', transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
      </button>

      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '64px',
            left: 0,
            right: 0,
            background: 'rgba(8,9,9,0.97)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(94,234,212,0.08)',
            padding: '24px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              style={{
                fontFamily: 'var(--font-jetbrains), monospace',
                fontSize: '13px',
                letterSpacing: '2px',
                color: isActive(link.href) ? '#5eead4' : '#94a3b8',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                padding: '4px 0',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 641px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
