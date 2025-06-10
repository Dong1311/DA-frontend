/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StartConversationDto } from '../models/StartConversationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ChatPublicService {
  /**
   * @returns any
   * @throws ApiError
   */
  public static chatPublicControllerGetStores(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/public/chat/stores',
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public static chatPublicControllerStartConversation({
    requestBody,
  }: {
    requestBody: StartConversationDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/public/chat/start',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
