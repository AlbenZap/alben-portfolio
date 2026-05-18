'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const iconBtn = {
  background: 'none',
  border: '1px solid #1a2e2c',
  color: '#94a3b8',
  cursor: 'pointer',
  width: '24px',
  height: '24px',
  borderRadius: '2px',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const

export default function ResumeModal({ onClose }: { onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [numPages, setNumPages] = useState(0)
  const [scale, setScale] = useState(1.0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(modalRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return
    e.preventDefault()
    setScale(s => {
      const next = s - e.deltaY * 0.001
      return parseFloat(Math.min(2.0, Math.max(0.5, next)).toFixed(2))
    })
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  const close = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: onClose })
  }

  return (
    <div
      ref={overlayRef}
      onClick={close}
      style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(8,9,9,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', backdropFilter: 'blur(4px)' }}
    >
      <div
        ref={modalRef}
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '860px', height: '90vh', background: '#0f1011', border: '1px solid #1a2e2c', borderRadius: '4px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #1a2e2c', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '11px', letterSpacing: '2px', color: '#e2e8f0' }}>
            Alben Antappan - Resume
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Zoom */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setScale(s => Math.max(0.5, parseFloat((s - 0.1).toFixed(1))))}
                style={iconBtn}
                aria-label="Zoom out"
              >
                −
              </button>
              <span style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '10px', color: '#94a3b8', minWidth: '36px', textAlign: 'center' }}>
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale(s => Math.min(2.0, parseFloat((s + 0.1).toFixed(1))))}
                style={iconBtn}
                aria-label="Zoom in"
              >
                +
              </button>
            </div>

            {/* Download */}
            <a
              href="/resume.pdf"
              download
              style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '10px', letterSpacing: '1.5px', color: '#5eead4', textDecoration: 'none', border: '1px solid rgba(94,234,212,0.3)', padding: '6px 14px', borderRadius: '2px', transition: 'background 0.2s ease' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(94,234,212,0.06)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
            >
              Download
            </a>

            {/* Close */}
            <button
              onClick={close}
              style={{ background: 'none', border: 'none', color: '#334155', cursor: 'pointer', padding: '4px', display: 'flex', transition: 'color 0.2s ease' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#e2e8f0')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#334155')}
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div
          ref={scrollRef}
          style={{ flex: 1, minHeight: 0, overflowY: 'auto', background: '#1a1a1a', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0', gap: '12px' }}
          data-lenis-prevent
        >
          <Document
            file="/resume.pdf"
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={
              <div style={{ color: '#94a3b8', fontFamily: 'var(--font-jetbrains), monospace', fontSize: '12px', marginTop: '40px' }}>
                Loading...
              </div>
            }
          >
            {Array.from({ length: numPages }, (_, i) => (
              <Page
                key={i + 1}
                pageNumber={i + 1}
                scale={scale}
                renderTextLayer
                renderAnnotationLayer
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  )
}
