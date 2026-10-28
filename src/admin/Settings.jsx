import { STORE, WA_NUMBER } from '../data/data'
import { Button, Card, Field, Input } from '../components/ui'
import { useStore } from '../context/StoreContext'
import { AdminHeader } from './AdminArea'

export default function Settings() {
  const { showToast } = useStore()

  return (
    <>
      <AdminHeader title="Configurações da loja" subtitle="Dados exibidos na vitrine e canal que recebe os pedidos" />

      <form
        className="grid lg:grid-cols-2 gap-6 items-start"
        onSubmit={(e) => { e.preventDefault(); showToast('Configurações salvas') }}
      >
        <Card className="p-6 space-y-4">
          <h2 className="text-xs font-semibold text-ink-soft uppercase tracking-wide">Dados da loja</h2>
          <Field label="Nome da loja">
            <Input defaultValue="Cappri Moda Feminina" />
          </Field>
          <Field label="Endereço">
            <Input defaultValue={STORE.address} />
          </Field>
          <Field label="Horários de atendimento">
            <Input defaultValue={STORE.hours} />
          </Field>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-xs font-semibold text-ink-soft uppercase tracking-wide">Canais</h2>
          <Field
            label="WhatsApp que recebe os pedidos"
            hint="É para este número que as sacolas da vitrine são enviadas"
          >
            <Input defaultValue={`+${WA_NUMBER}`} />
          </Field>
          <Field label="Instagram">
            <Input defaultValue={STORE.instagram} />
          </Field>
          <Field label="E-mail de contato">
            <Input type="email" defaultValue="contato@cappri.com.br" />
          </Field>
          <div className="pt-1 flex justify-end">
            <Button type="submit">Salvar configurações</Button>
          </div>
        </Card>
      </form>
    </>
  )
}
