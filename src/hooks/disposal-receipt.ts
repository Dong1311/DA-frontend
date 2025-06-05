import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  type CreateDisposalReceiptDto,
  DisposalReceiptsService,
  type UpdateDisposalReceiptDto,
} from '@/api-sdk'

interface DisposalReceiptSearchParams {
  keyword?: string
  fromDate?: string
  toDate?: string
  page: number
  limit: number
}

export const useDisposalReceiptList = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['disposal-receipts', page, limit],
    queryFn: () =>
      DisposalReceiptsService.disposalReceiptControllerFindAll({
        page,
        limit,
      }),
  })
}

export const useDisposalReceiptById = (id: string) => {
  return useQuery({
    queryKey: ['disposal-receipts', id],
    queryFn: () => DisposalReceiptsService.disposalReceiptControllerFindOne({ id }),
    enabled: !!id,
  })
}

export const useDisposalReceiptSearch = ({
  keyword = '',
  fromDate,
  toDate,
  page,
  limit,
}: DisposalReceiptSearchParams) => {
  return useQuery({
    queryKey: ['disposal-receipts', 'search', keyword, fromDate, toDate, page, limit],
    queryFn: () =>
      DisposalReceiptsService.disposalReceiptControllerSearch({
        keyword,
        fromDate,
        toDate,
        page,
        limit,
      }),
    enabled: !!keyword || !!fromDate || !!toDate,
  })
}

export const useCreateDisposalReceipt = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateDisposalReceiptDto) =>
      DisposalReceiptsService.disposalReceiptControllerCreate({ requestBody: payload }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disposal-receipts'] })
    },
  })
}

export const useUpdateDisposalReceipt = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateDisposalReceiptDto }) =>
      DisposalReceiptsService.disposalReceiptControllerUpdate({ id, requestBody: payload }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disposal-receipts'] })
    },
  })
}
