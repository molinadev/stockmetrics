export type Period = '1D' | '1S' | '1M' | '3M' | 'YTD' | '1A' | '5A' | 'Máx'

export type Quote = { symbol: string; price: number | null; previousClose: number | null; change: number | null; changePercent: number | null; currency: string | null; name: string | null }
export type HistoricalPoint = { date: string; close: number }
export type AssetStats = { dayHigh: number | null; dayLow: number | null; fiftyTwoWeekHigh: number | null; fiftyTwoWeekLow: number | null; volume: number | null; averageVolume: number | null; marketCap: number | null; pe: number | null; dividendYield: number | null }
export type Dividend = { date: string; amount: number }
export type MarketDataProvider = { getQuote(symbol: string): Promise<Quote>; getHistoricalPrices(symbol: string, period: Period): Promise<HistoricalPoint[]>; getAssetStats(symbol: string): Promise<AssetStats>; getDividendHistory(symbol: string): Promise<Dividend[]>; getFxRate(fromCurrency: string, toCurrency: string): Promise<number>; getMultipleQuotes(symbols: string[]): Promise<Record<string, Quote>> }
