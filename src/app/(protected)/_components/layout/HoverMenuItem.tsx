import { Dropdown } from 'antd'
import classNames from 'classnames'
import { type ReactNode } from 'react'

import { Text } from '@/components'

interface HoverMenuItemProps {
  icon: ReactNode
  label: string
  active?: boolean
  children?: ReactNode
}

export const HoverMenuItem = ({ icon, label, active, children }: HoverMenuItemProps) => {
  const hasChildren = !!children

  return (
    <Dropdown
      dropdownRender={() =>
        hasChildren ? <div className="mt-[-4px] w-56 rounded-lg bg-[#0070f4] text-white">{children}</div> : null
      }
      placement="bottomLeft"
      arrow={false}
      trigger={hasChildren ? ['hover'] : []}
    >
      <button
        className={classNames(
          'h-[44px] flex items-center gap-2 px-5 rounded-md text-white text-sm',
          active ? 'bg-[#0070f4]' : 'hover:bg-[#005ac3]'
        )}
      >
        {icon}
        <Text className="whitespace-nowrap text-[14px] font-medium text-white">{label}</Text>
      </button>
    </Dropdown>
  )
}
