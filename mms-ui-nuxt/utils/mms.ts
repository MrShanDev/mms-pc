/* eslint-disable */
import { http } from './request'
import * as config from '@/api/config'

/**
 * 获取环境配置
 * 注意：现在基础路径处理已集成到 request.ts 中，此函数仍保留以向后兼容
 */
export function getEnv(url: string): string {
  return config.apiConfig.appApiUrl + url
}

/**
 * 获取基础路径 - 用于在请求前处理URL
 */
export function getBasePath(): string {
  return config.apiConfig.appApiUrl;
}

/**
 * 构建完整URL
 */
export function buildFullUrl(path: string): string {
  // 如果已经是完整URL，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  const basePath = getBasePath();
  
  // 确保路径格式正确
  const normalizedPath = path.startsWith('/') ? path : '/' + path;
  return basePath + normalizedPath;
}
 

/**
 * 检查响应是否成功
 * @param code - 响应码
 * @returns 是否成功
 */
export function isSuccess(code: number): boolean {
  // 通常 200 代表成功
  return code === 200
}

/**
 * 获取错误消息
 * @param error - 错误对象
 * @returns 错误消息
 */
export function getErrorMessage(error: any): string {
  if (error && error.message) {
    return error.message
  }
  if (error && error.msg) {
    return error.msg
  }
  return '请求发生错误'
}

/**
 * 处理响应数据
 * @param response - 响应数据
 * @returns 处理后的数据
 */
export function handleResponseData<T>(response: any): T | null {
  if (response && isSuccess(response.code)) {
    return response.data as T
  }
  return null
}

/**
 * 通用 GET 请求
 * @param url - 请求地址
 * @param params - 请求参数
 * @returns Promise
 */
export function get<T>(url: string, params?: Record<string, any>): Promise<T> {
  return new Promise((resolve, reject) => {
    http.get<T>(buildFullUrl(url), { params })
      .then(response => {
        if (response && isSuccess(response.code)) {
          resolve(response.data as T)
        } else {
          reject(new Error(response.msg || response.message || '请求失败'))
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * 通用 POST 请求
 * @param url - 请求地址
 * @param data - 请求数据
 * @returns Promise
 */
export function post<T>(url: string, data?: any): Promise<T> {
  return new Promise((resolve, reject) => {
    http.post<T>(buildFullUrl(url), data)
      .then(response => {
        if (response && isSuccess(response.code)) {
          resolve(response.data as T)
        } else {
          reject(new Error(response.msg || response.message || '请求失败'))
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * 通用 PUT 请求
 * @param url - 请求地址
 * @param data - 请求数据
 * @returns Promise
 */
export function put<T>(url: string, data?: any): Promise<T> {
  return new Promise((resolve, reject) => {
    http.put<T>(buildFullUrl(url), data)
      .then(response => {
        if (response && isSuccess(response.code)) {
          resolve(response.data as T)
        } else {
          reject(new Error(response.msg || response.message || '请求失败'))
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * 通用 DELETE 请求
 * @param url - 请求地址
 * @returns Promise
 */
export function del<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    http.delete<T>(buildFullUrl(url))
      .then(response => {
        if (response && isSuccess(response.code)) {
          resolve(response.data as T)
        } else {
          reject(new Error(response.msg || response.message || '请求失败'))
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * 检查是否为有效的 URL
 * @param url - 待检查的 URL
 * @returns 是否有效
 */
export function isValidUrl(url: string): boolean {
  const reg = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/
  return reg.test(url)
}

/**
 * 格式化参数
 * @param params - 参数对象
 * @returns 格式化后的查询字符串
 */
export function formatParams(params: Record<string, any>): string {
  if (!params) return ''
  const arr: string[] = []
  Object.keys(params).forEach(key => {
    if (params[key] !== null && params[key] !== undefined) {
      arr.push(`${key}=${encodeURIComponent(params[key])}`)
    }
  })
  return arr.length > 0 ? `?${arr.join('&')}` : ''
}

/**
 * 深度合并对象
 * @param target - 目标对象
 * @param source - 源对象
 * @returns 合并后的对象
 */
export function deepMerge(target: any, source: any): any {
  const result = { ...target }
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key])
      ) {
        result[key] = deepMerge(result[key], source[key])
      } else {
        result[key] = source[key]
      }
    }
  }
  return result
}

/**
 * 休眠函数
 * @param ms - 休眠时间（毫秒）
 * @returns Promise
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 默认导出
export default {
  getEnv,
  isSuccess,
  getErrorMessage,
  handleResponseData,
  get,
  post,
  put,
  del,
  isValidUrl,
  formatParams,
  deepMerge,
  sleep
}