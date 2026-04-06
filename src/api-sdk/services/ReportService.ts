/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DailySummaryResponseDto } from '../models/DailySummaryResponseDto';
import type { PaginatedReportDto } from '../models/PaginatedReportDto';
import type { RevenueByPeriodPointDto } from '../models/RevenueByPeriodPointDto';
import type { TopRevenueProductDto } from '../models/TopRevenueProductDto';
import type { TopSpendingCustomerDto } from '../models/TopSpendingCustomerDto';
import type { WeeklyRevenuePointDto } from '../models/WeeklyRevenuePointDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReportService {
  /**
   * Get daily summary (invoices, imports, returns, revenue)
   * @returns DailySummaryResponseDto
   * @throws ApiError
   */
  public static reportControllerGetDailySummary({
    date,
  }: {
    date: string,
  }): CancelablePromise<DailySummaryResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/report/daily-summary',
      query: {
        'date': date,
      },
    });
  }
  /**
   * Get daily product report
   * @returns PaginatedReportDto
   * @throws ApiError
   */
  public static reportControllerGetReport({
    date,
    limit,
    page,
  }: {
    date: string,
    limit?: number,
    page?: number,
  }): CancelablePromise<PaginatedReportDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/report/daily-revenue',
      query: {
        'date': date,
        'limit': limit,
        'page': page,
      },
    });
  }
  /**
   * Get weekly revenue for chart
   * @returns WeeklyRevenuePointDto
   * @throws ApiError
   */
  public static reportControllerGetWeeklyRevenue({
    weekStart,
  }: {
    weekStart?: string,
  }): CancelablePromise<Array<WeeklyRevenuePointDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/report/weekly-revenue',
      query: {
        'weekStart': weekStart,
      },
    });
  }
  /**
   * Get top 10 revenue products (after returns)
   * @returns TopRevenueProductDto
   * @throws ApiError
   */
  public static reportControllerGetTopRevenueProducts({
    fromDate,
    toDate,
  }: {
    fromDate?: string,
    toDate?: string,
  }): CancelablePromise<Array<TopRevenueProductDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/report/top-products',
      query: {
        'fromDate': fromDate,
        'toDate': toDate,
      },
    });
  }
  /**
   * Get top 10 spending customers (after returns)
   * @returns TopSpendingCustomerDto
   * @throws ApiError
   */
  public static reportControllerGetTopCustomers({
    fromDate,
    toDate,
  }: {
    fromDate?: string,
    toDate?: string,
  }): CancelablePromise<Array<TopSpendingCustomerDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/report/top-customers',
      query: {
        'fromDate': fromDate,
        'toDate': toDate,
      },
    });
  }
  /**
   * Get revenue by period (day in month OR month in year)
   * @returns RevenueByPeriodPointDto
   * @throws ApiError
   */
  public static reportControllerGetRevenueByPeriod({
    type,
    refDate,
  }: {
    type: 'day' | 'month',
    refDate?: string,
  }): CancelablePromise<Array<RevenueByPeriodPointDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/report/period-revenue',
      query: {
        'type': type,
        'refDate': refDate,
      },
    });
  }
}
