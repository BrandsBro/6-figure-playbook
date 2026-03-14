'use client'

import { useEffect, useRef } from 'react'

/**
 * Returns a ref to attach to a container.
 * Adds the "visible" class to every child with class "fadeUp"
 * when the container enters the viewport.
 */
export function useFadeUp() {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const targets = container.querySelectorAll('.fadeUp')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )

    targets.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.1}s`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return ref
}
