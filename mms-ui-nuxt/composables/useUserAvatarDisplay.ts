import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

/** 顶栏、个人中心侧栏等：头像 URL、首字母、展示名、脱敏手机 */
export function useUserAvatarDisplay() {
  const userStore = useUserStore()
  const runtimeConfig = useRuntimeConfig()

  const userAvatarSrc = computed(() => {
    const raw = userStore.user?.headPortrait
    if (!raw || !String(raw).trim()) return undefined
    const s = String(raw).trim()
    if (/^data:image\//i.test(s)) return s
    if (/^https?:\/\//i.test(s) || s.startsWith('//')) return s
    const base = String(runtimeConfig.public.appApiUrl ?? '').replace(/\/$/, '')
    if (!base) return s.startsWith('/') ? s : `/${s}`
    return s.startsWith('/') ? `${base}${s}` : `${base}/${s}`
  })

  const userDisplayInitial = computed(() => {
    const u = userStore.user
    if (!u) return '?'
    const n = (u.nickname || u.account || u.phone || '?').toString().trim()
    const ch = n.charAt(0)
    return ch ? ch.toUpperCase() : '?'
  })

  const displayName = computed(() => {
    const u = userStore.user
    if (!u) return ''
    return (u.nickname || u.account || u.phone || '').toString().trim() || '—'
  })

  const maskedPhone = computed(() => {
    const p = userStore.user?.phone
    if (!p || String(p).length < 7) return (p && String(p)) || '—'
    const s = String(p)
    if (s.length >= 11) return `${s.slice(0, 3)}****${s.slice(-4)}`
    return `${s.slice(0, 2)}****${s.slice(-2)}`
  })

  return { userAvatarSrc, userDisplayInitial, displayName, maskedPhone }
}
