import { useState } from 'react'
import { CATEGORIES, PRODUCTS } from '../data/data'
import { Badge, Button, Card, Field, Input, Modal } from '../components/ui'
import { PlusIcon, EditIcon, CameraIcon } from '../components/icons'
import { AdminHeader } from './AdminArea'

export default function Categories() {
  const [form, setForm] = useState(null)

  return (
    <>
      <AdminHeader title="Categorias e coleções" subtitle="Organize como a vitrine agrupa os produtos">
        <Button onClick={() => setForm('new')}>
          <PlusIcon className="w-4 h-4" /> Nova categoria
        </Button>
      </AdminHeader>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => {
          const count = PRODUCTS.filter((p) => p.category === cat.id).length
          return (
            <Card key={cat.id} className="overflow-hidden group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge tone="pink" className="absolute top-3 left-3">{count} produtos</Badge>
              </div>
              <div className="p-4">
                <p className="font-semibold text-ink">{cat.name}</p>
                <p className="text-xs text-ink-soft mt-0.5 line-clamp-1">{cat.description}</p>
                <button
                  onClick={() => setForm(cat)}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-brand-deep hover:text-brand cursor-pointer transition-colors duration-200"
                >
                  <EditIcon className="w-4 h-4" /> Editar
                </button>
              </div>
            </Card>
          )
        })}
      </div>

      <Modal open={Boolean(form)} onClose={() => setForm(null)}>
        <form className="p-7" onSubmit={(e) => { e.preventDefault(); setForm(null) }}>
          <h2 className="font-display text-2xl text-ink pr-8">
            {form === 'new' ? 'Nova categoria' : `Editar — ${form?.name}`}
          </h2>
          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs font-semibold text-ink-soft uppercase tracking-wide mb-2">Imagem de capa</p>
              <button
                type="button"
                aria-label="Trocar imagem de capa"
                className="relative block w-full aspect-[3/1] rounded-2xl overflow-hidden border-2 border-dashed border-line hover:border-brand cursor-pointer transition-colors duration-200 group"
              >
                {form !== 'new' && form?.image ? (
                  <img src={form.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="absolute inset-0 grid place-items-center text-ink-soft group-hover:text-brand-deep">
                    <CameraIcon className="w-7 h-7" />
                  </span>
                )}
              </button>
            </div>
            <Field label="Nome">
              <Input defaultValue={form === 'new' ? '' : form?.name} placeholder="Ex.: Festa" required />
            </Field>
            <Field label="Descrição curta">
              <Input defaultValue={form === 'new' ? '' : form?.description} placeholder="Aparece no card da vitrine" />
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
