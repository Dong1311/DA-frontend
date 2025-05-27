/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateImportReceiptItemDto = {
  properties: {
    productId: {
      type: 'string',
      description: `ID sản phẩm đã có (không cần nếu tạo sản phẩm mới)`,
    },
    newProduct: {
      type: 'all-of',
      description: `Thông tin sản phẩm mới nếu tạo mới`,
      contains: [{
        type: 'CreateNewProductDto',
      }],
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
  },
} as const;
