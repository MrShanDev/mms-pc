import { http } from '@/utils/request'
import type { ApiResponse } from '@/types/request'
import type {
    GetArticleListRequest,
    GetArticleListResponse,
    ArticleCateInfo,
    ArticleInfo
} from './type'

// 重新导出类型供外部使用
export type { ArticleCateInfo, ArticleInfo, GetArticleListRequest, GetArticleListResponse }

/**
 * 获取文章分类列表
 * @param fatherId 父级ID（可选）
 * @returns Promise<ApiResponse<ArticleCateInfo[]>>
 */
export const getArticleCateList = (fatherId?: string): Promise<ApiResponse<ArticleCateInfo[]>> => {
    const url = fatherId
        ? `/article/v1/listCate?fatherId=${fatherId}`
        : '/article/v1/listCate'
    return http.post<ArticleCateInfo[]>(url)
}

/**
 * 获取文章列表
 * @param params 请求参数
 * @returns Promise<ApiResponse<GetArticleListResponse>>
 */
export const getArticleList = (params: GetArticleListRequest): Promise<ApiResponse<GetArticleListResponse>> => {
    const { cateId, pageSize = 10, pageNum = 1 } = params
    return http.get<GetArticleListResponse>(`/article/v1/listArticle?cateId=${cateId}&pageSize=${pageSize}&pageNum=${pageNum}`)
}

/**
 * 获取文章详情
 * @param id 文章ID
 * @returns Promise<ApiResponse<ArticleInfo>>
 */
export const getArticleById = (id: string): Promise<ApiResponse<ArticleInfo>> => {
    return http.get<ArticleInfo>(`/article/v1/queryArticleById?id=${id}`)
}

/**
 * 获取公告列表（分类ID=2019658329917108229）
 * @param pageSize 每页条数，默认3
 * @param pageNum 页码，默认1
 * @returns Promise<ApiResponse<GetArticleListResponse>>
 */
export const getNoticeList = (pageSize: number = 3, pageNum: number = 1): Promise<ApiResponse<GetArticleListResponse>> => {
    return getArticleList({ cateId: '2019658329917108229', pageSize, pageNum })
}

/**
 * 增加文章浏览量
 * @param id 文章ID
 * @returns Promise<ApiResponse<void>>
 */
export const incrementArticleViewCount = (id: string): Promise<ApiResponse<void>> => {
    return http.post<void>(`/article/v1/incrementViewCount?id=${id}`)
}
