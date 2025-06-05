'use client'

import { DeleteOutlined } from '@ant-design/icons'
import { Button, Col, Flex, Form, InputNumber, Row, Select } from 'antd'
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'

import { type ProductUnitDto } from '@/api-sdk'
import { type StockCheckFormValues } from '@/constants/schema'
interface StockCheckItemRowProps {
  index: number
  remove: (index: number) => void
  control: any
  setValue: any
  products: any[]
  watchedDetails: StockCheckFormValues['details']
}

export const StockCheckItemRow = ({
  index,
  remove,
  control,
  setValue,
  products,
  watchedDetails,
}: StockCheckItemRowProps) => {
  const selectedProductId = watchedDetails?.[index]?.productId
  const selectedProduct = products.find((p) => p.id === selectedProductId)
  const units = selectedProduct?.productUnits ?? []

  const selectedUnitId = watchedDetails?.[index]?.unitId
  const selectedUnit = units.find((u: ProductUnitDto) => u.id === selectedUnitId)

  useEffect(() => {
    if (selectedProduct && selectedUnit) {
      const baseStock = selectedProduct.stock || 0
      const stockByUnit = baseStock * selectedUnit.conversionFactor
      setValue(`details.${index}.quantityInStock`, stockByUnit)
    }
  }, [selectedProduct, selectedUnit, index, setValue])

  return (
    <Row gutter={[16, 16]} className="w-full">
      <Col xs={24} sm={12} md={6}>
        <Controller
          name={`details.${index}.productId`}
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

      <Col xs={24} sm={12} md={4}>
        <Controller
          name={`details.${index}.unitId`}
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

      <Col xs={12} sm={6} md={4}>
        <Controller
          name={`details.${index}.quantityInStock`}
          control={control}
          render={({ field }) => (
            <Form.Item label="Tồn kho">
              <InputNumber disabled {...field} min={0} className="w-full" />
            </Form.Item>
          )}
        />
      </Col>

      <Col xs={12} sm={6} md={4}>
        <Controller
          name={`details.${index}.quantityActual`}
          control={control}
          render={({ field }) => (
            <Form.Item label="Thực tế">
              <InputNumber {...field} min={0} className="w-full" />
            </Form.Item>
          )}
        />
      </Col>

      <Col xs={24} sm={2} className="flex items-center align-middle">
        <Flex justify="center">
          <Button icon={<DeleteOutlined />} danger onClick={() => remove(index)} />
        </Flex>
      </Col>
    </Row>
  )
}
