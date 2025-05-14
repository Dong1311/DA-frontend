/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSupplierDto } from '../models/CreateSupplierDto';
import type { SupplierResponseDto } from '../models/SupplierResponseDto';
import type { UpdateSupplierDto } from '../models/UpdateSupplierDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SuppliersService {
  /**
   * Create a new supplier
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
   * Get all suppliers of current store
   * @returns SupplierResponseDto
   * @throws ApiError
   */
  public static supplierControllerFindAll(): CancelablePromise<Array<SupplierResponseDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/suppliers',
    });
  }
  /**
   * Get a supplier by ID
   * @returns any
   * @throws ApiError
   */
  public static supplierControllerFindOne({
    id,
  }: {
    id: string,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/suppliers/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * Update a supplier by ID
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
   * Delete a supplier by ID
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
