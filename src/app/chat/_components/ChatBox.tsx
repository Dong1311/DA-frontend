'use client'

import { useEffect, useRef, useState } from 'react'

interface ChatMessage {
  sender: 'user' | 'assistant'
  content: string
}

interface ChatBoxProps {
  messages: ChatMessage[]
  sendMessage: (content: string) => void
}

export const ChatBox: React.FC<ChatBoxProps> = ({ messages, sendMessage }) => {
  const [input, setInput] = useState('')
  const chatRef = useRef<HTMLDivElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const MAX_LENGTH = 500

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input)
      setInput('')
      setIsLoading(true)
    }
  }
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1]
      if (lastMsg.sender === 'assistant') {
        setIsLoading(false)
      }
    }
  }, [messages])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="mx-auto max-w-2xl space-y-4 rounded border bg-white p-4 shadow">
      <div ref={chatRef} className="h-[400px] space-y-2 overflow-y-auto rounded border bg-gray-50 p-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] whitespace-pre-line rounded p-2 ${
              msg.sender === 'assistant' ? 'bg-gray-200 text-left' : 'ml-auto bg-blue-500 text-right text-white'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="text"
          value={input}
          maxLength={MAX_LENGTH}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 rounded border px-3 py-2 pr-16"
          placeholder="Nhập triệu chứng của bạn..."
          disabled={isLoading}
        />
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none text-sm text-gray-400">
          {input.length}/{MAX_LENGTH}
        </div>
      </div>

      <button
        onClick={handleSend}
        className="rounded bg-blue-600 px-4 py-2 text-white"
        disabled={!input.trim() || isLoading}
      >
        Gửi
      </button>

      {isLoading && <div className="mt-2 text-sm italic text-gray-500">Trợ lý đang trả lời...</div>}
    </div>
  )
}
