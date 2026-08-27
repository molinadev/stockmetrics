'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')
  const navItems = [{ href: '/', label: 'Para ti' }, { href: '/portfolio', label: 'Portafolio' }, { href: '/dividends', label: 'Dividendos' }, { href: '/watchlist', label: 'Colecciones' }]
  
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <nav className="border-b" style={{ borderColor: 'var(--color-line)' }}>
        <div className="flex gap-6 px-6 py-4">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className={`text-sm transition ${isActive(href) ? 'font-bold' : 'opacity-60 hover:opacity-100'}`}>
              {label}
            </Link>
          ))}
        </div>
      </nav>
      <main className="px-6 py-8">{children}</main>
    </div>
  )
}
