'use client'

import { useEffect, useState } from 'react'

import { useAuthStore } from '@/stores/authStore'

import { AdminChatBox } from './AdminChatBox'

export default function AdminChatPage() {
  const user = useAuthStore((state) => state.user)
  const [conversationId, setConversationId] = useState<string | null>(null)

  useEffect(() => {
    setConversationId('admin-conversation-id-abc123')
  }, [])

  if (!user || !conversationId) return <div>Đang tải...</div>

  return (
    <div className="p-4">
      <h1 className="mb-2 text-lg font-semibold">Chat với khách</h1>
      <AdminChatBox conversationId={conversationId} adminId={user.id} />
    </div>
  )
}
