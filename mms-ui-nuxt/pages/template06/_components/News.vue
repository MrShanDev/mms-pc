<template>
  <main class="tita-sub">
    <div class="inner width_1400_auto">
      <nav class="breadcrumb" :aria-label="t('common.breadcrumbNav')">
        <NuxtLink :to="r.home">{{ t('common.breadcrumbHome') }}</NuxtLink>
        <span class="sep">/</span>
        <span>{{ t('news.breadcrumb') }}</span>
      </nav>
      <h1 class="page-title">{{ t('news.title') }}</h1>
      <div class="news-grid">
        <NuxtLink v-for="n in newsList" :key="n.id" :to="r.newsDetail" class="news-card">
          <div class="news-img-wrap">
            <img :src="n.image" :alt="n.title" loading="lazy">
          </div>
          <div class="news-body">
            <h2>{{ n.title }}</h2>
            <p class="news-excerpt">{{ n.excerpt }}</p>
            <time :datetime="n.date">{{ n.date }}</time>
          </div>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const { t } = useAppLocale()
const { newsList } = useTitaSite()
const r = useTemplate06Routes()
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
}

.page-title {
  margin: 0 0 28px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.news-card {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 20px;
  align-items: stretch;
  border: 1px solid #eee;
  background: #fff;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.25s ease;

  &:hover {
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.06);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.news-img-wrap {
  min-height: 140px;
  background: #eee;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    min-height: 140px;
  }
}

.news-body {
  padding: 16px 20px 16px 0;

  @media (max-width: 640px) {
    padding: 0 16px 16px;
  }

  h2 {
    margin: 0 0 10px;
    font-size: 17px;
    font-weight: 600;
    line-height: 1.4;
    color: #111;
  }
}

.news-excerpt {
  margin: 0 0 14px;
  font-size: 14px;
  line-height: 1.65;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-body time {
  font-size: 13px;
  color: #999;
}
</style>
