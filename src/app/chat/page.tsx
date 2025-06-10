'use client'

import { GuestChatBox } from './_components/GuestChatBox'

export default function GuestChatPage() {
  return (
    <div className="p-4">
      <h1 className="mb-2 text-lg font-semibold">Chat với nhà thuốc</h1>
      <GuestChatBox />
    </div>
  )
}
