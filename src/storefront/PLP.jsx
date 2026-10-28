import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PRODUCTS, CATEGORIES, COLOR_SWATCHES, SIZES_REGULAR, SIZES_PLUS, effectivePrice } from '../data/data'
import { Badge, Select } from '../components/ui'
import { CloseIcon, FilterIcon } from '../components/icons'
import { cn } from '../lib/utils'
import ProductCard from './ProductCard'

const PRICE_RANGES = [
  { id: 'ate150', label: 'Até R$ 150', test: (v) => v <= 150 },
  { id: '150a250', label: 'R$ 150 – R$ 250', test: (v) => v > 150 && v <= 250 },
  { id: 'acima250', label: 'Acima de R$ 250', test: (v) => v > 250 },
]

const ALL_SIZES = [...SIZES_REGULAR, ...SIZES_PLUS]
const ALL_COLORS = Object.keys(COLOR_SWATCHES)

export default function PLP({ category, openProduct }) {
  const [cat, setCat] = useState(category ?? null)
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])
  const [price, setPrice] = useState(null)
  const [sort, setSort] = useState('relevancia')
  const [mobileFilters, setMobileFilters] = useState(false)

  const toggle = (list, setList, value) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

  const products = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.active)
    if (cat) list = list.filter((p) => p.category === cat)
    if (sizes.length) list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)))
    if (colors.length) list = list.filter((p) => p.colors.some((c) => colors.includes(c)))
    if (price) list = list.filter((p) => PRICE_RANGES.find((r) => r.id === price).test(effectivePrice(p)))
    if (sort === 'menor') list = [...list].sort((a, b) => effectivePrice(a) - effectivePrice(b))
    if (sort === 'maior') list = [...list].sort((a, b) => effectivePrice(b) - effectivePrice(a))
    if (sort === 'vistos') list = [...list].sort((a, b) => b.views - a.views)
    return list
  }, [cat, sizes, colors, price, sort])

  const activeChips = [
    ...(cat ? [{ key: 'cat', label: CATEGORIES.find((c) => c.id === cat)?.name, clear: () => setCat(null) }] : []),
    ...sizes.map((s) => ({ key: `s-${s}`, label: `Tam ${s}`, clear: () => toggle(sizes, setSizes, s) })),
    ...colors.map((c) => ({ key: `c-${c}`, label: c, clear: () => toggle(colors, setColors, c) })),
    ...(price ? [{ key: 'price', label: PRICE_RANGES.find((r) => r.id === price)?.label, clear: () => setPrice(null) }] : []),
  ]

  const Filters = () => (
    <div className="space-y-7">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-3">Categoria</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(cat === c.id ? null : c.id)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-xs font-medium border cursor-pointer transition-colors duration-200',
                cat === c.id
                  ? 'bg-brand text-white border-brand'
                  : 'bg-white text-ink border-line hover:border-brand/50',
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-3">
          Tamanho <span className="normal-case font-normal">(incl. plus 46–54)</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => toggle(sizes, setSizes, s)}
              className={cn(
                'min-w-10 rounded-xl px-2.5 py-1.5 text-xs font-semibold border cursor-pointer transition-colors duration-200',
                sizes.includes(s)
                  ? 'bg-brand text-white border-brand'
                  : 'bg-white text-ink border-line hover:border-brand/50',
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-3">Cor</h3>
        <div className="flex flex-wrap gap-2.5">
          {ALL_COLORS.slice(0, 12).map((c) => (
            <button
              key={c}
              onClick={() => toggle(colors, setColors, c)}
              title={c}
              aria-label={`Filtrar cor ${c}`}
              className={cn(
                'h-7 w-7 rounded-full border-2 cursor-pointer transition-transform duration-200 hover:scale-110',
                colors.includes(c) ? 'border-brand ring-2 ring-brand/25' : 'border-white shadow',
              )}
              style={{ backgroundColor: COLOR_SWATCHES[c] }}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-3">Preço</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((r) => (
            <label key={r.id} className="flex items-center gap-2.5 text-sm text-ink cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={price === r.id}
                onChange={() => setPrice(price === r.id ? null : r.id)}
                onClick={() => price === r.id && setPrice(null)}
                className="accent-[#e0218a] h-4 w-4"
              />
              {r.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-4xl text-ink">
            {cat ? CATEGORIES.find((c) => c.id === cat)?.name : 'Toda a coleção'}
          </h1>
          <p className="text-sm text-ink-soft mt-1">{products.length} produtos encontrados</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilters(true)}
            className="lg:hidden inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium cursor-pointer hover:border-brand/50 transition-colors duration-200"
          >
            <FilterIcon className="w-4 h-4" /> Filtros
          </button>
          <Select value={sort} onChange={(e) => setSort(e.target.value)} className="w-auto" aria-label="Ordenar">
            <option value="relevancia">Relevância</option>
            <option value="vistos">Mais vistos</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </Select>
        </div>
      </div>

      {activeChips.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {activeChips.map((chip) => (
            <motion.button
              key={chip.key}
              layout
              onClick={chip.clear}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft text-brand-deep px-3 py-1 text-xs font-semibold cursor-pointer hover:bg-brand hover:text-white transition-colors duration-200"
            >
              {chip.label} <CloseIcon className="w-3 h-3" />
            </motion.button>
          ))}
          <button
            onClick={() => { setCat(null); setSizes([]); setColors([]); setPrice(null) }}
            className="text-xs text-ink-soft underline underline-offset-2 cursor-pointer hover:text-brand-deep transition-colors duration-200"
          >
            Limpar tudo
          </button>
        </div>
      )}

      <div className="mt-8 grid lg:grid-cols-[240px_1fr] gap-10">
        <aside className="hidden lg:block">
          <Filters />
        </aside>

        <div>
          {products.length === 0 ? (
            <div className="text-center py-20 text-ink-soft">
              <p className="font-display text-2xl text-ink">Nenhum produto encontrado</p>
              <p className="text-sm mt-2">Tente remover alguns filtros.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={(prod) => openProduct(prod.id)} />
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/45 lg:hidden"
            onClick={() => setMobileFilters(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 34 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white p-6 overflow-y-auto nice-scroll"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl">Filtros</h2>
                <button
                  onClick={() => setMobileFilters(false)}
                  aria-label="Fechar filtros"
                  className="rounded-full p-2 text-ink-soft hover:bg-blush cursor-pointer"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>
              <Filters />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
