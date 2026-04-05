import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ankit Singh - Finance & Business Systems Automation",
  description: "Portfolio of Ankit Singh - Finance & Business Systems Automation professional specializing in FP&A, enterprise automation, and data-driven decision systems. 20+ production-deployed systems across finance, analytics, and automation.",
  keywords: ["Finance Automation", "FP&A", "Power BI", "Excel", "Business Systems", "Portfolio", "Ankit Singh"],
  authors: [{ name: "Ankit Singh" }],
  creator: "Ankit Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ankitsingh.dev",
    title: "Ankit Singh - Finance & Business Systems Automation",
    description: "Portfolio showcasing 20+ production-deployed finance automation and analytics systems",
    siteName: "Ankit Singh Portfolio",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
