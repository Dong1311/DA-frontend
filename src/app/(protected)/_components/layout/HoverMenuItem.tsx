'use client'

import { Dropdown } from 'antd'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { type ReactNode } from 'react'

import { Text } from '@/components'

interface HoverMenuItemProps {
  icon: ReactNode
  label: string
  active?: boolean
  children?: ReactNode
  href?: string
  onClick?: () => void
}

export const HoverMenuItem = ({ icon, label, active, children, href, onClick }: HoverMenuItemProps) => {
  const router = useRouter()
  const hasChildren = !!children

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (!hasChildren && href) {
      router.push(href)
    }
  }

  return (
    <Dropdown
      popupRender={() =>
        hasChildren ? <div className="mt-[-3px] w-56 rounded-lg bg-[#0070f4] p-1 text-white">{children}</div> : null
      }
      placement="bottomLeft"
      arrow={false}
      trigger={hasChildren ? ['hover'] : []}
    >
      <button
        onClick={handleClick}
        className={classNames(
          'h-[44px] flex items-center gap-2 px-5 rounded-md transition-all text-white text-sm',
          active ? 'bg-[#0070f4]' : 'hover:bg-[#005ac3]'
        )}
      >
        {icon}
        <Text className="whitespace-nowrap text-[14px] font-medium text-white">{label}</Text>
      </button>
    </Dropdown>
  )
}
