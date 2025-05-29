'use client'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Space } from 'antd'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

import { ControlledNumberInput } from '@/components/ControlledNumberInput'
import { type ProductFormValues } from '@/constants/schema'

interface ProductFormProps {
  isEdit: boolean
  showStock?: boolean
}

export const ProductForm = ({ isEdit, showStock = true }: ProductFormProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductFormValues>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productUnits',
  })

  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <Form.Item label="Mã sản phẩm" validateStatus={errors.code && 'error'} help={errors.code?.message}>
                <Input {...field} disabled={isEdit} />
              </Form.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Form.Item label="Tên sản phẩm" validateStatus={errors.name && 'error'} help={errors.name?.message}>
                <Input {...field} />
              </Form.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Controller
            name="shortName"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Tên rút gọn"
                validateStatus={errors.shortName && 'error'}
                help={errors.shortName?.message}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <ControlledNumberInput
            control={control}
            name="salePrice"
            label="Giá bán"
            errorMessage={errors.salePrice?.message}
          />
        </Col>

        <Col span={12}>
          <ControlledNumberInput
            control={control}
            name="costPrice"
            label="Giá nhập"
            errorMessage={errors.costPrice?.message}
          />
        </Col>

        {showStock && (
          <Col span={12}>
            <ControlledNumberInput
              control={control}
              name="stock"
              label="Số lượng"
              errorMessage={errors.stock?.message}
              disabled={isEdit}
            />
          </Col>
        )}
      </Row>

      <Form.Item label="Đơn vị sản phẩm">
        {fields.map((field, index) => (
          <Space key={field.id} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
            <Controller
              name={`productUnits.${index}.unitName`}
              control={control}
              defaultValue={field.unitName}
              rules={{ required: 'Vui lòng nhập tên đơn vị' }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.productUnits?.[index]?.unitName ? 'error' : undefined}
                  help={errors.productUnits?.[index]?.unitName?.message}
                  style={{ marginBottom: 0 }}
                >
                  <Input placeholder="Tên đơn vị (ví dụ: hộp, vỉ, viên)" {...field} />
                </Form.Item>
              )}
            />

            <Controller
              name={`productUnits.${index}.conversionFactor`}
              control={control}
              defaultValue={field.conversionFactor}
              rules={{
                required: 'Vui lòng nhập tỉ lệ quy đổi',
                min: { value: 0.0001, message: 'Tỉ lệ phải lớn hơn 0' },
              }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.productUnits?.[index]?.conversionFactor ? 'error' : undefined}
                  help={errors.productUnits?.[index]?.conversionFactor?.message}
                  style={{ marginBottom: 0 }}
                >
                  <InputNumber
                    type="number"
                    step="0.0001"
                    placeholder="Tỉ lệ quy đổi so với đơn vị cơ bản"
                    {...field}
                    disabled={index === 0}
                  />
                </Form.Item>
              )}
            />

            {index === 0 && (
              <Controller
                name={`productUnits.${index}.isBaseUnit`}
                control={control}
                defaultValue={field.isBaseUnit ?? true}
                render={() => (
                  <Checkbox checked disabled>
                    Đơn vị cơ bản
                  </Checkbox>
                )}
              />
            )}

            {index !== 0 && <MinusCircleOutlined onClick={() => remove(index)} style={{ color: 'red' }} />}
          </Space>
        ))}

        <Button
          type="dashed"
          onClick={() => append({ unitName: '', conversionFactor: 1, isBaseUnit: false })}
          block
          icon={<PlusOutlined />}
        >
          Thêm đơn vị
        </Button>
      </Form.Item>
    </Form>
  )
}
