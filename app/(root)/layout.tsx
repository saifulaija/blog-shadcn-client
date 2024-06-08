
import Footer from '@/components/shared/Footer/Footer'
import Header from '@/components/shared/header/Header'
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 mt-16">{children}</main>
      <Footer />
    </div>
  )
}