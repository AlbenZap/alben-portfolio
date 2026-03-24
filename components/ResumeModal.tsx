'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

export default function ResumeModal({ onClose }: { onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(modalRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const close = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: onClose,
    })
  }

  return (
    <div
      ref={overlayRef}
      onClick={close}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'rgba(8,9,9,0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '860px',
          height: '90vh',
          background: '#0f1011',
          border: '1px solid #1a2e2c',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderBottom: '1px solid #1a2e2c',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '11px',
              letterSpacing: '2px',
              color: '#e2e8f0',
            }}
          >
            Alben Antappan - Resume
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="/resume.pdf"
              download
              style={{
                fontFamily: 'var(--font-jetbrains), monospace',
                fontSize: '10px',
                letterSpacing: '1.5px',
                color: '#5eead4',
                textDecoration: 'none',
                border: '1px solid rgba(94,234,212,0.3)',
                padding: '6px 14px',
                borderRadius: '2px',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(94,234,212,0.06)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
            >
              Download
            </a>

            <button
              onClick={close}
              style={{
                background: 'none',
                border: 'none',
                color: '#334155',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#e2e8f0')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#334155')}
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }} data-lenis-prevent>
          <Worker workerUrl="/pdf.worker.min.js">
            <Viewer
              fileUrl="/resume.pdf"
              plugins={[defaultLayoutPluginInstance]}
              theme="dark"
            />
          </Worker>
        </div>
      </div>
    </div>
  )
}
