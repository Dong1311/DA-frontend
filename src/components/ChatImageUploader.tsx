import { PictureOutlined } from '@ant-design/icons'
import { Flex, message, Upload } from 'antd'
import type { UploadProps } from 'antd/es/upload/interface'

interface Props {
  uploadToS3: (file: File) => Promise<string>
  onUploaded: (url: string) => void
}

export const ChatImageUploader = ({ uploadToS3, onUploaded }: Props) => {
  const props: UploadProps = {
    showUploadList: false,
    beforeUpload: async (file) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error('Chỉ cho phép upload file ảnh.')
        return false
      }

      const url = await uploadToS3(file)
      onUploaded(url)
      return false
    },
  }

  return (
    <Upload {...props}>
      <Flex align="center">
        <button type="button" className="size-10 rounded border border-gray-300 hover:border-blue-500">
          <PictureOutlined />
        </button>
      </Flex>
    </Upload>
  )
}
