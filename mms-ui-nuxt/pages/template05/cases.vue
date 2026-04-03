<template>
  <SidebarPageLayout :title="page.title" :crumbs="[{ label: page.title }]" sidebar-mode="default" variant="plain">
    <div class="contents">
      <p v-if="page.intro">{{ page.intro }}</p>
      <article v-for="(item, i) in sortedItems" :key="i" style="margin-bottom: 2rem">
        <div class="row">
          <div v-if="item.image" class="col-sm-4">
            <img :src="item.image" :alt="item.title" class="img-thumbnail" loading="lazy">
          </div>
          <div :class="item.image ? 'col-sm-8' : 'col-sm-12'">
            <p v-if="item.client" class="text-muted small">{{ item.client }}</p>
            <h3>{{ item.title }}</h3>
            <p>{{ item.excerpt }}</p>
          </div>
        </div>
      </article>
    </div>
  </SidebarPageLayout>
</template>

<script setup lang="ts">
import SidebarPageLayout from './_components/SidebarPageLayout.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template05', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template05
const page = C.casesPage!
const route = useRoute()

const sortedItems = computed(() => {
  const items = [...page.items]
  const sort = route.query.sort as string | undefined
  if (sort === 'classic') return items.reverse()
  return items
})

const { locale } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template05/cases')

useHead(() => ({
  title: `${page.title} — ${C.siteTitle}`,
  meta: [{ name: 'description', content: page.intro ?? C.metaDescription }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
