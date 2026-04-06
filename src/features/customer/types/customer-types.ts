import type { CustomerDto } from '@/api-sdk'

export type CustomerListItem = CustomerDto & {
  type?: 'INDIVIDUAL' | 'COMPANY' | null
  dob?: string | null
  gender?: 'MALE' | 'FEMALE' | null
  totalPurchase?: number | null
  netPurchase?: number | null
  netSpending?: number
}

export interface PaginatedCustomerResponse {
  items: CustomerListItem[]
  total: number
  page: number
  limit: number
}

export interface CustomerListParams {
  page: number
  limit: number
}

export interface CustomerSearchParams extends CustomerListParams {
  keyword: string
}

export interface UpdateCustomerParams<TPayload> {
  id: string
  requestBody: TPayload
}
