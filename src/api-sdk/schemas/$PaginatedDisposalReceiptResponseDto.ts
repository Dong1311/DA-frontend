/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PaginatedDisposalReceiptResponseDto = {
  properties: {
    items: {
      type: 'array',
      contains: {
        type: 'DisposalReceiptResponseDto',
      },
      isRequired: true,
    },
    page: {
      type: 'number',
      isRequired: true,
    },
    limit: {
      type: 'number',
      isRequired: true,
    },
    total: {
      type: 'number',
      isRequired: true,
    },
  },
} as const;
