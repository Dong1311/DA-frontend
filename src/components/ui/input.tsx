'use client'

import { CloseCircleOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import {
  ConfigProvider,
  Flex,
  Input as AntdInput,
  InputNumber as AntdInputNumber,
  type InputNumberProps as AntdInputNumberProps,
  type InputProps,
  type InputRef,
} from 'antd'
import { type TextAreaProps } from 'antd/es/input'
import { type ComponentToken } from 'antd/es/input/style'
import { createStyles, cx } from 'antd-style'
import Color from 'color'
import { forwardRef, type ReactNode } from 'react'

import { ERROR, GRAY, MAIN, SECONDARY } from '@/constants'
import { cn } from '@/lib'
import { type AntdConfig } from '@/types'

const suffixRender = (suffix: ReactNode) => (
  <Flex gap={14}>
    <Flex className="text-typo">{suffix}</Flex>
  </Flex>
)

const allowClearRender = (allowClear: InputProps['allowClear']) => {
  return allowClear
    ? {
        clearIcon: <CloseCircleOutlined style={{ fontSize: 17.5, color: GRAY[700] }} />,
      }
    : false
}
const useInputStyles = createStyles(({ css, prefixCls }, props: { align?: 'start' | 'end' | 'center' }) => ({
  input: css`
    box-shadow: 0px 1px 2px 0px ${Color(GRAY[700]).alpha(0.05).toString()};
    ::placeholder {
      color: ${GRAY[500]};
      opacity: 1;
    }

    ::-ms-input-placeholder {
      color: ${GRAY[500]};
    }

    .${prefixCls}-input-suffix .${prefixCls}-input-clear-icon.${prefixCls}-input-clear-icon-has-suffix {
      margin: 0;
    }

    input {
      text-align: ${props?.align ?? 'start'}!important;
      padding-bottom:;
    }
  `,
}))

const token: AntdConfig<ComponentToken> = {
  controlHeightSM: 36,
  controlHeight: 40,
  controlHeightLG: 44,
  colorBorder: GRAY[300],
  paddingInline: 14,
  paddingInlineLG: 14,
  paddingInlineSM: 14,
  borderRadius: 8,
  borderRadiusSM: 8,
  borderRadiusLG: 8,
  hoverBorderColor: MAIN.G2,
  activeBorderColor: MAIN.G2,
  activeShadow: `0px 0px 0px 4px ${Color(MAIN.G2).alpha(0.1).toString()}`,
  colorErrorBorder: SECONDARY.red,
  colorErrorBorderHover: SECONDARY.red,
  errorActiveShadow: `0px 0px 0px 4px ${ERROR.light}`,
  fontSizeSM: 14,
  lineHeightSM: 21 / 14,
  fontSize: 14,
  lineHeight: 21 / 14,
  fontSizeLG: 14,
  lineHeightLG: 21 / 14,
}

export const Input = forwardRef<InputRef, InputProps>(({ size = 'middle', ...props }, ref) => {
  const { cx, styles } = useInputStyles()
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: token,
        },
      }}
    >
      <AntdInput
        {...props}
        allowClear={
          props.allowClear
            ? {
                clearIcon: <CloseCircleOutlined style={{ fontSize: 17.5, color: GRAY[700] }} />,
              }
            : false
        }
        size={size}
        ref={ref}
        className={cx(styles.input, props.className)}
        suffix={suffixRender(props?.suffix)}
      />
    </ConfigProvider>
  )
})

const useTextAreaStyles = createStyles(({ css }) => ({
  textarea: css`
    resize: none !important;

    ::placeholder {
      color: ${GRAY[500]};
      opacity: 1;
    }

    ::-ms-input-placeholder {
      color: ${GRAY[500]};
    }
  `,
}))

Input.displayName = 'Input'

export const Textarea = forwardRef<InputRef, TextAreaProps>(({ size = 'middle', ...props }, ref) => {
  const { styles } = useTextAreaStyles()
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            ...token,
            paddingInline: 16,
            paddingInlineLG: 16,
            paddingBlock: 8,
            paddingBlockSM: 8,
            paddingBlockLG: 8,
            inputFontSize: 14,
            lineHeight: 21 / 14,
            colorBgContainerDisabled: GRAY.DEFAULT,
          },
        },
      }}
    >
      <AntdInput.TextArea
        {...props}
        size={size}
        ref={ref}
        autoSize={false}
        style={{
          ...(props.style ?? {}),
          resize: 'none',
        }}
        className={cn(styles.textarea, props.className)}
      />
    </ConfigProvider>
  )
})

const iconRender = (visible: boolean) =>
  visible ? (
    <EyeOutlined
      style={{
        color: GRAY[700],
      }}
    />
  ) : (
    <EyeInvisibleOutlined
      style={{
        color: GRAY[700],
      }}
    />
  )

Textarea.displayName = 'Textarea'

export const InputPassword = forwardRef<InputRef, InputProps>(({ size = 'middle', ...props }, ref) => {
  const { styles } = useInputStyles()
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: token,
        },
      }}
    >
      <AntdInput.Password
        {...props}
        iconRender={iconRender}
        allowClear={allowClearRender(props.allowClear)}
        size={size}
        ref={ref}
        className={cn(styles.input, props.className)}
        suffix={suffixRender(props?.suffix)}
      />
    </ConfigProvider>
  )
})

InputPassword.displayName = 'InputPassword'

const InputNumber = forwardRef<
  HTMLInputElement,
  AntdInputNumberProps & {
    isNotFormat?: boolean
    align?: 'start' | 'end' | 'center'
  }
>(({ align, isNotFormat, ...props }, ref) => {
  const { styles } = useInputStyles({
    align,
  })

  return (
    <ConfigProvider
      theme={{
        components: {
          InputNumber: token,
        },
      }}
    >
      <AntdInputNumber
        ref={ref as any}
        {...props}
        className={cx(styles.input, props.className)}
        formatter={(value) => (isNotFormat ? `${value}` : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','))}
        parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
        min={props.min ?? 0}
        onChange={(value) => {
          props?.onChange?.(value ? Math.floor(Number(value)) : null)
        }}
      />
    </ConfigProvider>
  )
})
InputNumber.displayName = 'InputNumber'

export { InputNumber }
