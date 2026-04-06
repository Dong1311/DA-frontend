/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateDisposalReceiptDto = {
  properties: {
    note: {
      type: 'string',
      description: `Ghi chú`,
      isRequired: true,
    },
    items: {
      type: 'array',
      contains: {
        type: 'CreateDisposalReceiptItemDto',
      },
      isRequired: true,
    },
    status: {
      type: 'Enum',
    },
  },
} as const;
