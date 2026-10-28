import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'
import {
  METRICS_30D, KPI_PREVIOUS, PRODUCTS, CATEGORIES, SELLERS,
  STATUS_META, bagTotal, brl, productById,
} from '../data/data'
import { Badge, Card } from '../components/ui'
import { TrendUpIcon, TrendDownIcon } from '../components/icons'
import { cn } from '../lib/utils'

const PERIODS = [
  { id: 7, label: '7 dias' },
  { id: 30, label: '30 dias' },
  { id: 90, label: '90 dias' },
]

const CHART_COLORS = ['#e0218a', '#c9a227', '#4f7a5a', '#9db7cf']

function Delta({ value }) {
  const up = value >= 0
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs font-semibold', up ? 'text-[#2f6d4a]' : 'text-[#9c3f3f]')}>
      {up ? <TrendUpIcon className="w-3.5 h-3.5" /> : <TrendDownIcon className="w-3.5 h-3.5" />}
      {up ? '+' : ''}{value.toFixed(1)}%
    </span>
  )
}

function LineChart({ data }) {
  const w = 560, h = 180, pad = 28
  const max = Math.max(...data.map((d) => d.bags)) * 1.15
  const pts = data.map((d, i) => [
    pad + (i / (data.length - 1)) * (w - pad * 2),
    h - pad - (d.bags / max) * (h - pad * 2),
  ])
  const path = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `${path} L${pts[pts.length - 1][0]},${h - pad} L${pts[0][0]},${h - pad} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Sacolas enviadas por dia">
      <defs>
        <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0218a" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#e0218a" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={f}
          x1={pad} x2={w - pad}
          y1={h - pad - f * (h - pad * 2)} y2={h - pad - f * (h - pad * 2)}
          stroke="#f0dde7" strokeDasharray="3 5"
        />
      ))}
      <path d={area} fill="url(#lineFill)" />
      <motion.path
        d={path}
        fill="none"
        stroke="#e0218a"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      {pts.filter((_, i) => i % Math.ceil(data.length / 8) === 0 || i === pts.length - 1).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#fff" stroke="#e0218a" strokeWidth="2" />
      ))}
      {data.filter((_, i) => i % Math.ceil(data.length / 6) === 0 || i === data.length - 1).map((d, i, arr) => {
        const idx = data.indexOf(d)
        const x = pad + (idx / (data.length - 1)) * (w - pad * 2)
        return (
          <text key={i} x={x} y={h - 8} textAnchor="middle" fontSize="10" fill="#6b5f66">
            {d.label}
          </text>
        )
      })}
    </svg>
  )
}

function BarChart({ items }) {
  const max = Math.max(...items.map((i) => i.value))
  return (
    <div className="space-y-2.5">
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="w-36 shrink-0 text-xs text-ink truncate text-right">{item.label}</span>
          <div className="flex-1 h-5 rounded-full bg-blush overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / max) * 100}%` }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-brand to-[#f06cae]"
            />
          </div>
          <span className="w-10 shrink-0 text-xs font-semibold text-ink">{item.value}</span>
        </div>
      ))}
    </div>
  )
}

function Donut({ segments }) {
  const total = segments.reduce((s, x) => s + x.value, 0)
  const r = 54, c = 2 * Math.PI * r
  let offset = 0
  return (
    <div className="flex items-center gap-6 flex-wrap">
      <svg viewBox="0 0 140 140" className="w-36 h-36 shrink-0" role="img" aria-label="Vendas por categoria">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#fdf2f6" strokeWidth="18" />
        {segments.map((seg, i) => {
          const frac = seg.value / total
          const el = (
            <motion.circle
              key={seg.label}
              cx="70" cy="70" r={r}
              fill="none"
              stroke={CHART_COLORS[i % CHART_COLORS.length]}
              strokeWidth="18"
              strokeDasharray={`${frac * c} ${c}`}
              strokeDashoffset={-offset * c}
              transform="rotate(-90 70 70)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            />
          )
          offset += frac
          return el
        })}
        <text x="70" y="66" textAnchor="middle" fontSize="20" fontWeight="600" fill="#1f1a1d">{total}</text>
        <text x="70" y="84" textAnchor="middle" fontSize="9" fill="#6b5f66">sacolas</text>
      </svg>
      <ul className="space-y-2">
        {segments.map((seg, i) => (
          <li key={seg.label} className="flex items-center gap-2.5 text-sm">
            <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
            <span className="text-ink">{seg.label}</span>
            <span className="text-xs text-ink-soft">({Math.round((seg.value / total) * 100)}%)</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function BI() {
  const { bags } = useStore()
  const [period, setPeriod] = useState(30)

  const data = useMemo(() => METRICS_30D.slice(-Math.min(period, 30)), [period])
  const visits = data.reduce((s, d) => s + d.visits, 0)
  const sentBags = data.reduce((s, d) => s + d.bags, 0)
  const conversion = (sentBags / visits) * 100
  const ticket = 274.6
  const newClients = Math.round(sentBags * 0.14)

  const kpis = [
    { label: 'Visitas na vitrine', value: visits.toLocaleString('pt-BR'), delta: ((visits - KPI_PREVIOUS.visits) / KPI_PREVIOUS.visits) * 100 },
    { label: 'Sacolas enviadas ao WhatsApp', value: sentBags, delta: ((sentBags - KPI_PREVIOUS.bags) / KPI_PREVIOUS.bags) * 100 },
    { label: 'Conversão visita → sacola', value: `${conversion.toFixed(1)}%`, delta: conversion - KPI_PREVIOUS.conversion },
    { label: 'Ticket médio estimado', value: brl(ticket), delta: ((ticket - KPI_PREVIOUS.ticket) / KPI_PREVIOUS.ticket) * 100 },
    { label: 'Novas clientes', value: newClients, delta: ((newClients - KPI_PREVIOUS.newClients) / KPI_PREVIOUS.newClients) * 100 },
  ]

  const topProducts = [...PRODUCTS].sort((a, b) => b.views - a.views).slice(0, 10)
    .map((p) => ({ label: p.name, value: p.views }))

  const byCategory = CATEGORIES.map((c) => ({
    label: c.name,
    value: PRODUCTS.filter((p) => p.category === c.id).reduce((s, p) => s + p.sent, 0),
  }))

  const ranking = [...SELLERS].sort((a, b) => b.monthValue - a.monthValue)

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-6xl px-4 md:px-8 py-8">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-7">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-deep">Painel do dono</p>
            <h1 className="font-display text-3xl text-ink mt-1">Indicadores da Cappri</h1>
            <p className="text-sm text-ink-soft mt-1">Comparação com o período anterior</p>
          </div>
          <div className="inline-flex rounded-full bg-white border border-line p-1">
            {PERIODS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium cursor-pointer transition-colors duration-200',
                  period === p.id ? 'bg-brand text-white' : 'text-ink-soft hover:text-ink',
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="p-4 h-full">
                <p className="text-[11px] text-ink-soft leading-tight min-h-7">{kpi.label}</p>
                <p className="text-2xl font-semibold text-ink mt-1.5">{kpi.value}</p>
                <div className="mt-1"><Delta value={kpi.delta} /></div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Gráficos */}
        <div className="mt-6 grid lg:grid-cols-5 gap-4">
          <Card className="lg:col-span-3 p-6">
            <h2 className="text-sm font-semibold text-ink">Sacolas enviadas por dia</h2>
            <p className="text-xs text-ink-soft mb-4">Últimos {Math.min(period, 30)} dias</p>
            <LineChart data={data} />
          </Card>

          <Card className="lg:col-span-2 p-6">
            <h2 className="text-sm font-semibold text-ink mb-1">Vendas por categoria</h2>
            <p className="text-xs text-ink-soft mb-4">Sacolas enviadas por segmento</p>
            <Donut segments={byCategory} />
          </Card>

          <Card className="lg:col-span-3 p-6">
            <h2 className="text-sm font-semibold text-ink">Top 10 produtos mais vistos</h2>
            <p className="text-xs text-ink-soft mb-4">Visualizações na vitrine no período</p>
            <BarChart items={topProducts} />
          </Card>

          <Card className="lg:col-span-2 p-6">
            <h2 className="text-sm font-semibold text-ink mb-4">Ranking de vendedoras</h2>
            <ol className="space-y-3">
              {ranking.map((s, i) => (
                <li key={s.id} className="flex items-center gap-3">
                  <span
                    className={cn(
                      'grid place-items-center h-7 w-7 rounded-full text-xs font-bold shrink-0',
                      i === 0 ? 'bg-gold-soft text-[#8a6d12]' : 'bg-blush text-ink-soft',
                    )}
                  >
                    {i + 1}º
                  </span>
                  <img src={s.photo} alt="" className="h-9 w-9 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{s.name}</p>
                    <p className="text-[11px] text-ink-soft">
                      {s.monthClosed} fechadas de {s.monthBags} sacolas
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-brand-deep">{brl(s.monthValue)}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>

        {/* Tabela de sacolas */}
        <Card className="mt-6 overflow-hidden">
          <div className="px-6 py-4 border-b border-line">
            <h2 className="text-sm font-semibold text-ink">Últimas sacolas enviadas</h2>
          </div>
          <div className="overflow-x-auto nice-scroll">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-ink-soft border-b border-line bg-blush/50">
                  <th className="px-6 py-3 font-semibold">Sacola</th>
                  <th className="px-3 py-3 font-semibold">Cliente</th>
                  <th className="px-3 py-3 font-semibold">Itens</th>
                  <th className="px-3 py-3 font-semibold">Valor</th>
                  <th className="px-3 py-3 font-semibold">Vendedora</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {bags.map((bag) => {
                  const seller = SELLERS.find((s) => s.id === bag.sellerId)
                  return (
                    <tr key={bag.id} className="border-b border-line/60 hover:bg-blush/40 transition-colors duration-150">
                      <td className="px-6 py-3">
                        <p className="font-semibold text-ink">{bag.id}</p>
                        <p className="text-[11px] text-ink-soft">{bag.time}</p>
                      </td>
                      <td className="px-3 py-3 text-ink">{bag.client}</td>
                      <td className="px-3 py-3 text-xs text-ink-soft max-w-56">
                        <span className="line-clamp-2">
                          {bag.items.map((it) => `${it.qty}x ${productById(it.productId)?.name}`).join(', ')}
                        </span>
                      </td>
                      <td className="px-3 py-3 font-semibold text-brand-deep">{brl(bagTotal(bag))}</td>
                      <td className="px-3 py-3 text-ink-soft">{seller?.name.split(' ')[0]}</td>
                      <td className="px-6 py-3">
                        <Badge className={STATUS_META[bag.status].color}>{STATUS_META[bag.status].label}</Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
