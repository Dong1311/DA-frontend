import { type ThemeConfig } from 'antd'

import { GRAY } from '../colors'
export const TYPOGRAPHY: ThemeConfig['token'] = {
  fontSizeHeading5: 16,
  lineHeightHeading5: 1.5,
  fontSizeHeading4: 18,
  lineHeightHeading4: 27 / 18,
  fontSizeHeading3: 20,
  lineHeightHeading3: 1.5,
  fontSizeHeading2: 24,
  lineHeightHeading2: 1.5,
  fontSizeHeading1: 30,
  lineHeightHeading1: 1.25,
  colorText: GRAY[700],
  lineHeight: 1.5,
}
