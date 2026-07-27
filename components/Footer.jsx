import { Logo } from './icons'
import s from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className="wrap">
        {/* Географии на лендинге нет как класса (решение, июль 2026): US-адреса пока нет,
            писать его было бы той же фабрикацией, что и прежний Austin, а Ереван противоречит
            первому рынку. Местонахождение команды честно указано в заявке YC. */}
        <div className={s.row}>
          <span className={s.mark}><Logo width={20} height={20} /> Everpine</span>
          <p className={s.meta}>© Everpine</p>
          <a href="mailto:stepan@everpine.io" className={s.mail}>stepan@everpine.io</a>
        </div>
      </div>
    </footer>
  )
}
