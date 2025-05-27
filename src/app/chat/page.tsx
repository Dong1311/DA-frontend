'use client'
import { useSocket } from '@/hooks/useSocket'

import { ChatBox } from './_components/ChatBox'
export default function ChatPage() {
  const { messages, sendMessage } = useSocket()

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <ChatBox messages={messages} sendMessage={sendMessage} />
    </main>
  )
}
