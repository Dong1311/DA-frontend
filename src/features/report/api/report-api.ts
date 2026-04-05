import { type PaginatedReportDto, ReportService } from '@/api-sdk'

export interface DailySummaryResponse {
  totalInvoices: number
  totalRevenue: number
  totalReturns: number
  totalRefund: number
  totalImportReceipts: number
}

export interface WeeklyRevenuePoint {
  date: string
  total: number
}

export interface TopRevenueProduct {
  productName: string
  revenue: number
}

export interface TopSpendingCustomer {
  customerName: string
  netSpending: number
}

export interface PeriodRevenuePoint {
  date?: string
  month?: string
  total: number
}

export interface ReportDailyListParams {
  date: string
  page: number
  limit: number
}

export interface DateRangeParams {
  fromDate?: string
  toDate?: string
}

export const reportApi = {
  getDailySummary: (date: string): Promise<DailySummaryResponse> =>
    ReportService.reportControllerGetDailySummary({ date }) as Promise<DailySummaryResponse>,
  getDailyList: ({ date, page, limit }: ReportDailyListParams): Promise<PaginatedReportDto> =>
    ReportService.reportControllerGetReport({ date, page, limit }),
  getWeeklyRevenue: (weekStart?: string): Promise<WeeklyRevenuePoint[]> =>
    ReportService.reportControllerGetWeeklyRevenue({ weekStart }) as Promise<WeeklyRevenuePoint[]>,
  getTopRevenueProducts: ({ fromDate, toDate }: DateRangeParams): Promise<TopRevenueProduct[]> =>
    ReportService.reportControllerGetTopRevenueProducts({ fromDate, toDate }) as Promise<TopRevenueProduct[]>,
  getTopCustomers: ({ fromDate, toDate }: DateRangeParams): Promise<TopSpendingCustomer[]> =>
    ReportService.reportControllerGetTopCustomers({ fromDate, toDate }) as Promise<TopSpendingCustomer[]>,
  getRevenueByPeriod: ({ type, refDate }: { type: 'day' | 'month'; refDate?: string }): Promise<PeriodRevenuePoint[]> =>
    ReportService.reportControllerGetRevenueByPeriod({ type, refDate }) as Promise<PeriodRevenuePoint[]>,
}
