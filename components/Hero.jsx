import Loop from './Loop'
import s from './Hero.module.css'

export default function Hero() {
  return (
    <section className={s.hero} id="loop">
      <div className="wrap">
        {/* H1 дословно повторяет one-liner заявки в YC: партнёр приходит по ссылке из неё,
            и первая строка страницы обязана совпасть с тем, что он только что прочитал.
            Перенос строки не проставлен вручную: длина заголовка такова, что на любой
            ширине он ломается сам, а зашитый <br> на планшете даёт сиротскую строку. */}
        <h1 className={s.title}>Restaurant OS with a bank account built in.</h1>
        <p className="lede">
          One loop from sale to settlement: a sale deducts stock, drafts the reorder and pays
          each supplier its share. No exports, no evening spent reconciling.
        </p>
        <div className={s.actions}>
          <a href="#talk" className="btn">Talk to us</a>
          <a href="#product" className="btn btnGhost">See the product</a>
        </div>
        <Loop />
      </div>
    </section>
  )
}
