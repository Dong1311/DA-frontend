'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/lib/queryClient'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen items-center justify-center bg-gray-50">{children}</div>
    </QueryClientProvider>
  )
}
