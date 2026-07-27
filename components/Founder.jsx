import s from './Founder.module.css'

// Ссылка на LinkedIn не проставлена: её нет ни в ассетах, ни где-либо в проекте, а выдуманный
// адрес профиля живого человека — худший вид битой ссылки на странице для инвестора. Впишите
// URL сюда, и ссылка появится сама; пустая строка означает «блок без ссылки».
const LINKEDIN = ''

export default function Founder() {
  return (
    <section className={`section ${s.wrapper}`}>
      <div className="wrap">
        <div className={`${s.card} rise`}>
          <p className="eyebrow">Who is building it</p>
          <p className={s.line}>
            <b className={s.name}>Stepan Arakelian</b> — 15 years in software, ex-CTO, payments
            background. Wrote the first version personally.
          </p>
          {LINKEDIN && (
            <a href={LINKEDIN} className={s.link} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
