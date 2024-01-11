import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import Provider from '@/components/Provider'
import 'react-loading-skeleton/dist/skeleton.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <Provider>
        <body
          className={cn(
            'min-h-screen font-sans antialised grainy',
            inter.className
          )}
        >
          <Navbar />
          {children}
        </body>
      </Provider>
    </html>
  )
}
