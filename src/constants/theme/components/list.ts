import { type ComponentToken } from 'antd/es/list/style'

import { GRAY, MAIN, REM } from '@/constants'
import { type AntdConfig } from '@/types'

const pxToRem = (px: number) => `${px / REM}rem`

export const List: AntdConfig<ComponentToken> = {
  itemPadding: `${pxToRem(7.5)} 1rem`,
  itemPaddingLG: `${pxToRem(10.5)} 1rem`,
  colorSplit: GRAY[100],
  fontSize: 16,
  lineHeight: 1.5,
  headerBg: MAIN.M2,
  colorBorder: GRAY[100],
  borderRadius: 8,
  borderRadiusLG: 8,
}
