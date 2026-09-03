import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SupportButton from '@/components/Utilities/SupportButton'

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
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SupportButton />
      </body>
    </html>
  )
}
