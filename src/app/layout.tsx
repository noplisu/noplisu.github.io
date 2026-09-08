import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Grzegorz Lisowski | Senior Full-Stack Developer & Technical Leader',
  description: 'Senior Full-Stack Developer and Technical Leader—TypeScript, NestJS, Rails, Python, Go. AI pipelines, e-invoicing, and legacy modernization. Open to remote roles.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <meta name="google-site-verification" content="EuA5Nuw0rHLwPHet-x4zb3HTKZ4o-kMQUJvSANgUpvQ" />
        <meta property="og:title" content="Grzegorz Lisowski | Senior Full-Stack Developer & Technical Leader" />
        <meta property="og:description" content="Senior Full-Stack Developer and Technical Leader—TypeScript, NestJS, Rails, Python, Go. AI pipelines, e-invoicing, and legacy modernization. Open to remote roles." />
        <meta property="og:image" content="https://noplisu.github.io/glisowski.jpg" />
        <meta property="og:url" content="https://noplisu.github.io" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:title" content="Grzegorz Lisowski | Senior Full-Stack Developer & Technical Leader" />
        <meta name="twitter:description" content="Senior Full-Stack Developer and Technical Leader—TypeScript, NestJS, Rails, Python, Go. AI pipelines, e-invoicing, and legacy modernization. Open to remote roles." />
        <meta name="twitter:url" content="https://noplisu.github.io/glisowski.jpg" />
        <meta name="twitter:card" content="summary" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css" />
        <link rel="canonical" href="https://noplisu.com" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}


