import { NextResponse } from 'next/server'
import { marketDataProvider } from '@/lib/market-data/marketDataProvider'
import { providerSymbol } from '@/lib/market-data/symbols'
import { portfolioSymbols } from '@/lib/portfolio'
export const revalidate=180
export async function GET(){const quotes=await marketDataProvider.getMultipleQuotes(portfolioSymbols.map(providerSymbol));return NextResponse.json(portfolioSymbols.map(symbol=>({symbol,name:quotes[providerSymbol(symbol)]?.name??symbol,price:quotes[providerSymbol(symbol)]?.price,currency:quotes[providerSymbol(symbol)]?.currency,change:quotes[providerSymbol(symbol)]?.changePercent}))) }
