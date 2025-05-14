import axios from 'axios'
import { useCallback } from 'react'

export const useUploadImage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const getPresignedUrl = useCallback(async (file: File) => {
    const { data } = await axios.get(`${baseUrl}/upload/presign`, {
      params: {
        filename: file.name,
        mimetype: file.type,
      },
    })
    return data as { uploadUrl: string; publicUrl: string }
  }, [])

  const uploadToS3 = useCallback(
    async (file: File) => {
      const { uploadUrl, publicUrl } = await getPresignedUrl(file)
      await axios.put(uploadUrl, file, {
        headers: { 'Content-Type': file.type },
      })
      return publicUrl
    },
    [getPresignedUrl]
  )

  return { uploadToS3 }
}
