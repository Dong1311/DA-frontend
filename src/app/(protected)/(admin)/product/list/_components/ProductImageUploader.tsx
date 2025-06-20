'use client'

import { PlusOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'

interface Props {
  fileList: UploadFile[]
  onChange: (fileList: UploadFile[]) => void
}

export const ProductImageUploader = ({ fileList, onChange }: Props) => {
  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error('Chỉ cho phép upload file ảnh (JPEG, PNG, WEBP...)')
      return Upload.LIST_IGNORE
    }
    return false
  }

  return (
    <Upload
      listType="picture-card"
      fileList={fileList}
      onChange={({ fileList }) => onChange(fileList)}
      beforeUpload={beforeUpload}
    >
      {fileList.length >= 5 ? null : (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      )}
    </Upload>
  )
}
