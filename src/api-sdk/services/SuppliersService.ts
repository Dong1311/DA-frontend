/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSupplierDto } from '../models/CreateSupplierDto';
import type { UpdateSupplierDto } from '../models/UpdateSupplierDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SuppliersService {
  /**
   * Create new supplier
   * @returns any
   * @throws ApiError
   */
  public static supplierControllerCreate({
    requestBody,
  }: {
    requestBody: CreateSupplierDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/suppliers',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public static supplierControllerFindAll({
    limit,
    page,
  }: {
    limit?: number,
    page?: number,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/suppliers',
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
  public static supplierControllerSearch({
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
      url: '/suppliers/search',
      query: {
        'keyword': keyword,
        'limit': limit,
        'page': page,
      },
    });
  }
  /**
   * Update supplier by ID
   * @returns any
   * @throws ApiError
   */
  public static supplierControllerUpdate({
    id,
    requestBody,
  }: {
    id: string,
    requestBody: UpdateSupplierDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/suppliers/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Delete supplier by ID
   * @returns any
   * @throws ApiError
   */
  public static supplierControllerRemove({
    id,
  }: {
    id: string,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/suppliers/{id}',
      path: {
        'id': id,
      },
    });
  }
}
