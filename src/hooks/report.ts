import { useQuery } from '@tanstack/react-query'

import { ReportService } from '@/api-sdk'

interface ReportParams {
  date: string
  page: number
  limit: number
}

export const useReportDailyList = ({ date, page, limit }: ReportParams) => {
  return useQuery({
    queryKey: ['report', date, page, limit],
    queryFn: () =>
      ReportService.reportControllerGetReport({
        date,
        page,
        limit,
      }),
    enabled: !!date,
  })
}

interface WeeklyRevenueParams {
  weekStart?: string
}

export const useWeeklyRevenue = ({ weekStart }: WeeklyRevenueParams) => {
  const isValid = !!weekStart && weekStart.trim() !== ''

  return useQuery({
    queryKey: ['report', 'weekly-revenue', weekStart],
    queryFn: () =>
      ReportService.reportControllerGetWeeklyRevenue({
        weekStart,
      }),
    enabled: isValid,
  })
}
