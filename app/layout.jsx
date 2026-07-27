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

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://everpine.io'

export const metadata = {
  metadataBase: new URL(SITE),
  title: 'Everpine · One loop from sale to settlement',
  description:
    'Everpine runs the restaurant operating loop end to end: a sale deducts stock, drafts the reorder, and one supplier payment splits itself across suppliers.',
  openGraph: {
    title: 'Everpine · One loop from sale to settlement',
    description: 'POS, inventory and money in one loop. A sale deducts stock, drafts the reorder, and the payment splits itself.',
    url: '/', siteName: 'Everpine', type: 'website',
    images: [{ url: '/assets/og.png', width: 1200, height: 630, alt: 'Everpine: the loop from sale to settlement' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport = { themeColor: '#0E1A14' }

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${hanken.variable} ${dmMono.variable}`}>
      <head>
        {/* Ставим класс до первой отрисовки: без него скрытое состояние scroll-reveal
            вообще не включается, и страница остаётся видимой при сбое JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.className += ' js'" }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
