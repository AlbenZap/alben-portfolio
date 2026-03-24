'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis

    const rafFn = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(rafFn)

    gsap.ticker.lagSmoothing(0)

    // Connect Lenis scroll to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Recompute all trigger positions after Lenis changes scroll metrics
    ScrollTrigger.refresh()

    return () => {
      lenis.destroy()
      gsap.ticker.remove(rafFn)
    }
  }, [])

  return <>{children}</>
}
