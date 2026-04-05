import {
  type CreateImportReceiptDto,
  type ImportReceiptResponseDto,
  ImportReceiptsService,
  type UpdateImportReceiptDto,
} from '@/api-sdk'

export interface ImportReceiptSupplierSummary {
  name: string
}

export type ImportReceiptListItem = ImportReceiptResponseDto & {
  supplier?: ImportReceiptSupplierSummary | null
}

export interface PaginatedImportReceiptResponse {
  items: ImportReceiptListItem[]
  total: number
  page: number
  limit: number
}

export interface ImportReceiptListParams {
  page: number
  limit: number
}

export interface ImportReceiptSearchParams extends ImportReceiptListParams {
  keyword: string
}

export interface UpdateImportReceiptParams {
  id: string
  requestBody: UpdateImportReceiptDto
}

export const importReceiptApi = {
  create: (requestBody: CreateImportReceiptDto): Promise<ImportReceiptResponseDto> =>
    ImportReceiptsService.importReceiptControllerCreate({ requestBody }) as Promise<ImportReceiptResponseDto>,
  list: ({ page, limit }: ImportReceiptListParams): Promise<PaginatedImportReceiptResponse> =>
    ImportReceiptsService.importReceiptControllerFindAll({ page, limit }) as Promise<PaginatedImportReceiptResponse>,
  search: ({ keyword, page, limit }: ImportReceiptSearchParams): Promise<PaginatedImportReceiptResponse> =>
    ImportReceiptsService.importReceiptControllerSearch({ keyword, page, limit }) as Promise<PaginatedImportReceiptResponse>,
  detail: (id: string): Promise<ImportReceiptResponseDto> => ImportReceiptsService.importReceiptControllerFindOne({ id }),
  update: ({ id, requestBody }: UpdateImportReceiptParams): Promise<ImportReceiptResponseDto> =>
    ImportReceiptsService.importReceiptControllerUpdate({ id, requestBody }) as Promise<ImportReceiptResponseDto>,
  remove: (id: string): Promise<unknown> => ImportReceiptsService.importReceiptControllerRemove({ id }),
}
