import { NextResponse } from 'next/server'
import { marketDataProvider } from '@/lib/market-data/marketDataProvider'
import { providerSymbol } from '@/lib/market-data/symbols'
import { portfolioSymbols } from '@/lib/portfolio'
export const revalidate=180
export async function GET(){const providerSymbols=portfolioSymbols.map(providerSymbol); const quotes=await marketDataProvider.getMultipleQuotes(providerSymbols); const rows=await Promise.all(portfolioSymbols.map(async symbol=>{const provider=providerSymbol(symbol); const quote=quotes[provider]; const history=await marketDataProvider.getHistoricalPrices(provider,'1S'); return {symbol,name:quote?.name??symbol,price:quote?.price??null,currency:quote?.currency??null,change:quote?.changePercent??null,history:history.map(point=>point.close)} })); return NextResponse.json(rows) }
