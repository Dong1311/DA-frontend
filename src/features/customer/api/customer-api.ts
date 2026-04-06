import type { CreateCustomerDto, CustomerDto, UpdateCustomerDto } from '@/api-sdk'
import { CustomersService } from '@/api-sdk'

import type {
  CustomerListParams,
  CustomerSearchParams,
  PaginatedCustomerResponse,
  UpdateCustomerParams,
} from '../types/customer-types'

export const customerApi = {
  create: (requestBody: CreateCustomerDto): Promise<CustomerDto> =>
    CustomersService.customerControllerCreate({ requestBody }) as Promise<CustomerDto>,
  list: ({ page, limit }: CustomerListParams): Promise<PaginatedCustomerResponse> =>
    CustomersService.customerControllerFindAll({ page, limit }) as Promise<PaginatedCustomerResponse>,
  search: ({ keyword, page, limit }: CustomerSearchParams): Promise<PaginatedCustomerResponse> =>
    CustomersService.customerControllerSearch({ keyword, page, limit }) as Promise<PaginatedCustomerResponse>,
  update: <TPayload>({ id, requestBody }: UpdateCustomerParams<TPayload>): Promise<CustomerDto> =>
    CustomersService.customerControllerUpdate({
      id,
      requestBody: requestBody as UpdateCustomerDto,
    }) as Promise<CustomerDto>,
}
