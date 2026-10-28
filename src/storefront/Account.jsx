import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'
import { PRODUCTS, STATUS_META, bagTotal, brl } from '../data/data'
import { Button, Card, Field, Input, Badge } from '../components/ui'
import { HeartIcon, BagIcon, UserIcon } from '../components/icons'
import { cn } from '../lib/utils'
import ProductCard from './ProductCard'

export default function Account({ openProduct }) {
  const [logged, setLogged] = useState(false)
  const [tab, setTab] = useState('entrar')
  const { favorites, bags } = useStore()

  const favProducts = PRODUCTS.filter((p) => favorites.includes(p.id))
  const myBags = bags.filter((b) => b.client === 'Você (demo)' || b.client === 'Mariana Castro')

  if (!logged) {
    return (
      <div className="mx-auto max-w-md px-4 py-14">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-display text-4xl text-center text-ink">Minha conta</h1>
          <p className="text-sm text-ink-soft text-center mt-2">
            Cadastro rapidinho: só nome e WhatsApp já resolvem.
          </p>

          <Card className="mt-8 p-7">
            <div className="grid grid-cols-2 rounded-full bg-blush p-1 mb-6">
              {['entrar', 'cadastrar'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    'rounded-full py-2 text-sm font-medium cursor-pointer transition-colors duration-200 capitalize',
                    tab === t ? 'bg-white text-brand-deep shadow' : 'text-ink-soft hover:text-ink',
                  )}
                >
                  {t === 'entrar' ? 'Entrar' : 'Criar conta'}
                </button>
              ))}
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => { e.preventDefault(); setLogged(true) }}
            >
              {tab === 'cadastrar' && (
                <Field label="Nome">
                  <Input placeholder="Como podemos te chamar?" required />
                </Field>
              )}
              <Field label="WhatsApp">
                <Input placeholder="(47) 9 9999-9999" inputMode="tel" required />
              </Field>
              <Field label="E-mail">
                <Input type="email" placeholder="voce@email.com" required />
              </Field>
              {tab === 'cadastrar' && (
                <Field label="Aniversário (opcional)" hint="Para o seu mimo do Clube Cappri">
                  <Input placeholder="DD/MM" />
                </Field>
              )}
              <Button type="submit" className="w-full py-3 mt-2">
                {tab === 'entrar' ? 'Entrar' : 'Criar minha conta'}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
      <div className="flex items-center gap-4">
        <div className="grid place-items-center h-14 w-14 rounded-full bg-brand-soft text-brand-deep">
          <UserIcon className="w-7 h-7" />
        </div>
        <div>
          <h1 className="font-display text-3xl text-ink">Olá, Mariana!</h1>
          <p className="text-sm text-ink-soft">mari.castro@gmail.com · (47) 99123-4567</p>
        </div>
      </div>

      <div className="mt-10 grid lg:grid-cols-2 gap-10">
        <section>
          <h2 className="flex items-center gap-2 font-display text-2xl text-ink">
            <HeartIcon filled className="w-5 h-5 text-brand" /> Meus favoritos
          </h2>
          {favProducts.length === 0 ? (
            <p className="text-sm text-ink-soft mt-4">Você ainda não favoritou nenhum look.</p>
          ) : (
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8">
              {favProducts.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={(prod) => openProduct(prod.id)} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="flex items-center gap-2 font-display text-2xl text-ink">
            <BagIcon className="w-5 h-5 text-brand" /> Pedidos enviados
          </h2>
          <div className="mt-5 space-y-3">
            {myBags.map((bag) => (
              <Card key={bag.id} className="p-5">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <p className="text-sm font-semibold text-ink">{bag.id}</p>
                    <p className="text-xs text-ink-soft">{bag.time}</p>
                  </div>
                  <Badge className={STATUS_META[bag.status].color}>{STATUS_META[bag.status].label}</Badge>
                </div>
                <ul className="mt-3 space-y-1">
                  {bag.items.map((it, i) => {
                    const p = PRODUCTS.find((x) => x.id === it.productId)
                    return (
                      <li key={i} className="text-xs text-ink-soft">
                        {it.qty}x {p?.name} · {it.size} · {it.color}
                      </li>
                    )
                  })}
                </ul>
                <p className="mt-2 text-sm font-semibold text-brand-deep">{brl(bagTotal(bag))}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
