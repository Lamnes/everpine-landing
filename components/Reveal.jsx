'use client'

import { useEffect } from 'react'

/**
 * Появление секций при скролле.
 *
 * IntersectionObserver, а не слушатель scroll: тот срабатывает на каждом кадре и стоит
 * заметно дороже ровно для одного эффекта. Клиентский островок изолирован: остальная
 * страница остаётся серверными компонентами и не тянет JS.
 */
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
        })
      },
      { threshold: 0.15 },
    )
    document.querySelectorAll('.rise').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
