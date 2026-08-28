export type CostCurrency = 'EUR' | 'USD' | 'CAD' | 'GBP'
export type PortfolioPosition = { symbol: string; quantity: number; averageCost: number; costCurrency: CostCurrency }
export const currencies: CostCurrency[] = ['EUR', 'USD', 'CAD', 'GBP']

let cache: PortfolioPosition[] = []
export function getPortfolioPositions() { return cache }
export function getPortfolioPosition(symbol: string) { return cache.find((p) => p.symbol === symbol) }
export async function loadPortfolioPositions() {
  const response = await fetch('/api/positions', { cache: 'no-store' })
  if (!response.ok) throw new Error('No se pudieron cargar las posiciones')
  cache = await response.json()
  return cache
}
export async function savePortfolioPosition(symbol: string, position: Omit<PortfolioPosition, 'symbol'>) {
  const response = await fetch('/api/positions', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ symbol, ...position }) })
  if (!response.ok) throw new Error('No se pudo guardar la posición')
  await loadPortfolioPositions()
}
export async function removePortfolioPosition(symbol: string) {
  const response = await fetch('/api/positions', { method: 'DELETE', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ symbol }) })
  if (!response.ok) throw new Error('No se pudo eliminar la posición')
  await loadPortfolioPositions()
}
