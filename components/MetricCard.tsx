export function MetricCard({ label, value, change, pct, positive }: { label: string; value: string; change: string; pct: string; positive: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs opacity-60">{label}</span>
      <span className="text-sm font-bold">{value}</span>
      <span className={`text-xs ${positive ? 'opacity-100' : ''}`} style={{ color: positive ? 'var(--color-positive)' : 'var(--color-negative)' }}>
        {change} {pct}
      </span>
    </div>
  )
}
