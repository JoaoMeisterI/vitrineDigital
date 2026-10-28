import { useMemo, useState } from 'react'
import { useStore } from '../context/StoreContext'
import { PRODUCTS, CATEGORIES, COLOR_SWATCHES, SIZES_REGULAR, SIZES_PLUS, brl, effectivePrice } from '../data/data'
import { Badge, Button, Card, Field, Input, Modal, Select, Textarea, Toggle } from '../components/ui'
import { PlusIcon, SearchIcon, EditIcon, CameraIcon, CloseIcon } from '../components/icons'
import { cn } from '../lib/utils'
import { AdminHeader } from './AdminArea'

const ALL_TAGS = ['Novidade', 'Festa', 'Casual', 'Plus Size', 'Promo', 'Básico', 'Madrinha', 'Acessórios']

function ProductForm({ product, onClose }) {
  const editing = Boolean(product)
  const [usePlus, setUsePlus] = useState(product?.plus ?? false)
  const [active, setActive] = useState(product?.active ?? true)
  const [colors, setColors] = useState(product?.colors ?? ['Rosa'])
  const [tags, setTags] = useState(product?.tags ?? [])
  const sizes = usePlus ? SIZES_PLUS : SIZES_REGULAR

  const toggleIn = (list, setList, v) =>
    setList(list.includes(v) ? list.filter((x) => x !== v) : [...list, v])

  return (
    <Modal open onClose={onClose} wide>
      <form className="p-7" onSubmit={(e) => { e.preventDefault(); onClose() }}>
        <h2 className="font-display text-2xl text-ink pr-8">
          {editing ? `Editar — ${product.name}` : 'Novo produto'}
        </h2>

        {/* Fotos */}
        <div className="mt-6">
          <p className="text-xs font-semibold text-ink-soft uppercase tracking-wide mb-2">Fotos (upload múltiplo)</p>
          <div className="flex gap-3 flex-wrap">
            {(product?.images ?? []).map((src) => (
              <div key={src} className="relative h-24 w-20 rounded-xl overflow-hidden group">
                <img src={src} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  aria-label="Remover foto"
                  className="absolute top-1 right-1 grid place-items-center h-5 w-5 rounded-full bg-white/90 text-ink-soft opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-200"
                >
                  <CloseIcon className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="h-24 w-20 rounded-xl border-2 border-dashed border-line grid place-items-center text-ink-soft hover:border-brand hover:text-brand-deep cursor-pointer transition-colors duration-200"
              aria-label="Adicionar foto"
            >
              <CameraIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          <Field label="Nome do produto" className="sm:col-span-2">
            <Input defaultValue={product?.name} placeholder="Ex.: Vestido Festa Rubi" required />
          </Field>
          <Field label="Descrição" className="sm:col-span-2">
            <Textarea rows={2} defaultValue={product?.description} placeholder="Tecido, caimento, ocasião..." />
          </Field>
          <Field label="Categoria">
            <Select defaultValue={product?.category ?? 'festa'}>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Preço (R$)">
              <Input type="number" step="0.10" defaultValue={product?.price} placeholder="289,90" required />
            </Field>
            <Field label="Preço promo (R$)">
              <Input type="number" step="0.10" defaultValue={product?.promoPrice ?? ''} placeholder="—" />
            </Field>
          </div>
        </div>

        {/* Variações */}
        <div className="mt-6 rounded-2xl bg-blush/60 border border-line p-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-xs font-semibold text-ink-soft uppercase tracking-wide">Variações e estoque</p>
            <label className="flex items-center gap-2 text-xs font-medium text-ink cursor-pointer">
              Grade plus size (46–54)
              <Toggle checked={usePlus} onChange={setUsePlus} label="Grade plus size" />
            </label>
          </div>

          <div className="mt-4">
            <p className="text-[11px] font-semibold text-ink-soft mb-2">Cores</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(COLOR_SWATCHES).slice(0, 12).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleIn(colors, setColors, c)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium cursor-pointer transition-colors duration-200',
                    colors.includes(c) ? 'border-brand bg-white text-brand-deep' : 'border-line bg-white text-ink-soft hover:border-brand/40',
                  )}
                >
                  <span className="h-3 w-3 rounded-full border border-black/10" style={{ backgroundColor: COLOR_SWATCHES[c] }} />
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 overflow-x-auto nice-scroll">
            <table className="w-full text-sm min-w-[340px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-ink-soft">
                  <th className="py-2 pr-3 font-semibold">Tamanho</th>
                  <th className="py-2 font-semibold">Estoque</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((s) => (
                  <tr key={s} className="border-t border-line/70">
                    <td className="py-2 pr-3 font-semibold text-ink">{s}</td>
                    <td className="py-1.5">
                      <Input
                        type="number"
                        min="0"
                        defaultValue={product?.stock?.[s] ?? 0}
                        className="w-24 py-1.5"
                        aria-label={`Estoque tamanho ${s}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tags + status */}
        <div className="mt-5 flex items-start justify-between gap-6 flex-wrap">
          <div>
            <p className="text-xs font-semibold text-ink-soft uppercase tracking-wide mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleIn(tags, setTags, t)}
                  className={cn(
                    'rounded-full px-3 py-1 text-[11px] font-semibold cursor-pointer transition-colors duration-200',
                    tags.includes(t) ? 'bg-brand text-white' : 'bg-blush text-ink-soft hover:text-brand-deep',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-ink cursor-pointer">
            Produto ativo
            <Toggle checked={active} onChange={setActive} label="Produto ativo" />
          </label>
        </div>

        <div className="mt-7 flex gap-3 justify-end">
          <Button variant="ghost" type="button" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{editing ? 'Salvar alterações' : 'Cadastrar produto'}</Button>
        </div>
      </form>
    </Modal>
  )
}

export default function Products() {
  const { stock } = useStore()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('todos')
  const [form, setForm] = useState(null) // null | 'new' | product

  const list = useMemo(() => {
    let l = PRODUCTS
    if (query) l = l.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    if (status === 'ativos') l = l.filter((p) => p.active)
    if (status === 'inativos') l = l.filter((p) => !p.active)
    return l
  }, [query, status])

  return (
    <>
      <AdminHeader title="Produtos" subtitle={`${PRODUCTS.length} cadastrados · ${PRODUCTS.filter((p) => p.active).length} ativos`}>
        <Button onClick={() => setForm('new')}>
          <PlusIcon className="w-4 h-4" /> Novo produto
        </Button>
      </AdminHeader>

      <div className="flex gap-3 flex-wrap mb-5">
        <div className="relative flex-1 min-w-52 max-w-sm">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft pointer-events-none" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar produto..."
            className="pl-10"
            aria-label="Buscar produto"
          />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-auto" aria-label="Filtrar status">
          <option value="todos">Todos</option>
          <option value="ativos">Ativos</option>
          <option value="inativos">Inativos</option>
        </Select>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto nice-scroll">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-ink-soft border-b border-line bg-blush/50">
                <th className="px-5 py-3 font-semibold">Produto</th>
                <th className="px-3 py-3 font-semibold">Categoria</th>
                <th className="px-3 py-3 font-semibold">Preço</th>
                <th className="px-3 py-3 font-semibold">Estoque</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => {
                const totalStock = Object.values(stock[p.id] ?? p.stock).reduce((a, b) => a + b, 0)
                return (
                  <tr key={p.id} className="border-b border-line/60 hover:bg-blush/40 transition-colors duration-150">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="h-12 w-10 rounded-lg object-cover bg-cream" />
                        <div>
                          <p className="font-medium text-ink">{p.name}</p>
                          <p className="text-[11px] text-ink-soft">{p.tags.join(' · ')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-ink-soft capitalize">
                      {CATEGORIES.find((c) => c.id === p.category)?.name}
                    </td>
                    <td className="px-3 py-3">
                      <span className="font-semibold text-ink">{brl(effectivePrice(p))}</span>
                      {p.promoPrice && (
                        <span className="block text-[11px] text-ink-soft line-through">{brl(p.price)}</span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <span className={cn('font-medium', totalStock <= 5 ? 'text-[#9c3f3f]' : 'text-ink')}>
                        {totalStock} un
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <Badge tone={p.active ? 'green' : 'red'}>{p.active ? 'Ativo' : 'Inativo'}</Badge>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => setForm(p)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-deep hover:text-brand cursor-pointer transition-colors duration-200"
                      >
                        <EditIcon className="w-4 h-4" /> Editar
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {form && <ProductForm product={form === 'new' ? null : form} onClose={() => setForm(null)} />}
    </>
  )
}
