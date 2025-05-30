import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query'

import {
  type CreateImportReceiptDto,
  type ImportReceiptResponseDto,
  ImportReceiptsService,
  type UpdateImportReceiptDto,
} from '@/api-sdk'

export const useCreateImportReceipt = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateImportReceiptDto) =>
      ImportReceiptsService.importReceiptControllerCreate({ requestBody: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['importReceipts'] })
    },
  })
}

export const useImportReceiptList = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['importReceipts', page],
    queryFn: () => ImportReceiptsService.importReceiptControllerFindAll({ page, limit }),
  })
}

export const useImportReceiptSearch = (keyword: string, page: number, limit: number) => {
  return useQuery({
    queryKey: ['importReceipts', 'search', keyword, page],
    queryFn: () => ImportReceiptsService.importReceiptControllerSearch({ keyword, page, limit }),
    enabled: !!keyword,
    staleTime: 5 * 60 * 1000,
  })
}


export const useImportReceiptDetail = (id: string) => {
  return useQuery<ImportReceiptResponseDto>({
    queryKey: ['importReceipts', id],
    queryFn: () => ImportReceiptsService.importReceiptControllerFindOne({ id }),
    enabled: !!id,
  })
}

export const useUpdateImportReceipt = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { id: string; requestBody: UpdateImportReceiptDto }) =>
      ImportReceiptsService.importReceiptControllerUpdate({
        id: data.id,
        requestBody: data.requestBody,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['importReceipts'] })
    },
  })
}

export const useRemoveImportReceipt = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => ImportReceiptsService.importReceiptControllerRemove({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['importReceipts'] })
    },
  })
}

