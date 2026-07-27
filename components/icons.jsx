// Глифы Loop. Пути взяты из lucide (иконки, которые уже использует прототип), а не нарисованы
// от руки: линия 2px и геометрия совпадают с app-rail платформы.
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const IconReceipt = (p) => (
  <svg viewBox="0 0 24 24" {...S} {...p}>
    <path d="M13 16H8" /><path d="M14 8H8" /><path d="M16 12H8" />
    <path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
  </svg>
)

export const IconPackageMinus = (p) => (
  <svg viewBox="0 0 24 24" {...S} {...p}>
    <path d="M12 22V12" /><path d="M16 17h6" />
    <path d="M21 13V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955" />
    <path d="M3.29 7 12 12l8.71-5" /><path d="m7.5 4.27 8.997 5.148" />
  </svg>
)

export const IconRefresh = (p) => (
  <svg viewBox="0 0 24 24" {...S} {...p}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" />
  </svg>
)

export const IconTruck = (p) => (
  <svg viewBox="0 0 24 24" {...S} {...p}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" />
  </svg>
)

export const IconSplit = (p) => (
  <svg viewBox="0 0 24 24" {...S} {...p}>
    <path d="M16 3h5v5" /><path d="M8 3H3v5" />
    <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" /><path d="m15 9 6-6" />
  </svg>
)

export const IconChart = (p) => (
  <svg viewBox="0 0 24 24" {...S} {...p}>
    <path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="m19 9-5 5-4-4-3 3" />
  </svg>
)

/** Знак платформы: та же ель, что в app-rail. */
export const Logo = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2 5 12h4l-3 5h5v5h2v-5h5l-3-5h4z" />
  </svg>
)
