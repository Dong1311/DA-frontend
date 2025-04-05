import { type ComponentToken } from 'antd/es/radio/style'

import { GRAY } from '@/constants/colors'
import { type AntdConfig } from '@/types'

export const Radio: AntdConfig<ComponentToken> = {
  radioSize: 20,
  dotSize: 11.67,
  colorBorder: GRAY[300],
  colorTextDisabled: GRAY[300],
}
