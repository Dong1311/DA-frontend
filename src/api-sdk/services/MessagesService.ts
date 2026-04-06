/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MessagesService {
  /**
   * Lấy tin nhắn theo conversationId
   * @returns any
   * @throws ApiError
   */
  public static messageControllerGetMessages({
    id,
  }: {
    id: string,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/messages/conversation/{id}',
      path: {
        'id': id,
      },
    });
  }
}
