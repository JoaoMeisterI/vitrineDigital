import { motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'
import { METRICS_30D, PRODUCTS, STATUS_META, bagTotal, brl, productById, SELLERS } from '../data/data'
import { Card, Badge, Button } from '../components/ui'
import { PackageIcon, PaletteIcon, UsersIcon, BagIcon, EyeIcon, TrendUpIcon } from '../components/icons'
import { AdminHeader } from './AdminArea'

export default function Dashboard({ goTo }) {
  const { bags } = useStore()
  const today = METRICS_30D[METRICS_30D.length - 1]
  const activeProducts = PRODUCTS.filter((p) => p.active).length
  const todayBags = bags.filter((b) => b.time.startsWith('Hoje') || b.time === 'Agora mesmo')

  const stats = [
    { label: 'Visitas hoje', value: today.visits, icon: EyeIcon, delta: '+12%' },
    { label: 'Sacolas enviadas hoje', value: todayBags.length, icon: BagIcon, delta: '+2' },
    { label: 'Produtos ativos', value: activeProducts, icon: PackageIcon, delta: null },
  ]

  const shortcuts = [
    { label: 'Cadastrar produto', desc: 'Fotos, variações e estoque', icon: PackageIcon, page: 'products' },
    { label: 'Editar home', desc: 'Seções, banners e ordem', icon: PaletteIcon, page: 'appearance' },
    { label: 'Vendedores', desc: 'Links de atribuição', icon: UsersIcon, page: 'sellers' },
  ]

  return (
    <>
      <AdminHeader title="Bom dia, Cappri" subtitle="Resumo da loja — Domingo, 19 de outubro" />

      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: I, delta }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <span className="grid place-items-center h-10 w-10 rounded-xl bg-brand-soft text-brand-deep">
                  <I className="w-5 h-5" />
                </span>
                {delta && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2f6d4a]">
                    <TrendUpIcon className="w-3.5 h-3.5" /> {delta}
                  </span>
                )}
              </div>
              <p className="text-3xl font-semibold text-ink mt-3">{value}</p>
              <p className="text-xs text-ink-soft mt-0.5">{label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        {shortcuts.map(({ label, desc, icon: I, page }) => (
          <button
            key={label}
            onClick={() => goTo(page)}
            className="group text-left bg-white rounded-2xl border border-line p-5 cursor-pointer hover:border-brand/40 hover:shadow-[0_10px_30px_-18px_rgba(224,33,138,0.4)] transition-all duration-200"
          >
            <span className="grid place-items-center h-10 w-10 rounded-xl bg-blush text-brand-deep group-hover:bg-brand group-hover:text-white transition-colors duration-200">
              <I className="w-5 h-5" />
            </span>
            <p className="text-sm font-semibold text-ink mt-3">{label}</p>
            <p className="text-xs text-ink-soft mt-0.5">{desc}</p>
          </button>
        ))}
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="px-6 py-4 border-b border-line flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">Últimas sacolas recebidas</h2>
          <Badge tone="pink">{bags.length} no total</Badge>
        </div>
        <div className="divide-y divide-line/60">
          {bags.slice(0, 5).map((bag) => {
            const seller = SELLERS.find((s) => s.id === bag.sellerId)
            return (
              <div key={bag.id} className="px-6 py-3.5 flex items-center gap-4 flex-wrap">
                <div className="min-w-28">
                  <p className="text-sm font-semibold text-ink">{bag.id}</p>
                  <p className="text-[11px] text-ink-soft">{bag.time}</p>
                </div>
                <p className="flex-1 min-w-40 text-xs text-ink-soft truncate">
                  {bag.client} · {bag.items.map((it) => productById(it.productId)?.name).join(', ')}
                </p>
                <span className="text-sm font-semibold text-brand-deep">{brl(bagTotal(bag))}</span>
                <span className="hidden sm:block text-xs text-ink-soft w-20 truncate">{seller?.name.split(' ')[0]}</span>
                <Badge className={STATUS_META[bag.status].color}>{STATUS_META[bag.status].label}</Badge>
              </div>
            )
          })}
        </div>
      </Card>
    </>
  )
}
