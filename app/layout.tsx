import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2b5672',
}

export const metadata: Metadata = {
  title: 'Cántaro Azul – Rainwater Harvesting Calculator',
  description: 'Simulate water supply and demand for rainwater harvesting systems in Chiapas, Mexico.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Poppins', sans-serif" }} className="antialiased">
        <div className="flex min-h-screen w-full flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
