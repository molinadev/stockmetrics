import { Plus } from 'lucide-react'
import { Shell } from '@/components/Shell'
import { MiniSparkline } from '@/components/Charts'
import { portfolioChart, watchlist } from '@/lib/data'

export default function Watchlist() {
 return <Shell><div className="max-w-3xl"><div className="flex items-center justify-between mb-6"><h1 className="text-3xl font-bold">Watchlist</h1><button className="rounded-full p-2" style={{background:'var(--color-positive)',color:'#000'}} aria-label="Añadir activo"><Plus /></button></div><div className="rounded-lg overflow-hidden" style={{background:'var(--color-panel)'}}>{watchlist.map((item,i)=><div key={item.symbol} className="flex items-center gap-4 px-4 py-4 border-b" style={{borderColor:'var(--color-line)'}}><div className="min-w-0 flex-1"><div className="font-bold">{item.symbol}</div><div className="text-xs opacity-50 truncate">{item.name}</div></div><MiniSparkline data={portfolioChart.slice(i, i+20).concat(portfolioChart.slice(0, i))} /><div className="w-20 text-right"><div className="font-bold">{item.price}</div><div style={{color:item.positive?'var(--color-positive)':'var(--color-negative)'}}>{item.change}</div></div></div>)}</div></div></Shell>
}
