import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

function resetScroll() {
  const root = document.scrollingElement ?? document.documentElement
  const html = document.documentElement

  const previousBehavior = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'

  root.scrollTop = 0
  root.scrollLeft = 0
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

  html.style.scrollBehavior = previousBehavior
}

export default function ScrollToTop() {
  const { pathname, key } = useLocation()

  useEffect(() => {
    if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useLayoutEffect(() => {
    if (document.body.classList.contains('tour-active')) return
    resetScroll()
  }, [pathname, key])

  useEffect(() => {
    if (document.body.classList.contains('tour-active')) return
    resetScroll()
    requestAnimationFrame(resetScroll)
  }, [pathname, key])

  return null
}
