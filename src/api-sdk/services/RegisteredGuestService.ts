/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InvoiceResponseDto } from '../models/InvoiceResponseDto';
import type { PaginatedInvoiceResponseDto } from '../models/PaginatedInvoiceResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RegisteredGuestService {
  /**
   * Get invoices of a guest by email (after registered)
   * @returns PaginatedInvoiceResponseDto Paginated invoice list
   * @throws ApiError
   */
  public static registeredGuestControllerGetInvoices({
    limit,
    page,
  }: {
    limit?: number,
    page?: number,
  }): CancelablePromise<PaginatedInvoiceResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/registered-guest/invoices',
      query: {
        'limit': limit,
        'page': page,
      },
    });
  }
  /**
   * Search guest invoices by keyword and date range
   * @returns PaginatedInvoiceResponseDto Paginated search result of invoices
   * @throws ApiError
   */
  public static registeredGuestControllerSearchInvoices({
    keyword,
    fromDate,
    toDate,
    limit,
    page,
  }: {
    keyword?: string,
    /**
     * ISO format date (yyyy-MM-dd)
     */
    fromDate?: string,
    /**
     * ISO format date (yyyy-MM-dd)
     */
    toDate?: string,
    limit?: number,
    page?: number,
  }): CancelablePromise<PaginatedInvoiceResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/registered-guest/invoices/search',
      query: {
        'keyword': keyword,
        'fromDate': fromDate,
        'toDate': toDate,
        'limit': limit,
        'page': page,
      },
    });
  }
  /**
   * Get guest invoice by ID
   * @returns InvoiceResponseDto
   * @throws ApiError
   */
  public static registeredGuestControllerGetInvoice({
    id,
  }: {
    id: string,
  }): CancelablePromise<InvoiceResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/registered-guest/invoice/{id}',
      path: {
        'id': id,
      },
    });
  }
}
