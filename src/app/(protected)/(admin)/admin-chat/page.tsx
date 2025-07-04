'use client'

import { Flex } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useAdminConversations } from '@/hooks/chat'
import { useAuthStore } from '@/stores/authStore'

import { AdminChatBox } from './AdminChatBox'

const ConversationList = ({
  conversations,
  onSelect,
  selectedId,
}: {
  conversations: any[]
  onSelect: (id: string) => void
  selectedId: string | null
}) => {
  return (
    <div className="h-full w-[33%] shrink-0 overflow-y-auto border-r">
      {conversations.map((c) => (
        <div
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={`cursor-pointer px-4 py-3 hover:bg-gray-100 ${selectedId === c.id ? 'bg-gray-200' : ''}`}
        >
          <div className="font-medium">
            {c.userName || 'Guest'}: {c.userEmail || 'Chưa có email'}
          </div>
          <div className="text-sm text-gray-500">{new Date(c.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}

export default function AdminChatPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const user = useAuthStore((state) => state.user)
  const { data: conversations = [] } = useAdminConversations()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    const id = searchParams.get('conversationId')
    if (id) setSelectedId(id)
  }, [searchParams])

  const handleSelect = (id: string) => {
    setSelectedId(id)
    router.replace(`?conversationId=${id}`)
  }

  if (!user) return <div>Đang tải người dùng...</div>

  return (
    <Flex style={{ height: 'calc(100vh - 64px)', overflow: 'hidden' }} className="w-full">
      <ConversationList conversations={conversations} selectedId={selectedId} onSelect={handleSelect} />

      <Flex style={{ flex: 1, overflowY: 'auto' }} className="relative size-full" vertical>
        {selectedId ? (
          <AdminChatBox conversationId={selectedId} adminId={user.id} />
        ) : (
          <Flex className="h-full items-center justify-center text-gray-400">Chọn một cuộc trò chuyện để bắt đầu</Flex>
        )}
      </Flex>
    </Flex>
  )
}
