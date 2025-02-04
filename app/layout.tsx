import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"

const inter = Inter({ subsets: ["latin-ext"] })

export const metadata: Metadata = {
  title: "5ª Copa Magé de Jiu-Jitsu",
  description: "O melhor evento de lutas casadas, repleto de novidades!",
  icons: "/hazaq.png",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="google-adsense-account" content="ca-pub-7401469931656779" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
      <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7401469931656779"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
    </html>
  )
}