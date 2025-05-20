import { Spin } from 'antd'

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <Spin size="large" />
        <p className="text-sm text-gray-500">Đang tải nội dung...</p>
      </div>
    </div>
  )
}
