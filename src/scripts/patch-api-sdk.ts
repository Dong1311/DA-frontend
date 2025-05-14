/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs')
const path = require('path')

const sdkDir = path.resolve(__dirname, '../api-sdk/core')

// === PATCH request.ts ===
const requestPath = path.join(sdkDir, 'request.ts')
let requestContent = fs.readFileSync(requestPath, 'utf-8')
requestContent = requestContent.replace(
  'axiosClient: AxiosInstance = axios',
  "axiosClient: AxiosInstance = require('@/lib/axios').default"
)
fs.writeFileSync(requestPath, requestContent)

// === PATCH OpenAPI.ts ===
const openApiPath = path.join(sdkDir, 'OpenAPI.ts')
let openApiContent = fs.readFileSync(openApiPath, 'utf-8')

let modified = false

if (openApiContent.includes('WITH_CREDENTIALS: false')) {
  openApiContent = openApiContent.replace('WITH_CREDENTIALS: false', 'WITH_CREDENTIALS: true')
  modified = true
}

if (modified) {
  fs.writeFileSync(openApiPath, openApiContent)
  console.log('✅ Patched OpenAPI.ts successfully!')
} else {
  console.log('ℹ️ OpenAPI.ts already patched.')
}

console.log('✅ SDK patched!')
