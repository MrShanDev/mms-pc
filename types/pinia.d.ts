/**
 * Pinia persist 插件类型声明
 */
import 'pinia'

declare module 'pinia' {
    export interface DefineStoreOptionsBase<S, Store> {
        persist?: boolean | {
            key?: string
            storage?: Storage
            paths?: string[]
        }
    }
}
