/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
  /**
   * Create new user (admin or guest)
   * @returns any
   * @throws ApiError
   */
  public static usersControllerCreate({
    requestBody,
  }: {
    requestBody: CreateUserDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/users',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Get all users
   * @returns any
   * @throws ApiError
   */
  public static usersControllerFindAll({
    limit,
    page,
  }: {
    limit?: number,
    page?: number,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users',
      query: {
        'limit': limit,
        'page': page,
      },
    });
  }
  /**
   * Get user by ID
   * @returns any
   * @throws ApiError
   */
  public static usersControllerFindOne({
    id,
  }: {
    id: string,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * Update user by ID
   * @returns any
   * @throws ApiError
   */
  public static usersControllerUpdate({
    id,
    requestBody,
  }: {
    id: string,
    requestBody: UpdateUserDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/users/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Delete user by ID
   * @returns any
   * @throws ApiError
   */
  public static usersControllerRemove({
    id,
  }: {
    id: string,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/users/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * Get store and its users by store ID
   * @returns any
   * @throws ApiError
   */
  public static usersControllerFindStore({
    storeId,
  }: {
    storeId: string,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/store/{storeId}',
      path: {
        'storeId': storeId,
      },
    });
  }
}
