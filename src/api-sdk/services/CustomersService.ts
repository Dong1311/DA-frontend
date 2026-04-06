/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCustomerDto } from '../models/CreateCustomerDto';
import type { UpdateCustomerDto } from '../models/UpdateCustomerDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomersService {
  /**
   * Create a new customer
   * @returns any
   * @throws ApiError
   */
  public static customerControllerCreate({
    requestBody,
  }: {
    requestBody: CreateCustomerDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/customers',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Get all customers of current store
   * @returns any
   * @throws ApiError
   */
  public static customerControllerFindAll({
    limit,
    page,
  }: {
    limit?: number,
    page?: number,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/customers',
      query: {
        'limit': limit,
        'page': page,
      },
    });
  }
  /**
   * Search customers by name, phone or address
   * @returns any
   * @throws ApiError
   */
  public static customerControllerSearch({
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
      url: '/customers/search',
      query: {
        'keyword': keyword,
        'limit': limit,
        'page': page,
      },
    });
  }
  /**
   * Get a customer by ID
   * @returns any
   * @throws ApiError
   */
  public static customerControllerFindOne({
    id,
  }: {
    id: string,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/customers/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * Update a customer by ID
   * @returns any
   * @throws ApiError
   */
  public static customerControllerUpdate({
    id,
    requestBody,
  }: {
    id: string,
    requestBody: UpdateCustomerDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/customers/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Delete a customer by ID
   * @returns any
   * @throws ApiError
   */
  public static customerControllerRemove({
    id,
  }: {
    id: string,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/customers/{id}',
      path: {
        'id': id,
      },
    });
  }
}
