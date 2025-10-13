import type {Metadata} from 'next'
import {GeistSans} from 'geist/font/sans'
import {GeistMono} from 'geist/font/mono'
import {Analytics} from '@vercel/analytics/next'
import './globals.css'
import Script from "next/script";

export const metadata: Metadata = {
    title: 'Copa Magé',
    description: 'Copa Magé - Evento de Jiu-Jitsu em Magé, RJ',
    generator: 'Copa Magé',
    icons: {
        icon: '/image/hazaq-logo.png'
    }
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR">
        <head>
            {/* Script do AdSense para Auto Ads */}
            <Script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.ADSENSE_CLIENT_ID}`}
                strategy="afterInteractive" // Carrega após interatividade
                crossOrigin="anonymous"
            />
        </head>
        <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics/>
        </body>
        </html>
    )
}
