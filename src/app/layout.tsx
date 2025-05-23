import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'simplebar-react/dist/simplebar.min.css'
import Providers from '@/components/Provider'
import { ClerkProvider } from '@clerk/nextjs'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dot note',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="light">
        <Providers>
          <Head>
            <meta property="og:title" content="chat with pdf" />
            <meta
              property="og:description"
              content="A description of your website."
            />
            <meta
              property="og:image"
              content="https://res.cloudinary.com/djldkocgz/image/upload/v1746395958/1_ft5xsq.png"
            />
            <meta property="og:url" content="https://yourdomain.com" />
            <meta name="twitter:card" content="summary_large_image" />
          </Head>
          <body
            className={cn(
              'min-h-screen font-sans antialised grainy',
              inter.className
            )}
          >
            <Toaster />
            <Navbar />
            {children}
          </body>
        </Providers>
      </html>
    </ClerkProvider>
  )
}
