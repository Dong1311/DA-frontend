'use client'

import { DeleteOutlined } from '@ant-design/icons'
import { Button, Col, Flex, Form, InputNumber, Row, Select } from 'antd'
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'

import { type ProductUnitDto } from '@/api-sdk'
import { type DisposalReceiptFormValues } from '@/constants/schema'

interface DisposalReceiptItemRowProps {
  index: number
  remove: (index: number) => void
  control: any
  setValue: any
  products: any[]
  watchedItems: DisposalReceiptFormValues['items']
}

export const DisposalReceiptItemRow = ({
  index,
  remove,
  control,
  setValue,
  products,
  watchedItems,
}: DisposalReceiptItemRowProps) => {
  const selectedProductId = watchedItems?.[index]?.productId
  const selectedProduct = products.find((p) => p.id === selectedProductId)
  const units = selectedProduct?.productUnits ?? []

  const quantity = watchedItems?.[index]?.quantity || 0
  const unitPrice = watchedItems?.[index]?.unitPrice || 0
  const totalPrice = quantity * unitPrice

  const selectedUnitId = watchedItems?.[index]?.unitId
  const selectedUnit = units.find((u: ProductUnitDto) => u.id === selectedUnitId)

  const baseStock = selectedProduct?.stock ?? 0
  const stockByUnit = selectedUnit ? baseStock * selectedUnit.conversionFactor : baseStock

  useEffect(() => {
    if (selectedProduct && selectedUnit) {
      const price = selectedProduct.costPrice / selectedUnit.conversionFactor
      setValue(`items.${index}.unitPrice`, price)
    }
  }, [selectedProduct, selectedUnit, index, setValue])

  return (
    <Row gutter={[16, 16]} className="w-full">
      <Col xs={24} sm={12} md={6}>
        <Controller
          name={`items.${index}.productId`}
          control={control}
          render={({ field }) => (
            <Form.Item label="Sản phẩm" required>
              <Select
                {...field}
                showSearch
                placeholder="Chọn sản phẩm"
                optionFilterProp="children"
                className="cursor-pointer"
              >
                {products.map((p) => (
                  <Select.Option key={p.id} value={p.id}>
                    {p.code}-{p.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        />
      </Col>

      <Col xs={24} sm={12} md={3}>
        <Controller
          name={`items.${index}.unitId`}
          control={control}
          render={({ field }) => (
            <Form.Item label="Đơn vị" required>
              <Select {...field} placeholder="Chọn đơn vị">
                {units.map((unit: ProductUnitDto) => (
                  <Select.Option key={unit.id} value={unit.id}>
                    {unit.unitName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        />
      </Col>
      <Col xs={12} sm={6} md={3}>
        <Controller
          name={`items.${index}.quantity`}
          control={control}
          render={({ field }) => (
            <Form.Item label="Số lượng">
              <InputNumber {...field} min={0} className="w-full" />
            </Form.Item>
          )}
        />
      </Col>
      <Col xs={12} sm={6} md={3}>
        <Form.Item label="Tồn kho">
          <InputNumber value={stockByUnit} disabled className="w-full" />
        </Form.Item>
      </Col>
      <Col xs={12} sm={6} md={3}>
        <Controller
          name={`items.${index}.unitPrice`}
          control={control}
          render={({ field }) => (
            <Form.Item label="Đơn giá">
              <InputNumber readOnly {...field} min={0} className="w-full" />
            </Form.Item>
          )}
        />
      </Col>

      <Col xs={12} sm={6} md={3}>
        <Form.Item label="Thành tiền">
          <InputNumber value={totalPrice} readOnly className="w-full" />
        </Form.Item>
      </Col>

      <Col xs={24} sm={2} className="flex items-center align-middle">
        <Flex justify="center">
          <Button icon={<DeleteOutlined />} danger onClick={() => remove(index)} />
        </Flex>
      </Col>
    </Row>
  )
}
