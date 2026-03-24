'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0

      if (barRef.current) barRef.current.style.width = `${pct}%`
      if (dotRef.current) {
        const show = pct > 0.5 && pct < 99.5
        dotRef.current.style.display = show ? 'block' : 'none'
        dotRef.current.style.left = `${pct}%`
      }
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 200,
        background: 'rgba(94,234,212,0.07)',
      }}
    >
      <div
        ref={barRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '0%',
          background: 'linear-gradient(to right, rgba(94,234,212,0.6), #5eead4)',
          boxShadow: '0 0 6px rgba(94,234,212,0.5)',
          transition: 'width 80ms linear',
        }}
      />
      <div
        ref={dotRef}
        style={{
          display: 'none',
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: '#5eead4',
          boxShadow: '0 0 10px 2px rgba(94,234,212,0.9)',
        }}
      />
    </div>
  )
}
