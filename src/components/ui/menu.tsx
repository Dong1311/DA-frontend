'use client'

import { ConfigProvider, Menu as AntdMenu, type MenuProps, type MenuRef } from 'antd'
import { type ComponentToken } from 'antd/es/menu/style'
import { createStyles } from 'antd-style'
import { forwardRef } from 'react'

import { GRAY, MAIN } from '@/constants'
import { cn } from '@/lib'
import { type AntdConfig } from '@/types'

const token: AntdConfig<ComponentToken> = {
  itemColor: GRAY['700'],
  itemBg: GRAY['100'],
  itemHoverColor: MAIN['G1'],
  itemHoverBg: 'transparent',
  groupTitleColor: GRAY['700'],
  itemSelectedBg: MAIN['G1'],
  itemSelectedColor: MAIN['white'],
  itemDisabledColor: GRAY['300'],
  itemActiveBg: 'transparent',
  iconSize: 20,
  itemMarginInline: 16,
  subMenuItemBg: GRAY['250'],
  itemMarginBlock: 16,
  iconMarginInlineEnd: 8,
}

const useStyles = createStyles(({ css, prefixCls }) => ({
  menu: css`
    .${prefixCls}-menu-submenu.${prefixCls}-menu-submenu-inline > ul > li.${prefixCls}-menu-item {
      padding-left: 2.75rem !important;
      margin-top: 0;
      margin-bottom: 0;
    }
    .${prefixCls}-menu-submenu.${prefixCls}-menu-submenu-inline > ul > li > ul > li.${prefixCls}-menu-item {
      padding-left: 4.5rem !important;
    }
    .${prefixCls}-menu-title-content {
      font-weight: 500;
    }
  `,
}))

export const Menu = forwardRef<MenuRef, MenuProps>(({ ...props }, ref) => {
  const { styles } = useStyles()
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: token,
        },
      }}
    >
      <AntdMenu ref={ref} {...props} inlineIndent={16} className={cn(props.className, styles.menu)} />
    </ConfigProvider>
  )
})

Menu.displayName = 'Menu'
