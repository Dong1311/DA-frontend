import classNames from 'classnames'
import { type ReactNode } from 'react'

interface MenuItemProps {
  icon: ReactNode
  label: string
  active?: boolean
}

export const MenuItem = ({ icon, label, active }: MenuItemProps) => {
  return (
    <button
      className={classNames(
        'w-[135px] h-[44px] flex items-center justify-center gap-2 rounded-md transition-all text-white text-sm',
        active ? 'bg-[#005fcc]' : 'hover:bg-[#006be6]'
      )}
    >
      {icon}
      <span className="whitespace-nowrap">{label}</span>
    </button>
  )
}
