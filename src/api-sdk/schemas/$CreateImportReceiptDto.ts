/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateImportReceiptDto = {
  properties: {
    supplierId: {
      type: 'string',
      description: `ID nhà cung cấp`,
      isRequired: true,
    },
    amountDue: {
      type: 'number',
      description: `Tổng tiền đơn nhập`,
      isRequired: true,
    },
    name: {
      type: 'string',
      description: `Tên đơn nhập`,
      isRequired: true,
    },
    items: {
      type: 'array',
      contains: {
        type: 'CreateImportReceiptItemDto',
      },
      isRequired: true,
    },
  },
} as const;
