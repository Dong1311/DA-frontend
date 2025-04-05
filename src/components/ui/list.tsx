'use client'

import { List as AntdList, type ListProps } from 'antd'
import { createStyles } from 'antd-style'

import { GRAY, REM } from '@/constants'
import { cn } from '@/lib'

const pxToRem = (px: number) => `${px / REM}rem`

const useStyles = createStyles(({ css, prefixCls }) => ({
  list: css`
    .${prefixCls}-list-item {
      border-block-end-color: ${GRAY[100]};
      padding-left: 1rem;
      padding-right: 1rem;
      :hover {
        background: ${GRAY[100]};
      }
    }
    .${prefixCls}-list-header {
      min-height: ${pxToRem(44)};
      padding-top: ${pxToRem(10)};
      padding-bottom: ${pxToRem(10)};
      padding-inline-end: 1rem;
      padding-inline-start: 1rem;
      border-top-left-radius: ${pxToRem(8)};
      border-top-right-radius: ${pxToRem(8)};
    }
  `,
}))

export const List = <T,>(props: ListProps<T>) => {
  const { styles } = useStyles()
  return <AntdList {...props} bordered className={cn(styles.list, props.className)} />
}

List.displayName = 'List'

export const ListItem = AntdList.Item
