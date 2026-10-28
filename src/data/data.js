// ─── Dados 100% mockados da Vitrine Digital (loja Cappri) ───────────────────

export const WA_NUMBER = '5547996916019'

export const STORE = {
  name: 'Cappri',
  tagline: 'Moda Feminina · Vestidos de Festa & Casuais',
  topbar: 'Seu próximo look favorito está aqui',
  address: 'Rua Padre Alberto Romuald Jakobs, 440 · Vila Lenzi · Jaraguá do Sul/SC',
  hours: 'Seg a Sex 9h–19h · Sáb 9h–13h',
  instagram: '@lojacappri',
  whatsappDisplay: '(47) 99244-5678',
}

// Imagens geradas por IA (Runway) em public/images
const img = (name) => `/images/${name}.png`

export const CATEGORIES = [
  { id: 'festa', name: 'Festa', image: img('cat-festa'), description: 'Vestidos para brilhar em qualquer ocasião' },
  { id: 'casual', name: 'Casual', image: img('cat-casual'), description: 'Looks leves para o dia a dia' },
  { id: 'plus', name: 'Plus Size', image: img('cat-plus'), description: 'Elegância do 46 ao 54' },
  { id: 'acessorios', name: 'Acessórios', image: img('cat-acessorios'), description: 'O toque final do look' },
]

export const SIZES_REGULAR = ['P', 'M', 'G', 'GG']
export const SIZES_PLUS = ['46', '48', '50', '52', '54']

export const COLOR_SWATCHES = {
  Terracota: '#c96f4a', Vinho: '#7a2440', Amarelo: '#f2cf63', Branco: '#f7f3ee',
  Rosa: '#f0a5c6', Verde: '#7fa881', Champanhe: '#e8d7b9', 'Rosé': '#e3b7ad',
  Bege: '#d9c6ad', 'Off-white': '#f4efe7', Preto: '#2a2429', Esmeralda: '#2f6d5a',
  'Pérola': '#ece5da', Prata: '#c9c9cf', Dourado: '#cfa84a', Cristal: '#e8ecf2',
  'Floral Rosa': '#eb8fb4', 'Azul Sereno': '#9db7cf',
}

export const PRODUCTS = [
  {
    id: 'vestido-festa-rubi', name: 'Vestido Festa Rubi', category: 'festa',
    price: 289.9, promoPrice: null, tags: ['Festa', 'Novidade'],
    colors: ['Terracota', 'Vinho'], sizes: SIZES_REGULAR, plus: false,
    images: [img('rubi-a'), img('rubi-b')], active: true, views: 1480, sent: 46,
    description: 'Vestido midi em crepe com decote drapeado e fenda discreta. Caimento impecável para festas e eventos.',
    stock: { P: 3, M: 6, G: 5, GG: 2 },
  },
  {
    id: 'vestido-casual-limone', name: 'Vestido Casual Limone', category: 'casual',
    price: 159.9, promoPrice: null, tags: ['Casual', 'Novidade'],
    colors: ['Amarelo', 'Branco'], sizes: SIZES_REGULAR, plus: false,
    images: [img('limone-a'), img('limone-b')], active: true, views: 1320, sent: 38,
    description: 'Vestido curto de alças em tricoline leve, com babados no decote. Perfeito para dias de sol.',
    stock: { P: 4, M: 8, G: 6, GG: 3 },
  },
  {
    id: 'vestido-midi-flora', name: 'Vestido Midi Flora', category: 'festa',
    price: 249.9, promoPrice: 219.9, tags: ['Festa', 'Promo'],
    colors: ['Rosa', 'Verde'], sizes: SIZES_REGULAR, plus: false,
    images: [img('flora-a'), img('flora-b')], active: true, views: 1110, sent: 31,
    description: 'Midi floral com saia evasê e amarração nas costas. Romântico na medida certa.',
    stock: { P: 2, M: 5, G: 4, GG: 2 },
  },
  {
    id: 'vestido-plus-girassol', name: 'Vestido Plus Girassol', category: 'plus',
    price: 199.9, promoPrice: null, tags: ['Plus Size', 'Casual'],
    colors: ['Amarelo', 'Floral Rosa'], sizes: SIZES_PLUS, plus: true,
    images: [img('girassol-a'), img('girassol-b')], active: true, views: 980, sent: 27,
    description: 'Vestido longuete em viscose fresquinha, modelagem ampla que valoriza as curvas do 46 ao 54.',
    stock: { 46: 4, 48: 5, 50: 4, 52: 3, 54: 2 },
  },
  {
    id: 'vestido-longo-aurora', name: 'Vestido Longo Aurora', category: 'festa',
    price: 389.9, promoPrice: null, tags: ['Festa', 'Madrinha'],
    colors: ['Champanhe', 'Rosé'], sizes: SIZES_REGULAR, plus: false,
    images: [img('aurora-a'), img('aurora-b')], active: true, views: 1655, sent: 52,
    description: 'Longo em tule com brilho sutil e corpete estruturado. O queridinho das madrinhas.',
    stock: { P: 2, M: 4, G: 3, GG: 1 },
  },
  {
    id: 'conjunto-linho-brisa', name: 'Conjunto Linho Brisa', category: 'casual',
    price: 189.9, promoPrice: null, tags: ['Casual'],
    colors: ['Bege', 'Off-white'], sizes: SIZES_REGULAR, plus: false,
    images: [img('brisa-a'), img('brisa-b')], active: true, views: 760, sent: 18,
    description: 'Conjunto de linho com blusa cropped e calça pantacourt. Conforto com elegância.',
    stock: { P: 3, M: 5, G: 4, GG: 2 },
  },
  {
    id: 'vestido-plus-jardim', name: 'Vestido Plus Jardim', category: 'plus',
    price: 229.9, promoPrice: null, tags: ['Plus Size', 'Festa'],
    colors: ['Floral Rosa', 'Azul Sereno'], sizes: SIZES_PLUS, plus: true,
    images: [img('jardim-a'), img('jardim-b')], active: true, views: 890, sent: 24,
    description: 'Midi plus size com estampa exclusiva e manga princesa. Do almoço ao evento.',
    stock: { 46: 3, 48: 4, 50: 5, 52: 2, 54: 2 },
  },
  {
    id: 'macacao-pantalona-noite', name: 'Macacão Pantalona Noite', category: 'festa',
    price: 269.9, promoPrice: null, tags: ['Festa'],
    colors: ['Preto', 'Esmeralda'], sizes: SIZES_REGULAR, plus: false,
    images: [img('noite-a'), img('noite-b')], active: true, views: 705, sent: 15,
    description: 'Macacão pantalona com decote ombro a ombro. Alternativa poderosa ao vestido.',
    stock: { P: 2, M: 4, G: 3, GG: 2 },
  },
  {
    id: 'vestido-slip-perola', name: 'Vestido Slip Cetim Pérola', category: 'festa',
    price: 219.9, promoPrice: 189.9, tags: ['Festa', 'Promo'],
    colors: ['Pérola', 'Prata'], sizes: SIZES_REGULAR, plus: false,
    images: [img('perola-a'), img('perola-b')], active: true, views: 1240, sent: 35,
    description: 'Slip dress de cetim toque de seda, corte enviesado. Minimalista e sofisticado.',
    stock: { P: 3, M: 6, G: 4, GG: 2 },
  },
  {
    id: 'saia-midi-roma', name: 'Saia Midi Romã', category: 'casual',
    price: 129.9, promoPrice: null, tags: ['Casual'],
    colors: ['Vinho', 'Bege'], sizes: SIZES_REGULAR, plus: false,
    images: [img('roma-a'), img('roma-b')], active: true, views: 520, sent: 11,
    description: 'Saia midi plissada com cós alto elástico. Combina com tudo.',
    stock: { P: 5, M: 7, G: 5, GG: 3 },
  },
  {
    id: 'blusa-alongada-nuvem', name: 'Blusa Alongada Nuvem', category: 'casual',
    price: 89.9, promoPrice: null, tags: ['Casual', 'Básico'],
    colors: ['Branco', 'Rosa'], sizes: SIZES_REGULAR, plus: false,
    images: [img('nuvem-a'), img('nuvem-b')], active: false, views: 410, sent: 8,
    description: 'Blusa alongada em malha premium, toque macio. O básico que não é básico.',
    stock: { P: 6, M: 9, G: 7, GG: 4 },
  },
  {
    id: 'bolsa-clutch-dourada', name: 'Bolsa Clutch Dourada', category: 'acessorios',
    price: 149.9, promoPrice: null, tags: ['Acessórios', 'Festa'],
    colors: ['Dourado'], sizes: ['Único'], plus: false,
    images: [img('clutch-a'), img('clutch-b')], active: true, views: 630, sent: 14,
    description: 'Clutch metalizada com alça corrente removível. Cabe o essencial com muito estilo.',
    stock: { 'Único': 8 },
  },
  {
    id: 'brincos-cascata-cristal', name: 'Brincos Cascata Cristal', category: 'acessorios',
    price: 98.9, promoPrice: null, tags: ['Acessórios'],
    colors: ['Cristal'], sizes: ['Único'], plus: false,
    images: [img('cascata-a'), img('cascata-b')], active: true, views: 480, sent: 9,
    description: 'Brincos em cascata com cristais tchecos e banho antialérgico.',
    stock: { 'Único': 12 },
  },
  {
    id: 'vestido-plus-dalia', name: 'Vestido Plus Festa Dália', category: 'plus',
    price: 259.9, promoPrice: null, tags: ['Plus Size', 'Festa', 'Novidade'],
    colors: ['Vinho', 'Esmeralda'], sizes: SIZES_PLUS, plus: true,
    images: [img('dalia-a'), img('dalia-b')], active: true, views: 1040, sent: 29,
    description: 'Vestido de festa plus size em malha fria com drapeado frontal que alonga a silhueta.',
    stock: { 46: 3, 48: 5, 50: 4, 52: 3, 54: 2 },
  },
]

export const SELLERS = [
  { id: 'camila', name: 'Camila Souza', whatsapp: '(47) 99911-2233', photo: img('vendedora-camila'), link: 'cappri.app/v/camila', active: true, monthBags: 34, monthClosed: 21, monthValue: 6120.4 },
  { id: 'juliana', name: 'Juliana Ferreira', whatsapp: '(47) 99844-5566', photo: img('vendedora-juliana'), link: 'cappri.app/v/juliana', active: true, monthBags: 28, monthClosed: 16, monthValue: 4890.1 },
  { id: 'patricia', name: 'Patrícia Lima', whatsapp: '(47) 99755-8899', photo: img('vendedora-patricia'), link: 'cappri.app/v/patricia', active: false, monthBags: 12, monthClosed: 7, monthValue: 2110.6 },
]

export const CLIENTS = [
  { id: 1, name: 'Mariana Castro', whatsapp: '(47) 99123-4567', email: 'mari.castro@gmail.com', lastActivity: 'Hoje, 10:42', favorites: 5, bags: 3 },
  { id: 2, name: 'Fernanda Ribeiro', whatsapp: '(47) 99234-5678', email: 'fer.ribeiro@hotmail.com', lastActivity: 'Ontem, 19:15', favorites: 8, bags: 2 },
  { id: 3, name: 'Beatriz Nunes', whatsapp: '(47) 99345-6789', email: 'bia.nunes@gmail.com', lastActivity: 'Há 2 dias', favorites: 2, bags: 1 },
  { id: 4, name: 'Larissa Gomes', whatsapp: '(47) 99456-7890', email: 'lari.gomes@gmail.com', lastActivity: 'Há 3 dias', favorites: 11, bags: 4 },
  { id: 5, name: 'Camille Duarte', whatsapp: '(47) 99567-8901', email: 'camille.d@outlook.com', lastActivity: 'Há 5 dias', favorites: 3, bags: 1 },
  { id: 6, name: 'Renata Almeida', whatsapp: '(47) 99678-9012', email: 're.almeida@gmail.com', lastActivity: 'Há 1 semana', favorites: 6, bags: 2 },
]

// ─── Métricas: 30 dias determinísticos (pseudo-random com seed) ──────────────
const seeded = (i) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

export const METRICS_30D = Array.from({ length: 30 }, (_, i) => {
  const day = new Date(2026, 8, 19 + i) // 19/set → 18/out
  const weekend = day.getDay() === 0 || day.getDay() === 6
  const visits = Math.round(210 + seeded(i) * 190 + (weekend ? 70 : 0))
  const bags = Math.round(9 + seeded(i + 50) * 13 + (weekend ? 4 : 0))
  return {
    date: day,
    label: `${String(day.getDate()).padStart(2, '0')}/${String(day.getMonth() + 1).padStart(2, '0')}`,
    visits,
    bags,
  }
})

export const KPI_PREVIOUS = { visits: 7820, bags: 318, conversion: 4.1, ticket: 262.3, newClients: 38 }

export const INITIAL_BAGS = [
  {
    id: 'SAC-0812', client: 'Mariana Castro', sellerId: 'camila', status: 'enviado', time: 'Hoje, 10:42',
    items: [
      { productId: 'vestido-festa-rubi', size: 'M', color: 'Terracota', qty: 1 },
      { productId: 'brincos-cascata-cristal', size: 'Único', color: 'Cristal', qty: 1 },
    ],
  },
  {
    id: 'SAC-0811', client: 'Fernanda Ribeiro', sellerId: 'camila', status: 'em_atendimento', time: 'Hoje, 09:18',
    items: [{ productId: 'vestido-longo-aurora', size: 'G', color: 'Champanhe', qty: 1 }],
  },
  {
    id: 'SAC-0810', client: 'Larissa Gomes', sellerId: 'juliana', status: 'em_atendimento', time: 'Ontem, 18:50',
    items: [
      { productId: 'vestido-plus-dalia', size: '50', color: 'Vinho', qty: 1 },
      { productId: 'bolsa-clutch-dourada', size: 'Único', color: 'Dourado', qty: 1 },
    ],
  },
  {
    id: 'SAC-0809', client: 'Beatriz Nunes', sellerId: 'camila', status: 'fechado', time: 'Ontem, 15:22',
    items: [{ productId: 'vestido-midi-flora', size: 'P', color: 'Rosa', qty: 1 }],
  },
  {
    id: 'SAC-0808', client: 'Renata Almeida', sellerId: 'juliana', status: 'fechado', time: 'Há 2 dias',
    items: [
      { productId: 'vestido-casual-limone', size: 'G', color: 'Amarelo', qty: 2 },
      { productId: 'saia-midi-roma', size: 'G', color: 'Bege', qty: 1 },
    ],
  },
  {
    id: 'SAC-0807', client: 'Camille Duarte', sellerId: 'patricia', status: 'perdido', time: 'Há 3 dias',
    items: [{ productId: 'macacao-pantalona-noite', size: 'M', color: 'Preto', qty: 1 }],
  },
  {
    id: 'SAC-0806', client: 'Mariana Castro', sellerId: 'juliana', status: 'fechado', time: 'Há 4 dias',
    items: [{ productId: 'vestido-slip-perola', size: 'M', color: 'Pérola', qty: 1 }],
  },
  {
    id: 'SAC-0805', client: 'Larissa Gomes', sellerId: 'camila', status: 'perdido', time: 'Há 5 dias',
    items: [{ productId: 'vestido-plus-girassol', size: '48', color: 'Amarelo', qty: 1 }],
  },
]

export const HOME_SECTIONS = [
  { id: 'hero', name: 'Hero — Nova coleção', type: 'Hero com foto', visible: true },
  { id: 'benefits', name: 'Faixa de benefícios', type: 'Barra de ícones', visible: true },
  { id: 'categories', name: 'Encontre seu estilo', type: 'Grade de categorias', visible: true },
  { id: 'favorites', name: 'Seus novos favoritos', type: 'Carrossel de produtos', visible: true },
  { id: 'club', name: 'Clube Cappri', type: 'Banner de coleção', visible: true },
  { id: 'testimonials', name: 'Depoimentos', type: 'Depoimentos', visible: false },
]

export const TESTIMONIALS = [
  { name: 'Mariana C.', text: 'Atendimento incrível pelo WhatsApp, o vestido chegou perfeito!', stars: 5 },
  { name: 'Larissa G.', text: 'Finalmente uma loja com plus size que veste bem de verdade.', stars: 5 },
  { name: 'Fernanda R.', text: 'Comprei para o casamento da minha irmã e recebi mil elogios.', stars: 5 },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const brl = (n) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export const productById = (id) => PRODUCTS.find((p) => p.id === id)

export const effectivePrice = (p) => p.promoPrice ?? p.price

export const bagTotal = (bag) =>
  bag.items.reduce((sum, it) => {
    const p = productById(it.productId)
    return sum + (p ? effectivePrice(p) * it.qty : 0)
  }, 0)

const ITEM_EMOJI = { festa: '👗', casual: '👚', plus: '👗', acessorios: '✨' }

export const buildWhatsAppMessage = (items, sellerName) => {
  const lines = items.map((it) => {
    const p = productById(it.productId)
    const emoji = ITEM_EMOJI[p.category] ?? '🛍️'
    const unit = effectivePrice(p)
    return (
      `${emoji} *${p.name}*\n` +
      `    Tam ${it.size} · ${it.color} · ${it.qty} un × ${brl(unit)}\n` +
      `    Subtotal: ${brl(unit * it.qty)}`
    )
  })
  const total = items.reduce((s, it) => s + effectivePrice(productById(it.productId)) * it.qty, 0)
  let msg =
    `Olá, Cappri! 💕 Quero fechar meu pedido:\n\n` +
    `${lines.join('\n\n')}\n\n` +
    `━━━━━━━━━━━━\n` +
    `🧾 *Total: ${brl(total)}*`
  if (sellerName) msg += `\n👩 Atendida por: ${sellerName}`
  return msg
}

export const waLink = (message) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`

export const STATUS_META = {
  enviado: { label: 'Pendente confirmação', color: 'bg-brand-soft text-brand-deep' },
  em_atendimento: { label: 'Em atendimento', color: 'bg-gold-soft text-[#8a6d12]' },
  fechado: { label: 'Fechado', color: 'bg-[#e2efe5] text-[#2f6d4a]' },
  perdido: { label: 'Perdido', color: 'bg-[#f3e4e4] text-[#9c3f3f]' },
}
