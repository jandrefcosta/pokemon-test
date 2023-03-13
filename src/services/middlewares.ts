import Axios from 'axios'

export async function authorizationInterceptor(config: any) {
  const { headers } = config  
  return config
}

export function errorRequestInterceptor(error: any) {
  return Promise.reject(error)
}

export function successResponseInterceptor(response: any) {
  return response
}

export function errorResponseInterceptor(error: any) {
  return Promise.reject(error)
}