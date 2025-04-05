import { type ComponentToken } from 'antd/es/pagination/style'

import { GRAY, MAIN } from '@/constants/colors'
import { type AntdConfig } from '@/types'

export const Pagination: AntdConfig<ComponentToken> = {
  borderRadius: 30,
  itemActiveBg: MAIN.G1,
  colorPrimary: MAIN.white,
  colorText: GRAY[500],
  fontWeightStrong: 500,
  colorBgTextHover: GRAY[300],
}
