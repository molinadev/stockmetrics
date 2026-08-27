import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = { title: 'StockMetrics', description: 'Tu portfolio de inversión' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className="bg-background"><body>{children}</body></html>
}
