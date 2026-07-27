import s from './Cta.module.css'

export default function Cta() {
  return (
    <section className="section" id="talk">
      <div className="wrap">
        {/* Прежний заголовок обещал «running on real restaurant data» — клиентов пока нет,
            и в заявке это сказано прямо. Расхождение сайта с заявкой читается партнёром как
            приукрашивание, поэтому здесь ровно то же, что и там: срок и стадия. */}
        <h2>Built in 14 months. Launching with the first pilot cohort.</h2>
        <p className="lede">
          We are talking to independent operators in Los Angeles and to investors who want the loop,
          not another dashboard.
        </p>

        {/* Форма отправляет на почту: бэкенда у лендинга нет и не нужно. Когда появится CRM-хук,
            меняется только action. Метка скрыта визуально, но доступна скринридеру: плейсхолдер
            меткой не является.

            ВНИМАНИЕ при смене адреса: FormSubmit привязан к конкретному ящику и требует
            подтверждения. Первая отправка на новый адрес письмо не доставляет — вместо этого
            присылает туда ссылку активации. Пока по ней не перешли, форма выглядит рабочей
            (пользователь видит успех), а заявки не приходят. Проверять только реальной
            отправкой с чужой почты. */}
        <form className={s.form} action="https://formsubmit.co/ceo@everpine.io" method="POST">
          <label htmlFor="email" className={s.srOnly}>Your email</label>
          <input id="email" name="email" type="email" required placeholder="you@company.com"
                 autoComplete="email" className={s.input} />
          <button className="btn" type="submit">Talk to us</button>
        </form>
        <p className={s.note}>Or write to ceo@everpine.io. We answer the same day.</p>
      </div>
    </section>
  )
}
