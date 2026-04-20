import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/app/providers'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const GOOGLE_ANALYTICS_ID = 'G-YG52DDRMHX'
const SVG_FAVICON = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M 30,50 C 30,20 70,20 70,50 C 70,80 30,80 30,50 Z" stroke="%23d1fb00" stroke-width="12" fill="none" opacity="0.5"/><path d="M 20,40 C 40,20 60,80 80,60" stroke="%23d1fb00" stroke-width="12" fill="none" stroke-linecap="round"/></svg>';

export const metadata: Metadata = {
  title: 'NULL.PROTOCOL | Confidential Commerce',
  description: 'Private dark pool marketplace for AI Agent resources running on MagicBlock TEE.',
  icons: {
    icon: [
      { url: SVG_FAVICON, type: 'image/svg+xml' },
    ],
    shortcut: SVG_FAVICON,
    apple: SVG_FAVICON,
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_inter.variable} ${_geistMono.variable} font-sans antialiased`}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
