export type CostCurrency = 'EUR' | 'USD' | 'CAD' | 'GBP'
export type PortfolioPosition = { symbol: string; quantity: number; averageCost: number; costCurrency: CostCurrency }
const KEY = 'stockmetrics-portfolio-positions'

export function getPortfolioPositions(): PortfolioPosition[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(window.localStorage.getItem(KEY) || '[]') as PortfolioPosition[] } catch { return [] }
}
export function getPortfolioPosition(symbol: string) { return getPortfolioPositions().find((p) => p.symbol === symbol) }
export function savePortfolioPosition(symbol: string, position: Omit<PortfolioPosition, 'symbol'>) {
  const next = getPortfolioPositions().filter((p) => p.symbol !== symbol)
  next.push({ symbol, ...position })
  window.localStorage.setItem(KEY, JSON.stringify(next))
}
export function removePortfolioPosition(symbol: string) {
  window.localStorage.setItem(KEY, JSON.stringify(getPortfolioPositions().filter((p) => p.symbol !== symbol)))
}
export const currencies: CostCurrency[] = ['EUR', 'USD', 'CAD', 'GBP']
