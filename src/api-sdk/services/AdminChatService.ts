/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminChatService {
  /**
   * Lấy danh sách cuộc trò chuyện của admin
   * @returns any
   * @throws ApiError
   */
  public static adminChatControllerGetConversations(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin/chat/conversations',
    });
  }
}
