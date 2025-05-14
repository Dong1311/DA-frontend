import Cookies from 'js-cookie'

export const setTokens = (access: string, refresh: string) => {
  Cookies.set('access_token', access, { expires: 1 })
  Cookies.set('refresh_token', refresh, { expires: 7 })
}

export const getAccessToken = () => Cookies.get('access_token')
export const getRefreshToken = () => Cookies.get('refresh_token')

export const clearTokens = () => {
  Cookies.remove('access_token')
  Cookies.remove('refresh_token')
}
