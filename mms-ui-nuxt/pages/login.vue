<template>
  <div class="tita-auth">
    <div class="auth-card width_1400_auto">
      <h1 class="auth-title">{{ t('auth.loginTitle') }}</h1>
      <p class="auth-sub">{{ companyName }}</p>

      <el-form ref="formRef" :model="form" :rules="rules" class="auth-form" @submit.prevent>
        <div class="field-label">{{ t('auth.account') }}</div>
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            size="large"
            :placeholder="t('auth.accountPh')"
            autocomplete="username"
          />
        </el-form-item>
        <div class="field-label">{{ t('auth.password') }}</div>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            size="large"
            :placeholder="t('auth.passwordPh')"
            show-password
            autocomplete="current-password"
            @keyup.enter="onSubmit"
          />
        </el-form-item>

        <el-button type="primary" class="auth-primary" size="large" :loading="loading" @click="onSubmit">
          {{ t('auth.submitLogin') }}
        </el-button>
      </el-form>

      <div class="auth-links">
        <NuxtLink to="/register">{{ t('auth.registerNow') }}</NuxtLink>
        <NuxtLink to="/forgot-password">{{ t('auth.retrievePassword') }}</NuxtLink>
      </div>
    </div>

    <footer class="auth-footer">
      <div class="width_1400_auto">
        <p>{{ footerLead }}</p>
        <p>
          {{ t('common.hotline') }}
          <a :href="`tel:${hotlineTel}`">{{ hotlineDisplay }}</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '@/api/user'
import { useUserStore } from '@/stores/user'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({
  title: 'Login',
  requiresAuth: false,
  layout: 'default'
})

const router = useRouter()
const userStore = useUserStore()
const { t } = useAppLocale()
const { locale } = useI18n()
const { companyName, footerLead, hotlineDisplay, hotlineTel } = useTitaSite()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/login')

useHead(() => ({
  title: t('auth.loginTitle'),
  meta: [
    { name: 'description', content: t('auth.loginMetaDesc', { company: companyName.value }) },
    ...canonicalOg
  ],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))

const formRef = ref<FormInstance>()
const loading = ref(false)
const form = reactive({
  username: '',
  password: ''
})

const rules = computed<FormRules>(() => ({
  username: [{ required: true, message: t('validation.enterAccount'), trigger: 'blur' }],
  password: [
    { required: true, message: t('validation.enterPassword'), trigger: 'blur' },
    { min: 8, message: t('validation.minPass8'), trigger: 'blur' }
  ]
}))

const onSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    try {
      const res = await login({ username: form.username.trim(), password: form.password })
      const ok = res.code === 0 || (res.code === 200 && (res as { status?: boolean }).status !== false)
      const data = res.data as Record<string, unknown> | undefined
      if (!ok || !data?.token) {
        ElMessage.error((res as { msg?: string }).msg || t('toast.loginFailed'))
        return
      }
      userStore.setUser({ ...data, token: data.token, refreshToken: data.refreshToken } as never, {
        persistent: true
      })
      ElMessage.success(t('toast.signedIn'))
      const redirect = router.currentRoute.value.query.redirect as string
      const target = redirect && redirect !== '/login' ? decodeURIComponent(redirect) : '/'
      router.push(target)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : t('toast.loginFailed')
      ElMessage.error(msg)
    } finally {
      loading.value = false
    }
  })
}
</script>

<style lang="scss" scoped>
.tita-auth {
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  background: #f0f0f0;
  font-family: 'Segoe UI', system-ui, Roboto, 'Microsoft YaHei', sans-serif;
}

.width_1400_auto {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.auth-card {
  flex: 1;
  max-width: 440px;
  margin: 48px auto;
  padding: 40px 36px 36px;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.auth-title {
  margin: 0;
  font-size: 26px;
  font-weight: 600;
  color: #1a1a1a;
}

.auth-sub {
  margin: 8px 0 28px;
  font-size: 13px;
  color: #666;
  line-height: 1.5;
}

.field-label {
  font-size: 13px;
  color: #333;
  margin-bottom: 6px;
}

.auth-form {
  :deep(.el-form-item) {
    margin-bottom: 18px;
  }
}

.auth-primary {
  width: 100%;
  margin-top: 8px;
  height: 44px;
  font-size: 15px;
  font-weight: 600;
  background: #2c2c2c;
  border-color: #2c2c2c;

  &:hover {
    background: #444;
    border-color: #444;
  }
}

.auth-links {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 14px;

  a {
    color: #b8860b;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}

.auth-footer {
  padding: 24px 0;
  background: #2b2b2b;
  color: #bbb;
  font-size: 13px;
  line-height: 1.6;

  a {
    color: #e8e8e8;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
