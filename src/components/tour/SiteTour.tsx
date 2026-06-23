import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { TourPlacement, TourScrollAlign, TourStep } from '../../data/tour'

type TargetRect = {
  top: number
  left: number
  width: number
  height: number
}

type Props = {
  step: TourStep
  stepIndex: number
  totalSteps: number
  routeReady: boolean
  onNext: () => void
  onPrev: () => void
  onClose: () => void
}

const SPOTLIGHT_PAD = 10
const CARD_GAP = 16
const CARD_WIDTH = 320
const VIEWPORT_PAD = 16
const CARD_FALLBACK_HEIGHT = 300

function getHeaderSafeTop(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-h').trim()
  const header = Number.parseInt(raw, 10)
  return (Number.isFinite(header) ? header : 76) + 12
}

function rectFromElement(element: Element): TargetRect {
  const rect = element.getBoundingClientRect()
  return {
    top: rect.top - SPOTLIGHT_PAD,
    left: rect.left - SPOTLIGHT_PAD,
    width: rect.width + SPOTLIGHT_PAD * 2,
    height: rect.height + SPOTLIGHT_PAD * 2,
  }
}

function scrollElementBelowHeader(element: Element) {
  const rect = element.getBoundingClientRect()
  const targetTop = getHeaderSafeTop() + 8
  window.scrollBy({ top: rect.top - targetTop, behavior: 'auto' })
}

async function measureTargetAsync(
  selector: string,
  mountDelay = 0,
  scrollAlign: TourScrollAlign = 'center',
): Promise<TargetRect | null> {
  if (mountDelay > 0) {
    await new Promise((resolve) => window.setTimeout(resolve, mountDelay))
  }

  const element = document.querySelector(selector)
  if (!element) return null

  if (selector === '.hero-content-inner') {
    window.scrollTo(0, 0)
  } else if (scrollAlign === 'upper' || scrollAlign === 'start') {
    element.scrollIntoView({ block: 'start', behavior: 'auto' })
    scrollElementBelowHeader(element)
  } else {
    element.scrollIntoView({ block: 'center', behavior: 'auto' })
  }

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })

  return rectFromElement(element)
}

function rawCardPosition(
  rect: TargetRect,
  placement: TourPlacement,
): { top: number; left: number } {
  const centerX = rect.left + rect.width / 2 - CARD_WIDTH / 2

  switch (placement) {
    case 'center':
      return {
        top: window.innerHeight / 2 - CARD_FALLBACK_HEIGHT / 2,
        left: window.innerWidth / 2 - CARD_WIDTH / 2,
      }
    case 'bottom':
      return {
        top: rect.top + rect.height + CARD_GAP,
        left: centerX,
      }
    case 'top':
      return {
        top: rect.top - CARD_GAP,
        left: centerX,
      }
    case 'left':
      return {
        top: rect.top + rect.height / 2 - CARD_FALLBACK_HEIGHT / 2,
        left: rect.left - CARD_WIDTH - CARD_GAP,
      }
    case 'right':
    default:
      return {
        top: rect.top + rect.height / 2 - CARD_FALLBACK_HEIGHT / 2,
        left: rect.left + rect.width + CARD_GAP,
      }
  }
}

function clampCardPosition(
  top: number,
  left: number,
  cardHeight: number,
): { top: number; left: number } {
  const minTop = getHeaderSafeTop()
  const maxTop = Math.max(minTop, window.innerHeight - cardHeight - VIEWPORT_PAD)
  const maxLeft = Math.max(VIEWPORT_PAD, window.innerWidth - CARD_WIDTH - VIEWPORT_PAD)

  return {
    top: Math.min(Math.max(minTop, top), maxTop),
    left: Math.min(Math.max(VIEWPORT_PAD, left), maxLeft),
  }
}

function fitsInViewport(top: number, cardHeight: number): boolean {
  const minTop = getHeaderSafeTop()
  return top >= minTop && top + cardHeight <= window.innerHeight - VIEWPORT_PAD
}

function resolveCardPosition(
  rect: TargetRect | null,
  preferred: TourPlacement,
  cardHeight: number,
  cardPinned = false,
): { top: number; left: number } {
  if (!rect || preferred === 'center') {
    return clampCardPosition(
      window.innerHeight / 2 - cardHeight / 2,
      window.innerWidth / 2 - CARD_WIDTH / 2,
      cardHeight,
    )
  }

  if (cardPinned) {
    const raw = rawCardPosition(rect, preferred)
    const adjusted =
      preferred === 'top' ? { ...raw, top: raw.top - cardHeight } : raw
    return clampCardPosition(adjusted.top, adjusted.left, cardHeight)
  }

  const order: TourPlacement[] = [
    preferred,
    'bottom',
    'top',
    'right',
    'left',
    'center',
  ]

  const seen = new Set<TourPlacement>()

  for (const placement of order) {
    if (seen.has(placement)) continue
    seen.add(placement)

    const raw =
      placement === 'center'
        ? { top: window.innerHeight / 2 - cardHeight / 2, left: window.innerWidth / 2 - CARD_WIDTH / 2 }
        : rawCardPosition(rect, placement)

    const adjusted =
      placement === 'top'
        ? { ...raw, top: raw.top - cardHeight }
        : raw

    const clamped = clampCardPosition(adjusted.top, adjusted.left, cardHeight)

    if (placement === 'center' || fitsInViewport(clamped.top, cardHeight)) {
      return clamped
    }
  }

  return clampCardPosition(
    window.innerHeight / 2 - cardHeight / 2,
    window.innerWidth / 2 - CARD_WIDTH / 2,
    cardHeight,
  )
}

export default function SiteTour({
  step,
  stepIndex,
  totalSteps,
  routeReady,
  onNext,
  onPrev,
  onClose,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null)
  const [cardHeight, setCardHeight] = useState(CARD_FALLBACK_HEIGHT)
  const placement = step.placement ?? (step.target ? 'bottom' : 'center')

  useEffect(() => {
    if (!routeReady) {
      setTargetRect(null)
      return
    }

    if (!step.target) {
      setTargetRect(null)
      return
    }

    let cancelled = false

    const measure = async () => {
      const rect = await measureTargetAsync(
        step.target!,
        step.mountDelay ?? 0,
        step.scrollAlign ?? 'center',
      )
      if (!cancelled) setTargetRect(rect)
    }

    void measure()

    const onReflow = () => {
      const element = document.querySelector(step.target!)
      if (element) setTargetRect(rectFromElement(element))
    }

    window.addEventListener('resize', onReflow)
    window.addEventListener('scroll', onReflow, true)

    return () => {
      cancelled = true
      window.removeEventListener('resize', onReflow)
      window.removeEventListener('scroll', onReflow, true)
    }
  }, [routeReady, step.id, step.target, step.mountDelay, step.scrollAlign])

  useLayoutEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight)
    }
  }, [step.id, step.body, targetRect, routeReady])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNext()
      if (event.key === 'ArrowLeft') onPrev()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, onNext, onPrev])

  const cardCoords = useMemo(
    () => resolveCardPosition(targetRect, placement, cardHeight, step.cardPinned),
    [cardHeight, placement, step.cardPinned, targetRect],
  )

  const isLast = stepIndex >= totalSteps - 1

  return createPortal(
    <div className="site-tour" role="dialog" aria-modal="true" aria-labelledby="site-tour-title">
      <button type="button" className="site-tour__backdrop" aria-label="Закрыть тур" onClick={onClose} />

      {targetRect ? (
        <div
          className="site-tour__spotlight"
          style={{
            top: targetRect.top,
            left: targetRect.left,
            width: targetRect.width,
            height: targetRect.height,
          }}
          aria-hidden="true"
        />
      ) : null}

      <div
        ref={cardRef}
        className="brutal-block site-tour__card"
        style={{ top: cardCoords.top, left: cardCoords.left, width: CARD_WIDTH }}
      >
        <p className="site-tour__progress">
          Шаг {stepIndex + 1} из {totalSteps}
        </p>
        <h2 id="site-tour-title" className="site-tour__title">
          {step.title}
        </h2>
        <p className="site-tour__body">{step.body}</p>

        <div className="site-tour__dots" aria-hidden="true">
          {Array.from({ length: totalSteps }, (_, index) => (
            <span key={index} className={index === stepIndex ? 'is-active' : undefined} />
          ))}
        </div>

        <div className="site-tour__actions">
          <button type="button" className="btn btn-outline site-tour__skip" onClick={onClose}>
            Пропустить
          </button>
          <div className="site-tour__nav">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onPrev}
              disabled={stepIndex === 0}
            >
              Назад
            </button>
            <button type="button" className="btn btn-primary" onClick={onNext}>
              {isLast ? 'Готово' : 'Далее'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
