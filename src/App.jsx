import { AnimatePresence, motion } from 'framer-motion'
import { StoreProvider, useStore } from './context/StoreContext'
import { UserIcon, SettingsIcon, ChartIcon, WhatsAppIcon, CheckIcon } from './components/icons'
import { cn } from './lib/utils'
import Storefront from './storefront/Storefront'
import AdminArea from './admin/AdminArea'
import BI from './bi/BI'
import SellerArea from './seller/SellerArea'

const ROLES = [
  { id: 'cliente', label: 'Cliente', icon: UserIcon },
  { id: 'admin', label: 'Admin', icon: SettingsIcon },
  { id: 'dono', label: 'Dono · BI', icon: ChartIcon },
  { id: 'vendedor', label: 'Vendedor', icon: WhatsAppIcon },
]

function RoleSwitcher() {
  const { role, setRole } = useStore()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60]"
    >
      <div
        className="flex items-center gap-1 rounded-full bg-ink/90 backdrop-blur px-1.5 py-1.5 shadow-2xl"
        role="tablist"
        aria-label="Alternar perfil de demonstração"
      >
        {ROLES.map(({ id, label, icon: I }) => (
          <button
            key={id}
            role="tab"
            aria-selected={role === id}
            onClick={() => setRole(id)}
            className={cn(
              'relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors duration-200',
              role === id ? 'text-white' : 'text-white/55 hover:text-white/85',
            )}
          >
            {role === id && (
              <motion.span
                layoutId="role-pill"
                className="absolute inset-0 rounded-full bg-brand"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              <I className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

function Toast() {
  const { toast } = useStore()
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[70] pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="flex items-center gap-2.5 rounded-full bg-ink text-white text-sm px-5 py-2.5 shadow-2xl"
          >
            <span className="grid place-items-center h-5 w-5 rounded-full bg-brand">
              <CheckIcon className="w-3 h-3" />
            </span>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Areas() {
  const { role } = useStore()
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={role}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {role === 'cliente' && <Storefront />}
          {role === 'admin' && <AdminArea />}
          {role === 'dono' && <BI />}
          {role === 'vendedor' && <SellerArea />}
        </motion.div>
      </AnimatePresence>
      <RoleSwitcher />
      <Toast />
    </>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <Areas />
    </StoreProvider>
  )
}
