/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateDisposalReceiptDto = {
  properties: {
    note: {
      type: 'string',
      description: `Ghi chú`,
    },
    items: {
      type: 'array',
      contains: {
        type: 'CreateDisposalReceiptItemDto',
      },
    },
    status: {
      type: 'Enum',
    },
  },
} as const;
