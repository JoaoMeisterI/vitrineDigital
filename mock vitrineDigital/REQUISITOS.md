# Mock — Vitrine Digital (e-commerce que fecha no WhatsApp)

> Documento de requisitos para gerar o mock de interface. O produto é uma **vitrine virtual**: na prática parece um e-commerce completo, mas **não tem checkout com pagamento** — ao finalizar, a sacola é convertida em uma mensagem de WhatsApp e o cliente fecha a compra direto com a loja.

---

## 1. Conceito

- Plataforma SaaS multi-loja: cada loja (o "cliente" da plataforma) tem sua vitrine pública.
- O consumidor final navega, monta a sacola e, no lugar de "Pagar", clica em **"Fechar pelo WhatsApp"** → abre `wa.me` da loja com mensagem pré-montada contendo os itens, tamanhos, cores e valor estimado.
- Além da vitrine pública, existem áreas internas: **painel da loja** (configuração e cadastro), **BI do dono** e **área do vendedor**.
- Referência visual: loja **Cappri Moda Feminina** (vestidos de festa e casuais, slim + plus size) — ver imagens `referencia-1-instagram.webp` (perfil do Instagram) e `referencia-2-home.webp` (mock de home já feito) nesta pasta, usadas como base de identidade.

## 2. Perfis de usuário

| Perfil | Quem é | O que faz |
|---|---|---|
| **Cliente final** | Consumidora da loja | Navega na vitrine, favorita, monta sacola, fecha no WhatsApp; pode se cadastrar (nome, WhatsApp, e-mail) |
| **Vendedor(a)** | Funcionário da loja | Recebe/atende sacolas enviadas, tem link próprio de vendedor (atribuição de venda), consulta catálogo e estoque |
| **Admin da loja** | Gerente/responsável | Cadastra produtos, categorias, configura seções da home, banners, dados da loja, vendedores e clientes |
| **Dono (BI)** | Proprietário | Painel de indicadores: visitas, cliques no WhatsApp, produtos mais vistos, desempenho por vendedor |

## 3. Módulos e telas do mock

### 3.1 Vitrine pública (cliente final)

1. **Home**
   - Topbar fina de aviso ("Seu próximo look favorito está aqui")
   - Header: logo, menu (Novidades, Vestidos, Casual, Plus Size, Acessórios), busca, conta, favoritos, sacola com badge
   - Hero grande com foto, selo "Nova coleção", título display e CTA "Explorar coleção"
   - Faixa de benefícios: envio para todo o Brasil · compra segura · atendimento pelo WhatsApp
   - Seção "Encontre seu estilo": cards de categoria (Festa, Casual, Plus Size, Acessórios)
   - Seção "Seus novos favoritos": grade de produtos com coração de favoritar
   - Seção configurável extra (ex.: banner de coleção / clube de vantagens)
   - Rodapé: contato, endereço, redes, horários
2. **Listagem de produtos (PLP)**: filtros por categoria, tamanho (incl. plus size), cor, faixa de preço; ordenação; chips de filtros ativos
3. **Página do produto (PDP)**: galeria de fotos, nome, preço, parcelamento ilustrativo, seletor de tamanho e cor, guia de medidas, botão primário **"Quero esse — chamar no WhatsApp"** e secundário "Adicionar à sacola", produtos relacionados
4. **Sacola (drawer ou página)**: itens com variação, quantidade, subtotal; campo opcional "vendedora que te atendeu"; CTA **"Fechar pedido no WhatsApp"** com preview da mensagem que será enviada
5. **Login / cadastro do cliente**: cadastro leve (nome, WhatsApp, e-mail, aniversário opcional); área "Minha conta" com favoritos e pedidos enviados
6. **Favoritos (wishlist)**

### 3.2 Painel da loja (admin)

1. **Login do painel** (e-mail + senha, seleção de perfil)
2. **Dashboard inicial**: resumo do dia (visitas, sacolas enviadas, produtos ativos) + atalhos
3. **Produtos**: listagem com busca/status; formulário de cadastro — fotos (upload múltiplo), nome, descrição, categoria, preço, preço promocional, variações (tamanho P–GG + plus 46–54, cores), estoque por variação, tags (Novidade, Festa...), ativo/inativo
4. **Categorias e coleções**: CRUD simples com imagem de capa
5. **Aparência / seções da home**: lista ordenável (drag) de seções — hero, grade de categorias, carrossel de produtos, banner, depoimentos — cada uma com editar/ocultar; edição de logo, cores e link do WhatsApp
6. **Vendedores**: CRUD, foto, WhatsApp, link de atribuição, ativo/inativo
7. **Clientes**: lista com busca, dados de contato, última atividade, favoritos
8. **Configurações da loja**: nome, endereço, horários, redes, número de WhatsApp que recebe os pedidos

### 3.3 BI do dono

- **Visão geral**: KPIs em cards — visitas, sacolas enviadas ao WhatsApp, taxa de conversão (visita → sacola), ticket médio estimado, novos clientes
- Gráficos: linha (sacolas por dia, 30 dias), barras (top 10 produtos mais vistos/enviados), donut (vendas por categoria), ranking de vendedores
- Filtros de período (7/30/90 dias) e comparação com período anterior
- Tabela "últimas sacolas enviadas" (cliente, itens, valor, vendedor, status: enviado / em atendimento / fechado / perdido)

### 3.4 Área do vendedor

- **Fila de atendimento**: sacolas recebidas atribuídas a ele, com botão para abrir a conversa no WhatsApp
- Mudança de status da sacola (em atendimento → fechado / perdido)
- Consulta rápida de catálogo e estoque
- Seus números do mês (sacolas atendidas, fechadas, valor)

## 4. Fluxo-chave (obrigatório demonstrar no mock)

```
Cliente navega → adiciona à sacola → revisa sacola → "Fechar pedido no WhatsApp"
→ modal com preview da mensagem:
   "Olá, Cappri! 💕 Quero fechar meu pedido:
    • Vestido Festa Rubi — M — Terracota — R$ 289,90
    • Vestido Casual Limone — G — Amarelo — R$ 159,90
    Total: R$ 449,80 — Atendida por: Camila"
→ abre wa.me/55XXXXXXXXXXX com a mensagem preenchida
→ a sacola aparece na fila do vendedor e no BI
```

## 5. Identidade visual (base: Cappri)

- **Paleta**: rosa pink vibrante (primária, ~`#E0218A` / `#D81B7A`), rosa claro/blush de fundo (`#FDF2F6`), creme/off-white (`#FAF6F0`), grafite para texto (`#1F1A1D`), dourado suave como acento; gradiente pink→laranja apenas em detalhes (anel do avatar/stories)
- **Tipografia**: display serif elegante com itálico para títulos (estilo Playfair/Fraunces — "de você.") + sans humanista para UI (Poppins/Inter)
- **Tom**: feminino, elegante e acessível ("elegância acessível"); fotos grandes, cantos arredondados generosos, sombras suaves
- **Componentes com personalidade**: botões pill, badges de categoria, corações de favoritar, selos "Novidade" / "Plus Size"
- Painéis internos (admin/BI/vendedor) usam a mesma paleta em versão sóbria: fundo claro neutro, pink como cor de ação

## 6. Stack técnica do mock

- **React 19 + Vite + Tailwind CSS v4 + framer-motion** (já instalados neste projeto `Interfaces`)
- Utilitários existentes: `clsx`, `tailwind-merge`
- Sem backend: **todos os dados mockados** em `src/.../data.js` (produtos, categorias, vendedores, clientes, métricas)
- Navegação entre áreas por estado/rotas simples; um seletor discreto para alternar perfil (Cliente / Admin / Dono / Vendedor) facilita a demo
- Imagens: placeholders (picsum/unsplash) em tons compatíveis com a paleta
- Responsivo: vitrine pública mobile-first (o público chega pelo Instagram); painéis otimizados para desktop

## 7. Skills locais a usar na geração

Na hora de construir o mock, usar as skills de frontend instaladas em `.claude/skills/` desta pasta:

1. **`ui-ux-pro-max`** — gerar o design system antes de codar: consultar `data/styles.csv`, `data/colors.csv`, `data/typography.csv` e `data/stacks/react.csv`; usar os scripts (`scripts/search.py`, `scripts/design_system.py`) para fundamentar paleta, estilo (ex.: minimalismo elegante / soft UI) e pares tipográficos
2. **`website-builder-setup`** — seguir o fluxo do builder (UI/UX Pro Max + framer-motion + componentes 21st.dev)
3. **21st.dev** (skills `21st-cli-use` / `21st-ai`) — buscar componentes prontos (navbar, product card, dashboard, charts) quando fizer sentido; *atenção: o plano free limita o uso*

## 8. Dados mock mínimos

- ≥ 12 produtos (mix festa / casual / plus size / acessórios), com 2+ fotos, variações e preços reais de mercado (R$ 89–R$ 389)
- 4 categorias com imagem; 3 vendedoras; 6 clientes; 30 dias de métricas para o BI; 8 sacolas com status variados

## 9. Critérios de aceite do mock

- [ ] As 4 áreas navegáveis (vitrine, admin, BI, vendedor)
- [ ] Fluxo sacola → preview de mensagem → link `wa.me` funcionando de ponta a ponta
- [ ] Home da vitrine fiel à referência `referencia-2-home.webp` (hero, benefícios, categorias, favoritos)
- [ ] Admin demonstra cadastro de produto com variações e o editor de seções da home
- [ ] BI com 4+ KPIs, 3 gráficos e tabela de sacolas
- [ ] Favoritar e badge da sacola com feedback animado (framer-motion)
- [ ] Dark mode não é necessário; responsividade da vitrine é obrigatória

## 10. Fora de escopo

- Pagamento online, cálculo real de frete, integração real com a API do WhatsApp Business
- Backend, autenticação real, multi-tenancy funcional (apenas simulado visualmente)
