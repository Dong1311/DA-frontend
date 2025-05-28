/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateReturnDto } from '../models/CreateReturnDto';
import type { ReturnResponseDto } from '../models/ReturnResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReturnsService {
  /**
   * Tạo phiếu trả hàng cho một hóa đơn
   * @returns ReturnResponseDto
   * @throws ApiError
   */
  public static returnControllerCreateReturn({
    requestBody,
  }: {
    requestBody: CreateReturnDto,
  }): CancelablePromise<ReturnResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/returns',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
