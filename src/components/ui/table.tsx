'use client'

import { ConfigProvider, Table as AntdTable, type TableProps } from 'antd'
import { type ComponentToken } from 'antd/es/table/style'
import { createStyles } from 'antd-style'

import { GRAY, MAIN } from '@/constants'
import { cn } from '@/lib'
import { type AntdConfig } from '@/types'

type GenericTableProps<T> = TableProps<T> & {
  type?: 'gray' | 'default'
  token?: AntdConfig<ComponentToken>
  borderHeader?: boolean
}

const getToken = (
  type: 'gray' | 'default' | undefined = 'default',
  bordered?: boolean,
  token?: AntdConfig<ComponentToken>
): AntdConfig<ComponentToken> => ({
  cellPaddingBlock: 12,
  cellPaddingInline: 16,
  cellPaddingInlineMD: 16,
  cellPaddingBlockMD: 7.5,
  cellPaddingInlineSM: 16,
  cellPaddingBlockSM: 6,
  headerSplitColor: GRAY[300],
  headerBg: MAIN.M2,
  borderColor: bordered ? GRAY[300] : GRAY[100],
  colorBgContainer: type === 'default' ? GRAY.DEFAULT : GRAY[100],
  rowHoverBg: GRAY[100],
  rowSelectedBg: MAIN.G21,
  rowSelectedHoverBg: MAIN.M1,
  headerBorderRadius: 8,
  ...token,
})

const { Column, ColumnGroup, Summary } = AntdTable

const useStyles = createStyles(
  (
    { css, prefixCls },
    {
      bordered,
      summary,
      showHeader,
      borderHeader,
      size,
    }: {
      borderHeader?: boolean
      bordered?: boolean
      showHeader?: TableProps['showHeader']
      size: TableProps['size']
      summary?: boolean
    }
  ) => ({
    table: css`
      &.${prefixCls}-table-wrapper
        .${prefixCls}-table
        .ant-table-container
        .${prefixCls}-table-thead
        th.${prefixCls}-table-cell:not(:last-child) {
        font-size: 1rem;
        padding-top: 0.625rem;
        padding-bottom: 0.625rem;
        border-right: ${borderHeader ? `1px solid ${GRAY[500]}` : 0};
        font-weight: 700;
        &:before {
          min-height: 100%;
        }
      }

      &.${prefixCls}-table-wrapper
        .${prefixCls}-table
        .${prefixCls}-table-container
        .${prefixCls}-table-thead
        th.${prefixCls}-table-cell {
        font-weight: 500;
      }

      .${prefixCls}-table-row .${prefixCls}-table-cell {
        height: ${size === 'large' ? '2.875rem' : 'unset'};
      }
      . ${prefixCls}-table:not(. ${prefixCls}-table-bordered) > .ant-table-container {
        border-inline-start: 1px solid ${bordered ? GRAY[300] : GRAY[100]};
        border-top: 1px solid ${bordered ? GRAY[300] : GRAY[100]};
      }

      .${prefixCls}-table.${prefixCls}-table-bordered {
        box-shadow: ${bordered ? '0px 1px 2px 0px rgba(16, 24, 40, 0.05)' : 'none'};
      }

      .${prefixCls}-table-container,.${prefixCls}-table-content {
        border-radius: var(--${prefixCls}-table-header-border-radius);
      }

      tbody > tr:nth-child(1) > td:last-child {
        border-top-right-radius: ${showHeader !== false ? 0 : `var(--${prefixCls}-table-header-border-radius)`};
      }

      .${prefixCls}-table-container table tbody tr:last-child td:first-child {
        border-end-start-radius: ${summary ? 0 : ` var(--${prefixCls}-table-header-border-radius)`};
      }

      .${prefixCls}-table-container table tbody tr:last-child td:last-child {
        border-end-end-radius: ${summary ? 0 : ` var(--${prefixCls}-table-header-border-radius)`};
      }

      .${prefixCls}-table-container table tfoot tr:last-child td:first-child {
        border-end-start-radius: var(--${prefixCls}-table-header-border-radius);
      }

      .${prefixCls}-table-container table tfoot tr:last-child td:last-child {
        border-end-end-radius: var(--${prefixCls}-table-header-border-radius);
      }
    `,
  })
)

export const Table = <T,>({ size = 'large', borderHeader, ...props }: GenericTableProps<T>) => {
  const { styles } = useStyles({
    bordered: props.bordered,
    showHeader: props.showHeader,
    size,
    summary: !!props.summary,
    borderHeader,
  })

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: getToken(props.type, props.bordered, props?.token),
          },
        }}
      >
        <AntdTable<T>
          {...props}
          className={cn(styles.table, props.className)}
          size={size}
          pagination={
            props?.pagination
              ? {
                  ...(props?.pagination ?? {}),
                  showSizeChanger: false,
                }
              : false
          }
        />
      </ConfigProvider>
    </>
  )
}

Table.displayName = 'Table'

export { Column, ColumnGroup, Summary }
