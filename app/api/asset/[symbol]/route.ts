import { NextResponse } from 'next/server'
import { marketDataProvider } from '@/lib/market-data/marketDataProvider'
import { providerSymbol } from '@/lib/market-data/symbols'
export const revalidate = 900
export async function GET(_request: Request, { params }: { params: Promise<{symbol:string}> }) { const {symbol}=await params; const provider=providerSymbol(symbol); const [quote,stats,history]=await Promise.all([marketDataProvider.getQuote(provider),marketDataProvider.getAssetStats(provider),marketDataProvider.getHistoricalPrices(provider,'1A')]); return NextResponse.json({symbol,quote,stats,history}) }
