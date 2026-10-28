import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'
import { SELLERS, brl, effectivePrice, productById, buildWhatsAppMessage, waLink, STORE } from '../data/data'
import { Button, Drawer, Modal, Field, Select } from '../components/ui'
import { BagIcon, MinusIcon, PlusIcon, TrashIcon, WhatsAppIcon, CheckIcon } from '../components/icons'

export default function CartDrawer({ open, onClose }) {
  const { cart, updateQty, removeFromCart, clearCart, registerBag, showToast } = useStore()
  const [sellerId, setSellerId] = useState('')
  const [preview, setPreview] = useState(false)
  const [sent, setSent] = useState(false)

  const total = cart.reduce((s, it) => s + effectivePrice(productById(it.productId)) * it.qty, 0)
  const sellerName = SELLERS.find((s) => s.id === sellerId)?.name.split(' ')[0]
  const message = buildWhatsAppMessage(cart, sellerName)

  const handleSend = () => {
    registerBag(cart, sellerId || null)
    window.open(waLink(message), '_blank', 'noopener')
    setSent(true)
    showToast('Pedido enviado! A sacola entrou na fila de atendimento.')
  }

  const closeAll = () => {
    setPreview(false)
    if (sent) {
      clearCart()
      setSent(false)
      onClose()
    }
  }

  return (
    <>
      <Drawer open={open} onClose={onClose} title="Sua sacola">
        {cart.length === 0 ? (
          <div className="flex-1 grid place-items-center p-8 text-center">
            <div>
              <BagIcon className="w-12 h-12 text-brand-soft mx-auto" />
              <p className="font-display text-2xl text-ink mt-4">Sua sacola está vazia</p>
              <p className="text-sm text-ink-soft mt-2">
                Explore a coleção e adicione seus looks favoritos.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto nice-scroll px-6 py-4 space-y-4">
              {cart.map((it, i) => {
                const p = productById(it.productId)
                return (
                  <motion.div
                    key={`${it.productId}-${it.size}-${it.color}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="h-24 w-20 rounded-xl object-cover bg-cream"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink truncate">{p.name}</p>
                      <p className="text-xs text-ink-soft mt-0.5">
                        {it.size} · {it.color}
                      </p>
                      <p className="text-sm font-semibold text-brand-deep mt-1">
                        {brl(effectivePrice(p) * it.qty)}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="inline-flex items-center rounded-full border border-line">
                          <button
                            onClick={() => updateQty(i, -1)}
                            aria-label="Diminuir quantidade"
                            className="p-1.5 text-ink-soft hover:text-brand-deep cursor-pointer transition-colors duration-200"
                          >
                            <MinusIcon className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm font-medium">{it.qty}</span>
                          <button
                            onClick={() => updateQty(i, 1)}
                            aria-label="Aumentar quantidade"
                            className="p-1.5 text-ink-soft hover:text-brand-deep cursor-pointer transition-colors duration-200"
                          >
                            <PlusIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(i)}
                          aria-label="Remover item"
                          className="p-1.5 text-ink-soft hover:text-[#9c3f3f] cursor-pointer transition-colors duration-200"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="border-t border-line px-6 py-5 space-y-4 bg-blush/60">
              <Field label="Vendedora que te atendeu (opcional)">
                <Select value={sellerId} onChange={(e) => setSellerId(e.target.value)}>
                  <option value="">Ninguém ainda / não sei</option>
                  {SELLERS.filter((s) => s.active).map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </Select>
              </Field>

              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-soft">Subtotal estimado</span>
                <motion.span
                  key={total}
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  className="text-xl font-semibold text-ink"
                >
                  {brl(total)}
                </motion.span>
              </div>

              <Button variant="whatsapp" className="w-full py-3.5 text-base" onClick={() => setPreview(true)}>
                <WhatsAppIcon className="w-5 h-5" /> Fechar pedido no WhatsApp
              </Button>
              <p className="text-[11px] text-ink-soft text-center">
                Sem pagamento aqui: você combina tudo direto com a loja.
              </p>
            </div>
          </>
        )}
      </Drawer>

      {/* Preview da mensagem */}
      <Modal open={preview} onClose={closeAll}>
        <div className="p-7">
          {!sent ? (
            <>
              <h2 className="font-display text-2xl text-ink pr-8">Confira sua mensagem</h2>
              <p className="text-sm text-ink-soft mt-1">
                É isso que vamos enviar para o WhatsApp da {STORE.name}:
              </p>

              {/* Balão estilo WhatsApp */}
              <div className="mt-5 rounded-2xl bg-[#e7f6e9] border border-[#cdeAD2] p-4 relative">
                <div className="absolute -left-1.5 top-4 h-3 w-3 rotate-45 bg-[#e7f6e9] border-l border-b border-[#cdead2]" />
                <pre className="whitespace-pre-wrap font-sans text-sm text-[#143c22] leading-relaxed">{message}</pre>
                <p className="text-right text-[10px] text-[#143c22]/50 mt-2">agora ✓✓</p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button variant="whatsapp" className="flex-1 py-3" onClick={handleSend}>
                  <WhatsAppIcon className="w-5 h-5" /> Enviar pelo WhatsApp
                </Button>
                <Button variant="ghost" className="sm:w-auto" onClick={() => setPreview(false)}>
                  Voltar e editar
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 16 }}
                className="mx-auto grid place-items-center h-16 w-16 rounded-full bg-[#e2efe5] text-[#2f6d4a]"
              >
                <CheckIcon className="w-8 h-8" />
              </motion.div>
              <h2 className="font-display text-2xl text-ink mt-4">Pedido enviado!</h2>
              <p className="text-sm text-ink-soft mt-2 max-w-xs mx-auto">
                Sua sacola entrou na fila de atendimento da loja. Em instantes uma vendedora responde você no WhatsApp.
              </p>
              <Button className="mt-6" onClick={closeAll}>Continuar navegando</Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}
