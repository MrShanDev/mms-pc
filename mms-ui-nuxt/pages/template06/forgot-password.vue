<template>
  <div class="tita-auth">
    <div class="auth-card width_1400_auto">
      <h1 class="auth-title">{{ t('auth.forgotTitle') }}</h1>
      <p class="auth-sub">{{ companyName }}</p>
      <p class="auth-email-hint">{{ t('auth.forgotEmailHint') }}</p>

      <el-form ref="formRef" :model="form" :rules="rules" class="auth-form">
        <div class="field-label">{{ t('auth.emailForgot') }}</div>
        <el-form-item prop="email">
          <el-input v-model="form.email" size="large" type="email" autocomplete="email" :placeholder="t('auth.emailForgot')" />
        </el-form-item>

        <div class="field-label">{{ t('auth.emailCode') }}</div>
        <el-form-item prop="emailCode">
          <el-input v-model="form.emailCode" size="large" maxlength="8" :placeholder="t('auth.emailCode')">
            <template #suffix>
              <button type="button" class="sms-btn" :disabled="emailSeconds > 0" @click="sendEmail">
                {{ emailSeconds > 0 ? `${emailSeconds}s` : t('auth.getEmailCode') }}
              </button>
            </template>
          </el-input>
        </el-form-item>

        <div class="field-label">{{ t('auth.newPassword') }}</div>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" size="large" show-password />
        </el-form-item>
        <div class="field-label">{{ t('auth.confirmPassword') }}</div>
        <el-form-item prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" size="large" show-password />
        </el-form-item>

        <el-button type="primary" class="auth-primary" size="large" :loading="loading" @click="onSubmit">
          {{ t('auth.submitReset') }}
        </el-button>
      </el-form>

      <div class="auth-links single">
        <NuxtLink :to="r.login">{{ t('auth.backLogin') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { resetPasswordByEmail, sendEmailCode } from '@/api/user'
import { isAuthMockEnabled } from '@/api/user/mockAuth'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({
  title: 'Retrieve password',
  requiresAuth: false,
  layout: 'default'
})

/** 与 base-api sendEmailCode 的 type 约定；若后端不同请改此值 */
const EMAIL_CODE_FIND_PASSWORD = 3

const router = useRouter()
const r = useTemplate06Routes()
const { t } = useAppLocale()
const { locale } = useI18n()
const { companyName } = useTitaSite()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical(r.forgotPassword)

useHead(() => ({
  title: t('auth.forgotTitle'),
  meta: [
    { name: 'description', content: t('auth.forgotMetaDesc', { company: companyName.value }) },
    ...canonicalOg
  ],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))

const formRef = ref<FormInstance>()
const loading = ref(false)
const emailSeconds = ref(0)
let emailTimer: ReturnType<typeof setInterval> | null = null

const form = reactive({
  email: '',
  emailCode: '',
  password: '',
  confirmPassword: ''
})

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || '').trim())

const validatePass2 = (_rule: unknown, value: string, callback: (e?: Error) => void) => {
  if (value !== form.password) callback(new Error(t('validation.passwordMismatch')))
  else callback()
}

const rules = computed<FormRules>(() => ({
  email: [
    { required: true, message: t('validation.required'), trigger: 'blur' },
    { validator: (_r, v: string, cb) => (emailOk(v) ? cb() : cb(new Error(t('validation.invalidEmail')))), trigger: 'blur' }
  ],
  emailCode: [{ required: true, message: t('validation.required'), trigger: 'blur' }],
  password: [
    { required: true, message: t('validation.required'), trigger: 'blur' },
    { min: 8, message: t('validation.minPass8'), trigger: 'blur' }
  ],
  confirmPassword: [{ validator: validatePass2, trigger: 'blur' }]
}))

const sendEmail = async () => {
  if (emailSeconds.value > 0) return
  if (!emailOk(form.email)) {
    ElMessage.warning(t('validation.invalidEmail'))
    return
  }
  if (isAuthMockEnabled()) {
    ElMessage.success(t('toast.emailCodeSent'))
    startEmailCooldown()
    return
  }
  try {
    await sendEmailCode({ type: EMAIL_CODE_FIND_PASSWORD, email: form.email.trim() })
    ElMessage.success(t('toast.emailCodeSent'))
    startEmailCooldown()
  } catch (e: unknown) {
    ElMessage.error(e instanceof Error ? e.message : t('toast.sendFailed'))
  }
}

function startEmailCooldown() {
  emailSeconds.value = 59
  if (emailTimer) clearInterval(emailTimer)
  emailTimer = setInterval(() => {
    emailSeconds.value -= 1
    if (emailSeconds.value <= 0 && emailTimer) {
      clearInterval(emailTimer)
      emailTimer = null
    }
  }, 1000)
}

const onSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    try {
      if (isAuthMockEnabled()) {
        ElMessage.success(t('toast.resetOk'))
        router.push(r.login)
        return
      }
      const res = await resetPasswordByEmail({
        email: form.email.trim(),
        code: form.emailCode.trim(),
        password: form.password
      })
      const ok = res.code === 0 || (res.code === 200 && (res as { status?: boolean }).status !== false)
      if (!ok) {
        ElMessage.error((res as { msg?: string }).msg || t('toast.resetFailed'))
        return
      }
      ElMessage.success(t('toast.resetOk'))
      router.push(r.login)
    } catch (e: unknown) {
      ElMessage.error(e instanceof Error ? e.message : t('toast.resetFailed'))
    } finally {
      loading.value = false
    }
  })
}

onUnmounted(() => {
  if (emailTimer) clearInterval(emailTimer)
})
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
  margin: 8px 0 12px;
  font-size: 13px;
  color: #666;
}

.auth-email-hint {
  margin: 0 0 20px;
  font-size: 12px;
  color: #888;
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

.sms-btn {
  border: none;
  background: none;
  color: #b8860b;
  cursor: pointer;
  font-size: 13px;
  padding: 0 4px;
  &:disabled {
    color: #999;
    cursor: not-allowed;
  }
}

.auth-primary {
  width: 100%;
  margin-top: 8px;
  height: 44px;
  font-weight: 600;
  background: linear-gradient(180deg, #d4af37, #b8860b);
  border-color: #b8860b;
  &:hover {
    opacity: 0.95;
  }
}

.auth-links {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;

  a {
    color: #b8860b;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
