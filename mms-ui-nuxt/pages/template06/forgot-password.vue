<template>
  <div class="tita-auth">
    <div class="auth-card width_1400_auto">
      <h1 class="auth-title">{{ t('auth.forgotTitle') }}</h1>
      <p class="auth-sub">{{ companyName }}</p>

      <el-form ref="formRef" :model="form" :rules="rules" class="auth-form">
        <div class="field-label">{{ t('auth.mobile') }}</div>
        <el-form-item prop="phone">
          <el-input v-model="form.phone" size="large" maxlength="11" :placeholder="t('auth.mobileRegPh')" />
        </el-form-item>

        <div class="field-label">{{ t('auth.verifyCode') }}</div>
        <el-form-item prop="smsCode">
          <el-input v-model="form.smsCode" size="large" maxlength="6" :placeholder="t('auth.smsPh')">
            <template #suffix>
              <button type="button" class="sms-btn" :disabled="smsSeconds > 0" @click="sendSms">
                {{ smsSeconds > 0 ? `${smsSeconds}s` : t('auth.getCode') }}
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
import { computed, reactive, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { resetPassword, sendSmsCode } from '@/api/user'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({
  title: 'Retrieve password',
  requiresAuth: false,
  layout: 'default'
})

const router = useRouter()
const r = useTemplate06Routes()
const { t } = useAppLocale()
const { locale } = useI18n()
const { companyName, footerLead, hotlineDisplay, hotlineTel } = useTitaSite()
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
const smsSeconds = ref(0)
let smsTimer: ReturnType<typeof setInterval> | null = null

const form = reactive({
  phone: '',
  smsCode: '',
  password: '',
  confirmPassword: ''
})

const validatePass2 = (_rule: unknown, value: string, callback: (e?: Error) => void) => {
  if (value !== form.password) callback(new Error(t('validation.passwordMismatch')))
  else callback()
}

const rules = computed<FormRules>(() => ({
  phone: [
    { required: true, message: t('validation.required'), trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: t('validation.invalidMobile'), trigger: 'blur' }
  ],
  smsCode: [{ required: true, message: t('validation.required'), trigger: 'blur' }],
  password: [
    { required: true, message: t('validation.required'), trigger: 'blur' },
    { min: 8, message: t('validation.minPass8'), trigger: 'blur' }
  ],
  confirmPassword: [{ validator: validatePass2, trigger: 'blur' }]
}))

const sendSms = async () => {
  if (smsSeconds.value > 0) return
  if (!/^1[3-9]\d{9}$/.test(form.phone)) {
    ElMessage.warning(t('validation.validMobileFirst'))
    return
  }
  try {
    await sendSmsCode({ phone: form.phone, type: 3 })
    ElMessage.success(t('toast.codeSent'))
    smsSeconds.value = 59
    smsTimer = setInterval(() => {
      smsSeconds.value -= 1
      if (smsSeconds.value <= 0 && smsTimer) {
        clearInterval(smsTimer)
        smsTimer = null
      }
    }, 1000)
  } catch (e: unknown) {
    ElMessage.error(e instanceof Error ? e.message : t('toast.sendFailed'))
  }
}

const onSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    try {
      const res = await resetPassword({
        phone: form.phone.trim(),
        smsCode: form.smsCode.trim(),
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
  if (smsTimer) clearInterval(smsTimer)
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
  margin: 8px 0 28px;
  font-size: 13px;
  color: #666;
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
  background: #2c2c2c;
  border-color: #2c2c2c;
  &:hover {
    background: #444;
    border-color: #444;
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

.auth-footer {
  padding: 24px 0;
  background: #2b2b2b;
  color: #bbb;
  font-size: 13px;
  a {
    color: #e8e8e8;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
