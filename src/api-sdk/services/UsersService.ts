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
   * Get store info with current user
   * @returns any
   * @throws ApiError
   */
  public static usersControllerGetMyStore(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/store',
    });
  }
  /**
   * Get full current user info from database
   * @returns any
   * @throws ApiError
   */
  public static usersControllerGetMe(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/users/me',
    });
  }
  /**
   * Update current user info
   * @returns any
   * @throws ApiError
   */
  public static usersControllerUpdateProfile({
    requestBody,
  }: {
    requestBody: UpdateUserDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/users/me',
      body: requestBody,
      mediaType: 'application/json',
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
}
