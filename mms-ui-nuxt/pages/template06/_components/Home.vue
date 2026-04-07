<template>
  <main class="tita-home" role="main">
    <h1 class="seo-only">{{ t('home.seoH1') }}</h1>

    <section class="hero">
      <el-carousel height="520px" :interval="5000" arrow="hover" class="hero-carousel">
        <el-carousel-item v-for="(slide, idx) in heroSlides" :key="idx">
          <div class="hero-slide">
            <img :src="slide.image" :alt="slide.title" loading="lazy">
            <div class="hero-caption">
              <h2>{{ slide.title }}</h2>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>

    <section id="products" class="section section-products">
      <div class="inner width_1400_auto">
        <p class="section-kicker">{{ t('home.sectionProducts') }}</p>
        <div class="product-grid">
          <NuxtLink
            v-for="(p, i) in showcaseProducts"
            :key="i"
            :to="r.productDetailWithSlug(p.slug)"
            class="product-card"
          >
            <div class="product-img-wrap">
              <img :src="p.image" :alt="p.title" loading="lazy">
            </div>
            <h3 class="product-title">{{ p.title }}</h3>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section id="about" class="section section-about">
      <div class="inner width_1400_auto about-grid">
        <div>
          <p class="section-kicker">{{ t('home.sectionAbout') }}</p>
          <h2 class="about-name">{{ companyName }}</h2>
          <p v-for="(para, j) in profileParagraphs" :key="j" class="about-text">
            {{ para }}
          </p>
        </div>
        <div class="about-side">
          <img :src="aboutSideImage" :alt="t('common.facilityAlt')" loading="lazy">
        </div>
      </div>
    </section>

    <section id="news" class="section section-news">
      <div class="inner width_1400_auto">
        <p class="section-kicker">{{ t('home.sectionNews') }}</p>
        <div class="news-grid">
          <NuxtLink v-for="n in newsList" :key="n.id" :to="r.newsDetail" class="news-card">
            <div class="news-img-wrap">
              <img :src="n.image" :alt="n.title" loading="lazy">
            </div>
            <div class="news-body">
              <h3>{{ n.title }}</h3>
              <p class="news-excerpt">{{ n.excerpt }}</p>
              <time>{{ n.date }}</time>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { t } = useAppLocale()
const r = useTemplate06Routes()
const { companyName, heroSlides, newsList, aboutSideImage, profileParagraphs, showcaseProducts } =
  useTitaSite()
</script>

<style lang="scss" scoped>
.seo-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.tita-home {
  min-height: 100vh;
  background: #f5f5f5;
  color: #222;
  font-family: 'Segoe UI', system-ui, -apple-system, Roboto, '_pingFang SC', 'Microsoft YaHei', sans-serif;
}

.width_1400_auto {
  max-width: 1400px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.hero {
  background: #1a1a1a;

  :deep(.el-carousel__arrow) {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
  }
}

.hero-carousel {
  max-width: 1920px;
  margin: 0 auto;
}

.hero-slide {
  position: relative;
  height: 100%;
  background: #111;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    opacity: 0.92;
  }
}

.hero-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24px 32px 36px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));

  h2 {
    margin: 0;
    max-width: 1000px;
    font-size: clamp(16px, 2vw, 22px);
    font-weight: 600;
    line-height: 1.45;
    color: #fff;
  }
}

.section {
  padding: 56px 0;
}

.section-products {
  background: #fff;
}

.section-kicker {
  margin: 0 0 28px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #1a1a1a;
  text-transform: uppercase;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.product-card {
  display: block;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  }
}

.product-img-wrap {
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #eee;
  margin-bottom: 14px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.product-title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  color: #222;
}

.section-about {
  background: #fafafa;
}

.about-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.about-name {
  margin: 0 0 20px;
  font-size: 20px;
  font-weight: 700;
  color: #111;
}

.about-text {
  margin: 0 0 16px;
  font-size: 15px;
  line-height: 1.75;
  color: #444;

  &:last-child {
    margin-bottom: 0;
  }
}

.about-side img {
  width: 100%;
  display: block;
  object-fit: cover;
  min-height: 280px;
  background: #ddd;
}

.section-news {
  background: #fff;
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

  h3 {
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
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-body time {
  font-size: 13px;
  color: #999;
}
</style>
