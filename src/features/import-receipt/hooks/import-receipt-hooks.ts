import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { type CreateImportReceiptDto, type ImportReceiptResponseDto, type UpdateImportReceiptDto } from '@/api-sdk'
import { queryKeys } from '@/features/shared/query-keys'

import { importReceiptApi } from '../api/import-receipt-api'

export const useCreateImportReceipt = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateImportReceiptDto) => importReceiptApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.importReceipts.all })
    },
  })
}

export const useImportReceiptList = (page: number, limit: number) => {
  return useQuery({
    queryKey: queryKeys.importReceipts.list({ page, limit }),
    queryFn: () => importReceiptApi.list({ page, limit }),
  })
}

export const useImportReceiptSearch = (keyword: string, page: number, limit: number) => {
  return useQuery({
    queryKey: queryKeys.importReceipts.search({ keyword, page, limit }),
    queryFn: () => importReceiptApi.search({ keyword, page, limit }),
    enabled: Boolean(keyword),
    staleTime: 5 * 60 * 1000,
  })
}

export const useImportReceiptDetail = (id: string | null) => {
  return useQuery<ImportReceiptResponseDto>({
    queryKey: queryKeys.importReceipts.detail(id ?? ''),
    queryFn: () => importReceiptApi.detail(id ?? ''),
    enabled: Boolean(id),
  })
}

export const useUpdateImportReceipt = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { id: string; requestBody: UpdateImportReceiptDto }) => importReceiptApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.importReceipts.all })
    },
  })
}

export const useRemoveImportReceipt = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => importReceiptApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.importReceipts.all })
    },
  })
}
