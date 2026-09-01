import { defineStore } from 'pinia'
import type { UserInfo } from '@/api/user/type'
import { getUserInfo } from '@/api/user'
import {
    getLocalStorageItem,
    setLocalStorageItem,
    removeLocalStorageItem,
    getSessionStorageItem,
    setSessionStorageItem,
    removeSessionStorageItem
} from '@/utils/browser'

interface UserState {
    user: UserInfo | null
    token: string | null
    refreshToken: string | null
    isLoggedIn: boolean
    permissions: string[]
    roles: string[]
}

export const useUserStore = defineStore('user', {
    state: (): UserState => {
        // 默认值
        let token = null
        let refreshToken = null
        let isLoggedIn = false
        let user = null
        let permissions: string[] = []
        let roles: string[] = []

        // 尝试从 localStorage 恢复数据 - 确保在客户端环境下总是执行
        // 注意：在 Nuxt 中，有时即使配置了 ssr: false，initialization 也可能在服务端发生
        // 所以我们检查 window 对象是否存在来判断是否在浏览器环境中
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            try {
                // 优先从 localStorage 恢复，其次 sessionStorage（支持未勾选自动登录的会话存储）
                token = getLocalStorageItem('token') || getSessionStorageItem('token') || null
                refreshToken = getLocalStorageItem('refreshToken') || getSessionStorageItem('refreshToken') || null

                const userStr = getLocalStorageItem('userInfo') || getSessionStorageItem('userInfo')
                if (userStr) {
                    try {
                        user = JSON.parse(userStr)
                    } catch (e) {
                        // 解析用户信息失败，使用默认值
                    }
                }
                
                const permissionsStr = getLocalStorageItem('permissions') || getSessionStorageItem('permissions')
                if (permissionsStr) {
                    try {
                        permissions = JSON.parse(permissionsStr)
                    } catch (e) {
                        // 解析权限信息失败，使用默认值
                    }
                }
                
                const rolesStr = getLocalStorageItem('roles') || getSessionStorageItem('roles')
                if (rolesStr) {
                    try {
                        roles = JSON.parse(rolesStr)
                    } catch (e) {
                        // 解析角色信息失败，使用默认值
                    }
                }
                
                isLoggedIn = !!token && !!user  // 只有当 token 和用户信息都存在时才认为已登录
            } catch (error) {
                // localStorage 访问失败，使用默认值
            }
        }

        return {
            user,
            token,
            refreshToken,
            isLoggedIn,
            permissions,
            roles
        }
    },

    getters: {
        getUser: (state) => state.user,
        getIsLoggedIn: (state) => state.isLoggedIn,
        getToken: (state) => state.token,
        getPermissions: (state) => state.permissions,
        getRoles: (state) => state.roles,
        hasPermission: (state) => {
            return (permission: string) => state.permissions.includes(permission)
        },
        hasRole: (state) => {
            return (role: string) => state.roles.includes(role)
        }
    },

    actions: {
        /**
         * 设置用户信息
         * @param userData 用户数据
         * @param options.persistent 是否持久化（自动登录）：true 使用 localStorage，false 使用 sessionStorage（关闭浏览器/标签页后失效）
         */
        setUser(userData: UserInfo & { token?: string, refreshToken?: string }, options?: { persistent?: boolean }) {
            if (!userData) {
                console.warn('setUser: userData is null or undefined')
                return
            }
            const persistent = options?.persistent !== false

            // 兜底：部分接口（如 tokenLogin 旧版/缓存）可能未返回 hasPayPassword，用 payPassword 推断
            if (userData.hasPayPassword !== true && userData.payPassword && String(userData.payPassword).length > 0) {
                userData = { ...userData, hasPayPassword: true }
            }
            this.user = userData
            // 兜底：部分接口（如 tokenLogin 缓存）可能未返回 hasPayPassword，用 payPassword 推断
            if (this.user && this.user.hasPayPassword !== true && this.user.payPassword && String(this.user.payPassword).length > 0) {
                this.user = { ...this.user, hasPayPassword: true }
            }

            const setItem = persistent ? setLocalStorageItem : setSessionStorageItem
            if (typeof window !== 'undefined') {
                if (persistent) {
                    removeSessionStorageItem('token')
                    removeSessionStorageItem('refreshToken')
                    removeSessionStorageItem('userInfo')
                    removeSessionStorageItem('permissions')
                    removeSessionStorageItem('roles')
                } else {
                    removeLocalStorageItem('token')
                    removeLocalStorageItem('refreshToken')
                    removeLocalStorageItem('userInfo')
                    removeLocalStorageItem('permissions')
                    removeLocalStorageItem('roles')
                }
            }

            if (userData.token) {
                this.token = userData.token
                if (typeof window !== 'undefined') {
                    setItem('token', userData.token)
                }
            }

            if (userData.refreshToken) {
                this.refreshToken = userData.refreshToken
                if (typeof window !== 'undefined') {
                    setItem('refreshToken', userData.refreshToken)
                }
            }

            if (userData.permissions) {
                this.permissions = userData.permissions
                if (typeof window !== 'undefined') {
                    setItem('permissions', JSON.stringify(userData.permissions))
                }
            }

            if (userData.roles) {
                this.roles = userData.roles
                if (typeof window !== 'undefined') {
                    setItem('roles', JSON.stringify(userData.roles))
                }
            }

            if (typeof window !== 'undefined' && this.user) {
                // 仅保存基本用户信息，排除敏感数据
                const userInfoToSave = {
                    id: this.user.id,
                    phone: this.user.phone,
                    qq: this.user.qq,
                    contactPhone: this.user.contactPhone,
                    nickname: this.user.nickname,
                    headPortrait: this.user.headPortrait,
                    sex: this.user.sex,
                    birthday: this.user.birthday,
                    city: this.user.city,
                    signature: this.user.signature,
                    level: this.user.level,
                    reputationScore: this.user.reputationScore,
                    memberBgImg: this.user.memberBgImg,
                    tags: this.user.tags,
                    invitationCode: this.user.invitationCode,
                    lastLoginIp: this.user.lastLoginIp,
                    status: this.user.status,
                    sort: this.user.sort,
                    createdTime: this.user.createdTime,
                    remark: this.user.remark,
                    tenantId: this.user.tenantId,
                    revision: this.user.revision,
                    authentication: this.user.authentication,
                    hasAuthentication: this.user.hasAuthentication,
                    hasPayPassword: this.user.hasPayPassword,
                    payPassword: this.user.payPassword,
                    password: this.user.password,
                    account: this.user.account,
                    wxOpenid: this.user.wxOpenid,
                    alipayOpenid: this.user.alipayOpenid,
                    douyinOpenid: this.user.douyinOpenid,
                    email: this.user.email,
                    roles: this.user.roles,
                    permissions: this.user.permissions
                }
                setItem('userInfo', JSON.stringify(userInfoToSave))
            }

            this.isLoggedIn = true
        },

        logout() {
            this.user = null;
            this.token = null;
            this.refreshToken = null;
            this.permissions = [];
            this.roles = [];
            this.isLoggedIn = false;

            if (typeof window !== 'undefined') {
                removeLocalStorageItem('token')
                removeLocalStorageItem('refreshToken')
                removeLocalStorageItem('userInfo')
                removeLocalStorageItem('permissions')
                removeLocalStorageItem('roles')
                removeSessionStorageItem('token')
                removeSessionStorageItem('refreshToken')
                removeSessionStorageItem('userInfo')
                removeSessionStorageItem('permissions')
                removeSessionStorageItem('roles')
            }
        },

        /** 获取当前写入存储（根据 token 所在位置判断是持久化还是会话） */
        _getStorageWriter() {
            if (typeof window === 'undefined') return { set: setLocalStorageItem, remove: removeLocalStorageItem }
            const useLocal = !!getLocalStorageItem('token')
            return useLocal
                ? { set: setLocalStorageItem, remove: removeLocalStorageItem }
                : { set: setSessionStorageItem, remove: removeSessionStorageItem }
        },

        updateUser(userData: Partial<UserInfo>) {
            if (this.user) {
                this.user = { ...this.user, ...userData };

            if (userData.permissions) {
                this.permissions = userData.permissions
                if (typeof window !== 'undefined') {
                    const { set } = this._getStorageWriter()
                    set('permissions', JSON.stringify(userData.permissions))
                }
            }

            if (userData.roles) {
                this.roles = userData.roles
                if (typeof window !== 'undefined') {
                    const { set } = this._getStorageWriter()
                    set('roles', JSON.stringify(userData.roles))
                }
            }

                if (typeof window !== 'undefined') {
                    const { set } = this._getStorageWriter()
                    const userInfoToSave = {
                        id: this.user.id,
                        phone: this.user.phone,
                        qq: this.user.qq,
                        contactPhone: this.user.contactPhone,
                        nickname: this.user.nickname,
                        headPortrait: this.user.headPortrait,
                        sex: this.user.sex,
                        birthday: this.user.birthday,
                        city: this.user.city,
                        signature: this.user.signature,
                        level: this.user.level,
                        reputationScore: this.user.reputationScore,
                        memberBgImg: this.user.memberBgImg,
                        tags: this.user.tags,
                        invitationCode: this.user.invitationCode,
                        lastLoginIp: this.user.lastLoginIp,
                        status: this.user.status,
                        sort: this.user.sort,
                        createdTime: this.user.createdTime,
                        remark: this.user.remark,
                        tenantId: this.user.tenantId,
                        revision: this.user.revision,
                    authentication: this.user.authentication,
                    hasAuthentication: this.user.hasAuthentication,
                    hasPayPassword: this.user.hasPayPassword,
                        payPassword: this.user.payPassword,
                        password: this.user.password,
                        account: this.user.account,
                        wxOpenid: this.user.wxOpenid,
                        alipayOpenid: this.user.alipayOpenid,
                        douyinOpenid: this.user.douyinOpenid,
                        email: this.user.email,
                        roles: this.user.roles,
                        permissions: this.user.permissions
                    }
                    set('userInfo', JSON.stringify(userInfoToSave))
                }
            }
        },

        updateTokens(token: string, refreshToken: string) {
            this.token = token
            this.refreshToken = refreshToken
            if (typeof window !== 'undefined') {
                const { set } = this._getStorageWriter()
                set('token', token)
                set('refreshToken', refreshToken)
            }
        },

        clearTokens() {
            this.token = null
            this.refreshToken = null
            if (typeof window !== 'undefined') {
                removeLocalStorageItem('token')
                removeLocalStorageItem('refreshToken')
                removeSessionStorageItem('token')
                removeSessionStorageItem('refreshToken')
            }
        },

        /** 从服务器刷新用户信息 */
        async fetchUserInfo() {
            const res = await getUserInfo()
            if (res?.code === 200 && res?.data) {
                this.setUser({ ...res.data, token: this.token || undefined, refreshToken: this.refreshToken || undefined })
            }
        }
    }
})

export default useUserStore