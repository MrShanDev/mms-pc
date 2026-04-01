// 文章类型定义
export interface Article {
  id: number | string
  title: string
  content: string
  createTime?: string
  viewCount?: number
  category: string,
  source?: string
}

// 分类标题映射
export const categoryTitles: Record<string, string> = {
  faq: '常见问题',
  seller: '卖家相关',
  buyer: '买家相关',
  security: '安全相关',
  aftersales: '售后相关'
}

// 各分类的文章列表数据
export const articleLists: Record<string, { id: number; title: string }[]> = {
  faq: [
    { id: 1, title: '如何注册斑马优号？' },
    { id: 2, title: '如何登录斑马优号？' },
    { id: 3, title: '忘记密码，如何找回？' },
    { id: 4, title: '如何设置头像和昵称？' },
    { id: 5, title: '实名认证常见问题？' },
    { id: 6, title: '如何设置登录密码/支付密码？' },
    { id: 7, title: '如何设置/换绑手机号码？' },
    { id: 8, title: '如何开启/关闭登陆验证？' },
    { id: 9, title: '如何绑定/解绑第三方快捷登录？' },
    { id: 10, title: '如何进行消息设置？' },
    { id: 11, title: '如何维护游戏收货角色？' },
    { id: 12, title: '账号提示被冻结，无法使用怎么办？' },
    { id: 13, title: '关注斑马优号微信公众号' },
    { id: 14, title: '命运方舟游戏内邮寄税率查询' }
  ],
  seller: [
    { id: 1, title: '如何成为卖家？' },
    { id: 2, title: '如何发布商品？' },
    { id: 3, title: '商品定价有什么建议？' },
    { id: 4, title: '如何提高商品曝光率？' },
    { id: 5, title: '买家付款后如何发货？' },
    { id: 6, title: '交易完成后如何提现？' },
    { id: 7, title: '卖家手续费如何计算？' },
    { id: 8, title: '如何处理买家的售后申请？' }
  ],
  buyer: [
    { id: 1, title: '如何购买商品？' },
    { id: 2, title: '支持哪些支付方式？' },
    { id: 3, title: '如何确认收货？' },
    { id: 4, title: '购买后多久可以收到商品？' },
    { id: 5, title: '如何申请售后/退款？' },
    { id: 6, title: '订单状态说明' },
    { id: 7, title: '如何联系卖家？' },
    { id: 8, title: '购买商品有什么保障？' }
  ],
  security: [
    { id: 1, title: '如何保护账号安全？' },
    { id: 2, title: '如何识别诈骗行为？' },
    { id: 3, title: '交易安全注意事项' },
    { id: 4, title: '如何设置强密码？' },
    { id: 5, title: '账号被盗怎么办？' },
    { id: 6, title: '如何开启二次验证？' },
    { id: 7, title: '个人信息保护说明' },
    { id: 8, title: '举报违规行为' }
  ],
  aftersales: [
    { id: 1, title: '售后政策说明' },
    { id: 2, title: '如何申请退款？' },
    { id: 3, title: '退款需要多长时间？' },
    { id: 4, title: '哪些情况可以申请售后？' },
    { id: 5, title: '售后申请被拒绝怎么办？' },
    { id: 6, title: '如何联系平台客服？' },
    { id: 7, title: '投诉与建议渠道' },
    { id: 8, title: '售后纠纷处理流程' }
  ]
}

// 文章详情数据
export const articleDetails: Record<string, Article> = {
  // 常见问题详情
  'faq-1': {
    id: 1,
    category: 'faq',
    title: '如何注册斑马优号？',
    content: `
      <p>欢迎使用斑马优号！以下是注册步骤：</p>
      <h3>方式一：手机号注册</h3>
      <ol>
        <li>打开斑马优号官网或APP</li>
        <li>点击"注册"按钮</li>
        <li>输入您的手机号码</li>
        <li>获取并输入验证码</li>
        <li>设置登录密码</li>
        <li>完成注册</li>
      </ol>
      <h3>方式二：第三方快捷登录</h3>
      <p>您也可以使用微信、QQ等第三方账号快速登录注册。</p>
    `,
    createTime: '2024-01-15',
    viewCount: 1520,
    source: '班马优号'
  },
  'faq-2': {
    id: 2,
    category: 'faq',
    title: '如何登录斑马优号？',
    content: `
      <p>登录斑马优号有多种方式：</p>
      <ul>
        <li>手机号 + 密码登录</li>
        <li>手机号 + 验证码登录</li>
        <li>微信/QQ第三方快捷登录</li>
      </ul>
      <p>如遇登录问题，请联系客服。</p>
    `,
    createTime: '2024-01-15',
    viewCount: 980,
    source: '班马优号'
  },
  // 卖家相关详情
  'seller-1': {
    id: 1,
    category: 'seller',
    title: '如何成为卖家？',
    content: `
      <p>成为斑马优号卖家非常简单：</p>
      <ol>
        <li>注册并登录斑马优号账号</li>
        <li>完成实名认证</li>
        <li>在个人中心点击"成为卖家"</li>
        <li>阅读并同意卖家协议</li>
        <li>开始发布您的商品</li>
      </ol>
    `,
    createTime: '2024-01-15',
    viewCount: 856,
    source: '班马优号'
  },
  // 买家相关详情
  'buyer-1': {
    id: 1,
    category: 'buyer',
    title: '如何购买商品？',
    content: `
      <p>购买商品的步骤：</p>
      <ol>
        <li>浏览商品列表，找到心仪的商品</li>
        <li>查看商品详情，确认信息无误</li>
        <li>点击"立即购买"按钮</li>
        <li>选择支付方式完成付款</li>
        <li>等待卖家发货</li>
        <li>确认收货完成交易</li>
      </ol>
    `,
    createTime: '2024-01-15',
    viewCount: 1230,
    source: '班马优号'
  },
  // 安全相关详情
  'security-1': {
    id: 1,
    category: 'security',
    title: '如何保护账号安全？',
    content: `
      <p>保护账号安全的建议：</p>
      <ul>
        <li>设置强密码，包含字母、数字和特殊字符</li>
        <li>开启登录二次验证</li>
        <li>不要在公共设备上保存密码</li>
        <li>定期修改密码</li>
        <li>不要轻信陌生人的链接</li>
        <li>绑定手机号和邮箱用于账号找回</li>
      </ul>
    `,
    createTime: '2024-01-15',
    viewCount: 678,
    source: '班马优号'
  },
  // 售后相关详情
  'aftersales-1': {
    id: 1,
    category: 'aftersales',
    title: '售后政策说明',
    content: `
      <p>斑马优号售后政策：</p>
      <h3>可申请售后的情况</h3>
      <ul>
        <li>商品与描述严重不符</li>
        <li>卖家未在约定时间内发货</li>
        <li>收到的商品存在质量问题</li>
      </ul>
      <h3>售后流程</h3>
      <ol>
        <li>在订单详情页点击"申请售后"</li>
        <li>选择售后原因并提交凭证</li>
        <li>等待平台审核</li>
        <li>审核通过后完成退款</li>
      </ol>
    `,
    createTime: '2024-01-15',
    viewCount: 445,
    source: '班马优号'
  }
}

/**
 * 获取文章详情
 * @param category - 分类
 * @param id - 文章ID
 */
export function getArticleDetail(category: string, id: string | number): Article | null {
  const key = `${category}-${id}`
  return articleDetails[key] || null
}
