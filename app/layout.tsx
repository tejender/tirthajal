import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileBottomNav from '@/components/layout/bottomNav'

export const metadata: Metadata = {
  title: 'Tirthan Valley Cottage | Himalayan Retreat',
  description: 'A secluded cottage retreat in the pristine Tirthan Valley of Himachal Pradesh.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="grain-overlay" />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Toaster
          position="top-right"
          richColors
          closeButton
        />
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  )
}