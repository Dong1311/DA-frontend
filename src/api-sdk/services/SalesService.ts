/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateInvoiceDto } from '../models/CreateInvoiceDto';
import type { InvoiceResponseDto } from '../models/InvoiceResponseDto';
import type { PaginatedInvoiceResponseDto } from '../models/PaginatedInvoiceResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SalesService {
  /**
   * Create a new invoice
   * @returns InvoiceResponseDto
   * @throws ApiError
   */
  public static salesControllerCreateInvoice({
    requestBody,
  }: {
    requestBody: CreateInvoiceDto,
  }): CancelablePromise<InvoiceResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/sales/create-invoice',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Lấy tất cả hóa đơn của cửa hàng hiện tại
   * @returns PaginatedInvoiceResponseDto Paginated invoice list
   * @throws ApiError
   */
  public static salesControllerGetAllInvoices({
    limit,
    page,
  }: {
    limit?: number,
    page?: number,
  }): CancelablePromise<PaginatedInvoiceResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sales/invoices',
      query: {
        'limit': limit,
        'page': page,
      },
    });
  }
  /**
   * Tìm kiếm hóa đơn theo từ khóa và khoảng ngày
   * @returns PaginatedInvoiceResponseDto Paginated search result of invoices
   * @throws ApiError
   */
  public static salesControllerSearchInvoices({
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
      url: '/sales/invoices/search',
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
   * Lấy thông tin hóa đơn theo ID
   * @returns InvoiceResponseDto
   * @throws ApiError
   */
  public static salesControllerGetInvoice({
    id,
  }: {
    id: string,
  }): CancelablePromise<InvoiceResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sales/invoice/{id}',
      path: {
        'id': id,
      },
    });
  }
}
