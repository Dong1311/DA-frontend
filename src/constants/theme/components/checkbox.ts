import { type ComponentToken } from 'antd/es/radio/style'

import { GRAY, MAIN } from '@/constants/colors'
import { type AntdConfig } from '@/types'

export const Checkbox: AntdConfig<ComponentToken> = {
  controlInteractiveSize: 20,
  colorBorder: GRAY[300],
  colorBgContainerDisabled: GRAY.DEFAULT,
  colorPrimaryHover: MAIN.G1,
}
