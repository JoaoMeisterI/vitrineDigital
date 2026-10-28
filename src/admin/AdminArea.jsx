import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'
import { Button, Card, Field, Input, Select } from '../components/ui'
import {
  HomeIcon, PackageIcon, TagIcon, PaletteIcon, UsersIcon, StoreIcon,
  SettingsIcon, LogOutIcon, WhatsAppIcon,
} from '../components/icons'
import { cn } from '../lib/utils'
import Dashboard from './Dashboard'
import Products from './Products'
import Categories from './Categories'
import Appearance from './Appearance'
import Sellers from './Sellers'
import Clients from './Clients'
import Settings from './Settings'

const MENU = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
  { id: 'products', label: 'Produtos', icon: PackageIcon },
  { id: 'categories', label: 'Categorias', icon: TagIcon },
  { id: 'appearance', label: 'Aparência', icon: PaletteIcon },
  { id: 'sellers', label: 'Vendedores', icon: UsersIcon },
  { id: 'clients', label: 'Clientes', icon: StoreIcon },
  { id: 'settings', label: 'Configurações', icon: SettingsIcon },
]

function AdminLogin({ onLogin }) {
  return (
    <div className="min-h-screen grid place-items-center bg-cream px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-7">
          <span className="font-script text-5xl text-brand">Cappri</span>
          <p className="text-sm text-ink-soft mt-2">Painel da loja</p>
        </div>
        <Card className="p-7">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin() }}>
            <Field label="E-mail">
              <Input type="email" placeholder="gerente@cappri.com.br" defaultValue="gerente@cappri.com.br" required />
            </Field>
            <Field label="Senha">
              <Input type="password" placeholder="••••••••" defaultValue="demo1234" required />
            </Field>
            <Field label="Entrar como">
              <Select defaultValue="admin">
                <option value="admin">Admin da loja</option>
                <option value="dono">Dono (BI)</option>
                <option value="vendedor">Vendedor(a)</option>
              </Select>
            </Field>
            <Button type="submit" className="w-full py-3 mt-2">Entrar no painel</Button>
          </form>
          <p className="text-[11px] text-ink-soft text-center mt-4">
            Mock de demonstração — qualquer senha funciona.
          </p>
        </Card>
      </motion.div>
    </div>
  )
}

export default function AdminArea() {
  const [logged, setLogged] = useState(true)
  const [page, setPage] = useState('dashboard')
  const { setRole } = useStore()

  if (!logged) return <AdminLogin onLogin={() => setLogged(true)} />

  const PAGES = {
    dashboard: <Dashboard goTo={setPage} />,
    products: <Products />,
    categories: <Categories />,
    appearance: <Appearance />,
    sellers: <Sellers />,
    clients: <Clients />,
    settings: <Settings />,
  }

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col bg-white border-r border-line sticky top-0 h-screen">
        <div className="px-6 py-6 border-b border-line">
          <span className="font-script text-4xl text-brand">Cappri</span>
          <p className="text-[11px] text-ink-soft mt-1 uppercase tracking-wider font-semibold">Painel da loja</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto nice-scroll" aria-label="Menu do painel">
          {MENU.map(({ id, label, icon: I }) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={cn(
                'flex items-center gap-3 w-full rounded-xl px-4 py-2.5 text-sm font-medium cursor-pointer transition-colors duration-200',
                page === id ? 'bg-brand-soft text-brand-deep' : 'text-ink-soft hover:bg-blush hover:text-ink',
              )}
            >
              <I className="w-[18px] h-[18px]" /> {label}
              {page === id && (
                <motion.span layoutId="admin-active" className="ml-auto h-1.5 w-1.5 rounded-full bg-brand" />
              )}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-line">
          <button
            onClick={() => { setLogged(false); setRole('cliente') }}
            className="flex items-center gap-3 w-full rounded-xl px-4 py-2.5 text-sm font-medium text-ink-soft hover:bg-blush hover:text-ink cursor-pointer transition-colors duration-200"
          >
            <LogOutIcon className="w-[18px] h-[18px]" /> Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        {/* Topbar mobile */}
        <div className="md:hidden sticky top-0 z-30 bg-white border-b border-line px-4 py-3 flex items-center gap-3 overflow-x-auto nice-scroll">
          <span className="font-script text-2xl text-brand shrink-0">Cappri</span>
          {MENU.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={cn(
                'shrink-0 rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors duration-200',
                page === id ? 'bg-brand text-white' : 'bg-blush text-ink-soft',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="px-4 md:px-8 py-6 md:py-8 max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {PAGES[page]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export function AdminHeader({ title, subtitle, children }) {
  return (
    <div className="flex items-end justify-between gap-4 flex-wrap mb-7">
      <div>
        <h1 className="font-display text-3xl text-ink">{title}</h1>
        {subtitle && <p className="text-sm text-ink-soft mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

export function WhatsAppChip({ number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[#1f7a3d] bg-[#e7f6e9] rounded-full px-2.5 py-1 font-medium">
      <WhatsAppIcon className="w-3.5 h-3.5" /> {number}
    </span>
  )
}
