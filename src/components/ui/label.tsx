'use client'

import { forwardRef, type LabelHTMLAttributes } from 'react'

import { cn } from '@/lib'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, children, required = false, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        'font-medium',
        {
          "before:content-['*'] before:inline-block before:me-1 before:text-error text-sm leading-1 ": required,
        },
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
})

Label.displayName = 'Label'

export { Label }
