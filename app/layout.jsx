import { Bricolage_Grotesque, Hanken_Grotesk, DM_Mono } from 'next/font/google'
import './globals.css'

// Шрифты самохостятся сборкой: стороннего домена в критическом пути нет, а значит нет
// лишних DNS+TLS до первого текста. Переменные попадают в токены (app/tokens.css).
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'], weight: ['600', '700', '800'], display: 'swap', variable: '--font-bricolage',
})
const hanken = Hanken_Grotesk({
  subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap', variable: '--font-hanken',
})
const dmMono = DM_Mono({
  subsets: ['latin'], weight: ['400', '500'], display: 'swap', variable: '--font-dmmono',
})

// Два разных адреса, и это намеренно.
//
// HOST — где страница лежит физически. Относительные ссылки в метаданных Next разворачивает
// в абсолютные по metadataBase, а og:image обязан резолвиться с текущего хоста: картинку
// скачивает робот Slack, и на ещё не поднятом everpine.io он получит пустое превью.
// CANONICAL — где страница будет жить постоянно; это адрес для og:url.
const HOST =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.RAILWAY_PUBLIC_DOMAIN && `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`) ||
  'https://everpine.io'
const CANONICAL = 'https://everpine.io'

const TITLE = 'Everpine — Restaurant OS with a bank account built in'

export const metadata = {
  metadataBase: new URL(HOST),
  title: TITLE,
  description:
    'Everpine runs the restaurant operating loop end to end: a sale deducts stock, drafts the reorder, and one supplier payment splits itself across suppliers.',
  openGraph: {
    title: TITLE,
    description: 'POS, inventory and money in one loop. A sale deducts stock, drafts the reorder, and the payment splits itself.',
    url: CANONICAL, siteName: 'Everpine', type: 'website',
    images: [{ url: '/assets/og.png', width: 1200, height: 630, alt: 'Everpine: the loop from sale to settlement' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport = { themeColor: '#0E1A14' }

// suppressHydrationWarning на <html>: класс `js` дописывается скриптом до гидратации, и React
// честно сообщает о расхождении разметки с сервером. Расхождение здесь намеренное — подавляем
// предупреждение точечно на этом узле, а не глушим гидратацию целиком.
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning
          className={`${bricolage.variable} ${hanken.variable} ${dmMono.variable}`}>
      <head>
        {/* Ставим класс до первой отрисовки: без него скрытое состояние scroll-reveal
            вообще не включается, и страница остаётся видимой при сбое JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.className += ' js'" }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
