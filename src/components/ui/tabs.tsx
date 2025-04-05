'use client'

import { ConfigProvider, Tabs as AntdTabs, type TabsProps } from 'antd'
import { type ComponentToken } from 'antd/es/tabs/style'
import { createStyles } from 'antd-style'

import { GRAY, MAIN } from '@/constants'
import { cn } from '@/lib'
import { type AntdConfig } from '@/types'

const token: AntdConfig<ComponentToken> = {
  colorBorderSecondary: GRAY[300],
  itemHoverColor: MAIN.G2,
  itemColor: GRAY[700],
  titleFontSize: 16,
  lineHeight: 1.5,
  horizontalItemPadding: '10px 58.5px',
  horizontalItemGutter: 0,
  lineWidthBold: 3,
}

const useStyles = createStyles(({ css, prefixCls }) => ({
  tabs: css`
    .${prefixCls}-tabs-tab:not(.${prefixCls}-tabs-tab-active) {
      border-bottom: 3px solid ${GRAY[300]};
    }
  `,
}))

export const Tabs = (props: TabsProps) => {
  const { styles } = useStyles()
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: token,
        },
      }}
    >
      <AntdTabs {...props} className={cn(styles.tabs, props.className)} />
    </ConfigProvider>
  )
}

Tabs.displayName = 'Tabs'
