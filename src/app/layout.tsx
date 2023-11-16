import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Grzegorz Lisowski Portfolio',
  description: "Seasoned developer with a decade of expertise (since 2013) in full stack development. Crafting robust solutions and creating immersive virtual experiences.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="EuA5Nuw0rHLwPHet-x4zb3HTKZ4o-kMQUJvSANgUpvQ" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
