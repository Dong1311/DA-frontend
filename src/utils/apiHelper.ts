export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const url = `${apiUrl}${endpoint}`

  const response = await fetch(url, {
    ...options,
  })

  if (!response.ok) {
    throw new Error('API call failed')
  }

  const contentType = response.headers.get('Content-Type')
  if (contentType && contentType.includes('application/json')) {
    return response.json()
  } else {
    throw new Error('Expected JSON response')
  }
}
