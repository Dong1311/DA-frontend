import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/features/shared/query-keys'

import { type DateRangeParams,reportApi } from '../api/report-api'

interface ReportParams {
  date: string
  page: number
  limit: number
}

interface WeeklyRevenueParams {
  weekStart?: string
}

interface RevenueByPeriodParams {
  type: 'day' | 'month'
  refDate?: string
}

export const useReportDailyList = ({ date, page, limit }: ReportParams) => {
  return useQuery({
    queryKey: queryKeys.reports.dailyList({ date, page, limit }),
    queryFn: () => reportApi.getDailyList({ date, page, limit }),
    enabled: Boolean(date),
  })
}

export const useWeeklyRevenue = ({ weekStart }: WeeklyRevenueParams) => {
  const isValid = Boolean(weekStart && weekStart.trim() !== '')

  return useQuery({
    queryKey: queryKeys.reports.weeklyRevenue(weekStart),
    queryFn: () => reportApi.getWeeklyRevenue(weekStart),
    enabled: isValid,
  })
}

export const useTopRevenueProducts = ({ fromDate, toDate }: DateRangeParams) => {
  return useQuery({
    queryKey: queryKeys.reports.topProducts({ fromDate, toDate }),
    queryFn: () => reportApi.getTopRevenueProducts({ fromDate, toDate }),
  })
}

export const useTopSpendingCustomers = ({ fromDate, toDate }: DateRangeParams) => {
  return useQuery({
    queryKey: queryKeys.reports.topCustomers({ fromDate, toDate }),
    queryFn: () => reportApi.getTopCustomers({ fromDate, toDate }),
  })
}

export const useDailySummary = ({ date }: { date: string }) => {
  return useQuery({
    queryKey: queryKeys.reports.dailySummary(date),
    queryFn: () => reportApi.getDailySummary(date),
    enabled: Boolean(date),
  })
}

export const useRevenueByPeriod = ({ type, refDate }: RevenueByPeriodParams) => {
  return useQuery({
    queryKey: queryKeys.reports.periodRevenue({ type, refDate }),
    queryFn: () => reportApi.getRevenueByPeriod({ type, refDate }),
    enabled: type === 'day' || type === 'month',
  })
}
