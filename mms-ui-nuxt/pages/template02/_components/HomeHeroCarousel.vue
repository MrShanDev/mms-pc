<template>
  <!--
    对齐 361.mstore 首页首屏：h700 背景图 + overlay + 左侧约 7/12 文案 + primary 标题 + More 按钮
    参考：https://361.mstore.demo.mingsoft.net/html/web/index.html （ftco-blocks-cover-1 / site-section-cover overlay h700）
  -->
  <section class="ms361-hero" :aria-label="t('demo.common.heroBannerAria')">
    <div v-if="slides.length <= 1">
      <div
        v-for="(s, i) in slides"
        :key="i"
        class="ms361-hero__cover"
        :style="{ backgroundImage: `url(${s.image})` }"
      >
        <div class="ms361-hero__overlay" aria-hidden="true" />
        <div class="ms361-hero__container">
          <div class="ms361-hero__align">
            <div class="ms361-hero__copy">
              <h1 class="ms361-hero__title">{{ s.title }}</h1>
              <p v-if="s.lead" class="ms361-hero__lead">{{ s.lead }}</p>
              <p class="ms361-hero__action">
                <a href="javascript:;" class="ms361-hero__btn">{{ s.more }}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-carousel
      v-else
      class="ms361-hero__carousel"
      height="700px"
      arrow="hover"
      :interval="6000"
      indicator-position="outside"
    >
      <el-carousel-item v-for="(s, i) in slides" :key="i">
        <div class="ms361-hero__cover" :style="{ backgroundImage: `url(${s.image})` }">
          <div class="ms361-hero__overlay" aria-hidden="true" />
          <div class="ms361-hero__container">
            <div class="ms361-hero__align">
              <div class="ms361-hero__copy">
                <h1 class="ms361-hero__title">{{ s.title }}</h1>
                <p v-if="s.lead" class="ms361-hero__lead">{{ s.lead }}</p>
                <p class="ms361-hero__action">
                  <a href="javascript:;" class="ms361-hero__btn">{{ s.more }}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

export type HomeHeroSlide = {
  image: string
  title: string
  more: string
  lead?: string
}

defineProps<{
  slides: HomeHeroSlide[]
}>()
</script>

<style lang="scss" scoped>
.ms361-hero {
  width: 100%;
}

.ms361-hero__cover {
  position: relative;
  min-height: 700px;
  background-size: cover;
  background-position: center;
  background-color: #1a1a1a;
}

.ms361-hero__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  pointer-events: none;
}

.ms361-hero__container {
  position: relative;
  z-index: 1;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 16px;
  min-height: 700px;
  box-sizing: border-box;
}

.ms361-hero__align {
  display: flex;
  align-items: center;
  min-height: 700px;
  padding: 32px 0;
  box-sizing: border-box;
}

.ms361-hero__copy {
  width: 100%;
  max-width: 58.333333%;
}

@media (max-width: 767px) {
  .ms361-hero__copy {
    max-width: 100%;
  }
}

/* 与演示站 .text-primary 一致 */
.ms361-hero__title {
  margin: 0 0 12px;
  font-size: clamp(28px, 4.2vw, 40px);
  font-weight: 700;
  line-height: 1.2;
  color: #007bff;
}

.ms361-hero__lead {
  margin: 0 0 16px;
  font-size: 16px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.95);
}

.ms361-hero__action {
  margin: 0;
}

.ms361-hero__btn {
  display: inline-block;
  padding: 12px 24px;
  font-size: 16px;
  line-height: 1.5;
  color: #fff !important;
  background: #007bff;
  border-radius: 4px;
  text-decoration: none;
  border: none;
  cursor: default;
  transition: opacity 0.2s;
}

.ms361-hero__btn:hover {
  opacity: 0.9;
}

.ms361-hero__carousel {
  width: 100%;
  :deep(.el-carousel__container) {
    height: 700px;
  }
  :deep(.el-carousel__item) {
    height: 700px;
    overflow: hidden;
  }
  :deep(.el-carousel__indicators--outside) {
    margin-bottom: 10px;
  }
}
</style>
