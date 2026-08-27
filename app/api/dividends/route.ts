import { NextResponse } from 'next/server'
import { marketDataProvider } from '@/lib/market-data/marketDataProvider'
import { providerSymbol } from '@/lib/market-data/symbols'
import { portfolioSymbols } from '@/lib/portfolio'
export const revalidate=21600
export async function GET(){const rows=await Promise.all(portfolioSymbols.map(async symbol=>{const [q,d]=await Promise.all([marketDataProvider.getQuote(providerSymbol(symbol)),marketDataProvider.getDividendHistory(providerSymbol(symbol))]); const annual=d.filter(x=>Date.now()-new Date(x.date).getTime()<31536000000).reduce((s,x)=>s+x.amount,0); return {symbol,annual,currency:q.currency}})); return NextResponse.json({annual:rows.reduce((s,r)=>s+r.annual,0),monthly:rows.reduce((s,r)=>s+r.annual,0)/12,daily:rows.reduce((s,r)=>s+r.annual,0)/365,rows})}
