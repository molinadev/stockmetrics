import { NextResponse } from 'next/server'
import { marketDataProvider } from '@/lib/market-data/marketDataProvider'
import { providerSymbol } from '@/lib/market-data/symbols'
import { positionFor } from '@/lib/portfolio'
import type { PortfolioPosition } from '@/lib/positions'
export const revalidate = 180
export async function GET(request: Request) {
  const url = new URL(request.url); let holdings: PortfolioPosition[] = []
  try { holdings = JSON.parse(url.searchParams.get('positions') || '[]') } catch {}
  const symbols = holdings.map(h=>h.symbol); if (!symbols.length) return NextResponse.json({rows:[],totals:{value:0,open:0,today:0}})
  const quotes=await marketDataProvider.getMultipleQuotes(symbols.map(providerSymbol)); const currencies=[...new Set([...holdings.map(h=>h.costCurrency), ...Object.values(quotes).map(q=>q.currency).filter(Boolean)])] as string[]
  const fx=Object.fromEntries(await Promise.all(currencies.map(async c=>[c,await marketDataProvider.getFxRate(c,'EUR')] as const)))
  const rows=holdings.map(h=>{ const quote=quotes[providerSymbol(h.symbol)] ?? {symbol:h.symbol,price:null,previousClose:null,change:null,changePercent:null,currency:null,name:null}; return positionFor(h,quote,fx[h.costCurrency] ?? 1,fx[quote.currency ?? h.costCurrency] ?? 1) })
  return NextResponse.json({rows:rows.map(r=>({symbol:r.symbol,value:r.value,openPnl:r.openPnl,openPnlPct:r.openPnlPct,todayPnl:r.todayPnl,todayPnlPct:r.todayPnlPct,quantity:r.quantity,averageCost:r.averageCost,costCurrency:r.costCurrency})),totals:{value:rows.reduce((s,r)=>s+(r.value??0),0),open:rows.reduce((s,r)=>s+(r.openPnl??0),0),today:rows.reduce((s,r)=>s+(r.todayPnl??0),0)}})
}
