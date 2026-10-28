import { useState } from 'react'
import { SELLERS } from '../data/data'
import { Badge, Button, Card, Field, Input, Modal, Toggle } from '../components/ui'
import { PlusIcon, EditIcon, CheckIcon } from '../components/icons'
import { AdminHeader, WhatsAppChip } from './AdminArea'

export default function Sellers() {
  const [form, setForm] = useState(null)
  const [copied, setCopied] = useState(null)
  const [activeMap, setActiveMap] = useState(Object.fromEntries(SELLERS.map((s) => [s.id, s.active])))

  const copyLink = (seller) => {
    navigator.clipboard?.writeText(`https://${seller.link}`).catch(() => {})
    setCopied(seller.id)
    setTimeout(() => setCopied(null), 1800)
  }

  return (
    <>
      <AdminHeader title="Vendedores" subtitle="Cada vendedora tem um link próprio que atribui a venda a ela">
        <Button onClick={() => setForm('new')}>
          <PlusIcon className="w-4 h-4" /> Nova vendedora
        </Button>
      </AdminHeader>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SELLERS.map((s) => (
          <Card key={s.id} className="p-5">
            <div className="flex items-start gap-3">
              <img src={s.photo} alt={s.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-brand-soft" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-ink truncate">{s.name}</p>
                <WhatsAppChip number={s.whatsapp} />
              </div>
              <Badge tone={activeMap[s.id] ? 'green' : 'red'}>{activeMap[s.id] ? 'Ativa' : 'Inativa'}</Badge>
            </div>

            <div className="mt-4 rounded-xl bg-blush px-3.5 py-2.5 flex items-center justify-between gap-2">
              <span className="text-xs text-ink-soft truncate">{s.link}</span>
              <button
                onClick={() => copyLink(s)}
                className="shrink-0 text-xs font-semibold text-brand-deep hover:text-brand cursor-pointer transition-colors duration-200"
              >
                {copied === s.id ? (
                  <span className="inline-flex items-center gap-1 text-[#2f6d4a]">
                    <CheckIcon className="w-3.5 h-3.5" /> Copiado
                  </span>
                ) : (
                  'Copiar link'
                )}
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => setForm(s)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-deep hover:text-brand cursor-pointer transition-colors duration-200"
              >
                <EditIcon className="w-4 h-4" /> Editar
              </button>
              <Toggle
                checked={activeMap[s.id]}
                onChange={(v) => setActiveMap({ ...activeMap, [s.id]: v })}
                label={`Ativar ${s.name}`}
              />
            </div>
          </Card>
        ))}
      </div>

      <Modal open={Boolean(form)} onClose={() => setForm(null)}>
        <form className="p-7" onSubmit={(e) => { e.preventDefault(); setForm(null) }}>
          <h2 className="font-display text-2xl text-ink pr-8">
            {form === 'new' ? 'Nova vendedora' : `Editar — ${form?.name}`}
          </h2>
          <div className="mt-5 space-y-4">
            <Field label="Nome">
              <Input defaultValue={form === 'new' ? '' : form?.name} required />
            </Field>
            <Field label="WhatsApp">
              <Input defaultValue={form === 'new' ? '' : form?.whatsapp} placeholder="(47) 9 9999-9999" required />
            </Field>
            <Field label="Link de atribuição" hint="Gerado automaticamente a partir do nome">
              <Input defaultValue={form === 'new' ? 'cappri.app/v/...' : form?.link} disabled className="opacity-60" />
            </Field>
          </div>
          <div className="mt-6 flex gap-3 justify-end">
            <Button variant="ghost" type="button" onClick={() => setForm(null)}>Cancelar</Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
