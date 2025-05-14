'use client'

import { PlusOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'

interface Props {
  fileList: UploadFile[]
  onChange: (fileList: UploadFile[]) => void
}

export const ProductImageUploader = ({ fileList, onChange }: Props) => {
  return (
    <Upload
      listType="picture-card"
      fileList={fileList}
      onChange={({ fileList }) => onChange(fileList)}
      beforeUpload={() => false}
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
