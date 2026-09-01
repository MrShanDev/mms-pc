<template>
  <div
    v-if="phoneDisplay"
    class="demo-service-dock"
    role="group"
    :aria-label="`${t('demo.common.serviceDockPhone')} ${phoneDisplay}`"
  >
    <span class="demo-service-dock__reveal" aria-hidden="true">
      <span class="demo-service-dock__digits">{{ phoneDisplay }}</span>
    </span>
    <span class="demo-service-dock__icon-wrap">
      <span class="demo-service-dock__icon" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
          />
        </svg>
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import type { DemoSiteTemplateId } from '@/utils/demoSite'

const props = defineProps<{
  templateId: DemoSiteTemplateId
}>()

const { t } = useAppLocale()

const c = computed(() => DEMO_SITE_TEMPLATES[props.templateId])

const phoneDisplay = computed(() => c.value.contactPage.phones?.[0]?.trim() ?? '')
</script>

<style scoped>
.demo-service-dock {
  position: fixed;
  z-index: 10050;
  right: max(0px, env(safe-area-inset-right, 0px));
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  flex-direction: row;
  align-items: stretch;
  margin: 0;
  padding: 0;
  color: #334155;
  cursor: default;
  background: #fff;
  border-radius: 10px 0 0 10px;
  box-shadow: -2px 0 16px rgba(15, 23, 42, 0.12);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-right: none;
  overflow: hidden;
}

.demo-service-dock__reveal {
  display: flex;
  align-items: center;
  max-width: 0;
  overflow: hidden;
  transition:
    max-width 0.42s cubic-bezier(0.4, 0, 0.2, 1),
    padding 0.42s cubic-bezier(0.4, 0, 0.2, 1);
}

.demo-service-dock:hover .demo-service-dock__reveal {
  max-width: 240px;
  padding-left: 4px;
}

.demo-service-dock__digits {
  display: block;
  padding: 14px 6px 14px 12px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
  color: #0f172a;
  transform: translateX(8px);
  transition: transform 0.42s cubic-bezier(0.4, 0, 0.2, 1);
}

.demo-service-dock:hover .demo-service-dock__digits {
  transform: translateX(0);
}

.demo-service-dock__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 52px;
  min-height: 52px;
  background: #fff;
  transition: background 0.2s ease, color 0.2s ease;
}

.demo-service-dock:hover .demo-service-dock__icon-wrap {
  background: #eff6ff;
  color: #1d4ed8;
}

@media print {
  .demo-service-dock {
    display: none !important;
  }
}
</style>
