import { NextResponse } from 'next/server'
import { and, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { portfolioPositions } from '@/lib/db/schema'

const ownerKey = 'default-user'

export async function GET() {
  const rows = await db.select().from(portfolioPositions).where(eq(portfolioPositions.ownerKey, ownerKey))
  return NextResponse.json(rows.map(row => ({ symbol: row.symbol, quantity: Number(row.quantity), averageCost: Number(row.averageCost), costCurrency: row.costCurrency })))
}

export async function PUT(request: Request) {
  const body = await request.json()
  const symbol = String(body.symbol ?? '').trim()
  const quantity = Number(body.quantity)
  const averageCost = Number(body.averageCost)
  const costCurrency = String(body.costCurrency ?? 'EUR')
  if (!symbol || !Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(averageCost) || averageCost <= 0) return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  const existing = await db.select({ id: portfolioPositions.id }).from(portfolioPositions).where(and(eq(portfolioPositions.ownerKey, ownerKey), eq(portfolioPositions.symbol, symbol)))
  if (existing[0]) await db.update(portfolioPositions).set({ quantity: String(quantity), averageCost: String(averageCost), costCurrency, updatedAt: new Date() }).where(eq(portfolioPositions.id, existing[0].id))
  else await db.insert(portfolioPositions).values({ ownerKey, symbol, quantity: String(quantity), averageCost: String(averageCost), costCurrency })
  return NextResponse.json({ ok: true })
}

export async function DELETE(request: Request) {
  const symbol = String((await request.json()).symbol ?? '').trim()
  await db.delete(portfolioPositions).where(and(eq(portfolioPositions.ownerKey, ownerKey), eq(portfolioPositions.symbol, symbol)))
  return NextResponse.json({ ok: true })
}
