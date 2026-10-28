import { Reorder, useDragControls } from 'framer-motion'
import { useStore } from '../context/StoreContext'
import { STORE, WA_NUMBER } from '../data/data'
import { Badge, Button, Card, Field, Input, Toggle } from '../components/ui'
import { GripIcon, EditIcon, EyeIcon, EyeOffIcon } from '../components/icons'
import { cn } from '../lib/utils'
import { AdminHeader } from './AdminArea'

function SectionRow({ section, onToggle }) {
  const controls = useDragControls()
  return (
    <Reorder.Item
      value={section}
      dragListener={false}
      dragControls={controls}
      className={cn(
        'flex items-center gap-3 bg-white rounded-2xl border border-line px-4 py-3.5 select-none',
        !section.visible && 'opacity-60',
      )}
      whileDrag={{ scale: 1.02, boxShadow: '0 16px 36px -16px rgba(224,33,138,0.35)' }}
    >
      <button
        onPointerDown={(e) => controls.start(e)}
        aria-label={`Arrastar seção ${section.name}`}
        className="touch-none cursor-grab active:cursor-grabbing text-ink-soft hover:text-brand-deep p-1 transition-colors duration-200"
      >
        <GripIcon className="w-5 h-5" />
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ink truncate">{section.name}</p>
        <p className="text-[11px] text-ink-soft">{section.type}</p>
      </div>
      {!section.visible && <Badge tone="cream">Oculta</Badge>}
      <button
        aria-label={`Editar seção ${section.name}`}
        className="p-2 text-ink-soft hover:text-brand-deep cursor-pointer transition-colors duration-200"
      >
        <EditIcon className="w-4 h-4" />
      </button>
      <button
        onClick={() => onToggle(section.id)}
        aria-label={section.visible ? 'Ocultar seção' : 'Mostrar seção'}
        className="p-2 text-ink-soft hover:text-brand-deep cursor-pointer transition-colors duration-200"
      >
        {section.visible ? <EyeIcon className="w-4 h-4" /> : <EyeOffIcon className="w-4 h-4" />}
      </button>
    </Reorder.Item>
  )
}

export default function Appearance() {
  const { homeSections, setHomeSections, showToast } = useStore()

  const toggleVisible = (id) =>
    setHomeSections(homeSections.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)))

  return (
    <>
      <AdminHeader
        title="Aparência da vitrine"
        subtitle="Arraste para reordenar as seções da home — a vitrine reflete na hora"
      >
        <Button onClick={() => showToast('Alterações publicadas na vitrine')}>Publicar alterações</Button>
      </AdminHeader>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
        <div>
          <h2 className="text-xs font-semibold text-ink-soft uppercase tracking-wide mb-3">Seções da home</h2>
          <Reorder.Group axis="y" values={homeSections} onReorder={setHomeSections} className="space-y-2.5">
            {homeSections.map((s) => (
              <SectionRow key={s.id} section={s} onToggle={toggleVisible} />
            ))}
          </Reorder.Group>
          <p className="text-[11px] text-ink-soft mt-3">
            Dica: troque para o perfil Cliente depois de reordenar para ver a home atualizada.
          </p>
        </div>

        <Card className="p-6">
          <h2 className="text-xs font-semibold text-ink-soft uppercase tracking-wide mb-4">Identidade da loja</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-ink-soft mb-2">Logo</p>
              <div className="flex items-center gap-3">
                <span className="grid place-items-center h-14 w-14 rounded-full bg-gradient-to-br from-brand to-[#e8632c] text-white font-script text-xl">
                  C
                </span>
                <button className="text-xs font-medium text-brand-deep hover:text-brand underline underline-offset-2 cursor-pointer transition-colors duration-200">
                  Trocar logo
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-ink-soft mb-2">Cores da marca</p>
              <div className="flex gap-2">
                {['#e0218a', '#fdf2f6', '#faf6f0', '#1f1a1d', '#c9a227'].map((hex) => (
                  <span
                    key={hex}
                    title={hex}
                    className="h-8 w-8 rounded-full border border-black/10 cursor-pointer hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </div>
            <Field label="Texto da topbar">
              <Input defaultValue={STORE.topbar} />
            </Field>
            <Field label="WhatsApp que recebe pedidos">
              <Input defaultValue={`+${WA_NUMBER}`} />
            </Field>
          </div>
        </Card>
      </div>
    </>
  )
}
