import type { CreateSupplierDto, UpdateSupplierDto } from '@/api-sdk'
import { SuppliersService } from '@/api-sdk'

import type {
  PaginatedSupplierResponse,
  SupplierListParams,
  SupplierSearchParams,
  UpdateSupplierParams,
} from '../types/supplier-types'

export const supplierApi = {
  create: (requestBody: CreateSupplierDto): Promise<unknown> =>
    SuppliersService.supplierControllerCreate({ requestBody }),
  list: ({ page, limit }: SupplierListParams): Promise<PaginatedSupplierResponse> =>
    SuppliersService.supplierControllerFindAll({ page, limit }) as Promise<PaginatedSupplierResponse>,
  search: ({ keyword, page, limit }: SupplierSearchParams): Promise<PaginatedSupplierResponse> =>
    SuppliersService.supplierControllerSearch({ keyword, page, limit }) as Promise<PaginatedSupplierResponse>,
  update: <TPayload>({ id, requestBody }: UpdateSupplierParams<TPayload>): Promise<unknown> =>
    SuppliersService.supplierControllerUpdate({
      id,
      requestBody: requestBody as UpdateSupplierDto,
    }),
}
