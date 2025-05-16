/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCustomerDto } from '../models/CreateCustomerDto';
import type { CustomerResponseDto } from '../models/CustomerResponseDto';
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
   * @returns CustomerResponseDto
   * @throws ApiError
   */
  public static customerControllerFindAll(): CancelablePromise<Array<CustomerResponseDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/customers',
    });
  }
  /**
   * Search customers by keyword
   * @returns CustomerResponseDto
   * @throws ApiError
   */
  public static customerControllerSearch({
    keyword,
  }: {
    keyword: string,
  }): CancelablePromise<Array<CustomerResponseDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/customers/search',
      query: {
        'keyword': keyword,
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
