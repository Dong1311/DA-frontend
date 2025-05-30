/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductDto } from '../models/CreateProductDto';
import type { PaginatedProductResponseDto } from '../models/PaginatedProductResponseDto';
import type { UpdateProductDto } from '../models/UpdateProductDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductsService {
  /**
   * Create a new product
   * @returns any
   * @throws ApiError
   */
  public static productControllerCreate({
    requestBody,
  }: {
    requestBody: CreateProductDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/products',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Get all products of current store
   * @returns PaginatedProductResponseDto Paginated product list
   * @throws ApiError
   */
  public static productControllerFindAll({
    limit,
    page,
  }: {
    limit?: number,
    page?: number,
  }): CancelablePromise<PaginatedProductResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/products',
      query: {
        'limit': limit,
        'page': page,
      },
    });
  }
  /**
   * Search products by name or code
   * @returns PaginatedProductResponseDto Paginated search result of products
   * @throws ApiError
   */
  public static productControllerSearch({
    keyword,
    limit,
    page,
  }: {
    keyword: string,
    limit?: number,
    page?: number,
  }): CancelablePromise<PaginatedProductResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/products/search',
      query: {
        'keyword': keyword,
        'limit': limit,
        'page': page,
      },
    });
  }
  /**
   * Get a product by ID
   * @returns any
   * @throws ApiError
   */
  public static productControllerFindOne({
    id,
  }: {
    id: string,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/products/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * Update a product by ID
   * @returns any
   * @throws ApiError
   */
  public static productControllerUpdate({
    id,
    requestBody,
  }: {
    id: string,
    requestBody: UpdateProductDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/products/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Delete a product by ID
   * @returns any
   * @throws ApiError
   */
  public static productControllerRemove({
    id,
  }: {
    id: string,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/products/{id}',
      path: {
        'id': id,
      },
    });
  }
}
