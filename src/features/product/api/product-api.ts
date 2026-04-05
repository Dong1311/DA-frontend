import {
  type CreateProductDto,
  type PaginatedProductResponseDto,
  type ProductResponseDto,
  ProductsService,
  type UpdateProductDto,
} from '@/api-sdk'

export interface ProductListParams {
  page: number
  limit: number
}

export interface ProductSearchParams extends ProductListParams {
  keyword: string
}

export interface UpdateProductParams {
  id: string
  requestBody: UpdateProductDto
}

export const productApi = {
  create: (requestBody: CreateProductDto) =>
    ProductsService.productControllerCreate({ requestBody }) as Promise<ProductResponseDto>,
  list: ({ page, limit }: ProductListParams) => ProductsService.productControllerFindAll({ page, limit }),
  search: ({ keyword, page, limit }: ProductSearchParams) => ProductsService.productControllerSearch({ keyword, page, limit }),
  update: ({ id, requestBody }: UpdateProductParams) =>
    ProductsService.productControllerUpdate({ id, requestBody }) as Promise<ProductResponseDto>,
}

export type ProductListResponse = PaginatedProductResponseDto
