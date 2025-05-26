import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

import type { ApiRequestOptions } from '../core/ApiRequestOptions'
import type { OnCancel } from '../core/CancelablePromise'
import { OpenAPI, type OpenAPIConfig } from '../core/OpenAPI'
import { sendRequest } from '../request/index'

let refreshPromise: Promise<any> | null = null

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const refreshAccessToken = async (): Promise<any> => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${OpenAPI.BASE}/auth/refresh`, {}, { withCredentials: true })
      .then(async (res) => {
        await wait(100)
        return res
      })
      .finally(() => {
        refreshPromise = null
      })
  }

  return refreshPromise
}


export const handle401AndRetry = async <T>(
  config: OpenAPIConfig,
  options: ApiRequestOptions,
  url: string,
  body: any,
  formData: any,
  headers: Record<string, string>,
  onCancel: OnCancel,
  axiosClient: AxiosInstance,
): Promise<AxiosResponse<T>> => {
  await refreshAccessToken()

  return await sendRequest<T>(
    config,
    options,
    url,
    body,
    formData,
    headers,
    onCancel,
    axiosClient
  )
}
