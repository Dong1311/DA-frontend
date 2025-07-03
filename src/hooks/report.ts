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

interface TopRevenueProductParams {
  fromDate?: string
  toDate?: string
}

export const useTopRevenueProducts = ({ fromDate, toDate }: TopRevenueProductParams) => {
  return useQuery({
    queryKey: ['report', 'top-products', fromDate, toDate],
    queryFn: () =>
      ReportService.reportControllerGetTopRevenueProducts({
        fromDate,
        toDate,
      }),
    enabled: true,
  })
}

interface DateRangeParams {
  fromDate?: string
  toDate?: string
}

export const useTopSpendingCustomers = ({ fromDate, toDate }: DateRangeParams) => {
  return useQuery({
    queryKey: ['report', 'top-customers', fromDate, toDate],
    queryFn: () =>
      ReportService.reportControllerGetTopCustomers({
        fromDate,
        toDate,
      }),
  })
}

interface DailySummaryParams {
  date: string
}

export const useDailySummary = ({ date }: DailySummaryParams) => {
  return useQuery({
    queryKey: ['report', 'daily-summary', date],
    queryFn: async () => {
      return await ReportService.reportControllerGetDailySummary({ date })
    },
    enabled: !!date,
  })
}

interface RevenueByPeriodParams {
  type: 'day' | 'month'
  refDate?: string
}

export const useRevenueByPeriod = ({ type, refDate }: RevenueByPeriodParams) => {
  const isEnabled = type === 'day' || type === 'month'

  return useQuery({
    queryKey: ['report', 'period-revenue', type, refDate],
    queryFn: () =>
      ReportService.reportControllerGetRevenueByPeriod({
        type,
        refDate,
      }),
    enabled: isEnabled,
  })
}
