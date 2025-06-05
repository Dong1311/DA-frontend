/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateStockCheckDto } from '../models/CreateStockCheckDto';
import type { PaginatedStockCheckResponseDto } from '../models/PaginatedStockCheckResponseDto';
import type { StockCheckResponseDto } from '../models/StockCheckResponseDto';
import type { UpdateStockCheckDto } from '../models/UpdateStockCheckDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StockCheckService {
  /**
   * Tạo phiếu kiểm kho
   * @returns StockCheckResponseDto
   * @throws ApiError
   */
  public static stockCheckControllerCreate({
    requestBody,
  }: {
    requestBody: CreateStockCheckDto,
  }): CancelablePromise<StockCheckResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/stock-check',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Lấy danh sách phiếu kiểm kho (có phân trang)
   * @returns PaginatedStockCheckResponseDto
   * @throws ApiError
   */
  public static stockCheckControllerGetAll({
    limit,
    page,
  }: {
    limit?: number,
    page?: number,
  }): CancelablePromise<PaginatedStockCheckResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/stock-check',
      query: {
        'limit': limit,
        'page': page,
      },
    });
  }
  /**
   * Cập nhật phiếu kiểm kho (chỉ khi status = DRAFT)
   * @returns StockCheckResponseDto
   * @throws ApiError
   */
  public static stockCheckControllerUpdate({
    id,
    requestBody,
  }: {
    id: string,
    requestBody: UpdateStockCheckDto,
  }): CancelablePromise<StockCheckResponseDto> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/stock-check/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Lấy chi tiết phiếu kiểm kho
   * @returns StockCheckResponseDto
   * @throws ApiError
   */
  public static stockCheckControllerGetOne({
    id,
  }: {
    id: string,
  }): CancelablePromise<StockCheckResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/stock-check/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * Tìm kiếm phiếu kiểm kho theo mã sản phẩm và ngày tạo
   * @returns PaginatedStockCheckResponseDto
   * @throws ApiError
   */
  public static stockCheckControllerSearch({
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
  }): CancelablePromise<PaginatedStockCheckResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/stock-check/search',
      query: {
        'keyword': keyword,
        'fromDate': fromDate,
        'toDate': toDate,
        'limit': limit,
        'page': page,
      },
    });
  }
}
