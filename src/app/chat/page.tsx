'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useAvailableStores } from '@/hooks/public'

import { GuestChatBox } from './_components/GuestChatBox'

export default function GuestChatPage() {
  const { data: stores = [] } = useAvailableStores()
  const [selected, setSelected] = useState('')
  const router = useRouter()

  const handleSelect = (storeId: string) => {
    setSelected(storeId)
    router.push(`/chat?storeId=${storeId}`)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4">
      <h1 className="text-lg font-semibold">Chat với nhà thuốc</h1>

      <select
        className="w-full rounded border px-3 py-2"
        value={selected}
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="" disabled>
          Chọn nhà thuốc...
        </option>
        {stores.map((store: any) => (
          <option key={store.id} value={store.id}>
            {store.name} - {store.address}
          </option>
        ))}
      </select>

      {selected && <GuestChatBox />}
    </div>
  )
}
