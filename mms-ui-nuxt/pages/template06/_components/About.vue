<template>
  <main class="tita-sub">
    <div class="inner width_1400_auto">
      <nav class="breadcrumb" :aria-label="t('common.breadcrumbNav')">
        <NuxtLink :to="r.home">{{ t('common.breadcrumbHome') }}</NuxtLink>
        <span class="sep">/</span>
        <span>{{ t('about.breadcrumb') }}</span>
      </nav>
      <p class="section-kicker">{{ t('about.sectionKicker') }}</p>
      <div class="about-grid">
        <div>
          <h1 class="about-name">{{ companyName }}</h1>
          <p v-for="(para, j) in profileParagraphs" :key="j" class="about-text">
            {{ para }}
          </p>
        </div>
        <div class="about-side">
          <img :src="aboutSideImage" :alt="t('common.facilityAlt')" loading="lazy">
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const { t } = useAppLocale()
const { companyName, profileParagraphs, aboutSideImage } = useTitaSite()
const r = useTemplate06Routes()
</script>

<style lang="scss" scoped>
.tita-sub {
  min-height: 70vh;
  padding: 32px 0 56px;
  background: #fafafa;
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

.section-kicker {
  margin: 0 0 24px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #1a1a1a;
  text-transform: uppercase;
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
  font-size: 22px;
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
</style>
