/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginDto } from '../models/LoginDto';
import type { RegisterDto } from '../models/RegisterDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
  /**
   * @returns any
   * @throws ApiError
   */
  public static authControllerRegister({
    requestBody,
  }: {
    requestBody: RegisterDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/register',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public static authControllerLogin({
    requestBody,
  }: {
    requestBody: LoginDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/login',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public static authControllerGoogleAuth(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/auth/google',
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public static authControllerGoogleAuthRedirect(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/auth/google/redirect',
    });
  }
}
