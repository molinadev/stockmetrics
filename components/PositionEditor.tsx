'use client'

import { useEffect, useState } from 'react'
import { currencies, getPortfolioPosition, loadPortfolioPositions, removePortfolioPosition, savePortfolioPosition, type CostCurrency } from '@/lib/positions'

function parseDecimal(value: string) {
  return Number(value.trim().replace(',', '.'))
}

export function PositionEditor({ symbol, name, symbols, onSaved }: { symbol?: string; name?: string | null; symbols?: string[]; onSaved?: () => void }) {
  const [selectedSymbol, setSelectedSymbol] = useState(symbol ?? symbols?.[0] ?? '')
  const [loaded, setLoaded] = useState(false)
  const activeSymbol = symbol ?? selectedSymbol
  useEffect(() => { loadPortfolioPositions().finally(() => setLoaded(true)) }, [])

  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState('')
  const [averageCost, setAverageCost] = useState('')
  const [costCurrency, setCostCurrency] = useState<CostCurrency>('EUR')
  const [error, setError] = useState('')
  const existing = getPortfolioPosition(activeSymbol)
  const isEditing = Boolean(existing)

  function openEditor() {
    const position = getPortfolioPosition(activeSymbol)
    setQuantity(position ? String(position.quantity) : '')
    setAverageCost(position ? String(position.averageCost).replace('.', ',') : '')
    setCostCurrency(position?.costCurrency ?? 'EUR')
    setError('')
    setOpen(true)
  }

  async function save() {
    const q = parseDecimal(quantity)
    const c = parseDecimal(averageCost)
    if (!Number.isFinite(q) || q <= 0) return setError('Introduce una cantidad mayor que 0.')
    if (!Number.isFinite(c) || c <= 0) return setError('Introduce un coste promedio mayor que 0.')
    if (!costCurrency) return setError('Selecciona una moneda.')
    await savePortfolioPosition(activeSymbol, { quantity: q, averageCost: c, costCurrency })
    setOpen(false)
    onSaved?.()
  }

  async function remove() {
    if (!window.confirm(`¿Eliminar ${symbol} del portfolio?`)) return
    await removePortfolioPosition(activeSymbol)
    setOpen(false)
    onSaved?.()
  }

  return <>
    <button onClick={openEditor} className="w-full rounded-full py-4 font-bold" style={{ background: 'var(--color-positive)', color: '#000' }}>
      {isEditing ? 'Editar portfolio' : 'Añadir al portfolio'}
    </button>
    {open && <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-labelledby="position-editor-title">
      <div className="w-full max-w-md rounded-xl p-6" style={{ background: 'var(--color-panel)' }}>
        <h2 id="position-editor-title" className="text-2xl font-bold">{isEditing ? 'Editar portfolio' : `Añadir ${activeSymbol} al portfolio`}</h2>
        <p className="mt-2 opacity-65">{name ?? activeSymbol}</p>
        {!symbol && symbols?.length ? <label className="mt-5 flex flex-col gap-2">Activo<select value={selectedSymbol} onChange={e => setSelectedSymbol(e.target.value)} className="rounded-lg p-3" style={{ background: 'var(--color-control)', color: 'inherit' }}>{symbols.map(item => <option key={item} value={item}>{item}</option>)}</select></label> : null}
        <div className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-2">Cantidad<input inputMode="decimal" min="0" step="any" value={quantity} onChange={e => setQuantity(e.target.value)} aria-invalid={Boolean(error && (!quantity || parseDecimal(quantity) <= 0))} className="rounded-lg p-3" style={{ background: 'var(--color-control)', color: 'inherit' }} /></label>
          <label className="flex flex-col gap-2">Coste promedio<input inputMode="decimal" min="0" step="any" value={averageCost} onChange={e => setAverageCost(e.target.value)} className="rounded-lg p-3" style={{ background: 'var(--color-control)', color: 'inherit' }} /></label>
          <label className="flex flex-col gap-2">Moneda del coste<select value={costCurrency} onChange={e => setCostCurrency(e.target.value as CostCurrency)} className="rounded-lg p-3" style={{ background: 'var(--color-control)', color: 'inherit' }}>{currencies.map(currency => <option key={currency}>{currency}</option>)}</select></label>
        </div>
        {error && <p role="alert" className="mt-4 text-sm" style={{ color: 'var(--color-negative)' }}>{error}</p>}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3"><div>{isEditing && <button onClick={remove} className="rounded-lg px-1 py-3 text-sm" style={{ color: 'var(--color-negative)' }}>Eliminar del portfolio</button>}</div><div className="flex gap-3"><button onClick={() => setOpen(false)} className="rounded-lg px-5 py-3">Cancelar</button><button onClick={save} className="rounded-lg px-5 py-3 font-bold" style={{ background: 'var(--color-positive)', color: '#000' }}>{isEditing ? 'Guardar cambios' : 'Añadir al portfolio'}</button></div></div>
      </div>
    </div>}
  </>
}
