<template>
  <!-- 对齐 e9 页脚 copyright + 一行联系信息 -->
  <footer>
    <div class="copyright">
      <p>{{ c.footerCopyright }}&nbsp;琼ICP备xxxxxxxx号</p>
      <p class="copyright_p">
        Add: {{ c.contactPage.address || '—' }} &nbsp;Tel: {{ phoneLine }} &nbsp;E-mail:
        <a :href="`mailto:${c.contactPage.email}`">{{ c.contactPage.email }}</a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'

const c = DEMO_SITE_TEMPLATES.template04
const phoneLine = computed(() => (c.contactPage.phones?.length ? c.contactPage.phones.join(' / ') : '—'))
</script>
