import { type MappingAlgorithm } from 'antd'
import { type AliasToken } from 'antd/es/theme/internal'

export type AntdConfig<T> =
  | (Partial<T> &
      Partial<AliasToken> & {
        algorithm?: boolean | MappingAlgorithm | MappingAlgorithm[] | undefined
      })
  | undefined
