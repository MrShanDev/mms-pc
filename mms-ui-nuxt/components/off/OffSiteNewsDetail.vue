<template>
  <main class="tita-sub">
    <div class="inner width_1400_auto">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <NuxtLink :to="r.home">{{ t('common.breadcrumbHome') }}</NuxtLink>
        <span class="sep">/</span>
        <NuxtLink :to="r.news">{{ t('news.breadcrumb') }}</NuxtLink>
        <span class="sep">/</span>
        <span class="current">{{ item.title }}</span>
      </nav>
      <article class="article">
        <header class="article-head">
          <h1>{{ item.title }}</h1>
          <time :datetime="item.date">{{ item.date }}</time>
        </header>
        <figure v-if="item.image" class="hero-img">
          <img :src="item.image" :alt="item.title" loading="lazy">
        </figure>
        <div class="article-body">
          <p v-for="(para, idx) in paragraphs" :key="idx">{{ para }}</p>
        </div>
        <p class="back">
          <NuxtLink :to="r.news">{{ t('newsDetail.backToList') }}</NuxtLink>
        </p>
      </article>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { newsList } from '@/utils/titaSiteContent'

const item = newsList[0]!
const { t } = useAppLocale()
const r = useOffSiteRoutes()

const paragraphs = computed(() => {
  const text = item.body?.trim() || item.excerpt
  return text.split(/\n+/).filter(Boolean)
})
</script>

<style lang="scss" scoped>
.tita-sub {
  min-height: 70vh;
  padding: 32px 0 56px;
  background: #fff;
  color: #222;
  font-family: 'Segoe UI', system-ui, -apple-system, Roboto, 'Microsoft YaHei', sans-serif;
}

.width_1400_auto {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.breadcrumb {
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;

  a {
    color: #b8860b;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .sep {
    margin: 0 8px;
    color: #ccc;
  }
  .current {
    color: #333;
  }
}

.article-head {
  margin-bottom: 20px;
  h1 {
    margin: 0 0 10px;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.35;
    color: #111;
  }
  time {
    font-size: 14px;
    color: #888;
  }
}

.hero-img {
  margin: 0 0 28px;
  img {
    width: 100%;
    max-height: 420px;
    object-fit: cover;
    display: block;
    background: #eee;
  }
}

.article-body {
  max-width: 820px;
  font-size: 16px;
  line-height: 1.8;
  color: #444;

  p {
    margin: 0 0 16px;
  }
}

.back {
  margin-top: 36px;
  padding-top: 24px;
  border-top: 1px solid #eee;
  a {
    color: #b8860b;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
