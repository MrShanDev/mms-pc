/**
 * API 配置 - 三环境区分
 * 环境由 NUXT_PUBLIC_APP_ENV（mms 启动时传入）或 NODE_ENV 决定
 *
 * 路由划分：
 * - appApiUrl → mms-servers-api：会员、游戏、订单/支付、基础、登录(会员)
 * - chatApiUrl / chatWsUrl → mms-servers-mi：客服通信、聊天、WebSocket
 */

// ---------- 需修改的地址（放上面） ----------
// 启动命令： npm run local
// api 端口 8080，open 端口 8060，mi 端口 8050
const LOCAL_APP_URL = 'http://localhost:8070'
const LOCAL_CHAT_URL = 'http://localhost:8050'
const LOCAL_WS_URL = 'ws://localhost:8050/ws'

// 启动命令： npm run dev / npm run prod
// nginx 需代理 /prod-api→api、/prod-mi→mi
const DEV_APP_URL = 'https://banmaid.com/prod-api'
const DEV_CHAT_URL = 'https://banmaid.com/prod-mi'
const DEV_WS_URL = 'wss://banmaid.com/prod-mi/ws'

const PROD_APP_URL = 'https://banmaid.com/prod-api'
const PROD_CHAT_URL = 'https://banmaid.com/prod-mi'
const PROD_WS_URL = 'wss://banmaid.com/prod-mi/ws'

// ---------- 聊天相关开关 ----------
/** 聊天窗口消息轮询（5 秒补漏）：true=开启，false=关闭（调试时可关闭） */
export const CHAT_MESSAGE_POLLING_ENABLED = false

// ---------- 以下无需修改 ----------
type Env = 'local' | 'dev' | 'prod'
const rawEnv = process.env.NUXT_PUBLIC_APP_ENV ?? ''
const isDevMode = process.env.NODE_ENV === 'development'
const currentEnv: Env = (['local', 'dev', 'prod'].includes(rawEnv) ? rawEnv : isDevMode ? 'local' : 'prod') as Env

const LOCAL = { appApiUrl: LOCAL_APP_URL, chatApiUrl: LOCAL_CHAT_URL, wsUrl: LOCAL_WS_URL }
const DEV = { appApiUrl: DEV_APP_URL, chatApiUrl: DEV_CHAT_URL, wsUrl: DEV_WS_URL }
const PROD = { appApiUrl: PROD_APP_URL, chatApiUrl: PROD_CHAT_URL, wsUrl: PROD_WS_URL }

const envConfig = { local: LOCAL, dev: DEV, prod: PROD }
export const apiConfig = envConfig[currentEnv]
export { currentEnv }
