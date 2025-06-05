/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateDisposalReceiptItemDto = {
  properties: {
    productId: {
      type: 'string',
      description: `ID sản phẩm`,
      isRequired: true,
    },
    quantity: {
      type: 'number',
      description: `Số lượng`,
      isRequired: true,
    },
    unitPrice: {
      type: 'number',
      description: `Đơn giá`,
      isRequired: true,
    },
    unitId: {
      type: 'string',
      description: `ID đơn vị`,
      isRequired: true,
    },
  },
} as const;
