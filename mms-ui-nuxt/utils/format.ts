/**
 * 日期格式化工具函数
 */

/**
 * 格式化日期为 MM-DD 格式
 * @param dateStr - 日期字符串
 * @returns 格式化后的日期字符串
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${month}-${day}`
}

/**
 * 格式化时间为"xx前"格式
 * @param dateStr - 日期字符串
 * @returns 相对时间字符串
 */
export function formatTimeAgo(dateStr: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 30) return `${days}天前`
  return dateStr.substring(0, 10)
}

/**
 * 获取文章描述（去除HTML标签并截取）
 * @param content - HTML内容
 * @param maxLength - 最大长度，默认100
 * @returns 纯文本描述
 */
export function getArticleDesc(content: string, maxLength: number = 100): string {
  if (!content) return ''
  // 去除HTML标签
  const text = content.replace(/<[^>]+>/g, '')
  // 截取指定长度
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}
