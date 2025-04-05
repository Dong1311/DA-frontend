import React, { type FC } from 'react'

type DropdownItemProps = {
  icon?: React.ReactNode
  label?: string
  href?: string
  className?: string
}

export const DropdownItem: FC<DropdownItemProps> = ({ icon, label, href = '#', className = '' }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 rounded-md p-1 transition-colors duration-150 hover:bg-gray-100 ${className}`}
    >
      {icon && <span>{icon}</span>}
      {label && <span className="font-normal">{label}</span>}
    </a>
  )
}
