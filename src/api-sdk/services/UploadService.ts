/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SaveImageUrlsDto } from '../models/SaveImageUrlsDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UploadService {
  /**
   * @returns any
   * @throws ApiError
   */
  public static uploadControllerGetUploadUrl({
    filename,
    mimetype,
  }: {
    filename: string,
    mimetype: string,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/upload/presign',
      query: {
        'filename': filename,
        'mimetype': mimetype,
      },
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public static uploadControllerSaveImageUrls({
    requestBody,
  }: {
    requestBody: SaveImageUrlsDto,
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/upload/save-urls',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
