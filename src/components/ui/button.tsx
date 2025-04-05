'use client'

import { Button as AntdButton, type ButtonProps as AntdButtonProps, ConfigProvider } from 'antd'
import { type ComponentToken } from 'antd/es/button/style'
import { createStyles } from 'antd-style'
import { forwardRef } from 'react'

import { GRAY, MAIN } from '@/constants'
import { cn } from '@/lib'
import { type AntdConfig } from '@/types'

type ButtonType = Exclude<AntdButtonProps['type'], 'dashed' | 'link'> | 'secondary'

export type ButtonProps = Omit<AntdButtonProps, 'type'> & {
  type?: ButtonType
}

//default type === outline type

const useStyles = createStyles(({ css, prefixCls }) => ({
  button: css`
    font-weight: 700;

    &.${prefixCls}-btn-sm {
      font-weight: 600;
    }

    &.${prefixCls}-btn-lg {
      font-weight: 700;
    }
  `,

  primary: css`
    border: 0;
  `,
}))

const ButtonTypeToken: Partial<Record<Exclude<ButtonType, undefined>, AntdConfig<ComponentToken>>> = {
  secondary: {
    defaultBg: GRAY[100],
    defaultColor: MAIN.G1,
    defaultBorderColor: GRAY[100],
    defaultActiveBg: GRAY[100],
    defaultActiveColor: MAIN.G3,
    defaultActiveBorderColor: GRAY[100],
    defaultHoverBorderColor: GRAY[100],
    defaultHoverColor: MAIN.G2,
  },
  default: {
    defaultBg: MAIN.white,
    defaultColor: GRAY[500],
    defaultBorderColor: GRAY[300],
    defaultActiveBg: MAIN.G1,
    defaultActiveColor: MAIN.white,
    defaultActiveBorderColor: MAIN.G1,
    defaultHoverBorderColor: MAIN.G1,
    defaultHoverColor: MAIN.G1,
  },
  primary: {
    primaryShadow: 'none',
    colorPrimaryBg: MAIN.G1,
    colorPrimaryActive: MAIN.G3,
    colorPrimaryHover: MAIN.G2,
    primaryColor: MAIN.white,
  },
  text: {
    textTextColor: MAIN.G1,
    textTextHoverColor: MAIN.G2,
    textHoverBg: 'none',
    textTextActiveColor: MAIN.G3,
    colorBgTextActive: 'none',
    colorTextDisabled: GRAY[300],
    contentFontSize: 14,
    contentLineHeight: 21,
    fontWeight: 500,
  },
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ type = 'default', ...props }, ref) => {
  const { styles } = useStyles({
    type: type ?? 'default',
    danger: props.danger,
    ghost: props.ghost,
  })

  const token: AntdConfig<ComponentToken> = {
    colorBgContainerDisabled: GRAY[100],
    colorFillTertiary: GRAY[100],
    colorTextTertiary: GRAY[100],
    colorTextDisabled: GRAY[300],
    borderColorDisabled: GRAY[300],
    borderRadius: 8,
    contentFontSize: 16,
    contentLineHeight: 24 / 16,
    contentFontSizeLG: 18,
    contentLineHeightLG: 27 / 18,
    contentFontSizeSM: 14,
    contentLineHeightSM: 21 / 14,
    dangerShadow: 'none',
    ...ButtonTypeToken[type],
    defaultShadow: 'none',
    controlHeightSM: 40,
    controlHeight: 44,
    controlHeightLG: 47,
    borderRadiusSM: 8,
    marginXS: 4,
    paddingInlineSM: 15,
  }

  return (
    <ConfigProvider
      wave={{ disabled: true }}
      theme={{
        components: {
          Button: token,
        },
      }}
    >
      <AntdButton
        ref={ref}
        {...props}
        {...(type === 'secondary' ? { variant: 'filled' } : { type })}
        className={cn(styles.button, type === 'primary' ? styles.primary : {}, props.className)}
      />
    </ConfigProvider>
  )
})

Button.displayName = 'Button'
