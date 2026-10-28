import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { INITIAL_BAGS, HOME_SECTIONS, PRODUCTS } from '../data/data'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [role, setRole] = useState('cliente') // cliente | admin | dono | vendedor
  const [cart, setCart] = useState([]) // {productId, size, color, qty}
  const [favorites, setFavorites] = useState(['vestido-longo-aurora', 'vestido-midi-flora'])
  const [bags, setBags] = useState(INITIAL_BAGS)
  // Estoque vivo por produto/tamanho: confirmar uma compra desconta daqui
  const [stock, setStock] = useState(() =>
    Object.fromEntries(PRODUCTS.map((p) => [p.id, { ...p.stock }])),
  )
  const [homeSections, setHomeSections] = useState(HOME_SECTIONS)
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message) => {
    setToast({ id: Date.now(), message })
    setTimeout(() => setToast(null), 2600)
  }, [])

  const addToCart = useCallback((item) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (i) => i.productId === item.productId && i.size === item.size && i.color === item.color,
      )
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], qty: next[idx].qty + item.qty }
        return next
      }
      return [...prev, item]
    })
  }, [])

  const updateQty = useCallback((index, delta) => {
    setCart((prev) =>
      prev
        .map((it, i) => (i === index ? { ...it, qty: it.qty + delta } : it))
        .filter((it) => it.qty > 0),
    )
  }, [])

  const removeFromCart = useCallback((index) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }, [])

  // Registra a sacola enviada: aparece na fila do vendedor e no BI
  const registerBag = useCallback((items, sellerId) => {
    setBags((prev) => [
      {
        id: `SAC-${String(813 + prev.length - INITIAL_BAGS.length).padStart(4, '0')}`,
        client: 'Você (demo)',
        sellerId: sellerId || 'camila',
        status: 'enviado',
        time: 'Agora mesmo',
        items,
      },
      ...prev,
    ])
  }, [])

  const setBagStatus = useCallback((bagId, status) => {
    const bag = bags.find((b) => b.id === bagId)
    // Confirmar a compra (fechado) movimenta o estoque uma única vez
    if (bag && status === 'fechado' && bag.status !== 'fechado') {
      setStock((s) => {
        const next = { ...s }
        for (const it of bag.items) {
          const bySize = { ...(next[it.productId] ?? {}) }
          bySize[it.size] = Math.max(0, (bySize[it.size] ?? 0) - it.qty)
          next[it.productId] = bySize
        }
        return next
      })
    }
    setBags((prev) => prev.map((b) => (b.id === bagId ? { ...b, status } : b)))
  }, [bags])

  const value = useMemo(
    () => ({
      role, setRole,
      cart, addToCart, updateQty, removeFromCart, clearCart: () => setCart([]),
      favorites, toggleFavorite,
      bags, registerBag, setBagStatus,
      stock,
      homeSections, setHomeSections,
      toast, showToast,
    }),
    [role, cart, favorites, bags, stock, homeSections, toast, addToCart, updateQty, removeFromCart, toggleFavorite, registerBag, setBagStatus, showToast],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
