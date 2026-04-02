<template>
  <div class="tita-auth">
    <div class="auth-card width_1400_auto">
      <h1 class="auth-title">{{ t('auth.registerTitle') }}</h1>
      <p class="auth-sub">{{ companyName }}</p>

      <div class="signup-tabs">
        <button
          type="button"
          class="tab"
          :class="{ active: signupType === 'personal' }"
          @click="signupType = 'personal'"
        >
          {{ t('auth.personalTab') }}
        </button>
        <button
          type="button"
          class="tab"
          :class="{ active: signupType === 'company' }"
          @click="signupType = 'company'"
        >
          {{ t('auth.companyTab') }}
        </button>
      </div>

      <el-form ref="formRef" :model="form" :rules="rules" class="auth-form" label-position="top">
        <div class="field-label">{{ t('auth.username') }}</div>
        <el-form-item prop="username">
          <el-input v-model="form.username" size="large" :placeholder="t('auth.usernamePh')" />
        </el-form-item>

        <template v-if="signupType === 'company'">
          <div class="field-label">{{ t('auth.companyName') }}</div>
          <el-form-item prop="companyName">
            <el-input v-model="form.companyName" size="large" :placeholder="t('auth.companyNamePh')" />
          </el-form-item>
          <div class="field-label">{{ t('auth.fullAddress') }}</div>
          <el-form-item prop="companyAddress">
            <el-input v-model="form.companyAddress" size="large" :placeholder="t('auth.companyAddressPh')" />
          </el-form-item>
        </template>

        <div class="field-label">{{ t('auth.contactName') }}</div>
        <el-form-item prop="contactName">
          <el-input v-model="form.contactName" size="large" :placeholder="t('auth.contactNamePh')" />
        </el-form-item>

        <div class="field-label">{{ t('auth.mobile') }}</div>
        <el-form-item prop="phone">
          <el-input v-model="form.phone" size="large" maxlength="11" :placeholder="t('auth.mobilePh')" />
        </el-form-item>

        <div class="field-label">{{ t('auth.pictureVerify') }}</div>
        <el-form-item prop="captchaInput">
          <div class="captcha-row">
            <span class="captcha-q">{{ captchaQuestion }}</span>
            <el-input v-model="form.captchaInput" size="large" :placeholder="t('auth.captchaPh')" class="captcha-input" />
          </div>
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

        <div class="field-label">{{ t('auth.setPassword') }}</div>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" size="large" show-password :placeholder="t('auth.passwordPh')" />
        </el-form-item>
        <div class="field-label">{{ t('auth.confirmPassword') }}</div>
        <el-form-item prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" size="large" show-password />
        </el-form-item>
        <p class="pwd-hint">{{ t('auth.pwdHint') }}</p>

        <el-form-item prop="agree">
          <el-checkbox v-model="form.agree">
            {{ t('auth.agreePrefix') }}
            <span class="link" role="button" @click.prevent="showTerms = true">{{ t('auth.agreeLink') }}</span>
          </el-checkbox>
        </el-form-item>

        <el-button type="primary" class="auth-primary" size="large" :loading="loading" @click="onSubmit">
          {{ t('auth.signUp') }}
        </el-button>
      </el-form>

      <p class="back-login">
        {{ t('auth.alreadyHave') }}
        <NuxtLink :to="routes.login">{{ t('auth.submitLogin') }}</NuxtLink>
      </p>
    </div>

    <AgreementDialog
      v-model="showTerms"
      :title="t('auth.termsTitle')"
      :agreement-content="termsHtml"
      :show-cancel-button="false"
      :confirm-button-text="t('auth.termsOk')"
    />

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
import AgreementDialog from '@/components/common/AgreementDialog.vue'
import { registerMember, sendSmsCode } from '@/api/user'
import { useUserStore } from '@/stores/user'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { isMcmsDemoOff, OFF_SITE_ROUTE_PREFIX, parseMcmsDemoTemplate } from '@/utils/mcmsDemo'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({
  title: 'Register',
  requiresAuth: false,
  layout: 'default'
})

const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const userStore = useUserStore()

const routes = useOffSiteRoutes()

const goDemoHome = () => {
  const tpl = runtimeConfig.public.mcmsDemoTemplate
  if (isMcmsDemoOff(tpl)) router.push(OFF_SITE_ROUTE_PREFIX)
  else router.push(`/mcms/${parseMcmsDemoTemplate(tpl)}`)
}
const { t } = useAppLocale()
const { locale } = useI18n()
const { companyName, footerLead, hotlineDisplay, hotlineTel } = useTitaSite()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical(routes.register)

const termsHtml = computed(() => t('terms.html'))

useHead(() => ({
  title: t('auth.registerTitle'),
  meta: [
    { name: 'description', content: t('auth.registerMetaDesc', { company: companyName.value }) },
    ...canonicalOg
  ],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))

const signupType = ref<'personal' | 'company'>('personal')
const formRef = ref<FormInstance>()
const loading = ref(false)
const showTerms = ref(false)
const smsSeconds = ref(0)
let smsTimer: ReturnType<typeof setInterval> | null = null

const n1 = Math.floor(Math.random() * 8) + 1
const n2 = Math.floor(Math.random() * 8) + 1
const captchaAnswer = String(n1 + n2)
const captchaQuestion = `${n1} + ${n2} = ?`

const form = reactive({
  username: '',
  contactName: '',
  companyName: '',
  companyAddress: '',
  phone: '',
  captchaInput: '',
  smsCode: '',
  password: '',
  confirmPassword: '',
  agree: false
})

const validatePass2 = (_rule: unknown, value: string, callback: (e?: Error) => void) => {
  if (value !== form.password) callback(new Error(t('validation.passwordMismatch')))
  else callback()
}

const validateCaptcha = (_rule: unknown, value: string, callback: (e?: Error) => void) => {
  if ((value || '').trim() !== captchaAnswer) callback(new Error(t('validation.wrongCaptcha')))
  else callback()
}

const rules = computed<FormRules>(() => ({
  username: [{ required: true, message: t('validation.required'), trigger: 'blur' }],
  contactName: [{ required: true, message: t('validation.required'), trigger: 'blur' }],
  companyName: [
    {
      validator: (_r, v, cb) => {
        if (signupType.value === 'company' && !(v as string)?.trim()) cb(new Error(t('validation.required')))
        else cb()
      },
      trigger: 'blur'
    }
  ],
  companyAddress: [
    {
      validator: (_r, v, cb) => {
        if (signupType.value === 'company' && !(v as string)?.trim()) cb(new Error(t('validation.required')))
        else cb()
      },
      trigger: 'blur'
    }
  ],
  phone: [
    { required: true, message: t('validation.required'), trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: t('validation.invalidMobile'), trigger: 'blur' }
  ],
  captchaInput: [{ validator: validateCaptcha, trigger: 'blur' }],
  smsCode: [{ required: true, message: t('validation.required'), trigger: 'blur' }],
  password: [
    { required: true, message: t('validation.required'), trigger: 'blur' },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
      message: t('validation.passPattern'),
      trigger: 'blur'
    }
  ],
  confirmPassword: [{ validator: validatePass2, trigger: 'blur' }],
  agree: [
    {
      validator: (_r, v, cb) => {
        if (!v) cb(new Error(t('validation.acceptAgreement')))
        else cb()
      },
      trigger: 'change'
    }
  ]
}))

const sendSms = async () => {
  if (smsSeconds.value > 0) return
  if (!/^1[3-9]\d{9}$/.test(form.phone)) {
    ElMessage.warning(t('validation.validMobileFirst'))
    return
  }
  try {
    await sendSmsCode({ phone: form.phone, type: 1 })
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
      const payload = {
        phone: form.phone.trim(),
        smsCode: form.smsCode.trim(),
        password: form.password,
        account: form.username.trim(),
        nickname: form.contactName.trim(),
        ...(signupType.value === 'company'
          ? {
              companyName: form.companyName.trim(),
              companyAddress: form.companyAddress.trim()
            }
          : {})
      }
      const res = await registerMember(payload)
      const ok = res.code === 0 || (res.code === 200 && (res as { status?: boolean }).status !== false)
      const data = res.data as Record<string, unknown> | undefined
      if (!ok) {
        ElMessage.error((res as { msg?: string }).msg || t('toast.regFailed'))
        return
      }
      if (data?.token) {
        userStore.setUser({ ...data, token: data.token, refreshToken: data.refreshToken } as never, {
          persistent: true
        })
        ElMessage.success(t('toast.welcome'))
        goDemoHome()
      } else {
        ElMessage.success(t('toast.regPleaseSignIn'))
        router.push(routes.login)
      }
    } catch (e: unknown) {
      ElMessage.error(e instanceof Error ? e.message : t('toast.regFailed'))
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
  max-width: 520px;
  margin: 36px auto 48px;
  padding: 36px 36px 40px;
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
  margin: 8px 0 20px;
  font-size: 13px;
  color: #666;
}

.signup-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 22px;
  border-bottom: 1px solid #e0e0e0;
}

.tab {
  flex: 1;
  padding: 12px 8px;
  font-size: 14px;
  border: none;
  background: transparent;
  color: #666;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;

  &.active {
    color: #1a1a1a;
    font-weight: 600;
    border-bottom-color: #b8860b;
  }
}

.field-label {
  font-size: 13px;
  color: #333;
  margin-bottom: 4px;
}

.auth-form {
  :deep(.el-form-item) {
    margin-bottom: 14px;
  }
}

.captcha-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.captcha-q {
  flex-shrink: 0;
  padding: 0 14px;
  height: 40px;
  line-height: 40px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  font-size: 15px;
  font-weight: 600;
}

.captcha-input {
  flex: 1;
}

.sms-btn {
  border: none;
  background: none;
  color: #b8860e;
  cursor: pointer;
  font-size: 13px;
  padding: 0 4px;
  &:disabled {
    color: #999;
    cursor: not-allowed;
  }
}

.pwd-hint {
  margin: -6px 0 10px;
  font-size: 12px;
  color: #888;
}

.link {
  color: #b8860b;
  cursor: pointer;
}

.auth-primary {
  width: 100%;
  height: 44px;
  margin-top: 8px;
  font-weight: 600;
  background: #2c2c2c;
  border-color: #2c2c2c;
  &:hover {
    background: #444;
    border-color: #444;
  }
}

.back-login {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #666;

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
