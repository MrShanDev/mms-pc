<template>
  <footer>
    <div class="copyright">
      <p>{{ c.footerCopyright }}&nbsp;{{ t('demo.common.icpPlaceholder') }}</p>
      <p class="copyright_p">
        {{ t('demo.common.addressPrefix') }} {{ c.contactPage.address || '—' }} &nbsp;{{ t('demo.common.telPrefix') }} {{ phoneLine }} &nbsp;{{ t('demo.common.emailPrefix') }}
        <a :href="`mailto:${c.contactPage.email}`">{{ c.contactPage.email }}</a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'

const { t } = useAppLocale()

const c = DEMO_SITE_TEMPLATES.template05
const phoneLine = computed(() => (c.contactPage.phones?.length ? c.contactPage.phones.join(' / ') : '—'))
</script>
