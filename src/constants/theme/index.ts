import { type ThemeConfig } from 'antd'

import { GRAY, MAIN, SECONDARY } from '../colors'
import { BREAKPOINTS } from './breakpoint'
import { components } from './components'
import { notoSans } from './font'
import { TYPOGRAPHY } from './typography'
export * from './font'

export const DEFAULT_THEME: ThemeConfig['token'] = {
  ...TYPOGRAPHY,
  ...BREAKPOINTS,
}

export const LIGHT_THEME: ThemeConfig = {
  cssVar: true,
  token: {
    ...DEFAULT_THEME,
    colorPrimary: MAIN.G1,
    green2: SECONDARY.green,
    green6: MAIN.G2,
    red5: SECONDARY.red,
    gold6: SECONDARY.orange,
    blue6: MAIN.blue,
    colorError: SECONDARY.red,
    colorTextDisabled: GRAY[300],
    fontFamily: notoSans.style.fontFamily,
    colorText: GRAY[700],
    fontSize: 14,
  },
  components,
}
