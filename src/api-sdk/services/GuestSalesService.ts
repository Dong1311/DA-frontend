/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateGuestEmailDto } from '../models/UpdateGuestEmailDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GuestSalesService {
  /**
   * Guest cập nhật email cho hóa đơn
   * @returns any Guest email updated
   * @throws ApiError
   */
  public static guestSalesControllerUpdateGuestEmail({
    id,
    requestBody,
  }: {
    /**
     * Invoice ID
     */
    id: string,
    requestBody: UpdateGuestEmailDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/public/sales/{id}/guest-email',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
