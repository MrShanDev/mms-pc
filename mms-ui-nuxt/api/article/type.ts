/**
 * 文章公告相关类型定义
 */

// 文章基础信息
export interface ArticleInfo {
  id: string
  title: string
  coverImg: string
  tag: string
  author: string
  articleCateId: string
  articleCateName: string
  content: string
  memberId: string
  status: number
  viewCount: number
  createdTime: string
  updatedTime: string
}

// 文章分类信息
export interface ArticleCateInfo {
  id: string
  cateName: string
  parentId: string
  level: number
  icon: string
  status: number
  children?: ArticleCateInfo[]
}

// 获取文章列表请求参数
export interface GetArticleListRequest {
  cateId: string        // 分类ID（必填）
  pageSize?: number     // 每页条数，默认10
  pageNum?: number      // 页码，默认1
}

// 获取文章列表响应数据
export interface GetArticleListResponse {
  rows: ArticleInfo[]
  total: number
}
