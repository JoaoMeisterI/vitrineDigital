import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import { CloseIcon } from './icons'

export function Button({ variant = 'primary', className, children, ...rest }) {
  const styles = {
    primary: 'bg-brand text-white hover:bg-brand-deep shadow-[0_10px_24px_-10px_rgba(224,33,138,0.55)]',
    secondary: 'bg-white text-brand-deep border border-brand/30 hover:border-brand hover:bg-blush',
    ghost: 'text-ink-soft hover:text-brand-deep hover:bg-blush',
    dark: 'bg-ink text-white hover:bg-black',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#1ebe5b] shadow-[0_10px_24px_-10px_rgba(37,211,102,0.6)]',
  }
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50 disabled:cursor-not-allowed',
        styles[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

export function Badge({ tone = 'pink', className, children }) {
  const tones = {
    pink: 'bg-brand-soft text-brand-deep',
    gold: 'bg-gold-soft text-[#8a6d12]',
    cream: 'bg-cream text-ink-soft',
    dark: 'bg-ink text-white',
    green: 'bg-[#e2efe5] text-[#2f6d4a]',
    red: 'bg-[#f3e4e4] text-[#9c3f3f]',
  }
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide', tones[tone], className)}>
      {children}
    </span>
  )
}

export function SectionTitle({ children, className, center }) {
  return (
    <h2 className={cn('font-display text-3xl md:text-4xl text-ink', center && 'text-center', className)}>
      {children}
      <span className={cn('block h-[3px] w-12 bg-brand rounded-full mt-2', center && 'mx-auto')} />
    </h2>
  )
}

export function Field({ label, hint, children, className }) {
  return (
    <label className={cn('block', className)}>
      <span className="block text-xs font-semibold text-ink-soft mb-1.5 tracking-wide uppercase">{label}</span>
      {children}
      {hint && <span className="block text-xs text-ink-soft/70 mt-1">{hint}</span>}
    </label>
  )
}

export function Input({ className, ...rest }) {
  return (
    <input
      className={cn(
        'w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-colors duration-200',
        className,
      )}
      {...rest}
    />
  )
}

export function Textarea({ className, ...rest }) {
  return (
    <textarea
      className={cn(
        'w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-colors duration-200',
        className,
      )}
      {...rest}
    />
  )
}

export function Select({ className, children, ...rest }) {
  return (
    <select
      className={cn(
        'w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 cursor-pointer transition-colors duration-200',
        className,
      )}
      {...rest}
    >
      {children}
    </select>
  )
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full cursor-pointer transition-colors duration-200',
        checked ? 'bg-brand' : 'bg-line',
      )}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className={cn('inline-block h-4.5 w-4.5 rounded-full bg-white shadow', checked ? 'ml-[22px]' : 'ml-[3px]')}
      />
    </button>
  )
}

export function Modal({ open, onClose, children, wide }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/45 backdrop-blur-[2px] p-0 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'relative w-full bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto nice-scroll',
              wide ? 'sm:max-w-3xl' : 'sm:max-w-lg',
            )}
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-4 right-4 z-10 rounded-full p-2 text-ink-soft hover:bg-blush hover:text-brand-deep cursor-pointer transition-colors duration-200"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Drawer({ open, onClose, children, title }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-ink/45 backdrop-blur-[2px]"
          onClick={onClose}
        >
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 34 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-line">
              <h2 className="font-display text-2xl text-ink">{title}</h2>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="rounded-full p-2 text-ink-soft hover:bg-blush hover:text-brand-deep cursor-pointer transition-colors duration-200"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
            {children}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Card({ className, children }) {
  return (
    <div className={cn('bg-white rounded-2xl border border-line/70 shadow-[0_6px_20px_-12px_rgba(31,26,29,0.12)]', className)}>
      {children}
    </div>
  )
}

export function ColorDot({ hex, selected, onClick, name }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Cor ${name}`}
      title={name}
      className={cn(
        'h-7 w-7 rounded-full border-2 cursor-pointer transition-transform duration-200 hover:scale-110',
        selected ? 'border-brand ring-2 ring-brand/25' : 'border-white shadow',
      )}
      style={{ backgroundColor: hex }}
    />
  )
}

export function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
