import { NextResponse } from 'next/server'
import { marketDataProvider } from '@/lib/market-data/marketDataProvider'
import { providerSymbol } from '@/lib/market-data/symbols'
import { holdings } from '@/lib/portfolio'
export const revalidate=180
export async function GET(){const quotes=await marketDataProvider.getMultipleQuotes(holdings.map(h=>providerSymbol(h.symbol)));return NextResponse.json(holdings.map(h=>({symbol:h.symbol,name:quotes[providerSymbol(h.symbol)]?.name??h.symbol,price:quotes[providerSymbol(h.symbol)]?.price,currency:quotes[providerSymbol(h.symbol)]?.currency,change:quotes[providerSymbol(h.symbol)]?.changePercent}))) }
