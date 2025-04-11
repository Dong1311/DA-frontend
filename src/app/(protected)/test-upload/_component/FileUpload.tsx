'use client'
import { useState } from 'react'

import { apiCall } from '@/utils/apiHelper'
const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setError('Please select a file to upload')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const presignResponse = await apiCall(`/upload/presign?filename=${file.name}&mimetype=${file.type}`)
      if (!presignResponse || !presignResponse.uploadUrl || !presignResponse.publicUrl) {
        throw new Error('Missing uploadUrl or publicUrl in response')
      }

      if (!presignResponse.uploadUrl || !presignResponse.publicUrl) {
        throw new Error('Missing uploadUrl or publicUrl in response')
      }
      const { uploadUrl, publicUrl } = presignResponse

      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      })

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text()
        console.error('Upload failed with error:', errorText)
        throw new Error('Failed to upload file to S3')
      }

      setImageUrl(publicUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  )
}

export default FileUpload
