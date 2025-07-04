'use client'

import { MessageOutlined } from '@ant-design/icons'
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
    <div className="min-h-screen w-full space-y-6 bg-gray-50 px-4 py-6">
      <div className="flex items-center gap-2 text-blue-700">
        <MessageOutlined className="text-2xl" />
        <h1 className="text-2xl font-semibold">Trò chuyện với nhà thuốc</h1>
      </div>

      <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
        <label htmlFor="store-select" className="mb-2 block text-sm font-medium text-gray-700">
          Chọn nhà thuốc:
        </label>
        <select
          id="store-select"
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selected}
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option value="" disabled>
            -- Vui lòng chọn một nhà thuốc --
          </option>
          {stores.map((store: any) => (
            <option key={store.id} value={store.id}>
              {store.name} {store.address ? `– ${store.address}` : ''}
            </option>
          ))}
        </select>
      </div>

      {selected && (
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <GuestChatBox />
        </div>
      )}
    </div>
  )
}
