import s from './Founder.module.css'

// Пустая строка означает «блок без ссылки»: ссылка рендерится только когда URL задан.
const LINKEDIN = 'https://www.linkedin.com/in/stepan-arakelian/'

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
