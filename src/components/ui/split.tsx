'use client'

import type { HTMLAttributes } from 'react'
import { forwardRef } from 'react'

export const Split = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className = '', ...props }, ref) => {
  return <div ref={ref} className={`m-0 h-px w-full border-t border-gray-300 p-0 opacity-60 ${className}`} {...props} />
})

Split.displayName = 'Split'
