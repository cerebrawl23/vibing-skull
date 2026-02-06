import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/theme-provider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'The Vibing Skull - Your Command Center for Vibe Coding',
    template: '%s | The Vibing Skull',
  },
  description:
    'Discover, compare, and organize the best AI coding tools. Curated tool directory, trending news, workflow templates, and a personal dashboard for vibe coders.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://vibingskull.com'),
  openGraph: {
    title: 'The Vibing Skull - Your Command Center for Vibe Coding',
    description:
      'Discover, compare, and organize the best AI coding tools. Curated tool directory, trending news, workflow templates, and more.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
