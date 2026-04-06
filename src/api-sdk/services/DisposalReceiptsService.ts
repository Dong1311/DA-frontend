/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDisposalReceiptDto } from '../models/CreateDisposalReceiptDto';
import type { DisposalReceiptResponseDto } from '../models/DisposalReceiptResponseDto';
import type { PaginatedDisposalReceiptResponseDto } from '../models/PaginatedDisposalReceiptResponseDto';
import type { UpdateDisposalReceiptDto } from '../models/UpdateDisposalReceiptDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DisposalReceiptsService {
  /**
   * Create new disposal receipt
   * @returns any
   * @throws ApiError
   */
  public static disposalReceiptControllerCreate({
    requestBody,
  }: {
    requestBody: CreateDisposalReceiptDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/disposal-receipts',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public static disposalReceiptControllerFindAll({
    limit,
    page,
  }: {
    limit?: number,
    page?: number,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/disposal-receipts',
      query: {
        'limit': limit,
        'page': page,
      },
    });
  }
  /**
   * Tìm kiếm phiếu hủy theo ghi chú và ngày tạo
   * @returns PaginatedDisposalReceiptResponseDto
   * @throws ApiError
   */
  public static disposalReceiptControllerSearch({
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
  }): CancelablePromise<PaginatedDisposalReceiptResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/disposal-receipts/search',
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
   * Get disposal receipt detail by ID
   * @returns DisposalReceiptResponseDto
   * @throws ApiError
   */
  public static disposalReceiptControllerFindOne({
    id,
  }: {
    id: string,
  }): CancelablePromise<DisposalReceiptResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/disposal-receipts/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * Update disposal receipt
   * @returns any
   * @throws ApiError
   */
  public static disposalReceiptControllerUpdate({
    id,
    requestBody,
  }: {
    id: string,
    requestBody: UpdateDisposalReceiptDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/disposal-receipts/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Delete disposal receipt
   * @returns any
   * @throws ApiError
   */
  public static disposalReceiptControllerRemove({
    id,
  }: {
    id: string,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/disposal-receipts/{id}',
      path: {
        'id': id,
      },
    });
  }
}
