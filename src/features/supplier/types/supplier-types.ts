export interface SupplierListItem {
  id: string
  name: string
  phone?: string | null
  address?: string | null
  taxCode?: string | null
  group?: string | null
}

export interface PaginatedSupplierResponse {
  items: SupplierListItem[]
  total: number
  page: number
  limit: number
}

export interface SupplierListParams {
  page: number
  limit: number
}

export interface SupplierSearchParams extends SupplierListParams {
  keyword: string
}

export interface UpdateSupplierParams<TPayload> {
  id: string
  requestBody: TPayload
}
