import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { STRINGS } from '@/strings'

// Use centralized strings for app title/description
export const metadata: Metadata = {
  title: STRINGS.appTitle,
  description: STRINGS.appDescription,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Provides system-aware theme and dark mode class switching */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
