'use client'
import { PlusOutlined } from '@ant-design/icons'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import { Image, message, Upload } from 'antd'
import type { RcFile } from 'antd/es/upload'
import React, { useState } from 'react'

import { Button } from '@/components'
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export const UploadCpn: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const handleCustomRequest: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
    try {
      const rcFile = file as RcFile
      const filename = encodeURIComponent(rcFile.name)
      const mimetype = rcFile.type

      const res = await fetch(`http://localhost:5000/upload/presign?filename=${filename}&mimetype=${mimetype}`)

      const { uploadUrl, publicUrl } = await res.json()

      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': mimetype },
        body: rcFile,
      })

      if (!uploadRes.ok) throw new Error('Upload failed')

      setFileList((prevList) =>
        prevList.map((f) => (f.uid === (file as UploadFile).uid ? { ...f, status: 'done', url: publicUrl } : f))
      )

      onSuccess?.(uploadRes, file)
    } catch (err) {
      console.error('Upload error:', err)
      message.error('Upload failed')
      onError?.(err as any)
    }
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )
  const handleSubmit = async () => {
    const uploadedFiles = fileList.filter((file) => file.status === 'done' && file.url)

    if (uploadedFiles.length === 0) {
      message.warning('Chưa có ảnh nào được upload.')
      return
    }

    const urls = uploadedFiles.map((f) => f.url)

    try {
      const res = await fetch('/api/save-image-urls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls }),
      })

      if (!res.ok) throw new Error('Lưu thất bại')

      message.success('Lưu ảnh thành công!')
    } catch (err) {
      console.error(err)
      message.error('Có lỗi khi lưu ảnh.')
    }
  }

  return (
    <>
      <Upload
        customRequest={handleCustomRequest}
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
      {fileList.length > 0 && (
        <Button type="primary" onClick={handleSubmit} className="mt-4">
          Lưu ảnh
        </Button>
      )}
    </>
  )
}
