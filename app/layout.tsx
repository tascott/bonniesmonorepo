import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Fira_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--playfair-display"
})

const fira = Fira_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--fira-sans"
})

export const metadata: Metadata = {
  title: "Woof & Wag - London's Premier Dog Boarding",
  description: "London's premier dog day care service, providing expert care and off-leash fun for your furry friends.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${fira.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
