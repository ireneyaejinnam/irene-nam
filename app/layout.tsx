import type { Metadata } from 'next'
import { Archivo, Inter, IBM_Plex_Mono, Noto_Sans_KR } from 'next/font/google'
import { Grain } from '@/components/Grain'
import { Spotlight } from '@/components/Spotlight'
import { CommandPalette } from '@/components/CommandPalette'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})
const kr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-kr',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://irene-nam.com'), // TODO: your domain
  title: {
    default: 'Irene Nam',
    template: '%s — Irene Nam',
  },
  description:
    'Product and applied AI. I translate between people who don’t share a vocabulary, then check whether the thing we built did what everyone assumed it would.',
  openGraph: {
    type: 'website',
    siteName: 'Irene Nam',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${mono.variable} ${kr.variable}`}
    >
      <body>
        <Grain />
        <Spotlight />
        <CommandPalette />
        {children}
      </body>
    </html>
  )
}
