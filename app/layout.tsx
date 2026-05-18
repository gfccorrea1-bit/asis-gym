import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk'
})

const bebasNeue = Bebas_Neue({ 
  weight: "400",
  subsets: ["latin"],
  variable: '--font-bebas'
})

export const metadata: Metadata = {
  title: 'TRANSFORMATE | Un Paso Para Cambiar Tu Vida',
  description: 'Estás a un paso de cambiar tu forma de vivir. Unite a nuestra comunidad fitness y comenzá tu transformación hoy.',
  keywords: ['gimnasio', 'fitness', 'entrenamiento', 'salud', 'transformación', 'gym'],
}

export const viewport: Viewport = {
  themeColor: '#0a0512',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${bebasNeue.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
