import { type CreateReturnDto, type PaginatedReturnResponseDto, type ReturnResponseDto, ReturnsService } from '@/api-sdk'

export interface ReturnListParams {
  page: number
  limit: number
}

export interface ReturnSearchParams extends ReturnListParams {
  keyword: string
}

export const returnApi = {
  create: (requestBody: CreateReturnDto): Promise<ReturnResponseDto> =>
    ReturnsService.returnControllerCreateReturn({ requestBody }),
  list: ({ page, limit }: ReturnListParams): Promise<PaginatedReturnResponseDto> =>
    ReturnsService.returnControllerFindAll({ page, limit }),
  search: ({ keyword, page, limit }: ReturnSearchParams): Promise<PaginatedReturnResponseDto> =>
    ReturnsService.returnControllerSearch({ keyword, page, limit }),
  byId: (id: string): Promise<ReturnResponseDto> => ReturnsService.returnControllerGetById({ id }),
}
