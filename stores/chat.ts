import { defineStore } from 'pinia'

/**
 * 占位：原客服聊天模块已随业务页移除，保留空实现以免 user / auth 插件报错。
 */
export const useChatStore = defineStore('chat', {
  state: () => ({}),
  actions: {
    initChat(_userId?: string, _nickname?: string, _avatar?: string) {},
    disconnectWebSocket() {},
    closeChat() {}
  }
})
