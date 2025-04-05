'use client'

import { type CheckboxRef, ConfigProvider, Flex, Switch as AntdSwitch, type SwitchProps as AntdSwitchProps } from 'antd'
import { type ComponentToken } from 'antd/es/switch/style'
import { createStyles } from 'antd-style'
import { forwardRef } from 'react'

import { GRAY, MAIN } from '@/constants'
import { cn } from '@/lib'
import { type AntdConfig } from '@/types'

import { Label } from './label'

type SwitchProps = Omit<AntdSwitchProps, 'ref'> & {
  label?: string
}

const token: AntdConfig<ComponentToken> = {
  handleSize: 12,
  trackHeight: 16,
  trackMinWidth: 28,
  innerMaxMargin: 20,
  innerMinMargin: 8,
  colorPrimaryBorder: MAIN['G22'],
  colorPrimaryHover: MAIN['G2'],
}

const useStyles = createStyles(({ css, prefixCls }) => ({
  switch: css`
    &:hover {
      &:not(.${prefixCls}-switch-checked):not(.${prefixCls}-switch-disabled) {
        background: ${GRAY[300]};
        outline: solid 1px ${MAIN['G2']};
        transition: background var(--ant-motion-duration-mid);
      }
    }

    .${prefixCls}-switch-disabled {
      background: ${GRAY[250]};
    }
    :disabled {
      background: ${GRAY[250]};
      &.${prefixCls}-switch-checked {
        background: ${GRAY[250]};
      }
    }
  `,
}))

export const Switch = forwardRef<CheckboxRef, SwitchProps>(({ label, disabled, ...props }, _ref) => {
  const { cx, styles } = useStyles()
  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: token,
        },
      }}
    >
      <Flex gap={8} align="center">
        <AntdSwitch disabled={disabled} {...props} className={cx(styles.switch)} />
        {label ? (
          <Label className={cn('font-normal', disabled ? 'text-gray-400' : 'text-gray-700')}>{label}</Label>
        ) : null}
      </Flex>
    </ConfigProvider>
  )
})

Switch.displayName = 'Switch'
