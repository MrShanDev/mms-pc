/**
 * 二维码登录轮询组合式函数
 */
import { ref } from 'vue'
import { qrCodePolling, getServiceQrCode } from '@/api/user'
import type { QrCodePollingData } from '@/api/user/type'
import { ElMessage } from 'element-plus'

export const useQrCodeLogin = () => {
    const isPolling = ref(false)
    const pollingData = ref<QrCodePollingData | null>(null)
    const qrCodeUrl = ref('')
    const uuid = ref('')
    const isLoading = ref(false)
    let pollingTimer: ReturnType<typeof setTimeout> | null = null

    /**
     * 获取服务号登录二维码
     * @param onSuccess 获取成功回调
     * @param onError 错误回调
     * @returns Promise<string | null> 返回UUID
     */
    const fetchServiceQrCode = async (
        onSuccess?: (uuid: string, qrCodeUrl?: string) => void,
        onError?: (error: any) => void
    ): Promise<string | null> => {
        if (isLoading.value) {
            console.warn('正在获取二维码...')
            return null
        }

        isLoading.value = true

        try {
            const response = await getServiceQrCode()

            if (response.code === 200 && response.data && response.data.uuid) {
                uuid.value = response.data.uuid
                // 优先 qrCodeUrl，兼容 url；dev 下 url 为 "123456" 时用二维码生成服务展示
                const rawUrl = response.data.qrCodeUrl || response.data.url || ''
                qrCodeUrl.value = rawUrl === '123456'
                    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=123456`
                    : rawUrl

                onSuccess?.(response.data.uuid, qrCodeUrl.value)
                return response.data.uuid
            } else {
                ElMessage.error(response.msg || '获取二维码失败')
                onError?.(response)
                return null
            }
        } catch (error: any) {
            console.error('获取服务号二维码失败:', error)
            ElMessage.error(error?.message || '获取二维码失败，请重试')
            onError?.(error)
            return null
        } finally {
            isLoading.value = false
        }
    }

    /**
     * 开始轮询二维码登录状态
     * @param uuid 二维码唯一标识
     * @param orderNo 订单号（可选）
     * @param interval 轮询间隔（毫秒），默认 2000ms
     * @param onSuccess 登录成功回调
     * @param onError 错误回调
     */
    const startPolling = (
        uuid: string,
        orderNo?: string,
        interval: number = 2000,
        onSuccess?: (data: QrCodePollingData) => void,
        onError?: (error: any) => void
    ) => {
        if (isPolling.value) {
            console.warn('轮询已在进行中')
            return
        }

        isPolling.value = true

        const poll = async () => {
            try {
                const response = await qrCodePolling({
                    uuid,
                    orderNo
                })

                if (response.code === 200 && response.status === true && response.data) {
                    // 登录成功
                    pollingData.value = response.data
                    stopPolling()
                    ElMessage.success('登录成功')
                    onSuccess?.(response.data)
                } else if (response.code === 200 && response.status === false) {
                    const pollState = (response.data as any)?.pollState
                    if (pollState === 'failed') {
                        stopPolling()
                        ElMessage.error(response.msg || '扫码失败')
                        onError?.(response)
                    } else {
                        // WAITING/SCANNED：继续轮询
                        pollingTimer = setTimeout(poll, interval)
                    }
                } else {
                    stopPolling()
                    ElMessage.error(response.msg || '登录失败')
                    onError?.(response)
                }
            } catch (error: any) {
                console.error('二维码登录轮询失败:', error)
                stopPolling()
                ElMessage.error(error?.message || '轮询失败，请重试')
                onError?.(error)
            }
        }

        // 开始第一次轮询
        poll()
    }

    /**
     * 停止轮询
     */
    const stopPolling = () => {
        if (pollingTimer) {
            clearTimeout(pollingTimer)
            pollingTimer = null
        }
        isPolling.value = false
    }

    /**
     * 获取二维码并开始轮询（一体化方法）
     * @param interval 轮询间隔（毫秒），默认 2000ms
     * @param onSuccess 登录成功回调
     * @param onError 错误回调
     */
    const startServiceQrCodeLogin = async (
        interval: number = 2000,
        onSuccess?: (data: QrCodePollingData) => void,
        onError?: (error: any) => void
    ) => {
        // 先获取二维码
        const fetchedUuid = await fetchServiceQrCode(
            (uuid) => {
                console.log('获取二维码成功, UUID:', uuid)
            },
            onError
        )

        // 如果获取成功，开始轮询
        if (fetchedUuid) {
            startPolling(fetchedUuid, undefined, interval, onSuccess, onError)
        }
    }

    /**
     * 重置状态
     */
    const reset = () => {
        stopPolling()
        pollingData.value = null
        qrCodeUrl.value = ''
        uuid.value = ''
        isLoading.value = false
    }

    return {
        isPolling,
        isLoading,
        pollingData,
        qrCodeUrl,
        uuid,
        fetchServiceQrCode,
        startPolling,
        startServiceQrCodeLogin,
        stopPolling,
        reset
    }
}
