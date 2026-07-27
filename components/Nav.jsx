import { Logo } from './icons'
import s from './Nav.module.css'

export default function Nav() {
  return (
    <header className={s.nav}>
      <div className="wrap">
        <div className={s.row}>
          <a className={s.mark} href="#top" aria-label="Everpine home">
            <Logo width={22} height={22} />
            Everpine
          </a>
          <nav className={s.links}>
            <a href="#loop">How it works</a>
            <a href="#product">Product</a>
            <a href="#talk" className="btn btnSm">Talk to us</a>
          </nav>
        </div>
      </div>
    </header>
  )
}
