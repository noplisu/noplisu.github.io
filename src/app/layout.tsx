import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Grzegorz Lisowski Software Developer',
  description: "Seasoned developer with a decade of expertise (since 2013) in full stack development. Crafting robust web applications and creating virtual experiences.",
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
        <meta property="og:title" content="Grzegorz Lisowski Web Developer" />
        <meta property="og:description" content="Seasoned developer with a decade of expertise (since 2013) in full stack development. Crafting robust solutions and creating virtual experiences." />
        <meta property="og:image" content="https://noplisu.github.io/glisowski.jpg" />
        <meta property="og:url" content="https://noplisu.github.io" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:title" content="Grzegorz Lisowski Web Developer" />
        <meta name="twitter:description" content="Seasoned developer with a decade of expertise (since 2013) in full stack development. Crafting robust solutions and creating virtual experiences." />
        <meta name="twitter:url" content="https://noplisu.github.io/glisowski.jpg" />
        <meta name="twitter:card" content="summary" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
