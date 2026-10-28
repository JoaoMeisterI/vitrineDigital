import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'
import { STORE, PRODUCTS, CATEGORIES } from '../data/data'
import {
  SearchIcon, UserIcon, HeartIcon, BagIcon, MenuIcon, CloseIcon,
  InstagramIcon, MapPinIcon, ClockIcon, WhatsAppIcon,
} from '../components/icons'
import { cn } from '../lib/utils'
import Home from './Home'
import PLP from './PLP'
import PDP from './PDP'
import Account from './Account'
import ProductCard from './ProductCard'
import CartDrawer from './CartDrawer'

const NAV = [
  { label: 'Novidades', page: 'plp', params: { category: null } },
  { label: 'Vestidos', page: 'plp', params: { category: 'festa' } },
  { label: 'Casual', page: 'plp', params: { category: 'casual' } },
  { label: 'Plus Size', page: 'plp', params: { category: 'plus' } },
  { label: 'Acessórios', page: 'plp', params: { category: 'acessorios' } },
]

function Favorites({ openProduct, go }) {
  const { favorites } = useStore()
  const favProducts = PRODUCTS.filter((p) => favorites.includes(p.id))
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
      <h1 className="font-display text-4xl text-ink">Favoritos</h1>
      <p className="text-sm text-ink-soft mt-1">{favProducts.length} looks guardados com carinho</p>
      {favProducts.length === 0 ? (
        <div className="text-center py-20">
          <HeartIcon className="w-12 h-12 text-brand-soft mx-auto" />
          <p className="font-display text-2xl text-ink mt-4">Nada por aqui ainda</p>
          <button
            onClick={() => go('plp', { category: null })}
            className="mt-3 text-sm text-brand-deep underline underline-offset-4 cursor-pointer hover:text-brand transition-colors duration-200"
          >
            Explorar a coleção
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
          {favProducts.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={(prod) => openProduct(prod.id)} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Storefront() {
  const { cart, favorites, homeSections } = useStore()
  const [route, setRoute] = useState({ page: 'home', params: {} })
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const cartCount = cart.reduce((s, it) => s + it.qty, 0)
  const go = (page, params = {}) => {
    setRoute({ page, params })
    setMenuOpen(false)
    window.scrollTo({ top: 0 })
  }
  const openProduct = (id) => go('pdp', { productId: id })

  const searchResults = query.trim().length > 1
    ? PRODUCTS.filter((p) => p.active && p.name.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Topbar */}
      <div className="bg-brand text-white text-center text-xs py-2 px-4 font-medium tracking-wide">
        {STORE.topbar} <HeartIcon filled className="w-3 h-3 inline-block ml-1 align-[-1px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-line">
        <div className="mx-auto max-w-7xl px-4 md:px-8 flex items-center gap-4 h-16">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="lg:hidden p-2 -ml-2 text-ink cursor-pointer"
          >
            <MenuIcon className="w-6 h-6" />
          </button>

          <button onClick={() => go('home')} className="cursor-pointer" aria-label="Ir para a home">
            <span className="font-script text-3xl md:text-4xl text-brand leading-none">Cappri</span>
          </button>

          <nav className="hidden lg:flex items-center gap-7 ml-8" aria-label="Categorias">
            {NAV.map((item) => (
              <button
                key={item.label}
                onClick={() => go(item.page, item.params)}
                className="text-sm text-ink hover:text-brand-deep cursor-pointer transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex-1" />

          <div className="hidden md:block relative w-64">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft pointer-events-none" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSearchOpen(true) }}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
              placeholder="O que você está procurando?"
              aria-label="Buscar produtos"
              className="w-full rounded-full bg-blush border border-transparent pl-10 pr-4 py-2 text-sm placeholder:text-ink-soft/60 focus:outline-none focus:border-brand/40 focus:bg-white transition-colors duration-200"
            />
            <AnimatePresence>
              {searchOpen && searchResults.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute top-full mt-2 w-full bg-white rounded-2xl border border-line shadow-xl overflow-hidden py-2"
                >
                  {searchResults.slice(0, 5).map((p) => (
                    <li key={p.id}>
                      <button
                        onMouseDown={() => { openProduct(p.id); setQuery('') }}
                        className="flex items-center gap-3 w-full px-3 py-2 hover:bg-blush cursor-pointer text-left transition-colors duration-150"
                      >
                        <img src={p.images[0]} alt="" className="h-10 w-8 rounded-lg object-cover" />
                        <span className="text-sm text-ink">{p.name}</span>
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => go('account')}
              aria-label="Minha conta"
              className="p-2 text-ink hover:text-brand-deep cursor-pointer transition-colors duration-200"
            >
              <UserIcon className="w-[22px] h-[22px]" />
            </button>
            <button
              onClick={() => go('favorites')}
              aria-label="Favoritos"
              className="relative p-2 text-ink hover:text-brand-deep cursor-pointer transition-colors duration-200"
            >
              <HeartIcon className="w-[22px] h-[22px]" />
              {favorites.length > 0 && (
                <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-brand" />
              )}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              aria-label={`Abrir sacola (${cartCount} itens)`}
              className="relative p-2 text-ink hover:text-brand-deep cursor-pointer transition-colors duration-200"
            >
              <BagIcon className="w-[22px] h-[22px]" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                    className="absolute -top-0.5 -right-0.5 grid place-items-center h-5 min-w-5 rounded-full bg-brand text-white text-[10px] font-bold px-1"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/45 lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 34 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-0 h-full w-72 bg-white p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-script text-3xl text-brand">Cappri</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Fechar menu"
                  className="p-2 text-ink-soft cursor-pointer"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-1" aria-label="Categorias">
                {NAV.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => go(item.page, item.params)}
                    className="block w-full text-left rounded-xl px-4 py-3 text-base text-ink hover:bg-blush hover:text-brand-deep cursor-pointer transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conteúdo */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${route.page}-${route.params.productId ?? route.params.category ?? ''}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {route.page === 'home' && <Home go={go} openProduct={openProduct} sections={homeSections} />}
            {route.page === 'plp' && (
              <PLP key={route.params.category ?? 'all'} category={route.params.category} openProduct={openProduct} />
            )}
            {route.page === 'pdp' && (
              <PDP
                productId={route.params.productId}
                goBack={() => go('plp', { category: null })}
                openProduct={openProduct}
                openCart={() => setCartOpen(true)}
              />
            )}
            {route.page === 'favorites' && <Favorites openProduct={openProduct} go={go} />}
            {route.page === 'account' && <Account openProduct={openProduct} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Rodapé */}
      <footer className="bg-ink text-white/80 mt-auto">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <span className="font-script text-3xl text-brand-soft">Cappri</span>
            <p className="text-sm mt-3 leading-relaxed">{STORE.tagline}</p>
            <p className="text-xs mt-2 text-white/50">Elegância acessível, do 36 ao 54.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Atendimento</h3>
            <p className="flex items-start gap-2 text-sm">
              <WhatsAppIcon className="w-4 h-4 mt-0.5 shrink-0" /> {STORE.whatsappDisplay}
            </p>
            <p className="flex items-start gap-2 text-sm mt-2">
              <ClockIcon className="w-4 h-4 mt-0.5 shrink-0" /> {STORE.hours}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">A loja</h3>
            <p className="flex items-start gap-2 text-sm">
              <MapPinIcon className="w-4 h-4 mt-0.5 shrink-0" /> {STORE.address}
            </p>
            <p className="flex items-start gap-2 text-sm mt-2">
              <InstagramIcon className="w-4 h-4 mt-0.5 shrink-0" /> {STORE.instagram}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Categorias</h3>
            <ul className="space-y-1.5">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => go('plp', { category: c.id })}
                    className="text-sm hover:text-brand-soft cursor-pointer transition-colors duration-200"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
          Cappri Moda Feminina · Vitrine Digital — mock de interface, sem pagamento online
        </div>
      </footer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
