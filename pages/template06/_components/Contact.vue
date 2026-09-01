<template>
  <main class="tita-sub">
    <div class="inner width_1400_auto">
      <nav class="breadcrumb" :aria-label="t('common.breadcrumbNav')">
        <NuxtLink :to="r.home">{{ t('common.breadcrumbHome') }}</NuxtLink>
        <span class="sep">/</span>
        <span>{{ t('contact.breadcrumb') }}</span>
      </nav>
      <h1 class="page-title">{{ t('contact.title') }}</h1>
      <div class="contact-panel">
        <p class="lead">{{ footerLead }}</p>
        <p>
          {{ t('common.customerHotline') }}
          <a :href="`tel:${hotlineTel}`">{{ hotlineDisplay }}</a>
        </p>
        <p>
          {{ t('common.customerEmail') }}
          <a :href="`mailto:${customerEmail}`">{{ customerEmail }}</a>
        </p>
        <p>{{ contactAddress || t('common.address') }}</p>
        <p class="icp">
          <a :href="icpRecordHref" target="_blank" rel="noopener noreferrer">{{ icpRecordText }}</a>
          {{ t('common.icpSuffix') }}
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const { t } = useAppLocale()
const {
  contactAddress,
  customerEmail,
  footerLead,
  hotlineDisplay,
  hotlineTel,
  icpRecordHref,
  icpRecordText
} = useTitaSite()
const r = useTemplate06Routes()
</script>

<style lang="scss" scoped>
.tita-sub {
  min-height: 70vh;
  padding: 32px 0 56px;
  background: #f5f5f5;
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
  margin: 0 0 24px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.contact-panel {
  padding: 28px 32px;
  background: #fff;
  border: 1px solid #e8e8e8;
  max-width: 720px;
  line-height: 1.75;
  font-size: 15px;

  .lead {
    margin: 0 0 20px;
    color: #555;
  }

  p {
    margin: 12px 0;
  }

  a {
    color: #b8860b;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  .icp {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    font-size: 13px;
    color: #888;
  }
}
</style>
