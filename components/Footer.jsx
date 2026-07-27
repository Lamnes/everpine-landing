import { Logo } from './icons'
import s from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className="wrap">
        {/* Географии на лендинге нет как класса (решение, июль 2026): US-адреса у команды пока
            нет, и любой написанный здесь город был бы такой же фабрикацией, как прежний.
            Местонахождение честно указано в заявке YC — там оно и должно жить. */}
        <div className={s.row}>
          <span className={s.mark}><Logo width={20} height={20} /> Everpine</span>
          <p className={s.meta}>© Everpine</p>
          <a href="mailto:ceo@everpine.io" className={s.mail}>ceo@everpine.io</a>
        </div>
      </div>
    </footer>
  )
}
