import { AutoComplete, message } from 'antd'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useProductSearch } from '@/hooks/product'

import type { ProductSaleFormDto } from './ProductTable'

export const ProductSelector = () => {
  const [searchValue, setSearchValue] = useState('')
  const { getValues, setValue } = useFormContext()

  const { data: searchResults } = useProductSearch(searchValue, 1, 1000)

  const items = searchResults?.items ?? []

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  const handleSelect = (productId: string) => {
    const product = items.find((p) => p.id === productId)
    // console.log(product)
    if (!product) return

    const current = getValues('products') as ProductSaleFormDto[]
    const exists = current.find((p) => p.id === product.id)
    if (exists) return

    const baseUnit = product.productUnits?.[0]
    if (!baseUnit) {
      message.error(`Sản phẩm "${product.code}" không có đơn vị`)
      return
    }

    setValue('products', [
      ...current,
      {
        id: product.id,
        code: product.code,
        quantity: 1,
        unitId: baseUnit.id,
        unitPrice: baseUnit.unitPrice,
        stock: product.stock,
        totalPrice: baseUnit.unitPrice,
        images: product.images ?? [],
        productUnits: product.productUnits ?? [],
      },
    ])

    setSearchValue('')
  }

  return (
    <AutoComplete
      style={{ width: '100%' }}
      value={searchValue}
      onChange={handleSearch}
      onSearch={handleSearch}
      onSelect={handleSelect}
      options={items.map((product) => ({
        value: product.id,
        label: (
          <div className="flex items-center gap-2">
            <img
              src={product.images?.[0]?.url || '/images/noimage.png'}
              alt=""
              style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4 }}
            />
            <div>
              <div className="text-xs text-gray-500">{product.code}</div>
              <div>{product.name}</div>
            </div>
          </div>
        ),
      }))}
    />
  )
}
