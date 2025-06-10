'use client'

import { useState } from 'react'

import { useAdminConversations } from '@/hooks/chat'
import { useAuthStore } from '@/stores/authStore'

import { AdminChatBox } from './AdminChatBox'

export default function AdminChatPage() {
  const user = useAuthStore((state) => state.user)
  const { data: conversations = [] } = useAdminConversations()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  if (!user) return <div>Đang tải người dùng...</div>

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4">
      <h1 className="text-lg font-semibold">Chat với khách</h1>

      <select
        className="w-full rounded border px-3 py-2"
        onChange={(e) => setSelectedId(e.target.value)}
        value={selectedId || ''}
      >
        <option value="" disabled>
          Chọn cuộc trò chuyện
        </option>
        {conversations.map((c: any) => (
          <option key={c.id} value={c.id}>
            Guest: {c.guestEmail || 'Chưa có email'} - {new Date(c.createdAt).toLocaleString()}
          </option>
        ))}
      </select>

      {selectedId && <AdminChatBox conversationId={selectedId} adminId={user.id} />}
    </div>
  )
}
