'use client'

import { useState } from 'react'
import s from './Cta.module.css'

// Форма отправляет заявку на свой же адрес /api/lead. Что происходит дальше — дело сервера
// (см. nginx.conf.template): канал доставки клиенту не виден ни в ответе, ни в бандле.
//
// Отправка через fetch — ради состояния «отправляется» и подтверждения без перезагрузки.
// Без JS форма тоже работает: POST уходит туда же, сервер отвечает 204, страница остаётся
// на месте. Подтверждения посетитель тогда не увидит, но заявка не теряется.
//
// Ответ всегда 204, если запрос дошёл: сервер намеренно не пересказывает статус доставки,
// иначе по нему читался бы канал. Поэтому ветка ошибки здесь — про обрыв связи, а не про
// отказ приёмника; следить за доставкой нужно по самому каналу (см. README).
const ENDPOINT = '/api/lead'
const MAIL = 'ceo@everpine.io'

export default function Cta() {
  const [state, setState] = useState('idle')   // idle | sending | done | error

  const submit = async e => {
    e.preventDefault()
    const email = new FormData(e.currentTarget).get('email')
    setState('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email }).toString(),
      })
      setState(res.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

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

        {state === 'done' ? (
          <p className={s.done}>Thank you — we will be in touch shortly.</p>
        ) : (
          // Метка скрыта визуально, но доступна скринридеру: плейсхолдер меткой не является.
          <form className={s.form} action={ENDPOINT} method="POST" onSubmit={submit}>
            <label htmlFor="email" className={s.srOnly}>Your email</label>
            <input id="email" name="email" type="email" required placeholder="you@company.com"
                   autoComplete="email" className={s.input} disabled={state === 'sending'} />
            <button className="btn" type="submit" disabled={state === 'sending'}>
              {state === 'sending' ? 'Sending…' : 'Talk to us'}
            </button>
          </form>
        )}

        <p className={s.note}>
          {state === 'error'
            ? <>Something went wrong. Write to <a href={`mailto:${MAIL}`}>{MAIL}</a> — we answer the same day.</>
            : <>Or write to {MAIL}. We answer the same day.</>}
        </p>
      </div>
    </section>
  )
}
