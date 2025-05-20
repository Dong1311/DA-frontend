import './globals.css'
import 'antd/dist/reset.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React, { Suspense } from 'react'

import { LoadingScreen } from '@/components/LoadingScreen'
import RouteLoader from '@/components/RouteLoader'

import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Med',
  description: 'Created by Dong Vu',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RouteLoader />
        <Providers>
          <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
        </Providers>
      </body>
    </html>
  )
}
