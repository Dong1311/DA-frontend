export const round = (number: number, decimals: number) => {
  const factor = Math.pow(10, decimals)
  return Math.round(number * factor) / factor
}

export const roundDown = (number: number, decimals: number) => {
  const factor = Math.pow(10, decimals)
  return Math.floor(number * factor) / factor
}

export const roundUp = (number: number, decimals: number) => {
  const factor = Math.pow(10, decimals)
  return Math.ceil(number * factor) / factor
}

export const formatPrice = (value: number) => `${new Intl.NumberFormat('ja-JP').format(+value)}`
