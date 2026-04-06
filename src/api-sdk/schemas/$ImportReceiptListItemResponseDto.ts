/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ImportReceiptListItemResponseDto = {
  properties: {
    id: {
      type: 'string',
      isRequired: true,
    },
    code: {
      type: 'string',
      isRequired: true,
    },
    createdAt: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    name: {
      type: 'string',
      isRequired: true,
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
      type: 'Enum',
      isRequired: true,
    },
    importReceiptItems: {
      type: 'array',
      contains: {
        type: 'ImportReceiptItemResponseDto',
      },
      isRequired: true,
    },
    supplier: {
      type: 'all-of',
      contains: [{
        type: 'ImportReceiptSupplierSummaryDto',
      }],
      isNullable: true,
    },
  },
} as const;
