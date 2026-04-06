/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PromptDto } from '../models/PromptDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HealthAssistantService {
  /**
   * @returns any
   * @throws ApiError
   */
  public static healthAssistantControllerSuggest({
    requestBody,
  }: {
    requestBody: PromptDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/health-assistant/suggest',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
