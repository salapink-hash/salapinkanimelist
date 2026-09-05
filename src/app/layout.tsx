import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SupportButton from '@/components/Utilities/SupportButton'
import CookieConsent from '@/components/Utilities/CookieConsent'

export const metadata: Metadata = {
  metadataBase: new URL('https://salapink.web.id'),
  title: {
    default: 'Salapink Animelist - Portal Komunitas & Informasi Anime Terlengkap',
    template: '%s | Salapink Animelist'
  },
  description: 'Portal referensi anime terlengkap di Indonesia. Temukan ribuan data anime, jadwal rilis tayang, berita terkini, ulasan mendalam, dan kelola koleksi anime favoritmu.',
  keywords: ['anime', 'anime list indonesia', 'rekomendasi anime', 'jadwal anime', 'berita anime', 'salapink animelist', 'database anime'],
  authors: [{ name: 'Salapink Media Editorial' }],
  creator: 'Salapink Animelist',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://salapink.web.id',
    siteName: 'Salapink Animelist',
    title: 'Salapink Animelist - Portal Komunitas & Informasi Anime Terlengkap',
    description: 'Temukan ribuan data anime, jadwal tayang hari ini, ulasan mendalam, dan simpan koleksi tontonanmu.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salapink Animelist - Portal Komunitas Anime Terlengkap',
    description: 'Eksplorasi ribuan anime dan nikmati ulasan serta jadwal rilis terkini.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Salapink Animelist',
    url: 'https://salapink.web.id',
    description: 'Portal referensi anime dan ulasan komprehensif pop culture Indonesia.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://salapink.web.id/search/{search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <html lang="id">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4671153148947663"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SupportButton />
        <CookieConsent />
      </body>
    </html>
  )
}
