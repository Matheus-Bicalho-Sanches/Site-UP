import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UP Carteiras Administradas',
  description: 'Excelência em Gestão de Patrimônio. Nos dedicamos a proteger e fazer crescer o patrimônio de nossos clientes através de uma gestão profissional com custo justo.',
  metadataBase: new URL('https://www.up-gestora.com.br'),
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.up-gestora.com.br',
    siteName: 'UP Carteiras Administradas',
    title: 'UP Carteiras Administradas',
    description: 'Excelência em Gestão de Patrimônio. Nos dedicamos a proteger e fazer crescer o patrimônio de nossos clientes através de uma gestão profissional com custo justo.',
    images: [
      {
        url: '/images/up-logo-blue.png',
        width: 1200,
        height: 630,
        alt: 'UP Carteiras Administradas Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UP Carteiras Administradas',
    description: 'Excelência em Gestão de Patrimônio. Nos dedicamos a proteger e fazer crescer o patrimônio de nossos clientes através de uma gestão profissional com custo justo.',
    images: ['/images/up-logo-blue.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // You'll need to add your Google Search Console verification code here
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
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
} 