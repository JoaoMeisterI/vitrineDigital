import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'
import { PRODUCTS, COLOR_SWATCHES, brl, effectivePrice, buildWhatsAppMessage, waLink } from '../data/data'
import { Button, Badge, Modal, ColorDot } from '../components/ui'
import { HeartIcon, WhatsAppIcon, BagIcon, RulerIcon, ChevronLeftIcon } from '../components/icons'
import { cn } from '../lib/utils'
import ProductCard from './ProductCard'

export default function PDP({ productId, goBack, openProduct, openCart }) {
  const product = PRODUCTS.find((p) => p.id === productId)
  const { addToCart, favorites, toggleFavorite, showToast, stock } = useStore()
  const [size, setSize] = useState(null)
  const [color, setColor] = useState(product?.colors[0])
  const [photo, setPhoto] = useState(0)
  const [showMeasures, setShowMeasures] = useState(false)
  const [error, setError] = useState(null)

  if (!product) return null
  const isFav = favorites.includes(product.id)
  const related = PRODUCTS.filter((p) => p.active && p.category === product.category && p.id !== product.id).slice(0, 4)

  const requireSize = () => {
    if (!size) {
      setError('Escolha um tamanho para continuar')
      return false
    }
    return true
  }

  const handleAdd = () => {
    if (!requireSize()) return
    addToCart({ productId: product.id, size, color, qty: 1 })
    showToast('Adicionado à sacola')
    openCart()
  }

  const handleWhatsApp = () => {
    if (!requireSize()) return
    const msg = buildWhatsAppMessage([{ productId: product.id, size, color, qty: 1 }])
    window.open(waLink(msg), '_blank', 'noopener')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-8">
      <button
        onClick={goBack}
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-brand-deep cursor-pointer transition-colors duration-200 mb-6"
      >
        <ChevronLeftIcon className="w-4 h-4" /> Voltar
      </button>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
        {/* Galeria */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setPhoto(i)}
                aria-label={`Foto ${i + 1}`}
                className={cn(
                  'h-20 w-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-colors duration-200',
                  photo === i ? 'border-brand' : 'border-transparent opacity-70 hover:opacity-100',
                )}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <motion.div
            key={photo}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="relative flex-1 overflow-hidden rounded-3xl bg-cream aspect-[3/4]"
          >
            <img src={product.images[photo]} alt={product.name} className="h-full w-full object-cover" />
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.tags.includes('Novidade') && <Badge tone="pink">Novidade</Badge>}
              {product.plus && <Badge tone="gold">Plus Size</Badge>}
            </div>
          </motion.div>
        </div>

        {/* Infos */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-display text-4xl text-ink leading-tight">{product.name}</h1>
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                toggleFavorite(product.id)
                showToast(isFav ? 'Removido dos favoritos' : 'Adicionado aos favoritos ♥')
              }}
              aria-label="Favoritar"
              className={cn(
                'grid place-items-center h-11 w-11 rounded-full border cursor-pointer transition-colors duration-200 shrink-0',
                isFav ? 'bg-brand-soft border-brand text-brand' : 'bg-white border-line text-ink-soft hover:text-brand',
              )}
            >
              <HeartIcon filled={isFav} className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="mt-3 flex items-baseline gap-3">
            {product.promoPrice && (
              <span className="text-base text-ink-soft line-through">{brl(product.price)}</span>
            )}
            <span className="text-3xl font-semibold text-brand-deep">{brl(effectivePrice(product))}</span>
          </div>
          <p className="text-sm text-ink-soft mt-1">
            ou <strong className="text-ink">3x de {brl(effectivePrice(product) / 3)}</strong> sem juros
          </p>

          <p className="mt-5 text-sm text-ink leading-relaxed max-w-md">{product.description}</p>

          {/* Cor */}
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2.5">
              Cor: <span className="text-ink normal-case">{color}</span>
            </p>
            <div className="flex gap-2.5">
              {product.colors.map((c) => (
                <ColorDot key={c} name={c} hex={COLOR_SWATCHES[c]} selected={color === c} onClick={() => setColor(c)} />
              ))}
            </div>
          </div>

          {/* Tamanho */}
          <div className="mt-6">
            <div className="flex items-center justify-between max-w-md">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Tamanho</p>
              <button
                onClick={() => setShowMeasures(true)}
                className="inline-flex items-center gap-1.5 text-xs text-brand-deep cursor-pointer hover:text-brand underline underline-offset-2 transition-colors duration-200"
              >
                <RulerIcon className="w-3.5 h-3.5" /> Guia de medidas
              </button>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const out = ((stock[product.id] ?? product.stock)[s] ?? 0) === 0
                return (
                  <button
                    key={s}
                    disabled={out}
                    onClick={() => { setSize(s); setError(null) }}
                    className={cn(
                      'min-w-12 rounded-xl px-3 py-2.5 text-sm font-semibold border cursor-pointer transition-colors duration-200',
                      size === s
                        ? 'bg-brand text-white border-brand'
                        : 'bg-white text-ink border-line hover:border-brand/60',
                      out && 'opacity-40 cursor-not-allowed line-through',
                    )}
                  >
                    {s}
                  </button>
                )
              })}
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-xs font-medium text-[#9c3f3f]"
              >
                {error}
              </motion.p>
            )}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md">
            <Button variant="whatsapp" className="flex-1 py-3.5" onClick={handleWhatsApp}>
              <WhatsAppIcon className="w-5 h-5" /> Quero esse — chamar no WhatsApp
            </Button>
            <Button variant="secondary" className="flex-1 py-3.5" onClick={handleAdd}>
              <BagIcon className="w-5 h-5" /> Adicionar à sacola
            </Button>
          </div>

          <p className="mt-4 text-xs text-ink-soft max-w-md">
            Sem pagamento online: você fecha o pedido direto com a Cappri pelo WhatsApp, do seu jeito.
          </p>
        </div>
      </div>

      {/* Relacionados */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-3xl text-ink">Você também vai amar</h2>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={(prod) => openProduct(prod.id)} />
            ))}
          </div>
        </div>
      )}

      {/* Guia de medidas */}
      <Modal open={showMeasures} onClose={() => setShowMeasures(false)}>
        <div className="p-7">
          <h2 className="font-display text-2xl text-ink">Guia de medidas</h2>
          <p className="text-sm text-ink-soft mt-1">Medidas aproximadas do corpo, em centímetros.</p>
          <table className="mt-5 w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-ink-soft border-b border-line">
                <th className="py-2 pr-2 font-semibold">Tam</th>
                <th className="py-2 pr-2 font-semibold">Busto</th>
                <th className="py-2 pr-2 font-semibold">Cintura</th>
                <th className="py-2 font-semibold">Quadril</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['P', '84–88', '64–68', '90–94'],
                ['M', '89–93', '69–73', '95–99'],
                ['G', '94–98', '74–78', '100–104'],
                ['GG', '99–104', '79–84', '105–110'],
                ['46', '105–110', '85–92', '111–116'],
                ['48', '111–116', '93–100', '117–122'],
                ['50', '117–122', '101–108', '123–128'],
                ['52', '123–128', '109–116', '129–134'],
                ['54', '129–134', '117–124', '135–140'],
              ].map(([t, b, c, q]) => (
                <tr key={t} className="border-b border-line/60">
                  <td className="py-2 pr-2 font-semibold text-brand-deep">{t}</td>
                  <td className="py-2 pr-2 text-ink">{b}</td>
                  <td className="py-2 pr-2 text-ink">{c}</td>
                  <td className="py-2 text-ink">{q}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-xs text-ink-soft">
            Na dúvida entre dois tamanhos? Chama a gente no WhatsApp que ajudamos você a escolher.
          </p>
        </div>
      </Modal>
    </div>
  )
}
