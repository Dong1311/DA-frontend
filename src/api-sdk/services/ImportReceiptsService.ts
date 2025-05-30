/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateImportReceiptDto } from '../models/CreateImportReceiptDto';
import type { ImportReceiptResponseDto } from '../models/ImportReceiptResponseDto';
import type { UpdateImportReceiptDto } from '../models/UpdateImportReceiptDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ImportReceiptsService {
  /**
   * Create new import receipt
   * @returns any
   * @throws ApiError
   */
  public static importReceiptControllerCreate({
    requestBody,
  }: {
    requestBody: CreateImportReceiptDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/import-receipts',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public static importReceiptControllerFindAll({
    limit,
    page,
  }: {
    limit?: number,
    page?: number,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/import-receipts',
      query: {
        'limit': limit,
        'page': page,
      },
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public static importReceiptControllerSearch({
    keyword,
    limit,
    page,
  }: {
    keyword: string,
    limit?: number,
    page?: number,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/import-receipts/search',
      query: {
        'keyword': keyword,
        'limit': limit,
        'page': page,
      },
    });
  }
  /**
   * Get import receipt detail by ID
   * @returns ImportReceiptResponseDto
   * @throws ApiError
   */
  public static importReceiptControllerFindOne({
    id,
  }: {
    id: string,
  }): CancelablePromise<ImportReceiptResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/import-receipts/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * Update import receipt
   * @returns any
   * @throws ApiError
   */
  public static importReceiptControllerUpdate({
    id,
    requestBody,
  }: {
    id: string,
    requestBody: UpdateImportReceiptDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/import-receipts/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Delete import receipt
   * @returns any
   * @throws ApiError
   */
  public static importReceiptControllerRemove({
    id,
  }: {
    id: string,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/import-receipts/{id}',
      path: {
        'id': id,
      },
    });
  }
}
