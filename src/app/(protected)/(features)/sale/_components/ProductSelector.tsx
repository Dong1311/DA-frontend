import { AutoComplete } from 'antd'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { type ProductResponseDto } from '@/api-sdk'
import { useProductSearch } from '@/hooks/product'

export const ProductSelector = () => {
  const [searchValue, setSearchValue] = useState('')
  const { getValues, setValue } = useFormContext()

  const { data: searchResults = [] } = useProductSearch(searchValue)

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  const handleSelect = (productId: string) => {
    const product = searchResults.find((p) => p.id === productId)
    if (!product) return

    const current = getValues('products') as ProductResponseDto[]
    const exists = current.find((p) => p.id === product.id)
    if (!exists) {
      setValue('products', [
        ...current,
        {
          id: product.id,
          code: product.code,
          quantity: 1,
          unitPrice: product.salePrice,
          totalPrice: product.salePrice,
          images: product.images ?? [],
        },
      ])
    }
    setSearchValue('')
  }

  return (
    <AutoComplete
      style={{ width: '100%' }}
      value={searchValue}
      onChange={handleSearch}
      onSearch={handleSearch}
      onSelect={handleSelect}
      options={searchResults.map((product) => ({
        value: product.id,
        label: (
          <div className="flex items-center gap-2">
            <img
              src={product.images?.[0]?.url || '/images/noimage.png'}
              alt={''}
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
