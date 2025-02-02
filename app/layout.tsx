import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin-ext"] })

export const metadata: Metadata = {
  title: "5ª Copa Magé de Jiu-Jitsu",
  description: "O melhor evento de lutas casadas, repleto de novidades!",
  icons: {
    icon: "/hazaq.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

