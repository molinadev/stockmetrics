'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Shell } from '@/components/Shell'
import { MetricCard } from '@/components/MetricCard'
import { PortfolioLineChart } from '@/components/Charts'
import { periods, portfolioChart, positions } from '@/lib/data'

export default function Portfolio() {
  const [period, setPeriod] = useState('1D')
  return (
    <Shell>
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-2">Portafolio</h1>
        <div className="flex gap-4 mb-8" style={{ color: 'var(--color-positive)' }}>
          <MetricCard label="Hoy" value="€96,41" change="+€96,41" pct="0,21%" positive />
          <MetricCard label="P/G abierto" value="-€615,12" change="-€615,12" pct="-1,35%" positive={false} />
          <MetricCard label="Total" value="-€615,12" change="-€615,12" pct="-1,35%" positive={false} />
        </div>
        <div className="rounded-lg p-4 mb-8" style={{ background: 'var(--color-panel)' }}>
          <PortfolioLineChart data={portfolioChart} />
          <div className="flex gap-2 mt-4 flex-wrap">
            {periods.map((p) => (
              <button key={p} onClick={() => setPeriod(p)} className="px-3 py-1 text-xs rounded transition" style={{ background: p === period ? 'var(--color-positive)' : 'var(--color-control)', color: p === period ? '#000' : 'inherit' }}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'var(--color-panel)' }}>
          <h2 className="font-bold mb-4">P/G</h2>
          <div className="space-y-3">
            {positions.map((pos) => (
              <Link key={pos.symbol} href={`/asset/${pos.symbol}`}>
                <div className="flex items-center gap-4 p-3 rounded cursor-pointer hover:opacity-80 transition" style={{ background: 'var(--color-control)' }}>
                  <span className="font-bold text-sm w-20">{pos.symbol}</span>
                  <div className="flex-1 h-6 rounded" style={{ background: 'var(--color-line)' }}>
                    <div className="h-full rounded" style={{ background: pos.positive ? 'var(--color-positive)' : 'var(--color-negative)', width: `${pos.pct}%` }} />
                  </div>
                  <span className={`text-sm font-bold w-16 text-right`} style={{ color: pos.positive ? 'var(--color-positive)' : 'var(--color-negative)' }}>{pos.value}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  )
}
