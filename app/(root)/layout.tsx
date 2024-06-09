
// import Footer from '@/components/shared/Footer/Footer'
// import Header from '@/components/shared/header/Header'
// import React from 'react'

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <div className="flex h-screen flex-col">
//       <Header />
//       <main className="flex-1 mt-16">{children}</main>
//       <Footer />
//     </div>
//   )
// }


import Footer from '@/components/shared/Footer/Footer'
import Header from '@/components/shared/header/Header'
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 mt-16 overflow-y-auto">{children}</main>
      <Footer />
    </div>
  )
}
