/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DisposalReceiptResponseDto = {
  properties: {
    id: {
      type: 'string',
      isRequired: true,
    },
    note: {
      type: 'string',
      isRequired: true,
    },
    totalAmount: {
      type: 'number',
      isRequired: true,
    },
    createdAt: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    storeId: {
      type: 'string',
      isRequired: true,
    },
    disposalReceiptItems: {
      type: 'array',
      contains: {
        type: 'DisposalReceiptItemResponseDto',
      },
      isRequired: true,
    },
  },
} as const;
