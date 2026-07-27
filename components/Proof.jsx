import s from './Proof.module.css'

// Полоса рассказывает velocity, а не полноту: у продукта пока нет клиентов, и единственное
// честное доказательство — скорость и объём сделанного. Все цифры сверены со статус-документом
// (docs/STATUS.md: 267 Java + 29 Rust тестов = 296).
//
// Свойства продукта («1 платёж», «0 экспортов») отсюда убраны в текст Money-блока: как строки
// они сильные, как proof — слабые, потому что проверить их со стороны нечем. «11 сервисов»
// убрано совсем: это возврат к обещанию платформы, а обещание здесь ровно одно — петля.
// Не-числовые значения набираются головным шрифтом: в моно они притворялись бы метрикой.
const ITEMS = [
  { value: '14',              mono: true,  caption: 'months from first commit to working product' },
  { value: '13',              mono: true,  caption: 'engineers, one team, shipping daily' },
  { value: '290+',            mono: true,  caption: 'automated tests across Java, Rust and Python' },
  { value: 'E2EE',            mono: false, caption: 'messenger on a Rust core, not a bolted-on chat' },
  { value: 'Personal capital', mono: false, caption: 'no outside funding yet' },
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
