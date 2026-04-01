<template>

  <div class="tita-header">

    <div class="header-bar width_1400_auto flex flex-a-c flex-j-sb">

      <div class="brand-line">

        {{ headerText.companyLine }}

      </div>

      <div class="header-actions flex flex-a-c">

        <span class="link" role="button" tabindex="0" @click="goLogin">{{ headerText.login }}</span>

        <span class="sep">/</span>

        <span class="link" role="button" tabindex="0" @click="goRegister">{{ headerText.signUp }}</span>

        <template v-if="isLoggedIn">

          <span class="sep">|</span>

          <span class="link" role="button" tabindex="0" @click="handleLogout">{{ headerText.logOut }}</span>

        </template>

        <span class="sep">|</span>

        <el-select

          :model-value="locale"

          class="lang-select"

          size="small"

          :aria-label="t('header.langSelect')"

          @update:model-value="onLangChange"

        >

          <el-option

            v-for="l in availableLocales"

            :key="l.code"

            :label="l.name"

            :value="l.code"

          />

        </el-select>

        <span class="sep">|</span>

        <el-select

          v-model="theme"

          class="theme-select"

          size="small"

          :aria-label="t('header.themeSelect')"

        >

          <el-option

            v-for="tm in themes"

            :key="tm.id"

            :label="t(tm.nameKey)"

            :value="tm.id"

          />

        </el-select>

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

import { availableLocales } from '@/i18n/available-locales'

import type { SiteLocaleCode } from '@/i18n/available-locales'



const router = useRouter()

const userStore = useUserStore()

const { locale, setLocale, headerText, t } = useAppLocale()



const isLoggedIn = computed(() => !!userStore.user)

const isLoggingOut = ref(false)



const goLogin = () => router.push('/login')

const goRegister = () => router.push('/register')



const onLangChange = (code: string) => {

  setLocale(code as SiteLocaleCode)

}



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

    router.push('/login')

  } catch (e: any) {

    if (e !== 'cancel') {

      userStore.logout()

      router.push('/login')

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



    &:hover {

      color: #b8860b;

    }

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

  .theme-select {

    width: 132px;

    margin-left: 4px;

    :deep(.el-input__wrapper) {

      box-shadow: 0 0 0 1px #ddd inset;

    }

  }

}

</style>

