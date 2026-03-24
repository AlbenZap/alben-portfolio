'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })

    const mouse = { x: -200, y: -200 }
    const ringPos = { x: -200, y: -200 }

    const setDotX = gsap.quickSetter(dot, 'x', 'px')
    const setDotY = gsap.quickSetter(dot, 'y', 'px')

    let moved = false
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      setDotX(mouse.x)
      setDotY(mouse.y)
      if (!moved) {
        moved = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      }
    }

    const ticker = gsap.ticker.add(() => {
      ringPos.x += (mouse.x - ringPos.x) * 0.12
      ringPos.y += (mouse.y - ringPos.y) * 0.12
      gsap.set(ring, { x: ringPos.x, y: ringPos.y })
    })

    const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
    const onEnter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 })

    const onHoverIn = () => {
      gsap.to(ring, { scale: 1.8, duration: 0.25, ease: 'power2.out' })
      gsap.to(dot, { scale: 0.5, duration: 0.25, ease: 'power2.out' })
    }
    const onHoverOut = () => {
      gsap.to(ring, { scale: 1, duration: 0.25, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.25, ease: 'power2.out' })
    }

    const bindInteractive = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', onHoverIn)
        el.addEventListener('mouseleave', onHoverOut)
      })
    }

    bindInteractive()

    const observer = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.addedNodes.length > 0)) bindInteractive()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      gsap.ticker.remove(ticker)
      observer.disconnect()
      document.querySelectorAll('a, button').forEach((el) => {
        el.removeEventListener('mouseenter', onHoverIn)
        el.removeEventListener('mouseleave', onHoverOut)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#5eead4',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          opacity: 0,
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '1px solid rgba(94,234,212,0.5)',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
        }}
      />
    </>
  )
}
