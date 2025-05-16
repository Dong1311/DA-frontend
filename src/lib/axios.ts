// import axios from 'axios'

// import { clearTokens, getAccessToken, setTokens } from './auth'

// const instance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
//   withCredentials: true,
// })

// instance.interceptors.request.use((config) => {
//   const token = getAccessToken()
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// instance.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true

//       try {
//         const res = await axios.post('http://localhost:5000/auth/refresh', {}, { withCredentials: true })
//         const { access_token, refresh_token } = res.data
//         setTokens(access_token, refresh_token)

//         originalRequest.headers.Authorization = `Bearer ${access_token}`
//         return instance(originalRequest)
//       } catch (refreshErr) {
//         clearTokens()
//         window.location.href = '/login'
//         return Promise.reject(refreshErr)
//       }
//     }

//     return Promise.reject(error)
//   }
// )
// export default instance
