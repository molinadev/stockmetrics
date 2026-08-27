import { NextResponse } from 'next/server'
import { marketDataProvider } from '@/lib/market-data/marketDataProvider'
import { providerSymbol } from '@/lib/market-data/symbols'
import { holdings, positionFor } from '@/lib/portfolio'

export const revalidate = 180
export async function GET() { const symbols=holdings.map(h=>h.symbol); const quotes=await marketDataProvider.getMultipleQuotes(symbols.map(providerSymbol)); const currencies=[...new Set(holdings.map(h=>h.currency))]; const fxEntries=await Promise.all(currencies.map(async c=>[c,await marketDataProvider.getFxRate(c,'EUR')] as const)); const fx=Object.fromEntries(fxEntries); const rows=holdings.map(h=>positionFor(h,quotes[providerSymbol(h.symbol)] ?? {symbol:h.symbol,price:null,previousClose:null,change:null,changePercent:null,currency:h.currency,name:null},fx[h.currency] ?? 1)); return NextResponse.json({rows:rows.map(r=>({symbol:r.symbol,value:r.value,openPnl:r.openPnl,openPnlPct:r.openPnlPct,todayPnl:r.todayPnl})),totals:{value:rows.reduce((s,r)=>s+(r.value??0),0),open:rows.reduce((s,r)=>s+(r.openPnl??0),0),today:rows.reduce((s,r)=>s+(r.todayPnl??0),0)}}) }
