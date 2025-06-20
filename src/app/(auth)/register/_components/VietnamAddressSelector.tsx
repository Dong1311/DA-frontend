'use client'

import { Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface Province {
  code: string
  name: string
}

interface District {
  code: string
  name: string
}

interface Ward {
  code: string
  name: string
}

export const VietnamAddressSelector = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext()

  const [provinces, setProvinces] = useState<Province[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [wards, setWards] = useState<Ward[]>([])

  const [selectedProvince, setSelectedProvince] = useState<string>()
  const [selectedDistrict, setSelectedDistrict] = useState<string>()
  const [selectedWard, setSelectedWard] = useState<string>()
  const [streetAddress, setStreetAddress] = useState<string>('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/?depth=1')
      .then((res) => res.json())
      .then(setProvinces)
  }, [])

  useEffect(() => {
    if (!selectedProvince) return

    setLoading(true)
    fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data.districts || [])
        setWards([])
        setSelectedDistrict(undefined)
        setSelectedWard(undefined)
      })
      .finally(() => setLoading(false))
  }, [selectedProvince])

  useEffect(() => {
    if (!selectedDistrict) return

    setLoading(true)
    fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
      .then((res) => res.json())
      .then((data) => {
        setWards(data.wards || [])
        setSelectedWard(undefined)
      })
      .finally(() => setLoading(false))
  }, [selectedDistrict])

  useEffect(() => {
    const p = provinces.find((p) => p.code === selectedProvince)?.name || ''
    const d = districts.find((d) => d.code === selectedDistrict)?.name || ''
    const w = wards.find((w) => w.code === selectedWard)?.name || ''

    const full = [streetAddress, w, d, p].filter(Boolean).join(', ')
    setValue('storeAddress', full)
  }, [selectedProvince, selectedDistrict, selectedWard, streetAddress, provinces, districts, wards, setValue])

  return (
    <>
      <Form.Item label="Tỉnh/Thành phố" required>
        <Select
          showSearch
          placeholder="Chọn tỉnh/thành"
          options={provinces.map((p) => ({ value: p.code, label: p.name }))}
          onChange={(val) => setSelectedProvince(val)}
          value={selectedProvince}
          loading={loading}
        />
      </Form.Item>

      <Form.Item label="Quận/Huyện" required>
        <Select
          showSearch
          placeholder="Chọn quận/huyện"
          options={districts.map((d) => ({ value: d.code, label: d.name }))}
          onChange={(val) => setSelectedDistrict(val)}
          value={selectedDistrict}
          disabled={!selectedProvince}
          loading={loading}
        />
      </Form.Item>

      <Form.Item label="Phường/Xã" required>
        <Select
          showSearch
          placeholder="Chọn phường/xã"
          options={wards.map((w) => ({ value: w.code, label: w.name }))}
          onChange={(val) => setSelectedWard(val)}
          value={selectedWard}
          disabled={!selectedDistrict}
          loading={loading}
        />
      </Form.Item>

      <Form.Item
        label="Số nhà / tên đường"
        required
        validateStatus={errors.storeAddress && 'error'}
        help={errors.storeAddress?.message?.toString()}
      >
        <Input
          placeholder="Nhập số nhà, tên đường..."
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        />
      </Form.Item>

      <Controller name="storeAddress" control={control} render={({ field }) => <input type="hidden" {...field} />} />
    </>
  )
}
