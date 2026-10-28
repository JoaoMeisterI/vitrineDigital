import { useMemo, useState } from 'react'
import { CLIENTS } from '../data/data'
import { Card, Input } from '../components/ui'
import { SearchIcon, HeartIcon, BagIcon } from '../components/icons'
import { AdminHeader, WhatsAppChip } from './AdminArea'

export default function Clients() {
  const [query, setQuery] = useState('')

  const list = useMemo(
    () =>
      CLIENTS.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.email.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  )

  return (
    <>
      <AdminHeader title="Clientes" subtitle={`${CLIENTS.length} clientes cadastradas na vitrine`} />

      <div className="relative max-w-sm mb-5">
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft pointer-events-none" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome ou e-mail..."
          className="pl-10"
          aria-label="Buscar cliente"
        />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto nice-scroll">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-ink-soft border-b border-line bg-blush/50">
                <th className="px-5 py-3 font-semibold">Cliente</th>
                <th className="px-3 py-3 font-semibold">Contato</th>
                <th className="px-3 py-3 font-semibold">Última atividade</th>
                <th className="px-3 py-3 font-semibold">Favoritos</th>
                <th className="px-5 py-3 font-semibold">Sacolas</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id} className="border-b border-line/60 hover:bg-blush/40 transition-colors duration-150">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="grid place-items-center h-9 w-9 rounded-full bg-brand-soft text-brand-deep text-xs font-bold">
                        {c.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                      </span>
                      <div>
                        <p className="font-medium text-ink">{c.name}</p>
                        <p className="text-[11px] text-ink-soft">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <WhatsAppChip number={c.whatsapp} />
                  </td>
                  <td className="px-3 py-3.5 text-ink-soft">{c.lastActivity}</td>
                  <td className="px-3 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-ink">
                      <HeartIcon filled className="w-3.5 h-3.5 text-brand" /> {c.favorites}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-ink">
                      <BagIcon className="w-3.5 h-3.5 text-brand-deep" /> {c.bags}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}
