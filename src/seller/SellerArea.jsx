import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'
import {
  PRODUCTS, SELLERS, STATUS_META, bagTotal, brl, productById,
  buildWhatsAppMessage, waLink,
} from '../data/data'
import { Badge, Button, Card, Input } from '../components/ui'
import { WhatsAppIcon, SearchIcon, BagIcon, CheckIcon, CloseIcon } from '../components/icons'
import { cn } from '../lib/utils'

const ME = SELLERS[0] // Camila — vendedora logada na demo

export default function SellerArea() {
  const { bags, setBagStatus, stock, showToast } = useStore()
  const [query, setQuery] = useState('')

  const myBags = bags.filter((b) => b.sellerId === ME.id || (b.client === 'Você (demo)' && !b.sellerId))
  const queue = myBags.filter((b) => b.status === 'enviado' || b.status === 'em_atendimento')
  const done = myBags.filter((b) => b.status === 'fechado' || b.status === 'perdido')

  const catalog = useMemo(
    () => PRODUCTS.filter((p) => p.active && p.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  const stats = [
    { label: 'Sacolas no mês', value: ME.monthBags },
    { label: 'Fechadas', value: ME.monthClosed },
    { label: 'Valor fechado', value: brl(ME.monthValue) },
  ]

  const openChat = (bag) => {
    const msg = `Oi, ${bag.client.split(' ')[0]}! Aqui é a ${ME.name.split(' ')[0]} da Cappri 💕 Vi sua sacola (${bag.id}) e já vou te ajudar a fechar o pedido!`
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
    if (bag.status === 'enviado') setBagStatus(bag.id, 'em_atendimento')
  }

  const confirmPurchase = (bag) => {
    setBagStatus(bag.id, 'fechado')
    showToast('Compra confirmada — estoque atualizado')
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-6xl px-4 md:px-8 py-8">
        {/* Cabeçalho */}
        <div className="flex items-center gap-4 flex-wrap">
          <img src={ME.photo} alt={ME.name} className="h-16 w-16 rounded-full object-cover ring-4 ring-brand-soft" />
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-deep">Área da vendedora</p>
            <h1 className="font-display text-3xl text-ink">Olá, {ME.name.split(' ')[0]}!</h1>
            <p className="text-sm text-ink-soft">Seu link: <span className="font-medium text-brand-deep">{ME.link}</span></p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <Card key={s.label} className="px-4 py-3 text-center">
                <p className="text-lg font-semibold text-ink leading-tight">{s.value}</p>
                <p className="text-[10px] text-ink-soft mt-0.5">{s.label}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-5 gap-6 items-start">
          {/* Fila de atendimento */}
          <div className="lg:col-span-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-ink mb-4">
              <BagIcon className="w-4 h-4 text-brand" /> Fila de atendimento
              <Badge tone="pink">{queue.length}</Badge>
            </h2>

            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {queue.length === 0 && (
                  <Card className="p-8 text-center text-sm text-ink-soft">
                    Fila zerada! Nenhuma sacola aguardando atendimento.
                  </Card>
                )}
                {queue.map((bag) => (
                  <motion.div
                    key={bag.id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={cn('p-5', bag.status === 'enviado' && 'border-brand/40 ring-1 ring-brand/15')}>
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div>
                          <p className="text-sm font-semibold text-ink">
                            {bag.client} <span className="text-ink-soft font-normal">· {bag.id}</span>
                          </p>
                          <p className="text-[11px] text-ink-soft">{bag.time}</p>
                        </div>
                        <Badge className={STATUS_META[bag.status].color}>{STATUS_META[bag.status].label}</Badge>
                      </div>

                      <ul className="mt-3 space-y-1.5">
                        {bag.items.map((it, i) => {
                          const p = productById(it.productId)
                          return (
                            <li key={i} className="flex items-center gap-2.5 text-xs text-ink">
                              <img src={p?.images[0]} alt="" className="h-9 w-7 rounded-md object-cover" />
                              <span className="flex-1">
                                {it.qty}x {p?.name} · <span className="text-ink-soft">{it.size} · {it.color}</span>
                              </span>
                            </li>
                          )
                        })}
                      </ul>

                      <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
                        <span className="text-base font-semibold text-brand-deep">{brl(bagTotal(bag))}</span>
                        <div className="flex gap-2 flex-wrap">
                          <Button variant="whatsapp" className="px-4 py-2 text-xs" onClick={() => openChat(bag)}>
                            <WhatsAppIcon className="w-4 h-4" /> Abrir conversa
                          </Button>
                          <Button
                            variant="secondary"
                            className="px-4 py-2 text-xs border-[#2f6d4a]/30 text-[#2f6d4a] hover:bg-[#e2efe5]"
                            onClick={() => confirmPurchase(bag)}
                          >
                            <CheckIcon className="w-3.5 h-3.5" /> Confirmar compra
                          </Button>
                          <Button
                            variant="ghost"
                            className="px-4 py-2 text-xs text-[#9c3f3f]"
                            onClick={() => setBagStatus(bag.id, 'perdido')}
                          >
                            <CloseIcon className="w-3.5 h-3.5" /> Perdido
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {done.length > 0 && (
              <>
                <h3 className="text-xs font-semibold text-ink-soft uppercase tracking-wide mt-7 mb-3">
                  Encerradas recentemente
                </h3>
                <div className="space-y-2">
                  {done.slice(0, 4).map((bag) => (
                    <div
                      key={bag.id}
                      className="flex items-center gap-3 bg-white/70 rounded-xl border border-line/60 px-4 py-2.5"
                    >
                      <span className="text-xs font-semibold text-ink w-20">{bag.id}</span>
                      <span className="flex-1 text-xs text-ink-soft truncate">{bag.client}</span>
                      <span className="text-xs font-semibold text-brand-deep">{brl(bagTotal(bag))}</span>
                      <Badge className={STATUS_META[bag.status].color}>{STATUS_META[bag.status].label}</Badge>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Catálogo rápido */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-ink mb-4">Consulta rápida — catálogo e estoque</h2>
            <div className="relative mb-3">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft pointer-events-none" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar produto..."
                className="pl-10"
                aria-label="Buscar no catálogo"
              />
            </div>
            <Card className="divide-y divide-line/60 max-h-[560px] overflow-y-auto nice-scroll">
              {catalog.map((p) => {
                const live = stock[p.id] ?? p.stock
                const totalStock = Object.values(live).reduce((a, b) => a + b, 0)
                return (
                  <div key={p.id} className="flex items-center gap-3 px-4 py-3">
                    <img src={p.images[0]} alt="" className="h-12 w-10 rounded-lg object-cover bg-cream" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink truncate">{p.name}</p>
                      <p className="text-[11px] text-ink-soft">
                        {Object.entries(live).map(([s, q]) => `${s}:${q}`).join(' · ')}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-brand-deep">{brl(p.promoPrice ?? p.price)}</p>
                      <p className={cn('text-[10px] font-medium', totalStock <= 5 ? 'text-[#9c3f3f]' : 'text-ink-soft')}>
                        {totalStock} un
                      </p>
                    </div>
                  </div>
                )
              })}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
