<template>
  <footer id="contact" class="tita-footer">
    <div class="footer-inner width_1400_auto">
      <p class="footer-lead">{{ footerLead }}</p>
      <p class="footer-hotline">
        {{ t('common.hotlineWei') }}
        <a :href="`tel:${hotlineTel}`">{{ hotlineDisplay }}</a>
      </p>
      <button type="button" class="btn-top" @click="scrollTop">{{ t('home.top') }}</button>
      <div class="footer-meta">
        <p>{{ contactAddress || t('common.address') }}</p>
        <p>
          {{ t('common.customerHotline') }}
          <a :href="`tel:${hotlineTel}`">{{ hotlineDisplay }}</a>
        </p>
        <p>
          {{ t('common.customerEmail') }}
          <a :href="`mailto:${customerEmail}`">{{ customerEmail }}</a>
        </p>
        <p class="footer-icp">
          <a :href="icpRecordHref" target="_blank" rel="noopener noreferrer">{{ icpRecordText }}</a>
          {{ t('common.icpSuffix') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useAppLocale()
const {
  contactAddress,
  footerLead,
  hotlineTel,
  hotlineDisplay,
  customerEmail,
  icpRecordHref,
  icpRecordText
} = useTitaSite()

const scrollTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<style lang="scss" scoped>
.width_1400_auto {
  max-width: 1400px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.tita-footer {
  background: #2b2b2b;
  color: #ccc;
  padding: 40px 0 48px;
  font-size: 14px;
  line-height: 1.7;

  a {
    color: #e8e8e8;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.footer-inner {
  position: relative;
  padding-right: 80px;
}

.footer-lead {
  margin: 0 0 16px;
  max-width: 900px;
  color: #bbb;
}

.footer-hotline {
  margin: 0 0 20px;
  font-size: 15px;
}

.btn-top {
  position: absolute;
  top: 0;
  right: 20px;
  padding: 8px 18px;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
  background: #444;
  border: 1px solid #555;
  cursor: pointer;
  border-radius: 2px;

  &:hover {
    background: #555;
  }
}

.footer-meta {
  border-top: 1px solid #444;
  padding-top: 20px;
  margin-top: 8px;

  p {
    margin: 6px 0;
  }
}

.footer-icp {
  margin-top: 16px !important;
  font-size: 13px;
  color: #888;
}
</style>
