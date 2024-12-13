import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import FaviconLinks from '@/components/fav-icon-links'
import GlobalModal from '@/components/modal/global-modal'
import RouteProgressBar from '@/components/route-progress-bar'
import { SeedMockData } from '@/components/seed-mock-data'
import NextThemeProvider from '@/components/theme/next-theme-provider'
import { metaObject } from '@/config/site.config'
import { AuthProvider } from '@/features/auth/auth-provider'
import Navbar from '@/features/navigation/navbar'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = metaObject()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning className={`${inter.variable}`}>
      <FaviconLinks />
      <body suppressHydrationWarning>
        <AuthProvider>
          <SeedMockData />
          <RouteProgressBar />
          <NextThemeProvider>
            <GlobalModal />
            <div className='flex min-h-screen flex-col justify-between pt-[var(--navbar-height)] md:pt-[var(--navbar-height-md)]'>
              <div>
                <Navbar />
                <main>{children}</main>
              </div>
              {/* <Footer /> */}
            </div>
            <Toaster position='top-center' reverseOrder={false} />
          </NextThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
