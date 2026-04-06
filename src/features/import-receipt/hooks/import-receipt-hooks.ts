import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  type CreateImportReceiptDto,
  type ImportReceiptResponseDto,
  ImportReceiptsService,
  type UpdateImportReceiptDto,
} from '@/api-sdk'
import { queryKeys } from '@/features/shared/query-keys'

export const useCreateImportReceipt = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requestBody: CreateImportReceiptDto) => ImportReceiptsService.importReceiptControllerCreate({ requestBody }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.importReceipts.all })
    },
  })
}

export const useImportReceiptList = (page: number, limit: number) => {
  return useQuery({
    queryKey: queryKeys.importReceipts.list({ page, limit }),
    queryFn: () => ImportReceiptsService.importReceiptControllerFindAll({ page, limit }),
  })
}

export const useImportReceiptSearch = (keyword: string, page: number, limit: number) => {
  return useQuery({
    queryKey: queryKeys.importReceipts.search({ keyword, page, limit }),
    queryFn: () => ImportReceiptsService.importReceiptControllerSearch({ keyword, page, limit }),
    enabled: Boolean(keyword),
    staleTime: 5 * 60 * 1000,
  })
}

export const useImportReceiptDetail = (id: string | null) => {
  return useQuery<ImportReceiptResponseDto>({
    queryKey: queryKeys.importReceipts.detail(id ?? ''),
    queryFn: () => ImportReceiptsService.importReceiptControllerFindOne({ id: id ?? '' }),
    enabled: Boolean(id),
  })
}

export const useUpdateImportReceipt = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, requestBody }: { id: string; requestBody: UpdateImportReceiptDto }) =>
      ImportReceiptsService.importReceiptControllerUpdate({ id, requestBody }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.importReceipts.all })
    },
  })
}

export const useRemoveImportReceipt = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => ImportReceiptsService.importReceiptControllerRemove({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.importReceipts.all })
    },
  })
}
