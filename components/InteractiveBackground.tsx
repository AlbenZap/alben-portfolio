'use client'

import { useEffect, useRef } from 'react'

const N = 55
const MAX_V = 0.28
const CONNECT_R = 150
const BASE_ALPHA = 0.24
const LINE_ALPHA = 0.07
const REPEL_R = 110
const REPEL_F = 0.022
const GLOW_R = 180

interface P { x: number; y: number; vx: number; vy: number }

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    let mx = -9999, my = -9999
    let raf: number

    const pts: P[] = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * MAX_V * 2,
      vy: (Math.random() - 0.5) * MAX_V * 2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      for (const p of pts) {
        if (mx > -9000) {
          const dx = p.x - mx, dy = p.y - my
          const d = Math.hypot(dx, dy)
          if (d < REPEL_R && d > 1) {
            const f = (1 - d / REPEL_R) * REPEL_F
            p.vx += (dx / d) * f
            p.vy += (dy / d) * f
          }
        }
        const spd = Math.hypot(p.vx, p.vy)
        if (spd > MAX_V) { p.vx = p.vx / spd * MAX_V; p.vy = p.vy / spd * MAX_V }
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) { p.x = 0; p.vx *= -1 }
        else if (p.x > W) { p.x = W; p.vx *= -1 }
        if (p.y < 0) { p.y = 0; p.vy *= -1 }
        else if (p.y > H) { p.y = H; p.vy *= -1 }
      }

      const hasMouse = mx > -9000

      ctx.lineWidth = 0.6
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
          if (d >= CONNECT_R) continue

          let a = (1 - d / CONNECT_R) * LINE_ALPHA
          if (hasMouse) {
            const mx2 = (pts[i].x + pts[j].x) / 2, my2 = (pts[i].y + pts[j].y) / 2
            const dm = Math.hypot(mx2 - mx, my2 - my)
            if (dm < GLOW_R) a += (1 - dm / GLOW_R) * 0.18
          }

          ctx.strokeStyle = `rgba(94,234,212,${Math.min(a, 0.28).toFixed(3)})`
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke()
        }
      }

      for (const p of pts) {
        const dm = hasMouse ? Math.hypot(p.x - mx, p.y - my) : 9999
        const nearFactor = dm < GLOW_R ? (1 - dm / GLOW_R) : 0
        const a = BASE_ALPHA + nearFactor * 0.52
        const r = 1.8 + nearFactor * 2.2

        if (nearFactor > 0.15) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, r + 4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(94,234,212,${(nearFactor * 0.06).toFixed(3)})`
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(94,234,212,${Math.min(a, 0.76).toFixed(3)})`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const onLeave = () => { mx = -9999; my = -9999 }
    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W; canvas.height = H
    }

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else raf = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}
    />
  )
}
