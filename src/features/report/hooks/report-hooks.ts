import { useQuery } from '@tanstack/react-query'

import { ReportService } from '@/api-sdk'
import { queryKeys } from '@/features/shared/query-keys'

export interface ReportDailyListParams {
  date: string
  page: number
  limit: number
}

export interface DateRangeParams {
  fromDate?: string
  toDate?: string
}

export interface RevenueByPeriodParams {
  type: 'day' | 'month'
  refDate?: string
}

export const useReportDailyList = ({ date, page, limit }: ReportDailyListParams) => {
  return useQuery({
    queryKey: queryKeys.reports.dailyList({ date, page, limit }),
    queryFn: () => ReportService.reportControllerGetReport({ date, page, limit }),
    enabled: Boolean(date),
  })
}

export const useWeeklyRevenue = ({ weekStart }: { weekStart?: string }) => {
  const isValid = Boolean(weekStart && weekStart.trim() !== '')

  return useQuery({
    queryKey: queryKeys.reports.weeklyRevenue(weekStart),
    queryFn: () => ReportService.reportControllerGetWeeklyRevenue({ weekStart }),
    enabled: isValid,
  })
}

export const useTopRevenueProducts = ({ fromDate, toDate }: DateRangeParams) => {
  return useQuery({
    queryKey: queryKeys.reports.topProducts({ fromDate, toDate }),
    queryFn: () => ReportService.reportControllerGetTopRevenueProducts({ fromDate, toDate }),
  })
}

export const useTopSpendingCustomers = ({ fromDate, toDate }: DateRangeParams) => {
  return useQuery({
    queryKey: queryKeys.reports.topCustomers({ fromDate, toDate }),
    queryFn: () => ReportService.reportControllerGetTopCustomers({ fromDate, toDate }),
  })
}

export const useDailySummary = ({ date }: { date: string }) => {
  return useQuery({
    queryKey: queryKeys.reports.dailySummary(date),
    queryFn: () => ReportService.reportControllerGetDailySummary({ date }),
    enabled: Boolean(date),
  })
}

export const useRevenueByPeriod = ({ type, refDate }: RevenueByPeriodParams) => {
  return useQuery({
    queryKey: queryKeys.reports.periodRevenue({ type, refDate }),
    queryFn: () => ReportService.reportControllerGetRevenueByPeriod({ type, refDate }),
    enabled: type === 'day' || type === 'month',
  })
}
