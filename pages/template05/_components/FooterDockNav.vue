<template>
  <nav class="navbar navbar-default navbar-fixed-bottom footer_nav">
    <div class="foot_nav btn-group dropup">
      <a
        class="dropdown-toggle"
        href="#"
        aria-haspopup="true"
        aria-expanded="false"
        @click.prevent="shareOpen = !shareOpen"
      >
        <span class="glyphicon glyphicon-share btn-lg" aria-hidden="true" />
        {{ t('demo.common.footerShare') }}
      </a>
      <div class="dropdown-menu webshare" :style="{ display: shareOpen ? 'block' : '' }">
        <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
          <a
            class="a2a_dd"
            href="https://www.addtoany.com/share_save"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </div>
    </div>
    <div class="foot_nav">
      <a :href="`tel:${mainPhone}`">
        <span class="glyphicon glyphicon-phone btn-lg" aria-hidden="true" />
        {{ t('demo.common.footerCall') }}
      </a>
    </div>
    <div class="foot_nav" role="button" tabindex="0" @click="emit('open-menu')">
      <span class="glyphicon glyphicon-th-list btn-lg" />
      {{ t('demo.common.footerMenu') }}
    </div>
    <div class="foot_nav">
      <a id="gototop" href="#" @click.prevent="scrollTop">
        <span class="glyphicon glyphicon-circle-arrow-up btn-lg" aria-hidden="true" />
        {{ t('demo.common.footerTop') }}
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'

const { t } = useAppLocale()

const emit = defineEmits<{ 'open-menu': [] }>()

const c = DEMO_SITE_TEMPLATES.template05
const mainPhone = computed(() => c.contactPage.phones?.[0] ?? '')

const shareOpen = ref(false)

function scrollTop() {
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>
