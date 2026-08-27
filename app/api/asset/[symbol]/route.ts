import { NextResponse } from 'next/server'
import { marketDataProvider } from '@/lib/market-data/marketDataProvider'
import { providerSymbol } from '@/lib/market-data/symbols'
export const revalidate = 900
export async function GET(request: Request, { params }: { params: Promise<{symbol:string}> }) { const {symbol}=await params; const provider=providerSymbol(symbol); const [quote,stats,history]=await Promise.all([marketDataProvider.getQuote(provider),marketDataProvider.getAssetStats(provider),marketDataProvider.getHistoricalPrices(provider,'1A')]); let position=null; try { position=JSON.parse(new URL(request.url).searchParams.get('position') || 'null') } catch {} const quoteFx=position ? await marketDataProvider.getFxRate(quote.currency ?? 'EUR','EUR') : 1; const costFx=position ? await marketDataProvider.getFxRate(position.costCurrency,'EUR') : 1; return NextResponse.json({symbol,quote,stats,history,position,quoteFx,costFx}) }
