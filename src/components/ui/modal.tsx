'use client'

import { ConfigProvider, Modal as AntdModal, type ModalProps } from 'antd'
import { type ComponentToken } from 'antd/es/modal/style'
import { createStyles } from 'antd-style'

import { REM } from '@/constants'
import { cn } from '@/lib'
import { type AntdConfig } from '@/types'

const token: AntdConfig<ComponentToken> = {}
const pxToRem = (px: number) => `${px / REM}rem`

const useStyles = createStyles(({ css, prefixCls }) => ({
  modal: css`
    .${prefixCls}-modal-close {
      top: ${pxToRem(24)};
      width: ${pxToRem(40)};
      height: ${pxToRem(40)};
      right: ${pxToRem(24)};
    }
  `,
}))

export const Modal = (props: ModalProps) => {
  const { styles } = useStyles()
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: token,
        },
      }}
    >
      <AntdModal
        styles={{
          content: {
            padding: pxToRem(24),
          },
          header: {
            marginBottom: 16,
          },
        }}
        {...props}
        className={cn(styles.modal, props.style)}
      />
    </ConfigProvider>
  )
}

Modal.displayName = 'Modal'
