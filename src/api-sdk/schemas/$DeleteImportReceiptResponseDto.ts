/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DeleteImportReceiptResponseDto = {
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
    storeId: {
      type: 'string',
      isRequired: true,
    },
    status: {
      type: 'string',
      isRequired: true,
    },
  },
} as const;
