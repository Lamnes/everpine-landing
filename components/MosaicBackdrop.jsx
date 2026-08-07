'use client'

import { useEffect, useImperativeHandle, useRef, forwardRef } from 'react'
import s from './MosaicBackdrop.module.css'

/* ============================================================================
   «Живая мозаика» — фон блока с формой.

   Гексагональная замостка с силуэтом ели: плитки дышат, по поверхности скользит
   блик, на ввод в форму от неё расходятся кольца, а принятая заявка проходит
   тёплой волной. Тот же фон стоит на экране входа в продукт — партнёр, который
   пришёл со страницы, узнаёт его внутри.

   Три решения, продиктованные тем, что это лендинг, а не приложение:

   1. **Стоит внизу, а не в hero.** Первый экран несёт LCP-заголовок, и вешать
      на него анимированный canvas значит платить скоростью за украшение —
      на странице, которую открывают по ссылке из заявки.
   2. **Просыпается по видимости.** Сетка строится и анимация запускается,
      только когда блок доскроллили; за пределами экрана кадры не считаются.
   3. **Цвета берутся из tokens.css.** Литеральных цветов здесь нет по правилу
      проекта: ступени фона смешиваются из `--ink` и `--mint` в момент
      инициализации, поэтому смена визуала в токенах меняет и мозаику.
   ========================================================================== */

const HEX_R = 26
const HEX_R_NARROW = 20
const RING_SPEED = 900

const lerp = (a, b, t) => a + (b - a) * t
const mix = (a, b, t) => ({ r: lerp(a.r, b.r, t), g: lerp(a.g, b.g, t), b: lerp(a.b, b.b, t) })
const clamp255 = (x) => (x < 0 ? 0 : x > 255 ? 255 : x | 0)

function readColor(styles, name, fallback) {
  const raw = styles.getPropertyValue(name).trim()
  const hex = /^#([0-9a-f]{6})$/i.exec(raw)
  if (!hex) return fallback
  const n = parseInt(hex[1], 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

/* Силуэт ели: три перекрывающихся яруса и ствол, по центру блока. */
function inPineTree(x, y, w, h) {
  const cx = w / 2
  const top = h * 0.06
  const bottom = h * 0.92
  const H = bottom - top
  const maxHalf = Math.min(w * 0.3, H * 0.42)

  for (let k = 0; k < 3; k++) {
    const apexY = top + H * (k * 0.2)
    const botY = top + H * (0.42 + k * 0.23)
    if (y >= apexY && y <= botY) {
      const half = maxHalf * (0.5 + k * 0.25) * ((y - apexY) / (botY - apexY))
      if (Math.abs(x - cx) <= half) return true
    }
  }
  const trunkTop = top + H * 0.88
  return y >= trunkTop && y <= bottom && Math.abs(x - cx) <= maxHalf * 0.09
}

const MosaicBackdrop = forwardRef(function MosaicBackdrop({ anchorRef }, ref) {
  const canvasRef = useRef(null)
  const state = useRef({
    tiles: [], w: 0, h: 0, visible: false,
    pointer: { x: -9999, y: -9999 }, light: { x: 0, y: 0 },
    rings: [], wave: null, reduced: false, lastRing: 0,
    palette: null, accent: null,
  })

  // Наружу отдаём только команды: перерисовкой управляет rAF, и прокидывать
  // состояние через React значило бы гонять ре-рендер ради canvas, который
  // React не трогает.
  useImperativeHandle(ref, () => ({
    ring() {
      const s0 = state.current
      if (s0.reduced || !s0.visible) return
      const t0 = performance.now() / 1000
      if (t0 - s0.lastRing < 0.3) return
      s0.lastRing = t0
      const origin = anchorOrigin(anchorRef, canvasRef, s0)
      s0.rings.push({ ...origin, t0 })
      if (s0.rings.length > 4) s0.rings.shift()
    },
    wave() {
      const s0 = state.current
      s0.wave = { ...anchorOrigin(anchorRef, canvasRef, s0), t0: performance.now() / 1000 }
    },
  }), [anchorRef])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const s0 = state.current

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    s0.reduced = motion.matches

    const styles = getComputedStyle(document.documentElement)
    const ink = readColor(styles, '--ink', { r: 0x0e, g: 0x1a, b: 0x14 })
    const accent = readColor(styles, '--mint', { r: 0x34, g: 0xd3, b: 0x99 })
    s0.accent = accent
    // Пять ступеней от фона страницы к хвойному: мозаика не вводит цветов,
    // которых нет в палитре, она заполняет промежуток между ink и mint.
    s0.palette = [0, 0.06, 0.13, 0.21, 0.3].map((t) => mix(ink, accent, t))
    s0.backdrop = mix(ink, { r: 0, g: 0, b: 0 }, 0.35)

    const paletteAt = (v) => {
      const x = Math.min(0.9999, Math.max(0, v)) * (s0.palette.length - 1)
      const i = Math.floor(x)
      return mix(s0.palette[i], s0.palette[i + 1], x - i)
    }

    function buildGrid() {
      // Меряем контейнер, а не сам канвас: buildGrid задаёт канвасу размеры, и
      // наблюдение за ним самим замкнуло бы ResizeObserver на себя.
      const host = canvas.parentElement
      const w = host?.clientWidth || 0
      const h = host?.clientHeight || 0
      if (!w || !h) return

      s0.w = w
      s0.h = h
      if (!s0.light.x) { s0.light.x = w / 2; s0.light.y = h / 3 }

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const a = w < 640 ? HEX_R_NARROW : HEX_R
      const stepX = Math.sqrt(3) * a
      const stepY = 1.5 * a
      const cols = Math.ceil(w / stepX) + 2
      const rows = Math.ceil(h / stepY) + 2
      const tiles = []

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = c * stepX + (r % 2 ? stepX / 2 : 0)
          const cy = r * stepY
          // Path2D собирается один раз: строить шесть отрезков заново каждый
          // кадр на несколько сотен плиток — самая дорогая операция здесь.
          const path = new Path2D()
          for (let i = 0; i < 6; i++) {
            const ang = Math.PI / 6 + (i * Math.PI) / 3
            const vx = cx + a * 0.93 * Math.cos(ang)
            const vy = cy + a * 0.93 * Math.sin(ang)
            if (i === 0) path.moveTo(vx, vy)
            else path.lineTo(vx, vy)
          }
          path.closePath()
          tiles.push({
            cx, cy, path,
            base: 0.10 + Math.random() * 0.34,
            phase: Math.random() * Math.PI * 2,
            speed: 0.35 + Math.random() * 0.5,
            inTree: inPineTree(cx, cy, w, h),
          })
        }
      }
      s0.tiles = tiles
      draw(performance.now() / 1000)
    }

    function draw(t) {
      const w = s0.w
      const h = s0.h
      if (!w || !h) return

      const bg = s0.backdrop
      ctx.fillStyle = `rgb(${clamp255(bg.r)},${clamp255(bg.g)},${clamp255(bg.b)})`
      ctx.fillRect(0, 0, w, h)

      s0.rings = s0.rings.filter((r) => (t - r.t0) * RING_SPEED < Math.max(w, h) * 1.4)

      // Источник света догоняет курсор с запаздыванием: мгновенное следование
      // читалось бы как подсветка под мышью, отставание — как блик по глазури.
      const px = s0.pointer.x > -999 ? s0.pointer.x : w / 2
      const py = s0.pointer.y > -999 ? s0.pointer.y : h / 3
      s0.light.x += (px - s0.light.x) * 0.06
      s0.light.y += (py - s0.light.y) * 0.06

      const wave = s0.wave
      let waveR = 0
      let waveOn = false
      if (wave) {
        const wt = t - wave.t0
        if (wt < 1.1) {
          waveR = (wt / 0.8) * Math.max(w, h) * 1.2
          waveOn = true
        } else {
          s0.wave = null
        }
      }

      for (const tile of s0.tiles) {
        let v = tile.base
        if (!s0.reduced) v += Math.sin(t * tile.speed + tile.phase) * 0.05

        // Крона дышит медленнее и синхронно — как один организм.
        if (tile.inTree) {
          v += 0.42
          if (!s0.reduced) v += Math.sin(t * 0.5) * 0.05
        }

        let glow = 0
        if (!s0.reduced) {
          const gdx = tile.cx - s0.pointer.x
          const gdy = tile.cy - s0.pointer.y
          const d2 = gdx * gdx + gdy * gdy
          if (d2 < 150 * 150) {
            const k = 1 - Math.sqrt(d2) / 150
            glow = k * k * 0.9
          }
        }

        let col = paletteAt(v)
        if (tile.inTree) col = mix(col, s0.accent, 0.16)
        if (glow > 0) col = mix(col, s0.accent, glow * 0.55)

        if (!s0.reduced) {
          const ldx = tile.cx - s0.light.x
          const ldy = tile.cy - s0.light.y
          const ld = Math.sqrt(ldx * ldx + ldy * ldy)
          if (ld < 320) {
            const k = 1 - ld / 320
            const spec = k * k * k * 0.3
            if (spec > 0.01) col = mix(col, { r: 224, g: 244, b: 226 }, spec)
          }
          // Кольца от ввода: по силуэту проходят втрое сильнее, чем по фону —
          // отвечает именно дерево, фон лишь показывает, что импульс идёт.
          for (const ring of s0.rings) {
            const rr = (t - ring.t0) * RING_SPEED
            const rdx = tile.cx - ring.x
            const rdy = tile.cy - ring.y
            const rd = Math.sqrt(rdx * rdx + rdy * rdy)
            const n = (rd - rr) / 70
            const band = Math.exp(-n * n)
            if (band > 0.02) col = mix(col, s0.accent, band * (tile.inTree ? 0.4 : 0.13))
          }
        }

        if (waveOn) {
          const wdx = tile.cx - wave.x
          const wdy = tile.cy - wave.y
          const wd = Math.sqrt(wdx * wdx + wdy * wdy)
          const n = (wd - waveR) / 90
          const band = Math.exp(-n * n)
          if (band > 0.02) {
            col = mix(col, s0.accent, band * (tile.inTree ? 0.95 : 0.6))
          }
        }

        ctx.fillStyle = `rgb(${clamp255(col.r)},${clamp255(col.g)},${clamp255(col.b)})`
        ctx.fill(tile.path)
      }
    }

    let raf
    function frame(now) {
      draw(now / 1000)
      if (s0.reduced || !s0.visible) return
      raf = requestAnimationFrame(frame)
    }

    // Блок оживает, только когда его видно: считать кадры для секции внизу
    // страницы, пока читают первый экран, — это разряжать батарею впустую.
    const io = new IntersectionObserver(
      ([entry]) => {
        s0.visible = entry.isIntersecting
        if (s0.visible && !s0.tiles.length) buildGrid()
        if (s0.visible && !s0.reduced) {
          cancelAnimationFrame(raf)
          raf = requestAnimationFrame(frame)
        } else {
          cancelAnimationFrame(raf)
        }
      },
      { rootMargin: '120px' },
    )
    io.observe(canvas.parentElement || canvas)

    // Пересборка при смене размеров — только если сетка уже построена.
    // ResizeObserver срабатывает сразу при подписке, и без этой проверки блок
    // внизу страницы строил бы сетку, пока читают первый экран.
    const ro = new ResizeObserver(() => { if (s0.tiles.length) buildGrid() })
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    // Указатель слушаем на окне: сам canvas не принимает события (pointer-events
    // выключены), чтобы не перехватывать клики по форме над ним.
    const onMove = (e) => {
      const b = canvas.getBoundingClientRect()
      s0.pointer.x = e.clientX - b.left
      s0.pointer.y = e.clientY - b.top
    }
    const onLeave = () => { s0.pointer.x = -9999; s0.pointer.y = -9999 }
    const onMotion = (e) => {
      s0.reduced = e.matches
      if (e.matches) { cancelAnimationFrame(raf); draw(performance.now() / 1000) }
      else if (s0.visible) raf = requestAnimationFrame(frame)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    motion.addEventListener('change', onMotion)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      motion.removeEventListener('change', onMotion)
    }
  }, [])

  return <canvas ref={canvasRef} className={s.canvas} aria-hidden />
})

/* Точка, из которой расходятся кольца и волна, — центр формы. Координаты
   приводятся к системе канваса: он лежит под блоком, а не во всё окно. */
function anchorOrigin(anchorRef, canvasRef, s0) {
  const canvas = canvasRef.current
  const anchor = anchorRef?.current
  if (!canvas || !anchor) return { x: s0.w / 2, y: s0.h / 2 }
  const cb = canvas.getBoundingClientRect()
  const ab = anchor.getBoundingClientRect()
  return { x: ab.left + ab.width / 2 - cb.left, y: ab.top + ab.height / 2 - cb.top }
}

export default MosaicBackdrop
