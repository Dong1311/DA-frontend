'use client'
import { Image as AntImage, type ImageProps } from 'antd'

type Props = {
  width: number | string | undefined
} & ImageProps

export const Image = ({ width, preview = false, height, ...rest }: Props) => {
  return (
    <AntImage
      preview={preview}
      fallback={'https://gw.alipayobjects.com/zos/kitchen/QAvkgt30Ys/image_off_light.webp'}
      height={height}
      loading={'lazy'}
      width={width}
      {...rest}
    />
  )
}
