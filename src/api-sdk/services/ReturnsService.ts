/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateReturnDto } from '../models/CreateReturnDto';
import type { PaginatedReturnResponseDto } from '../models/PaginatedReturnResponseDto';
import type { ReturnResponseDto } from '../models/ReturnResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReturnsService {
  /**
   * Get all returns of current store
   * @returns PaginatedReturnResponseDto Paginated return list
   * @throws ApiError
   */
  public static returnControllerFindAll({
    limit,
    page,
  }: {
    limit?: number,
    page?: number,
  }): CancelablePromise<PaginatedReturnResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/returns',
      query: {
        'limit': limit,
        'page': page,
      },
    });
  }
  /**
   * Tạo phiếu trả hàng cho một hóa đơn
   * @returns ReturnResponseDto
   * @throws ApiError
   */
  public static returnControllerCreateReturn({
    requestBody,
  }: {
    requestBody: CreateReturnDto,
  }): CancelablePromise<ReturnResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/returns',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Search returns by code
   * @returns PaginatedReturnResponseDto Paginated search result of returns
   * @throws ApiError
   */
  public static returnControllerSearch({
    keyword,
    limit,
    page,
  }: {
    keyword: string,
    limit?: number,
    page?: number,
  }): CancelablePromise<PaginatedReturnResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/returns/search',
      query: {
        'keyword': keyword,
        'limit': limit,
        'page': page,
      },
    });
  }
  /**
   * Get return details by ID
   * @returns ReturnResponseDto Return detail
   * @throws ApiError
   */
  public static returnControllerGetById({
    id,
  }: {
    id: string,
  }): CancelablePromise<ReturnResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/returns/{id}',
      path: {
        'id': id,
      },
    });
  }
}
