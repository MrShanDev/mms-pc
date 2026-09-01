<template>
  <AccountCenterShell>
    <nav class="breadcrumb" :aria-label="t('common.breadcrumbNav')">
      <NuxtLink :to="r.home">{{ t('common.breadcrumbHome') }}</NuxtLink>
      <span class="sep">/</span>
      <NuxtLink :to="r.account">{{ t('template06Shop.accountHome') }}</NuxtLink>
      <span class="sep">/</span>
      <span>{{ t('template06Shop.authTitle') }}</span>
    </nav>

    <h1 class="page-title">{{ t('template06Shop.authTitle') }}</h1>
    <p class="page-lead">{{ t('template06Shop.authLead') }}</p>

    <div class="auth-cards">
      <section class="auth-card">
        <div class="auth-card__hd">
          <h2>{{ t('template06Shop.authRealName') }}</h2>
          <el-tag :type="realNameVerified ? 'success' : 'info'" size="small">
            {{ realNameVerified ? t('template06Shop.authStatusVerified') : t('template06Shop.authStatusUnverified') }}
          </el-tag>
        </div>
        <p class="auth-card__desc">{{ t('template06Shop.authRealNameDesc') }}</p>
        <el-button type="primary" class="btn-gold" :disabled="realNameVerified" @click="openRealNameDialog">
          {{ realNameVerified ? t('template06Shop.authDone') : t('template06Shop.authGoVerify') }}
        </el-button>
      </section>
    </div>

    <el-dialog
      v-model="dialogVisible"
      class="auth-real-dialog"
      :title="t('template06Shop.authDialogTitle')"
      width="480px"
      align-center
      destroy-on-close
      append-to-body
      @closed="resetForm"
    >
      <div class="auth-dialog__hero">
        <h3 class="auth-dialog__hero-title">{{ t('template06Shop.authDialogHeroTitle') }}</h3>
        <p class="auth-dialog__hero-desc">{{ t('template06Shop.authDialogHeroDesc') }}</p>
      </div>

      <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="auth-dialog__form">
        <el-form-item :label="t('template06Shop.authFieldRealName')" prop="name" required>
          <el-input v-model="form.name" class="auth-field-input" :placeholder="t('template06Shop.authPlaceholderName')" clearable>
            <template #prefix>
              <span class="auth-input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
                  <path d="M4 20.5c1.5-4 5-6.5 8-6.5s6.5 2.5 8 6.5" stroke-linecap="round" />
                </svg>
              </span>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item :label="t('template06Shop.authFieldIdNumber')" prop="idNumber" required>
          <el-input v-model="form.idNumber" class="auth-field-input" maxlength="18" :placeholder="t('template06Shop.authPlaceholderId')" clearable>
            <template #prefix>
              <span class="auth-input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="4" y="3" width="16" height="18" rx="2" />
                  <path d="M8 8h8M8 12h5" stroke-linecap="round" />
                </svg>
              </span>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item :label="t('template06Shop.authFieldBoundPhone')" required>
          <el-input :model-value="boundPhoneDisplay" class="auth-field-input auth-field-input--readonly" readonly :placeholder="t('template06Shop.authPhonePlaceholder')">
            <template #prefix>
              <span class="auth-input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6">
                  <rect x="7" y="3" width="10" height="18" rx="2" />
                  <path d="M10 18h4" stroke-linecap="round" />
                </svg>
              </span>
            </template>
            <template #suffix>
              <span v-if="hasBoundPhone" class="auth-phone-bound">{{ t('template06Shop.securityBound') }}</span>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item v-if="!isAuthMockEnabled()" :label="t('template06Shop.authFieldSmsCode')" prop="smsCode" required>
          <el-input v-model="form.smsCode" class="auth-field-input" maxlength="6" :placeholder="t('template06Shop.authPlaceholderSms')">
            <template #prefix>
              <span class="auth-input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M4 6h16v12H4V6Z" />
                  <path d="M8 10h8M8 14h5" stroke-linecap="round" />
                </svg>
              </span>
            </template>
            <template #append>
              <el-button :disabled="smsSeconds > 0 || !hasBoundPhone" class="auth-sms-btn" @click="sendAuthSms">
                {{ smsSeconds > 0 ? `${smsSeconds}s` : t('auth.getCode') }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="auth-dialog__footer-stack">
          <div class="auth-dialog__footer-btns">
            <el-button class="auth-btn-cancel" round @click="dialogVisible = false">{{ t('template06Shop.cancel') }}</el-button>
            <el-button type="primary" class="auth-btn-submit" round :loading="submitting" @click="submitAuth">
              {{ t('template06Shop.authSubmitVerify') }}
            </el-button>
          </div>
          <div class="auth-dialog__privacy">
            <span class="auth-dialog__privacy-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#b8860b" stroke-width="1.5" fill="none" />
                <path d="M8 12l2.5 2.5L16 9" stroke="#b8860b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              </svg>
            </span>
            <span>{{ t('template06Shop.authPrivacyNote') }}</span>
          </div>
        </div>
      </template>
    </el-dialog>
  </AccountCenterShell>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import AccountCenterShell from '@/pages/template06/_components/AccountCenterShell.vue'
import { useUserStore } from '@/stores/user'
import { authenticationWithBoundPhone, sendSmsCode } from '@/api/user'
import { isAuthMockEnabled } from '@/api/user/mockAuth'

/** 短信 type：6-实名认证（见 api/user/type SendSmsCodeRequest） */
const SMS_TYPE_REAL_NAME = 6

definePageMeta({ layout: 'default', requiresAuth: true })

const { t } = useAppLocale()
const { locale } = useI18n()
const r = useTemplate06Routes()
const userStore = useUserStore()

const realNameVerified = computed(() => !!userStore.user?.hasAuthentication)

const hasBoundPhone = computed(() => {
  const p = userStore.user?.phone
  return !!(p && /^1\d{10}$/.test(String(p).trim()))
})

const boundPhoneDisplay = computed(() => {
  const p = userStore.user?.phone?.toString().trim()
  if (p && /^1\d{10}$/.test(p)) return p
  return ''
})

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()
const submitting = ref(false)
const form = reactive({
  name: '',
  idNumber: '',
  smsCode: ''
})

const smsSeconds = ref(0)
let smsTimer: ReturnType<typeof setInterval> | null = null

function resetForm() {
  form.name = ''
  form.idNumber = ''
  form.smsCode = ''
}

const idCardPattern = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/

const rules = computed<FormRules>(() => {
  const base: FormRules = {
    name: [{ required: true, message: t('validation.required'), trigger: 'blur' }],
    idNumber: [
      { required: true, message: t('validation.required'), trigger: 'blur' },
      {
        validator: (_r, v: string, cb: (e?: Error) => void) => {
          const s = String(v || '').trim()
          if (!idCardPattern.test(s)) cb(new Error(t('template06Shop.authIdInvalid')))
          else cb()
        },
        trigger: 'blur'
      }
    ]
  }
  if (!isAuthMockEnabled()) {
    base.smsCode = [{ required: true, message: t('validation.required'), trigger: 'blur' }]
  }
  return base
})

function openRealNameDialog() {
  if (realNameVerified.value) return
  resetForm()
  dialogVisible.value = true
}

function startSmsCooldown() {
  smsSeconds.value = 59
  if (smsTimer) clearInterval(smsTimer)
  smsTimer = setInterval(() => {
    smsSeconds.value -= 1
    if (smsSeconds.value <= 0 && smsTimer) {
      clearInterval(smsTimer)
      smsTimer = null
    }
  }, 1000)
}

async function sendAuthSms() {
  if (smsSeconds.value > 0 || !hasBoundPhone.value) return
  const phone = boundPhoneDisplay.value
  try {
    await sendSmsCode({ phone, type: SMS_TYPE_REAL_NAME })
    ElMessage.success(t('toast.codeSent'))
    startSmsCooldown()
  } catch (e: unknown) {
    ElMessage.error(e instanceof Error ? e.message : t('toast.sendFailed'))
  }
}

async function submitAuth() {
  if (!hasBoundPhone.value) {
    ElMessage.warning(t('template06Shop.authNeedBindPhone'))
    return
  }
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    submitting.value = true
    try {
      if (isAuthMockEnabled()) {
        userStore.updateUser({ hasAuthentication: true })
        ElMessage.success(t('template06Shop.authRealNameOk'))
        dialogVisible.value = false
        return
      }
      const res = await authenticationWithBoundPhone({
        name: form.name.trim(),
        idNumber: form.idNumber.trim(),
        code: form.smsCode.trim()
      })
      const ok = res.code === 0 || (res.code === 200 && (res as { status?: boolean }).status !== false)
      if (!ok) {
        ElMessage.error((res as { msg?: string }).msg || t('template06Shop.profileSaveFail'))
        return
      }
      ElMessage.success(t('template06Shop.authRealNameOk'))
      dialogVisible.value = false
      await userStore.fetchUserInfo()
    } catch (e: unknown) {
      ElMessage.error(e instanceof Error ? e.message : t('template06Shop.profileSaveFail'))
    } finally {
      submitting.value = false
    }
  })
}

onUnmounted(() => {
  if (smsTimer) clearInterval(smsTimer)
})

useHead(() => ({
  title: t('template06Shop.authTitle'),
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

.page-title {
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
}

.page-lead {
  margin: 0 0 24px;
  font-size: 14px;
  color: #888;
  line-height: 1.5;
}

.auth-cards {
  max-width: 900px;
}

.auth-card {
  padding: 22px 20px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  width: 50%;
}

.auth-card__hd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;

  h2 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
  }
}

.auth-card__desc {
  margin: 0 0 16px;
  font-size: 13px;
  color: #666;
  line-height: 1.55;
}

.btn-gold {
  background: linear-gradient(180deg, #d4af37, #b8860b);
  border-color: #b8860b;
  color: #fff;
}

.auth-dialog__hero {
  text-align: center;
  margin-bottom: 8px;
}

.auth-dialog__hero-title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  color: #333;
}

.auth-dialog__hero-desc {
  margin: 0 0 20px;
  font-size: 13px;
  color: #999;
  line-height: 1.55;
}

.auth-dialog__form {
  :deep(.el-form-item__label) {
    font-weight: 500;
    color: #333;
  }
}

.auth-field-input {
  :deep(.el-input__wrapper) {
    background: #f5f5f5;
    border-radius: 10px;
    box-shadow: none;
    border: 1px solid transparent;
    padding-left: 12px;
    transition: border-color 0.15s;
    &:hover,
    &.is-focus {
      box-shadow: none;
      border-color: #e8e8e8;
    }
  }
  :deep(.el-input__inner) {
    color: #333;
  }
}

.auth-field-input--readonly {
  :deep(.el-input__inner) {
    cursor: default;
    color: #333;
  }
}

.auth-input-icon {
  display: inline-flex;
  color: #bbb;
  margin-right: 4px;
}

.auth-phone-bound {
  font-size: 13px;
  color: #52c41a;
  font-weight: 500;
  padding-right: 4px;
}

.auth-sms-btn {
  border: none;
  background: transparent;
  color: #b8860b;
  font-weight: 500;
  &:hover {
    color: #8b6914;
    background: rgba(184, 134, 11, 0.1);
  }
  &:disabled {
    color: #bbb;
  }
}

.auth-dialog__footer-stack {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-dialog__privacy {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 6px;
  padding: 0 4px;
  font-size: 12px;
  color: #b8860b;
  line-height: 1.5;
  text-align: center;
}

.auth-dialog__privacy-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.auth-dialog__footer-btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.auth-btn-cancel {
  flex: 1;
  border: 1px solid #e0d4b8;
  color: #666;
  background: #fff;
  padding: 12px 20px;
  &:hover {
    border-color: #b8860b;
    color: #b8860b;
    background: #faf8f3;
  }
}

.auth-btn-submit {
  flex: 1.35;
  padding: 12px 20px;
  background: linear-gradient(180deg, #d4af37, #b8860b) !important;
  border: 1px solid #b8860b !important;
  color: #fff !important;
  font-weight: 600;
  &:hover {
    filter: brightness(1.04);
    border-color: #9a7209 !important;
  }
}
</style>

<style lang="scss">
.auth-real-dialog.el-dialog {
  border-radius: 12px;
  overflow: hidden;
}
.auth-real-dialog .el-dialog__header {
  margin: 0;
  padding: 16px 20px 0;
  font-weight: 600;
  font-size: 16px;
  color: #1a1a1a;
}
.auth-real-dialog .el-dialog__body {
  padding: 8px 24px 16px;
}
.auth-real-dialog .el-dialog__footer {
  padding: 8px 24px 20px;
  border-top: none;
}
</style>
