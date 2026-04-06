/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateStoreStatusDto } from '../models/UpdateStoreStatusDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminService {
  /**
   * SUPER_ADMIN update store status
   * @returns any
   * @throws ApiError
   */
  public static adminControllerUpdateStoreStatus({
    id,
    requestBody,
  }: {
    id: string,
    requestBody: UpdateStoreStatusDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/admin/stores/{id}/status',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * SUPER_ADMIN get all stores
   * @returns any
   * @throws ApiError
   */
  public static adminControllerGetStores(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin/stores',
    });
  }
}
