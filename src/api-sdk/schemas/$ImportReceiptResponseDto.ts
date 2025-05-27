/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ImportReceiptResponseDto = {
  properties: {
    id: {
      type: 'string',
      isRequired: true,
    },
    createdAt: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    supplierId: {
      type: 'string',
      isRequired: true,
    },
    amountDue: {
      type: 'number',
      isRequired: true,
    },
    status: {
      type: 'string',
      isRequired: true,
    },
    importReceiptItems: {
      type: 'array',
      contains: {
        type: 'ImportReceiptItemResponseDto',
      },
      isRequired: true,
    },
  },
} as const;
