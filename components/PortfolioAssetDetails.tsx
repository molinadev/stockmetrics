'use client'

import { useEffect, useState } from 'react'
import { PortfolioLineChart } from '@/components/Charts'
import { formatPrice } from '@/lib/portfolio'

export function PortfolioAssetDetails({ symbol }: { symbol: string }) {
  const [data, setData] = useState<any>(null)
  useEffect(() => { fetch(`/api/asset/${symbol}`).then(r => r.json()).then(setData).catch(() => setData(null)) }, [symbol])
  const q = data?.quote
  const stats = data?.stats
  if (!q) return <section className="rounded-lg p-6" style={{ background: 'var(--color-panel)' }}>Cargando detalles de {symbol}...</section>
  return <section className="grid gap-8 rounded-lg p-6 lg:grid-cols-[1fr_280px]" style={{ background: 'var(--color-panel)' }}>
    <div><h2 className="text-3xl font-bold">{q.name ?? symbol}</h2><div className="mt-1 text-2xl font-bold">{formatPrice(q.price, q.currency)}</div><div className="mt-2 flex gap-4" style={{ color: (q.changePercent ?? 0) >= 0 ? 'var(--color-positive)' : 'var(--color-negative)' }}><span>{q.change == null ? '-' : `${q.change >= 0 ? '+' : ''}${q.change.toFixed(2)}`}</span><strong>{q.changePercent == null ? '-' : `${q.changePercent.toFixed(2)}%`}</strong><span className="opacity-70">Hoy</span></div><div className="mt-6"><PortfolioLineChart data={data.history?.map((x: any) => x.close) ?? []} /></div><h3 className="mt-6 text-2xl font-bold">Estadísticas</h3><div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 text-sm sm:grid-cols-5">{[['Máximo del día',stats?.dayHigh],['Mínimo del día',stats?.dayLow],['Máximo 52S',stats?.fiftyTwoWeekHigh],['Mínimo 52S',stats?.fiftyTwoWeekLow],['Volumen',stats?.volume]].map(([label,value]) => <div key={label as string}><b>{label}</b><div className="mt-1 opacity-75">{value ?? '-'}</div></div>)}</div></div>
    <div className="flex flex-col gap-6"><h3 className="text-2xl font-bold">Detalles</h3><div className="flex justify-between"><span className="opacity-60">Moneda</span><b>{q.currency ?? '-'}</b></div><div className="flex justify-between"><span className="opacity-60">Cambio diario</span><b>{q.changePercent == null ? '-' : `${q.changePercent.toFixed(2)}%`}</b></div><div className="flex justify-between"><span className="opacity-60">P/E</span><b>{stats?.pe ?? '-'}</b></div></div>
  </section>
}
