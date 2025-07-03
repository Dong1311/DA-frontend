import { useQuery } from '@tanstack/react-query'

import { ReportService } from '@/api-sdk'

export const useDailySummary = ({ date }: { date: string }) => {
  return useQuery({
    queryKey: ['report', 'daily-summary', date],
    queryFn: () =>
      ReportService.reportControllerGetDailySummary({ date }),
    enabled: !!date,
  })
}
