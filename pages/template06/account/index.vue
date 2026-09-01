<template>
  <AccountCenterShell>
    <nav class="breadcrumb" :aria-label="t('common.breadcrumbNav')">
      <NuxtLink :to="r.home">{{ t('common.breadcrumbHome') }}</NuxtLink>
      <span class="sep">/</span>
      <span>{{ t('template06Shop.accountHome') }}</span>
    </nav>

    <div class="page-head">
      <h1 class="page-title">{{ t('template06Shop.accountHome') }}</h1>
      <p class="page-desc">{{ t('template06Shop.accountOverviewHint') }}</p>
    </div>

    <div class="quick-grid">
      <NuxtLink :to="r.accountProfile" class="quick-card quick-profile">
        <div class="quick-icon" aria-hidden="true">
          <span class="quick-glyph user" />
        </div>
        <div class="quick-text">
          <h2>{{ t('template06Shop.entryProfile') }}</h2>
          <p>{{ t('template06Shop.profileTitle') }}</p>
        </div>
        <span class="quick-arrow" aria-hidden="true">›</span>
      </NuxtLink>
      <NuxtLink :to="r.orders" class="quick-card quick-orders">
        <div class="quick-icon" aria-hidden="true">
          <span class="quick-glyph" />
        </div>
        <div class="quick-text">
          <h2>{{ t('template06Shop.entryOrders') }}</h2>
          <p>{{ t('template06Shop.ordersTitle') }}</p>
        </div>
        <span class="quick-arrow" aria-hidden="true">›</span>
      </NuxtLink>
      <NuxtLink :to="r.addresses" class="quick-card quick-address">
        <div class="quick-icon" aria-hidden="true">
          <span class="quick-glyph addr" />
        </div>
        <div class="quick-text">
          <h2>{{ t('template06Shop.entryAddresses') }}</h2>
          <p>{{ t('template06Shop.addressesTitle') }}</p>
        </div>
        <span class="quick-arrow" aria-hidden="true">›</span>
      </NuxtLink>
      <NuxtLink :to="r.accountSecurity" class="quick-card quick-security">
        <div class="quick-icon" aria-hidden="true">
          <span class="quick-glyph shield" />
        </div>
        <div class="quick-text">
          <h2>{{ t('template06Shop.entrySecurity') }}</h2>
          <p>{{ t('template06Shop.quickSecurityDesc') }}</p>
        </div>
        <span class="quick-arrow" aria-hidden="true">›</span>
      </NuxtLink>
      <NuxtLink :to="r.accountAuth" class="quick-card quick-authcenter">
        <div class="quick-icon" aria-hidden="true">
          <span class="quick-glyph badge" />
        </div>
        <div class="quick-text">
          <h2>{{ t('template06Shop.entryAuth') }}</h2>
          <p>{{ t('template06Shop.quickAuthDesc') }}</p>
        </div>
        <span class="quick-arrow" aria-hidden="true">›</span>
      </NuxtLink>
    </div>
  </AccountCenterShell>
</template>

<script setup lang="ts">
import AccountCenterShell from '@/pages/template06/_components/AccountCenterShell.vue'

definePageMeta({ layout: 'default', requiresAuth: true })

const { t } = useAppLocale()
const { locale } = useI18n()
const r = useTemplate06Routes()

useHead(() => ({
  title: t('template06Shop.accountHome'),
  htmlAttrs: { lang: locale.value }
}))
</script>

<style lang="scss" scoped>
.breadcrumb {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
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

.page-head {
  margin-bottom: 24px;
}

.page-title {
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
}

.page-desc {
  margin: 0;
  font-size: 14px;
  color: #888;
  line-height: 1.5;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.quick-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 22px 20px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s, border-color 0.2s, transform 0.15s;

  &:hover {
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
    border-color: #e0d4b8;
    transform: translateY(-2px);

    .quick-arrow {
      color: #b8860b;
      transform: translateX(4px);
    }
  }
}

.quick-icon {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quick-orders .quick-icon {
  background: linear-gradient(145deg, #fff5f5, #ffe4e4);
}
.quick-address .quick-icon {
  background: linear-gradient(145deg, #f5f9ff, #e8f0fe);
}
.quick-profile .quick-icon {
  background: linear-gradient(145deg, #faf8f3, #f0e8d8);
}
.quick-security .quick-icon {
  background: linear-gradient(145deg, #f3faf7, #e8f5f0);
}
.quick-authcenter .quick-icon {
  background: linear-gradient(145deg, #faf6ff, #f0e8fa);
}

.quick-glyph {
  display: block;
  width: 22px;
  height: 18px;
  border: 2px solid #c41e3a;
  border-radius: 3px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 3px;
    right: 3px;
    top: 5px;
    height: 2px;
    background: #c41e3a;
    box-shadow: 0 4px 0 #c41e3a;
  }

  &.addr {
    border-color: #2d6cdf;
    height: 20px;
    border-radius: 2px;
    &::after {
      background: #2d6cdf;
      box-shadow: none;
      height: 6px;
      top: 6px;
      left: 5px;
      right: 5px;
    }
  }

  &.user {
    border: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(180deg, #d4af37, #b8860b);
    &::after {
      display: none;
    }
  }

  &.shield {
    width: 20px;
    height: 22px;
    border-radius: 10px 10px 4px 4px;
    border-color: #2d6a4f;
    &::after {
      top: 7px;
      left: 6px;
      right: 6px;
      height: 6px;
      background: #2d6a4f;
      box-shadow: none;
      border-radius: 1px;
    }
  }

  &.badge {
    border: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: linear-gradient(145deg, #e8d4f0, #c9a0dc);
    &::after {
      content: '✓';
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-52%);
      text-align: center;
      font-size: 11px;
      font-weight: 700;
      color: #fff;
      background: none;
      box-shadow: none;
      height: auto;
    }
  }
}

.quick-text {
  flex: 1;
  min-width: 0;

  h2 {
    margin: 0 0 6px;
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: #888;
    line-height: 1.4;
  }
}

.quick-arrow {
  flex-shrink: 0;
  font-size: 22px;
  color: #ccc;
  line-height: 1;
  transition: color 0.2s, transform 0.2s;
}
</style>
