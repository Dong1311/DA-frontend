'use client'

import { useEffect, useRef, useState } from 'react'

export interface ChatMessage {
  sender: 'guest' | 'admin'
  content: string
  createdAt?: string
}

interface ChatBoxProps {
  messages: ChatMessage[]
  sendMessage: (content: string) => void
  role: 'GUEST' | 'ADMIN'
}

export const ChatBox: React.FC<ChatBoxProps> = ({ messages, sendMessage, role }) => {
  const [input, setInput] = useState('')
  const chatRef = useRef<HTMLDivElement | null>(null)

  const MAX_LENGTH = 500

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim())
      setInput('')
    }
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="mx-auto max-w-2xl space-y-4 rounded border bg-white p-4 shadow-md">
      <div ref={chatRef} className="h-[420px] space-y-2 overflow-y-auto rounded border bg-gray-50 p-3">
        {messages.map((msg, index) => {
          const isSender = (role === 'GUEST' && msg.sender === 'guest') || (role === 'ADMIN' && msg.sender === 'admin')
          return (
            <div key={index} className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] whitespace-pre-line rounded-lg px-4 py-2 text-sm shadow-sm ${
                  isSender ? 'bg-blue-600 text-right text-white' : 'bg-gray-200 text-left text-black'
                }`}
              >
                {msg.content}
              </div>
            </div>
          )
        })}
      </div>

      <div className="relative flex flex-col gap-1">
        <input
          type="text"
          value={input}
          maxLength={MAX_LENGTH}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 rounded border px-3 py-2 pr-16 text-sm"
          placeholder="Nhập tin nhắn..."
        />
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none text-xs text-gray-400">
          {input.length}/{MAX_LENGTH}
        </div>
      </div>

      <button
        onClick={handleSend}
        className="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-60"
        disabled={!input.trim()}
      >
        Gửi
      </button>
    </div>
  )
}
