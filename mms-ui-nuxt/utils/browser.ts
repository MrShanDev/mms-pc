/**
 * 浏览器环境相关的工具函数
 * 用于安全地访问浏览器 API，防止 SSR 错误
 */

/**
 * 检查是否在浏览器环境中
 */
export const isClient = typeof window !== 'undefined'

/**
 * 安全地访问 localStorage
 */
export function safeLocalStorage(): Storage | null {
    return isClient ? localStorage : null
}

/**
 * 安全地获取 localStorage 项
 */
export function getLocalStorageItem(key: string): string | null {
    const storage = safeLocalStorage()
    return storage ? storage.getItem(key) : null
}

/**
 * 安全地设置 localStorage 项
 */
export function setLocalStorageItem(key: string, value: string): void {
    const storage = safeLocalStorage()
    if (storage) {
        storage.setItem(key, value)
    }
}

/**
 * 安全地删除 localStorage 项
 */
export function removeLocalStorageItem(key: string): void {
    const storage = safeLocalStorage()
    if (storage) {
        storage.removeItem(key)
    }
}

/**
 * 安全地访问 sessionStorage
 */
export function safeSessionStorage(): Storage | null {
    return isClient ? sessionStorage : null
}

/**
 * 安全地获取 sessionStorage 项
 */
export function getSessionStorageItem(key: string): string | null {
    const storage = safeSessionStorage()
    return storage ? storage.getItem(key) : null
}

/**
 * 安全地设置 sessionStorage 项
 */
export function setSessionStorageItem(key: string, value: string): void {
    const storage = safeSessionStorage()
    if (storage) {
        storage.setItem(key, value)
    }
}

/**
 * 安全地删除 sessionStorage 项
 */
export function removeSessionStorageItem(key: string): void {
    const storage = safeSessionStorage()
    if (storage) {
        storage.removeItem(key)
    }
}

/**
 * 检查是否支持 localStorage
 */
export function supportsLocalStorage(): boolean {
    try {
        const storage = safeLocalStorage()
        if (!storage) return false

        const testKey = '__storage_test__'
        storage.setItem(testKey, testKey)
        const result = storage.getItem(testKey)
        storage.removeItem(testKey)
        return result === testKey
    } catch (e) {
        return false
    }
}