import Loop from './Loop'
import s from './Hero.module.css'

export default function Hero() {
  return (
    <section className={s.hero} id="loop">
      <div className="wrap">
        <h1>One loop from sale<br />to settlement.</h1>
        <p className="lede">
          A sale deducts stock, drafts the reorder and pays each supplier its share.
          No exports, no evening spent reconciling.
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
