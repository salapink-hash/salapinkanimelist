import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Salapink Animelist - Premium Edition',
  description: 'Top anime list application built with Next.js and Jikan API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4671153148947663"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Adsterra Network Unit 1 */}
        <Script
          src="https://pl31162658.profitableratecpmnetwork.com/04/da/50/04da50adaeb210f2d909ee5c21a53924.js"
          strategy="afterInteractive"
        />
        {/* Adsterra Network Unit 2 */}
        <Script
          src="https://pl31162659.profitableratecpmnetwork.com/2b/f9/08/2bf908f02f4dfe5fc6eebcc4d08adc9a.js"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
