/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateInvoiceDto } from '../models/CreateInvoiceDto';
import type { InvoiceResponseDto } from '../models/InvoiceResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SalesService {
  /**
   * Create a new invoice
   * @returns InvoiceResponseDto
   * @throws ApiError
   */
  public static salesControllerCreateInvoice({
    requestBody,
  }: {
    requestBody: CreateInvoiceDto,
  }): CancelablePromise<InvoiceResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/sales/create-invoice',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
