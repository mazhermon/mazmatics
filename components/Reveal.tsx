import React, { useEffect, useRef, useState } from 'react'

import styles from './reveal.module.css'

type Variant = 'up' | 'fade'

interface RevealProps {
  children: React.ReactNode
  /** `up` = fade + translateY-12, `fade` = opacity only. Default `up`. */
  variant?: Variant
  /** Stagger delay in ms. Default 0. */
  delay?: number
  /** Override the IntersectionObserver threshold. Default 0.15. */
  threshold?: number
  /** Render as a custom element. Default `div`. */
  as?: keyof JSX.IntrinsicElements
  className?: string
}

/**
 * Wraps content in a scroll-revealed entry. Uses IntersectionObserver
 * (single fire) so it doesn't tax scroll performance. Animates only
 * `transform` and `opacity` for GPU-friendly motion. Skipped entirely
 * for users who prefer reduced motion — content renders in its final
 * state immediately so there's no delayed read.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'up',
  delay = 0,
  threshold = 0.15,
  as: Tag = 'div',
  className,
}) => {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setShown(true)
      return
    }
    const node = ref.current
    if (!node) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true)
            obs.disconnect()
          }
        })
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [reducedMotion, threshold])

  const stateClass = shown ? styles.shown : styles.hidden
  const variantClass = variant === 'fade' ? styles.fade : styles.up
  const composedClass = [styles.reveal, variantClass, stateClass, className]
    .filter(Boolean)
    .join(' ')

  return React.createElement(
    Tag,
    {
      ref: ref as React.RefObject<HTMLDivElement>,
      className: composedClass,
      style: delay
        ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties)
        : undefined,
    },
    children
  )
}
