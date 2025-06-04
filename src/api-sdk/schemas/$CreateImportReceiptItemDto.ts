/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateImportReceiptItemDto = {
  properties: {
    productId: {
      type: 'string',
      description: `ID sản phẩm đã có`,
      isRequired: true,
    },
    quantity: {
      type: 'number',
      description: `Số lượng nhập`,
      isRequired: true,
    },
    unitPrice: {
      type: 'number',
      description: `Đơn giá nhập`,
      isRequired: true,
    },
    unitId: {
      type: 'string',
      description: `ID đơn vị`,
      isRequired: true,
    },
  },
} as const;
