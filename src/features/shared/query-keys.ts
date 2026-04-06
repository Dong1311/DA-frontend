export interface PaginationParams {
  page: number
  limit: number
}

export interface DateRangeParams {
  fromDate?: string
  toDate?: string
}

export const queryKeys = {
  customers: {
    all: ['customers'] as const,
    list: ({ page, limit }: PaginationParams) => ['customers', page, limit] as const,
    search: ({ keyword, page, limit }: { keyword: string } & PaginationParams) =>
      ['customers', 'search', keyword, page, limit] as const,
  },
  suppliers: {
    all: ['suppliers'] as const,
    list: ({ page, limit }: PaginationParams) => ['suppliers', page, limit] as const,
    search: ({ keyword, page, limit }: { keyword: string } & PaginationParams) =>
      ['suppliers', 'search', keyword, page, limit] as const,
  },
  products: {
    all: ['products'] as const,
    list: ({ page, limit }: PaginationParams) => ['products', page, limit] as const,
    search: ({ keyword, page, limit }: { keyword: string } & PaginationParams) =>
      ['products', 'search', keyword, page, limit] as const,
  },
  invoices: {
    all: ['invoices'] as const,
    list: ({ page, limit }: PaginationParams) => ['invoices', page, limit] as const,
    byId: (id: string) => ['invoices', id] as const,
    search: ({
      keyword,
      fromDate,
      toDate,
      page,
      limit,
    }: {
      keyword?: string
      fromDate?: string
      toDate?: string
    } & PaginationParams) => ['invoices', 'search', keyword ?? '', fromDate ?? '', toDate ?? '', page, limit] as const,
  },
  importReceipts: {
    all: ['importReceipts'] as const,
    list: ({ page, limit }: PaginationParams) => ['importReceipts', page, limit] as const,
    detail: (id: string) => ['importReceipts', id] as const,
    search: ({ keyword, page, limit }: { keyword: string } & PaginationParams) =>
      ['importReceipts', 'search', keyword, page, limit] as const,
  },
  returns: {
    all: ['returns'] as const,
    list: ({ page, limit }: PaginationParams) => ['returns', page, limit] as const,
    detail: (id: string) => ['return', id] as const,
    search: ({ keyword, page, limit }: { keyword: string } & PaginationParams) =>
      ['returns', 'search', keyword, page, limit] as const,
  },
  stockChecks: {
    all: ['stock-checks'] as const,
    list: ({ page, limit }: PaginationParams) => ['stock-checks', page, limit] as const,
    detail: (id: string) => ['stock-checks', id] as const,
    search: ({
      keyword,
      fromDate,
      toDate,
      page,
      limit,
    }: {
      keyword?: string
      fromDate?: string
      toDate?: string
    } & PaginationParams) => ['stock-checks', 'search', keyword ?? '', fromDate ?? '', toDate ?? '', page, limit] as const,
  },
  reports: {
    dailyList: ({ date, page, limit }: { date: string } & PaginationParams) => ['report', date, page, limit] as const,
    dailySummary: (date: string) => ['report', 'daily-summary', date] as const,
    weeklyRevenue: (weekStart?: string) => ['report', 'weekly-revenue', weekStart ?? ''] as const,
    topProducts: ({ fromDate, toDate }: DateRangeParams) => ['report', 'top-products', fromDate ?? '', toDate ?? ''] as const,
    topCustomers: ({ fromDate, toDate }: DateRangeParams) =>
      ['report', 'top-customers', fromDate ?? '', toDate ?? ''] as const,
    periodRevenue: ({ type, refDate }: { type: 'day' | 'month'; refDate?: string }) =>
      ['report', 'period-revenue', type, refDate ?? ''] as const,
  },
}
