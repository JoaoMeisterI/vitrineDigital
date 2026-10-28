import { motion } from 'framer-motion'
import { CATEGORIES, PRODUCTS, TESTIMONIALS, HOME_SECTIONS } from '../data/data'
import { Button, SectionTitle, Reveal, Badge } from '../components/ui'
import { ArrowRightIcon, TruckIcon, LockIcon, WhatsAppIcon, StarIcon, SparkleIcon } from '../components/icons'
import ProductCard from './ProductCard'

function Hero({ go }) {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto max-w-7xl px-4 md:px-8 grid md:grid-cols-2 items-center gap-6 md:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="py-12 md:py-20 order-2 md:order-1"
        >
          <span className="text-[11px] font-semibold tracking-[0.35em] text-brand-deep uppercase">
            Nova coleção
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.04] mt-4 text-ink">
            Um look para
            <br />
            cada versão
            <br />
            <em className="text-brand italic">de você.</em>
          </h1>
          <p className="mt-5 text-ink-soft text-base md:text-lg max-w-sm">
            Do casual à festa, encontre o seu favorito.
          </p>
          <Button className="mt-7 px-7 py-3 text-base" onClick={() => go('plp', { category: null })}>
            Explorar coleção <ArrowRightIcon className="w-5 h-5" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative order-1 md:order-2 h-64 md:h-[520px]"
        >
          <img
            src="/images/hero.png"
            alt="Modelos vestindo a nova coleção Cappri"
            className="absolute inset-0 h-full w-full object-cover md:rounded-bl-[80px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/70 via-transparent to-transparent md:rounded-bl-[80px]" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-5 left-5 bg-white/90 backdrop-blur rounded-2xl px-4 py-3 shadow-lg flex items-center gap-2"
          >
            <SparkleIcon className="w-5 h-5 text-gold" />
            <div>
              <p className="text-xs font-semibold text-ink">Coleção Primavera</p>
              <p className="text-[11px] text-ink-soft">Slim + Plus Size · 46 ao 54</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Benefits() {
  const items = [
    { icon: TruckIcon, text: 'Envio para todo o Brasil' },
    { icon: LockIcon, text: 'Compra segura' },
    { icon: WhatsAppIcon, text: 'Atendimento pelo WhatsApp' },
  ]
  return (
    <section className="bg-blush border-y border-line">
      <div className="mx-auto max-w-7xl px-4 md:px-8 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line">
        {items.map(({ icon: I, text }) => (
          <div key={text} className="flex items-center justify-center gap-3 py-4 text-sm text-ink">
            <I className="w-6 h-6 text-brand" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function CategoryGrid({ go }) {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-14">
      <Reveal>
        <SectionTitle center>Encontre seu estilo</SectionTitle>
      </Reveal>
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 0.08}>
            <button
              onClick={() => go('plp', { category: cat.id })}
              className="group relative block w-full overflow-hidden rounded-2xl aspect-[4/5] lg:aspect-[3/4] cursor-pointer"
              aria-label={`Ver categoria ${cat.name}`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                <span className="font-display text-2xl text-white drop-shadow">{cat.name}</span>
                <span className="grid place-items-center h-9 w-9 rounded-full bg-white text-ink transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function NewFavorites({ go, openProduct }) {
  const featured = PRODUCTS.filter((p) => p.active).slice(0, 8)
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 pb-14">
      <div className="flex items-end justify-between gap-4">
        <Reveal>
          <SectionTitle>Seus novos favoritos</SectionTitle>
        </Reveal>
        <button
          onClick={() => go('plp', { category: null })}
          className="text-sm font-medium text-brand-deep hover:text-brand cursor-pointer inline-flex items-center gap-1.5 underline underline-offset-4 decoration-brand/40 transition-colors duration-200"
        >
          Ver todos <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={(prod) => openProduct(prod.id)} />
        ))}
      </div>
    </section>
  )
}

function ClubBanner({ go }) {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 pb-14">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-[#e8632c] text-white">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -left-10 -bottom-20 h-56 w-56 rounded-full bg-white/10" />
          <div className="relative grid md:grid-cols-[1fr_auto] items-center gap-6 px-6 py-10 md:px-12 md:py-12">
            <div>
              <Badge tone="cream" className="bg-white/20 text-white">Clube Cappri</Badge>
              <h2 className="font-display text-3xl md:text-4xl mt-3">
                Vantagens exclusivas para quem ama um look novo
              </h2>
              <p className="mt-2 text-white/85 text-sm md:text-base max-w-xl">
                Cadastre-se e receba primeiro as novidades, promoções secretas e um mimo no mês do seu aniversário.
              </p>
            </div>
            <Button
              variant="secondary"
              className="bg-white text-brand-deep border-0 px-7 py-3 whitespace-nowrap"
              onClick={() => go('account')}
            >
              Quero participar
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 pb-16">
      <Reveal>
        <SectionTitle center>Quem veste, ama</SectionTitle>
      </Reveal>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <div className="bg-white rounded-2xl border border-line p-6 h-full">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>
              <p className="mt-3 text-sm text-ink leading-relaxed">“{t.text}”</p>
              <p className="mt-4 text-xs font-semibold text-brand-deep">{t.name}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default function Home({ go, openProduct, sections = HOME_SECTIONS }) {
  const visible = Object.fromEntries(sections.map((s) => [s.id, s.visible]))
  const order = sections.map((s) => s.id)

  const blocks = {
    hero: <Hero key="hero" go={go} />,
    benefits: <Benefits key="benefits" />,
    categories: <CategoryGrid key="categories" go={go} />,
    favorites: <NewFavorites key="favorites" go={go} openProduct={openProduct} />,
    club: <ClubBanner key="club" go={go} />,
    testimonials: <Testimonials key="testimonials" />,
  }

  return <>{order.filter((id) => visible[id] && blocks[id]).map((id) => blocks[id])}</>
}
