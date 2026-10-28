import { motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'
import { brl, effectivePrice } from '../data/data'
import { HeartIcon } from '../components/icons'
import { Badge } from '../components/ui'

export default function ProductCard({ product, onOpen }) {
  const { favorites, toggleFavorite, showToast } = useStore()
  const isFav = favorites.includes(product.id)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="group relative"
    >
      <button
        onClick={() => onOpen(product)}
        className="block w-full text-left cursor-pointer"
        aria-label={`Ver ${product.name}`}
      >
        <div className="relative overflow-hidden rounded-2xl bg-cream aspect-[3/4]">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.tags.includes('Novidade') && <Badge tone="pink">Novidade</Badge>}
            {product.plus && <Badge tone="gold">Plus Size</Badge>}
            {product.promoPrice && <Badge tone="dark">Promo</Badge>}
          </div>
        </div>
        <div className="pt-3 px-0.5">
          <h3 className="text-sm font-medium text-ink leading-snug">{product.name}</h3>
          <div className="mt-1 flex items-baseline gap-2">
            {product.promoPrice && (
              <span className="text-xs text-ink-soft line-through">{brl(product.price)}</span>
            )}
            <span className="text-base font-semibold text-brand-deep">{brl(effectivePrice(product))}</span>
          </div>
          <p className="text-[11px] text-ink-soft mt-0.5">
            ou 3x de {brl(effectivePrice(product) / 3)} sem juros
          </p>
        </div>
      </button>

      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={() => {
          toggleFavorite(product.id)
          showToast(isFav ? 'Removido dos favoritos' : 'Adicionado aos favoritos ♥')
        }}
        aria-label={isFav ? 'Remover dos favoritos' : 'Favoritar'}
        className="absolute top-3 right-3 z-10 grid place-items-center h-9 w-9 rounded-full bg-white/90 shadow cursor-pointer transition-colors duration-200 hover:bg-white"
      >
        <motion.span
          key={isFav ? 'fav' : 'no'}
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 18 }}
          className={isFav ? 'text-brand' : 'text-ink-soft'}
        >
          <HeartIcon filled={isFav} className="w-[18px] h-[18px]" />
        </motion.span>
      </motion.button>
    </motion.article>
  )
}
