import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SupportButton from '@/components/Utilities/SupportButton'
import CookieConsent from '@/components/Utilities/CookieConsent'
import AdBanner from '@/components/Utilities/AdBanner'

export const metadata: Metadata = {
  metadataBase: new URL('https://salapink.web.id'),
  title: {
    default: 'Salapink Cinema - Nonton Streaming Film Bioskop & Drama Korea Sub Indo',
    template: '%s | Salapink Cinema'
  },
  description: 'Nonton streaming film bioskop terbaru, box office, dan serial Drama Korea (Drakor) terlengkap dengan subtitle Indonesia kualitas jernih Full HD gratis.',
  keywords: ['nonton film bioskop', 'streaming film sub indo', 'drama korea terbaru', 'drakor sub indo', 'lk21', 'salapink cinema', 'indoxxi', 'rebahin'],
  authors: [{ name: 'Salapink Cinema Editorial' }],
  creator: 'Salapink Cinema',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://salapink.web.id',
    siteName: 'Salapink Cinema',
    title: 'Salapink Cinema - Nonton Streaming Film Bioskop & Drama Korea Sub Indo',
    description: 'Nonton streaming film bioskop box office dan serial drama korea terlengkap subtitle Indonesia.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salapink Cinema - Nonton Streaming Film Bioskop & Drama Korea',
    description: 'Streaming film bioskop dan drama korea terlengkap dengan subtitle Indonesia.',
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
    name: 'Salapink Cinema',
    url: 'https://salapink.web.id',
    description: 'Nonton streaming film bioskop dan drama korea terlengkap subtitle Indonesia.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://salapink.web.id/movies/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Monetag Ad Tag */}
        <Script
          id="monetag-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='11756229',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
          }}
        />
        {/* Monetag Vignette Banner */}
        <Script
          id="monetag-vignette"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='11756231',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <AdBanner />
        <Footer />
        <SupportButton />
        <CookieConsent />
      </body>
    </html>
  )
}
