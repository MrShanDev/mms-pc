<template>

  <div class="tita-header">

    <div class="header-bar width_1400_auto flex flex-a-c flex-j-sb">

      <div class="brand-line">

        {{ headerText.companyLine }}

      </div>

      <div class="header-actions flex flex-a-c">

        <NuxtLink :to="r.cart" class="link cart-link" :aria-label="t('header.cart')">
          {{ t('header.cart') }}
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount > 99 ? '99+' : cartCount }}</span>
        </NuxtLink>

        <span class="sep">|</span>

        <template v-if="isLoggedIn">
          <NuxtLink
            :to="r.account"
            class="user-avatar-link"
            :title="t('header.myAccount')"
            :aria-label="t('header.myAccount')"
          >
            <el-avatar :size="28" :src="userAvatarSrc" class="user-avatar">
              {{ userDisplayInitial }}
            </el-avatar>
          </NuxtLink>
          <span class="sep">|</span>
          <span class="link" role="button" tabindex="0" @click="handleLogout">{{ headerText.logOut }}</span>
        </template>
        <template v-else>
          <span class="link" role="button" tabindex="0" @click="goLogin">{{ headerText.login }}</span>
          <span class="sep">/</span>
          <span class="link" role="button" tabindex="0" @click="goRegister">{{ headerText.signUp }}</span>
        </template>

        <span class="sep">|</span>

        <DemoLocaleSwitch class="lang-select" />

      </div>

    </div>

  </div>

</template>



<script setup lang="ts">

import { computed, ref } from 'vue'

import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'

import { logout as logoutApi } from '@/api/user'

import { ElMessage, ElMessageBox } from 'element-plus'

import DemoLocaleSwitch from '@/components/demo/DemoLocaleSwitch.vue'

const router = useRouter()

const userStore = useUserStore()

const { userAvatarSrc, userDisplayInitial } = useUserAvatarDisplay()

const { headerText, t } = useAppLocale()

const isLoggedIn = computed(() => !!userStore.user)

const isLoggingOut = ref(false)

const shop = useTemplate06ShopStore()
const cartCount = computed(() => shop.cartItemCount)

const r = useTemplate06Routes()

const goLogin = () => router.push(r.login)

const goRegister = () => router.push(r.register)

const handleLogout = async () => {

  if (isLoggingOut.value) return

  try {

    await ElMessageBox.confirm(headerText.value.logoutConfirm, headerText.value.logoutConfirmTitle, {

      confirmButtonText: headerText.value.ok,

      cancelButtonText: headerText.value.cancel,

      type: 'warning'

    })

    isLoggingOut.value = true

    try {

      await logoutApi()

    } catch {

      /* still clear local session */

    }

    userStore.logout()

    ElMessage.success(headerText.value.loggedOut)

    router.push(r.login)

  } catch (e: any) {

    if (e !== 'cancel') {

      userStore.logout()

      router.push(r.login)

    }

  } finally {

    isLoggingOut.value = false

  }

}

</script>



<style lang="scss" scoped>

.tita-header {

  width: 100%;

  background: #fff;

  border-bottom: 1px solid #e8e8e8;

}



.width_1400_auto {

  max-width: 1400px;

  margin: 0 auto;

  padding: 0 20px;

}



.header-bar {

  height: 44px;

  font-size: 13px;

  color: #333;

}



.brand-line {

  color: #555;

  letter-spacing: 0.02em;

}



.header-actions {

  gap: 0;

  align-items: center;



  .link {

    cursor: pointer;

    color: #1a1a1a;

    padding: 0 4px;

    transition: color 0.2s;

    text-decoration: none;



    &:hover {

      color: #b8860b;

    }

  }

  .cart-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .cart-badge {
    display: inline-block;
    min-width: 18px;
    height: 18px;
    line-height: 18px;
    padding: 0 5px;
    font-size: 11px;
    font-weight: 600;
    color: #fff;
    background: #c41e3a;
    border-radius: 9px;
    text-align: center;
  }



  .sep {

    margin: 0 8px;

    color: #ccc;

    user-select: none;

  }



  .lang-select {

    width: 128px;

    margin-left: 4px;

    :deep(.el-input__wrapper) {

      box-shadow: 0 0 0 1px #ddd inset;

    }

  }

  .user-avatar-link {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    text-decoration: none;
    padding: 0 2px;

    &:hover .user-avatar {
      box-shadow: 0 0 0 1px #b8860b;
    }
  }

  .user-avatar {
    flex-shrink: 0;
    cursor: pointer;
    transition: box-shadow 0.2s;
  }

}

</style>

