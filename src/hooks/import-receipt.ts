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

export const useImportReceiptList = () => {
  return useQuery<ImportReceiptResponseDto[]>({
    queryKey: ['importReceipts'],
    queryFn: () => ImportReceiptsService.importReceiptControllerFindAll(),
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

export const useImportReceiptSearch = (keyword: string) => {
  return useQuery<ImportReceiptResponseDto[]>({
    queryKey: ['importReceipts', 'search', keyword],
    queryFn: () => ImportReceiptsService.importReceiptControllerSearch({ keyword }),
    enabled: keyword.length > 0,
    staleTime: 5 * 60 * 1000,
  })
}