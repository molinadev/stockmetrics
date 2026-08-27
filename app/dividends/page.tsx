'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Shell } from '@/components/Shell'
import { MonthlyBarChart } from '@/components/Charts'
import { monthly } from '@/lib/data'
import { formatEur } from '@/lib/portfolio'
export default function Dividends(){const [d,setD]=useState<any>(null);useEffect(()=>{fetch('/api/dividends').then(r=>r.json()).then(setD).catch(()=>{})},[]);return <Shell><div className="max-w-5xl"><div className="flex justify-between items-end mb-8"><div><h1 className="text-4xl font-bold">Dividendos</h1><p className="opacity-60 mt-2">Ingresos estimados de tu cartera</p></div><Link href="/dividends/analytics" className="text-sm font-bold" style={{color:'var(--color-positive)'}}>Ver analítica</Link></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">{[['Anual',d?.annual],['Mensual',d?.monthly],['Diario',d?.daily]].map(([l,v])=><div key={l as string} className="rounded-lg p-5" style={{background:'var(--color-panel)'}}><div className="text-sm opacity-60">{l}</div><div className="text-2xl font-bold mt-2">{formatEur(v)}</div><div className="text-sm mt-1" style={{color:'var(--color-positive)'}}>Datos reales</div></div>)}</div><div className="rounded-lg p-5" style={{background:'var(--color-panel)'}}><h2 className="font-bold mb-4">Dividendos mensuales</h2><MonthlyBarChart data={monthly}/></div></div></Shell>}
