/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateStockCheckDetailDto = {
  properties: {
    productId: {
      type: 'string',
      description: `ID sản phẩm`,
      isRequired: true,
    },
    unitId: {
      type: 'string',
      description: `ID đơn vị sản phẩm`,
      isRequired: true,
    },
    quantityInStock: {
      type: 'number',
      description: `Số lượng tồn kho ghi nhận`,
      isRequired: true,
    },
    quantityActual: {
      type: 'number',
      description: `Số lượng thực tế kiểm`,
      isRequired: true,
    },
  },
} as const;
