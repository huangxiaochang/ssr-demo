import request from './index'

export function login(returnUrl: string) {
  window.location.href = `/api/Auth/login?returnurl=${returnUrl}`
  // return request.get<T>(`/api/Auth/login?returnurl=${returnUrl}`)
}

export function logout() {
  window.location.href = `/api/Auth/logout`
  // return request.get<T>(`/api/Auth/logout`)
}

export function getUserInfo<T = any>() {
  return request.get<T>(`/api/Auth/GetInfo`).then((response) => response.data)
}
