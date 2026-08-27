import type { Quote } from './market-data/types'
import type { PortfolioPosition } from './positions'
export type Holding = PortfolioPosition
export const portfolioSymbols = ['AYA.TO','2B76.XETRA','XY7D.XETRA','JEPQ.LSE','LITU.LSE','EVSD.XETRA','JGPI.XETRA','SDIV.LSE','8PSG.XETRA','STHE.LSE','QTRX','AG.TO','SLVR.XETRA','SPCX','GSVR.V','8PSB.XETRA']
export function positionFor(holding: Holding, quote: Quote, fx: number) {
  const price = quote.price; const previous = quote.previousClose
  const cost = holding.quantity * holding.averageCost * fx
  const value = price == null ? null : holding.quantity * price * fx
  const openPnl = value == null ? null : value - cost
  return { ...holding, quote, value, cost, openPnl, openPnlPct: value == null || !cost ? null : (value / cost - 1) * 100, todayPnl: price == null || previous == null ? null : (price - previous) * holding.quantity * fx, todayPnlPct: price == null || !previous ? null : (price / previous - 1) * 100 }
}
export const formatEur = (value: number | null) => value == null ? '-' : new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(value)
export const formatPrice = (value: number | null, currency: string | null) => value == null ? '-' : new Intl.NumberFormat('es-ES',{style:'currency',currency:currency || 'EUR'}).format(value)
