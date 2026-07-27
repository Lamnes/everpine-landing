import { IconReceipt, IconPackageMinus, IconRefresh, IconTruck, IconSplit, IconChart } from './icons'
import s from './Loop.module.css'

// Шесть узлов цикла. Порядок здесь — единственный источник правды: индекс задаёт и
// последовательность подсветки (--i), и порядок чтения для скринридера.
const NODES = [
  { label: 'Sale at the POS',       Icon: IconReceipt },
  { label: 'Stock deducted',        Icon: IconPackageMinus },
  { label: 'Reorder drafted',       Icon: IconRefresh },
  { label: 'Supplier delivers',     Icon: IconTruck },
  { label: 'Split-settlement pays', Icon: IconSplit },
  { label: 'P&L updates',           Icon: IconChart },
]

const ARIA =
  'The operating loop: a sale deducts stock, which drafts an auto-reorder, the supplier delivers, ' +
  'split-settlement pays each supplier its share, and the profit and loss statement updates. ' +
  'The last step returns to the first.'

/**
 * Лента, а не окружность. Окружность честнее передаёт цикл, но её подписи не переживают
 * сужение до 360px. Лента читается слева направо как процесс, на мобиле разворачивается
 * в вертикаль, а замкнутость даёт обратная дуга снизу со стрелкой в первый узел.
 */
export default function Loop() {
  return (
    <div className={s.loop} role="img" aria-label={ARIA}>
      <div className={s.track}>
        {NODES.map(({ label, Icon }, i) => (
          <div key={label} className={s.node} style={{ '--i': i }}>
            <span className={s.ico}><Icon width={18} height={18} aria-hidden="true" /></span>
            <span className={s.label}>{label}</span>
          </div>
        ))}
      </div>

      {/* Дуга тянется по ширине, поэтому в ней только линии: текст в SVG с
          preserveAspectRatio="none" плющит по вертикали и становится нечитаем. */}
      <svg className={s.return} viewBox="0 0 1000 34" preserveAspectRatio="none" aria-hidden="true">
        <path d="M916 0 V14 Q916 24 906 24 H94 Q84 24 84 14 V2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M84 0 l-4.5 7 h9 z" fill="currentColor" />
      </svg>

      {/* Кульминация цикла: одна сумма расходится на доли поставщиков. Единственное усиление
          в анимации, потому что split-settlement и есть то, что должно запомниться. */}
      <div className={s.split} aria-hidden="true">
        <span className={`${s.sum} num`}>$11,400</span>
        <svg className={s.fan} viewBox="0 0 40 34" fill="none" aria-hidden="true">
          <path d="M0 17 H16 M16 17 L34 5 M16 17 H34 M16 17 L34 29"
                stroke="var(--mint)" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span className={`${s.parts} num`}><i>60%</i><i>30%</i><i>10%</i></span>
      </div>
    </div>
  )
}
