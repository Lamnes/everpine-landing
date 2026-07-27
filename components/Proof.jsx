import s from './Proof.module.css'

// Цифры не выдуманы: 11 сервисов — модули app-rail платформы, «1 платёж» и «0 экспортов» —
// свойства продукта, Austin — первый рынок. Место набирается головным шрифтом: в моно оно
// притворялось бы метрикой.
const ITEMS = [
  { value: '11',     mono: true,  caption: 'services running the loop, one login' },
  { value: '1',      mono: true,  caption: 'payment splits across every supplier on the order' },
  { value: '0',      mono: true,  caption: 'exports between POS, stock and the ledger' },
  { value: 'Austin', mono: false, caption: 'first market, independent restaurants' },
]

export default function Proof() {
  return (
    <section className="section">
      <div className="wrap">
        <div className={`${s.grid} rise`}>
          {ITEMS.map(({ value, mono, caption }) => (
            <div key={value} className={s.item}>
              <div className={`${s.value} ${mono ? 'num' : s.word}`}>{value}</div>
              <div className={s.caption}>{caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
