<template>
  <main class="account-shell">
    <div class="account-shell-inner width_1400_auto">
      <aside class="account-aside" :aria-label="t('template06Shop.accountNavAria')">
        <div class="user-card">
          <div class="user-card-banner" aria-hidden="true" />
          <div class="user-card-body">
            <NuxtLink :to="r.account" class="avatar-wrap" :aria-label="t('header.myAccount')">
              <el-avatar :size="72" :src="userAvatarSrc" class="user-avatar-lg">
                {{ userDisplayInitial }}
              </el-avatar>
            </NuxtLink>
            <p class="user-name">{{ displayName }}</p>
            <p class="user-phone">{{ maskedPhone }}</p>
            <p class="user-welcome">{{ t('template06Shop.accountWelcome') }}</p>
          </div>
          <nav class="account-nav">
            <NuxtLink
              :to="r.account"
              class="nav-item"
              :class="{ active: activeKey === 'home' }"
            >
              <span class="nav-dot" aria-hidden="true" />
              {{ t('template06Shop.accountHome') }}
            </NuxtLink>
            <NuxtLink
              :to="r.accountProfile"
              class="nav-item"
              :class="{ active: activeKey === 'profile' }"
            >
              <span class="nav-dot" aria-hidden="true" />
              {{ t('template06Shop.entryProfile') }}
            </NuxtLink>
            <NuxtLink
              :to="r.orders"
              class="nav-item"
              :class="{ active: activeKey === 'orders' }"
            >
              <span class="nav-dot" aria-hidden="true" />
              {{ t('template06Shop.entryOrders') }}
            </NuxtLink>
            <NuxtLink
              :to="r.addresses"
              class="nav-item"
              :class="{ active: activeKey === 'addresses' }"
            >
              <span class="nav-dot" aria-hidden="true" />
              {{ t('template06Shop.entryAddresses') }}
            </NuxtLink>
            <NuxtLink
              :to="r.accountSecurity"
              class="nav-item"
              :class="{ active: activeKey === 'security' }"
            >
              <span class="nav-dot" aria-hidden="true" />
              {{ t('template06Shop.entrySecurity') }}
            </NuxtLink>
            <NuxtLink
              :to="r.accountAuth"
              class="nav-item"
              :class="{ active: activeKey === 'auth' }"
            >
              <span class="nav-dot" aria-hidden="true" />
              {{ t('template06Shop.entryAuth') }}
            </NuxtLink>
          </nav>
        </div>
      </aside>
      <div class="account-main">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const r = useTemplate06Routes()
const { t } = useAppLocale()
const { userAvatarSrc, userDisplayInitial, displayName, maskedPhone } = useUserAvatarDisplay()

const activeKey = computed(() => {
  const path = route.path
  if (path === r.accountProfile) return 'profile'
  if (path === r.accountSecurity) return 'security'
  if (path === r.accountAuth) return 'auth'
  if (path === r.addresses) return 'addresses'
  if (path === r.orders || path.includes('/order-detail')) return 'orders'
  if (path === r.account) return 'home'
  return 'home'
})
</script>

<style lang="scss" scoped>
.account-shell {
  min-height: 72vh;
  padding: 24px 0 56px;
  background: #f5f5f5;
  color: #222;
  font-family: 'Segoe UI', system-ui, -apple-system, Roboto, 'Microsoft YaHei', sans-serif;
}

.width_1400_auto {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.account-shell-inner {
  display: flex;
  align-items: flex-start;
  gap: 24px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
}

.account-aside {
  width: 260px;
  flex-shrink: 0;

  @media (max-width: 900px) {
    width: 100%;
  }
}

.user-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  border: 1px solid #eee;
}

.user-card-banner {
  height: 88px;
  background: linear-gradient(135deg, #e8c76a 0%, #b8860b 48%, #8b6914 100%);
}

.user-card-body {
  position: relative;
  margin-top: -44px;
  padding: 0 20px 16px;
  text-align: center;
}

.avatar-wrap {
  display: inline-flex;
  text-decoration: none;
  border-radius: 50%;
  box-shadow: 0 0 0 4px #fff;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 0 0 4px #fff, 0 4px 16px rgba(184, 134, 11, 0.35);
  }
}

.user-avatar-lg {
  cursor: pointer;
  border: 2px solid #fff;
}

.user-name {
  margin: 12px 0 4px;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  word-break: break-all;
}

.user-phone {
  margin: 0;
  font-size: 13px;
  color: #888;
}

.user-welcome {
  margin: 10px 0 0;
  font-size: 12px;
  color: #b8860b;
  letter-spacing: 0.02em;
}

.account-nav {
  border-top: 1px solid #f0f0f0;
  padding: 8px 0 12px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: #faf8f3;
    color: #b8860b;
  }

  &.active {
    background: linear-gradient(90deg, rgba(184, 134, 11, 0.12), transparent);
    color: #b8860b;
    font-weight: 600;

    .nav-dot {
      background: #b8860b;
      box-shadow: 0 0 0 2px rgba(184, 134, 11, 0.25);
    }
  }
}

.nav-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ddd;
  flex-shrink: 0;
}

.account-main {
  flex: 1;
  min-width: 0;
  min-height: 480px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #eee;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 24px 20px 28px;

  @media (max-width: 900px) {
    min-height: 360px;
  }
}
</style>
