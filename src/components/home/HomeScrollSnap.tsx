import { useEffect, useRef } from 'react'

const MIN_DURATION_MS = 720
const MAX_DURATION_MS = 1100
const MS_PER_PX = 0.9
const HERO_READY_MAX_SCROLL = 12
const WHEEL_THRESHOLD = 120
const SCROLL_TRIGGER_MIN = 80
const TOUCH_THRESHOLD = 64

function getHeaderOffset(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-h').trim()
  const header = Number.parseInt(raw, 10)
  return Number.isFinite(header) ? header : 76
}

function getFeaturesScrollTop(features: HTMLElement): number {
  const top = features.getBoundingClientRect().top + window.scrollY
  return Math.max(0, top - getHeaderOffset())
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

export default function HomeScrollSnap() {
  const snappingRef = useRef(false)
  const returningToHeroRef = useRef(false)
  const wheelAccumRef = useRef(0)
  const lastScrollYRef = useRef(0)
  const touchStartYRef = useRef<number | null>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    document.documentElement.classList.add('home-snap')
    lastScrollYRef.current = window.scrollY

    const features = () => document.getElementById('features')

    const isHeroReady = () => window.scrollY <= HERO_READY_MAX_SCROLL

    const isAnimating = () => snappingRef.current

    const isBlocked = () =>
      isAnimating() ||
      returningToHeroRef.current ||
      document.body.classList.contains('tour-active')

    const isInHeroZone = () => {
      const section = features()
      if (!section) return false
      const y = window.scrollY
      const targetTop = getFeaturesScrollTop(section)
      return y < targetTop - 16
    }

    const resetWheelAccum = () => {
      wheelAccumRef.current = 0
    }

    const onScroll = () => {
      const y = window.scrollY
      const lastY = lastScrollYRef.current

      if (snappingRef.current) {
        lastScrollYRef.current = y
        return
      }

      if (y < lastY && y > HERO_READY_MAX_SCROLL) {
        returningToHeroRef.current = true
      }

      if (y <= HERO_READY_MAX_SCROLL) {
        returningToHeroRef.current = false
        resetWheelAccum()
      }

      lastScrollYRef.current = y
    }

    const stopAnimation = () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }

    const smoothScrollTo = (targetY: number) => {
      stopAnimation()

      const startY = window.scrollY
      const distance = targetY - startY

      if (Math.abs(distance) < 2) {
        snappingRef.current = false
        return
      }

      const duration = Math.min(
        MAX_DURATION_MS,
        Math.max(MIN_DURATION_MS, Math.abs(distance) * MS_PER_PX),
      )
      const startTime = performance.now()

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        window.scrollTo(0, startY + distance * easeOutCubic(progress))

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(tick)
        } else {
          animationRef.current = null
          snappingRef.current = false
        }
      }

      animationRef.current = requestAnimationFrame(tick)
    }

    const snapToFeatures = () => {
      const section = features()
      if (!section || isBlocked() || !isInHeroZone()) return

      returningToHeroRef.current = false
      snappingRef.current = true
      resetWheelAccum()
      smoothScrollTo(getFeaturesScrollTop(section))
    }

    const onWheel = (event: WheelEvent) => {
      if (isAnimating()) {
        event.preventDefault()
        return
      }

      if (isBlocked() || !isInHeroZone()) {
        resetWheelAccum()
        return
      }

      if (event.deltaY <= 0) {
        if (isHeroReady()) resetWheelAccum()
        return
      }

      if (!isHeroReady() && wheelAccumRef.current === 0) return

      event.preventDefault()

      if (!isHeroReady()) return

      wheelAccumRef.current += event.deltaY
      if (wheelAccumRef.current < WHEEL_THRESHOLD) return

      resetWheelAccum()
      snapToFeatures()
    }

    const onTouchMove = (event: TouchEvent) => {
      if (!isAnimating()) return
      event.preventDefault()
    }

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null
    }

    const onTouchEnd = (event: TouchEvent) => {
      const startY = touchStartYRef.current
      touchStartYRef.current = null
      if (startY === null || isBlocked() || !isInHeroZone() || !isHeroReady()) return

      const endY = event.changedTouches[0]?.clientY
      if (endY === undefined) return
      if (startY - endY < TOUCH_THRESHOLD) return

      snapToFeatures()
    }

    const onScrollEnd = () => {
      if (isBlocked() || !isInHeroZone()) return

      const y = window.scrollY
      if (y < SCROLL_TRIGGER_MIN) return

      snapToFeatures()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (isAnimating()) {
        const upKeys = ['ArrowUp', 'PageUp', 'Home']
        if (upKeys.includes(event.key)) {
          event.preventDefault()
        }
        return
      }

      if (isBlocked() || !isInHeroZone() || !isHeroReady()) return
      const downKeys = ['ArrowDown', 'PageDown', ' ']
      if (!downKeys.includes(event.key)) return
      if (event.key === ' ' && event.target instanceof HTMLElement) {
        const tag = event.target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || event.target.isContentEditable) {
          return
        }
      }
      event.preventDefault()
      snapToFeatures()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('scrollend', onScrollEnd, { passive: true })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.documentElement.classList.remove('home-snap')
      stopAnimation()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('scrollend', onScrollEnd)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return null
}
