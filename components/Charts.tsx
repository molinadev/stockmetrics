'use client'

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function PortfolioLineChart({ data }: { data: number[] }) {
  const chartData = data.map((v, i) => ({ x: i, y: v }))
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 4" stroke="#263447" />
        <XAxis dataKey="x" hide />
        <YAxis hide />
        <Tooltip contentStyle={{ background: 'var(--color-control)', border: 'none', borderRadius: '0.5rem' }} />
        <Line type="monotone" dataKey="y" stroke="var(--color-positive)" strokeWidth={2} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function MonthlyBarChart({ data }: { data: number[] }) {
  const chartData = data.map((v, i) => ({ m: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][i], v }))
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 4" stroke="#263447" />
        <XAxis dataKey="m" />
        <YAxis hide />
        <Tooltip contentStyle={{ background: 'var(--color-control)', border: 'none', borderRadius: '0.5rem' }} />
        <Bar dataKey="v" fill="#ff9500" isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function MiniSparkline({ data }: { data: number[] }) {
  const chartData = data.slice(-20).map((v, i) => ({ x: i, y: v }))
  return (
    <ResponsiveContainer width={60} height={24}>
      <LineChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
        <Line type="monotone" dataKey="y" stroke="var(--color-positive)" strokeWidth={1} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
