<template>
  <div class="error-page">
    <div class="error-content">
      <!-- 左侧404插画 -->
      <div class="error-illustration">
        <div class="illustration-wrapper">
          <div class="ghost">👻</div>
          <div class="tombstone">
            <span class="tombstone-text">R.I.P</span>
          </div>
          <div class="number-four left">4</div>
          <div class="number-four right">4</div>
        </div>
      </div>

      <!-- 右侧错误信息 -->
      <div class="error-info">
        <h1 class="error-code">{{ t('errors.pageNotFound') }}</h1>
        <p class="error-message">{{ t('errors.notFoundMessage') }}</p>
        <el-button 
          type="warning" 
          class="back-btn" 
          @click="goHome"
        >
          {{ t('errors.backHome') }}
        </el-button>
        <p class="error-hint">{{ t('errors.notFoundHint') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

const router = useRouter()
const { t } = useAppLocale()
const { locale } = useI18n()

definePageMeta({
  title: '404',
  requiresAuth: false,
  layout: 'empty'
})

useHead(() => ({
  title: t('errors.notFoundMeta'),
  meta: [{ name: 'robots', content: 'noindex' }],
  htmlAttrs: {
    lang: getLocaleLanguage(locale.value),
    dir: getLocaleDir(locale.value)
  }
}))

/**
 * 返回首页
 */
const goHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.error-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #FFDBB5 0%, #F3F3F3 400px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.error-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  max-width: 900px;
  width: 100%;
}

// 左侧插画区域
.error-illustration {
  flex-shrink: 0;

  .illustration-wrapper {
    position: relative;
    width: 200px;
    height: 180px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  // 幽灵
  .ghost {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 50px;
    animation: float 2s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(-10px);
    }
  }

  // 墓碑
  .tombstone {
    width: 80px;
    height: 100px;
    background: linear-gradient(180deg, #F5923A 0%, #E68525 100%);
    border-radius: 40px 40px 8px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 4px 15px rgba(245, 146, 58, 0.3);

    &::before {
      content: '';
      position: absolute;
      bottom: -10px;
      left: -20px;
      right: -20px;
      height: 20px;
      background: rgba(245, 146, 58, 0.2);
      border-radius: 50%;
    }

    .tombstone-text {
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 2px;
    }
  }

  // 数字4
  .number-four {
    position: absolute;
    bottom: 0;
    font-size: 80px;
    font-weight: 700;
    color: #F5923A;
    line-height: 1;

    &.left {
      left: 10px;
    }

    &.right {
      right: 10px;
    }
  }
}

// 右侧错误信息区域
.error-info {
  text-align: left;

  .error-code {
    font-size: 72px;
    color: #333;
    margin: 0 0 10px 0;
    line-height: 1;
  }

  .error-message {
    font-size: 16px;
    color: #4E5969;
    margin: 0 0 24px 0;
  }

  .back-btn {
    width: 120px;
    height: 40px;
    border-radius: 8px;
    background: #F5923A;
    border: none;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 16px;

    &:hover {
      opacity: 0.9;
    }
  }

  .error-hint {
    font-size: 13px;
    color: #999;
    margin: 0;
    max-width: 280px;
    line-height: 1.6;
  }
}

// 响应式设计
@media screen and (max-width: 768px) {
  .error-content {
    flex-direction: column;
    gap: 30px;
  }

  .error-info {
    text-align: center;

    .error-code {
      font-size: 56px;
    }

    .error-message {
      font-size: 14px;
    }

    .error-hint {
      max-width: 100%;
    }
  }

  .error-illustration {
    .illustration-wrapper {
      width: 160px;
      height: 150px;
    }

    .ghost {
      font-size: 40px;
    }

    .tombstone {
      width: 65px;
      height: 80px;

      .tombstone-text {
        font-size: 12px;
      }
    }

    .number-four {
      font-size: 60px;

      &.left {
        left: 5px;
      }

      &.right {
        right: 5px;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .error-page {
    padding: 40px 20px;
  }

  .error-info {
    .error-code {
      font-size: 48px;
    }

    .back-btn {
      width: 100%;
    }
  }
}
</style>
