import Image from 'next/image'
import s from './Shot.module.css'

/**
 * Рамка продуктового кадра: одна на все скриншоты.
 *
 * Минимальная полоса окна с адресом, без фейкового macOS-хрома со светофорами.
 * Кадры сняты под ту ширину, в которой показываются (см. demo-video/stills-yc.mjs):
 * снятые 1088 CSS-пикселей в колонке 510px делают текст вдвое мельче и нечитаемым.
 *
 * @param mobileSrc узкий герой-фрагмент для ≤640px: уменьшенный целый экран на телефоне
 *                  не доказывает ничего.
 * @param callout   одна выноска на блок; больше одной превращает доказательство в шум.
 * @param link      координаты линии выноски в процентах кадра, иначе плашка висит сама по себе.
 */
export default function Shot({ src, mobileSrc, alt, width, height, priority = false, callout, link, className = '' }) {
  return (
    <figure className={`${s.shot} rise ${className}`}>
      <div className={s.bar}><span>{src.includes('inventory') ? 'everpine.io/warehouse' : 'everpine.io/pos'}</span></div>

      {mobileSrc ? (
        <picture>
          <source media="(max-width: 640px)" srcSet={mobileSrc} />
          <Image src={src} alt={alt} width={width} height={height} priority={priority} className={s.img} />
        </picture>
      ) : (
        <Image src={src} alt={alt} width={width} height={height} priority={priority} className={s.img} />
      )}

      {link && (
        <svg className={s.link} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d={`M${link.x} ${link.y} L${link.toX} ${link.toY}`} stroke="currentColor" strokeWidth=".3" fill="none" />
          <circle cx={link.x} cy={link.y} r="1" fill="currentColor" />
        </svg>
      )}

      {callout && <figcaption className={s.callout}>{callout}</figcaption>}
    </figure>
  )
}
