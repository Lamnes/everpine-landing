import { Logo } from './icons'
import s from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className="wrap">
        <div className={s.row}>
          <span className={s.mark}><Logo width={20} height={20} /> Everpine</span>
          <p className={s.meta}>Pine, Austin TX</p>
          <a href="mailto:stepan@everpine.io" className={s.mail}>stepan@everpine.io</a>
        </div>
      </div>
    </footer>
  )
}
