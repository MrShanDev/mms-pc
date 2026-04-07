<template>
  <AccountCenterShell>
    <nav class="breadcrumb" :aria-label="t('common.breadcrumbNav')">
      <NuxtLink :to="r.home">{{ t('common.breadcrumbHome') }}</NuxtLink>
      <span class="sep">/</span>
      <NuxtLink :to="r.account">{{ t('template06Shop.accountHome') }}</NuxtLink>
      <span class="sep">/</span>
      <span>{{ t('template06Shop.securityTitle') }}</span>
    </nav>

    <h1 class="page-title">{{ t('template06Shop.securityTitle') }}</h1>
    <p class="page-lead">{{ t('template06Shop.securityLead') }}</p>

    <ul class="security-list">
      <li class="security-row">
        <div class="security-row__main">
          <h2 class="security-row__title">{{ t('template06Shop.securityLoginPwd') }}</h2>
          <p class="security-row__desc">{{ t('template06Shop.securityLoginPwdDesc') }}</p>
        </div>
        <el-button type="primary" class="btn-gold" @click="openPwdDialog">{{ t('template06Shop.securityChangePwd') }}</el-button>
      </li>
      <li class="security-row">
        <div class="security-row__main">
          <h2 class="security-row__title">{{ t('template06Shop.securityPhone') }}</h2>
          <p class="security-row__desc">{{ phoneDesc }}</p>
        </div>
        <div class="security-row__actions">
          <span class="security-row__tag">{{ hasPhone ? t('template06Shop.securityBound') : t('template06Shop.securityNotBound') }}</span>
          <el-button type="primary" class="btn-gold btn-sm" @click="openPhoneDialog">
            {{ hasPhone ? t('template06Shop.securityPhoneChange') : t('template06Shop.securityPhoneBind') }}
          </el-button>
        </div>
      </li>
      <li class="security-row">
        <div class="security-row__main">
          <h2 class="security-row__title">{{ t('template06Shop.securityEmailBind') }}</h2>
          <p class="security-row__desc">{{ emailDisplay }}</p>
        </div>
        <div class="security-row__actions">
          <span class="security-row__tag">{{ emailBound ? t('template06Shop.securityBound') : t('template06Shop.securityNotBound') }}</span>
          <el-button type="primary" class="btn-gold btn-sm" @click="openEmailDialog">
            {{ emailBound ? t('template06Shop.securityEmailChangeBtn') : t('template06Shop.securityEmailBindBtn') }}
          </el-button>
        </div>
      </li>
    </ul>


    <el-dialog
      v-model="pwdVisible"
      :title="t('template06Shop.securityChangePwdDialogTitle')"
      width="420px"
      destroy-on-close
      @closed="resetPwdForm"
    >
      <el-form ref="pwdFormRef" :model="pwdForm" :rules="pwdRules" label-position="top">
        <el-form-item :label="t('auth.verifyCode')" prop="smsCode">
          <el-input v-model="pwdForm.smsCode" maxlength="6" :placeholder="t('auth.smsPh')">
            <template #append>
              <el-button :disabled="smsSeconds > 0" @click="sendSmsForPwd">
                {{ smsSeconds > 0 ? `${smsSeconds}s` : t('auth.getCode') }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item :label="t('auth.newPassword')" prop="password">
          <el-input v-model="pwdForm.password" type="password" show-password />
        </el-form-item>
        <el-form-item :label="t('auth.confirmPassword')" prop="confirmPassword">
          <el-input v-model="pwdForm.confirmPassword" type="password" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="pwdVisible = false">{{ t('template06Shop.cancel') }}</el-button>
        <el-button type="primary" class="btn-gold" :loading="pwdSaving" @click="submitPwdChange">{{ t('template06Shop.profileSave') }}</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="phoneVisible"
      :title="phoneDialogTitle"
      width="420px"
      destroy-on-close
      @closed="resetPhoneForm"
    >
      <p class="dialog-hint">{{ hasPhone ? t('template06Shop.securityPhoneChangeHint') : t('template06Shop.securityPhoneBindHint') }}</p>
      <el-form ref="phoneFormRef" :model="phoneForm" :rules="phoneRules" label-position="top">
        <el-form-item v-if="hasPhone" :label="t('template06Shop.securityOldSmsCode')" prop="oldSmsCode">
          <el-input v-model="phoneForm.oldSmsCode" maxlength="6" :placeholder="t('auth.smsPh')">
            <template #append>
              <el-button :disabled="oldPhoneSeconds > 0" @click="sendOldPhoneSms">
                {{ oldPhoneSeconds > 0 ? `${oldPhoneSeconds}s` : t('template06Shop.securitySendOldCode') }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item :label="t('template06Shop.securityNewPhone')" prop="newPhone">
          <el-input v-model="phoneForm.newPhone" maxlength="11" />
        </el-form-item>
        <el-form-item :label="t('template06Shop.securityNewSmsCode')" prop="newSmsCode">
          <el-input v-model="phoneForm.newSmsCode" maxlength="6" :placeholder="t('auth.smsPh')">
            <template #append>
              <el-button :disabled="newPhoneSeconds > 0" @click="sendNewPhoneSms">
                {{ newPhoneSeconds > 0 ? `${newPhoneSeconds}s` : t('template06Shop.securitySendNewCode') }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="phoneVisible = false">{{ t('template06Shop.cancel') }}</el-button>
        <el-button type="primary" class="btn-gold" :loading="phoneSaving" @click="submitPhone">{{ t('template06Shop.profileSave') }}</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="emailVisible"
      :title="emailDialogTitle"
      width="420px"
      destroy-on-close
      @closed="resetEmailForm"
    >
      <p class="dialog-hint">{{ emailBound ? t('template06Shop.securityEmailChangeHint') : t('template06Shop.securityEmailBindHint') }}</p>
      <el-form ref="emailFormRef" :model="emailForm" :rules="emailRules" label-position="top">
        <el-form-item :label="t('template06Shop.securityEmailField')" prop="email">
          <el-input v-model="emailForm.email" type="email" autocomplete="email" />
        </el-form-item>
        <el-form-item :label="t('template06Shop.securityEmailCodeField')" prop="code">
          <el-input v-model="emailForm.code" maxlength="6" :placeholder="t('auth.verifyCode')">
            <template #append>
              <el-button :disabled="emailSeconds > 0" @click="sendEmailBindCode">
                {{ emailSeconds > 0 ? `${emailSeconds}s` : t('template06Shop.securitySendEmailCode') }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="emailVisible = false">{{ t('template06Shop.cancel') }}</el-button>
        <el-button type="primary" class="btn-gold" :loading="emailSaving" @click="submitEmail">{{ t('template06Shop.profileSave') }}</el-button>
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
import { changePassword, sendPasswordChangeSms, sendSmsCode, updateMember, sendEmailCode, setEmail } from '@/api/user'
import { isAuthMockEnabled } from '@/api/user/mockAuth'

/** 与 base-api sendEmailCode 的 type 约定（找回密码为 3）；若后端不同请改 */
const EMAIL_CODE_SET_EMAIL = 4

/** 短信 type：见 api/user/type SendSmsCodeRequest */
const SMS_TYPE_REGISTER = 1
const SMS_TYPE_CHANGE_PHONE = 5
const SMS_TYPE_VERIFY_BOUND_PHONE = 7

definePageMeta({ layout: 'default', requiresAuth: true })

const { t } = useAppLocale()
const { locale } = useI18n()
const r = useTemplate06Routes()
const userStore = useUserStore()
const { maskedPhone } = useUserAvatarDisplay()

const hasPhone = computed(() => {
  const p = userStore.user?.phone
  return !!(p && String(p).trim().length >= 11)
})

const phoneDesc = computed(() => {
  if (!hasPhone.value) return t('template06Shop.securityNotBound')
  return maskedPhone.value
})

const emailBound = computed(() => {
  const e = userStore.user?.email
  return !!(e && String(e).trim())
})

const emailDisplay = computed(() => {
  const e = userStore.user?.email
  if (e && String(e).trim()) return String(e).trim()
  return t('template06Shop.securityNotBound')
})

const phoneVisible = ref(false)
const phoneFormRef = ref<FormInstance>()
const phoneSaving = ref(false)
const phoneForm = reactive({
  oldSmsCode: '',
  newPhone: '',
  newSmsCode: ''
})

const oldPhoneSeconds = ref(0)
const newPhoneSeconds = ref(0)
let oldPhoneTimer: ReturnType<typeof setInterval> | null = null
let newPhoneTimer: ReturnType<typeof setInterval> | null = null

const phoneDialogTitle = computed(() =>
  hasPhone.value ? t('template06Shop.securityPhoneDialogChangeTitle') : t('template06Shop.securityPhoneDialogBindTitle')
)

function resetPhoneForm() {
  phoneForm.oldSmsCode = ''
  phoneForm.newPhone = ''
  phoneForm.newSmsCode = ''
}

const phoneRules = computed<FormRules>(() => {
  const rules: FormRules = {
    newPhone: [
      { required: true, message: t('validation.required'), trigger: 'blur' },
      {
        pattern: /^1\d{10}$/,
        message: t('validation.invalidMobile'),
        trigger: 'blur'
      }
    ],
    newSmsCode: [{ required: true, message: t('validation.required'), trigger: 'blur' }]
  }
  if (hasPhone.value) {
    rules.oldSmsCode = [{ required: true, message: t('validation.required'), trigger: 'blur' }]
  }
  return rules
})

function openPhoneDialog() {
  resetPhoneForm()
  phoneVisible.value = true
}

function startOldPhoneCooldown() {
  oldPhoneSeconds.value = 59
  if (oldPhoneTimer) clearInterval(oldPhoneTimer)
  oldPhoneTimer = setInterval(() => {
    oldPhoneSeconds.value -= 1
    if (oldPhoneSeconds.value <= 0 && oldPhoneTimer) {
      clearInterval(oldPhoneTimer)
      oldPhoneTimer = null
    }
  }, 1000)
}

function startNewPhoneCooldown() {
  newPhoneSeconds.value = 59
  if (newPhoneTimer) clearInterval(newPhoneTimer)
  newPhoneTimer = setInterval(() => {
    newPhoneSeconds.value -= 1
    if (newPhoneSeconds.value <= 0 && newPhoneTimer) {
      clearInterval(newPhoneTimer)
      newPhoneTimer = null
    }
  }, 1000)
}

async function sendOldPhoneSms() {
  if (oldPhoneSeconds.value > 0) return
  const phone = userStore.user?.phone?.toString().trim()
  if (!phone) {
    ElMessage.warning(t('validation.validMobileFirst'))
    return
  }
  if (isAuthMockEnabled()) {
    ElMessage.success(t('toast.codeSent'))
    startOldPhoneCooldown()
    return
  }
  try {
    await sendSmsCode({ phone, type: SMS_TYPE_VERIFY_BOUND_PHONE })
    ElMessage.success(t('toast.codeSent'))
    startOldPhoneCooldown()
  } catch (e: unknown) {
    ElMessage.error(e instanceof Error ? e.message : t('toast.sendFailed'))
  }
}

async function sendNewPhoneSms() {
  if (newPhoneSeconds.value > 0) return
  const raw = phoneForm.newPhone.trim()
  if (!/^1\d{10}$/.test(raw)) {
    ElMessage.warning(t('validation.validMobileFirst'))
    return
  }
  const smsType = hasPhone.value ? SMS_TYPE_CHANGE_PHONE : SMS_TYPE_REGISTER
  if (isAuthMockEnabled()) {
    ElMessage.success(t('toast.codeSent'))
    startNewPhoneCooldown()
    return
  }
  try {
    await sendSmsCode({ phone: raw, type: smsType })
    ElMessage.success(t('toast.codeSent'))
    startNewPhoneCooldown()
  } catch (e: unknown) {
    ElMessage.error(e instanceof Error ? e.message : t('toast.sendFailed'))
  }
}

async function submitPhone() {
  if (!phoneFormRef.value) return
  await phoneFormRef.value.validate(async (valid) => {
    if (!valid) return
    phoneSaving.value = true
    try {
      const newPhone = phoneForm.newPhone.trim()
      const newSms = phoneForm.newSmsCode.trim()
      if (isAuthMockEnabled()) {
        userStore.updateUser({ phone: newPhone })
        ElMessage.success(t('template06Shop.securityPhoneMockOk'))
        phoneVisible.value = false
        return
      }
      const payload: Parameters<typeof updateMember>[0] = {
        type: 1,
        phone: newPhone,
        smsCode: newSms
      }
      if (hasPhone.value) payload.oldSmsCode = phoneForm.oldSmsCode.trim()
      const res = await updateMember(payload)
      const ok = res.code === 0 || (res.code === 200 && (res as { status?: boolean }).status !== false)
      if (!ok) {
        ElMessage.error((res as { msg?: string }).msg || t('template06Shop.profileSaveFail'))
        return
      }
      ElMessage.success(hasPhone.value ? t('template06Shop.securityChangeOk') : t('template06Shop.securityBindOk'))
      phoneVisible.value = false
      await userStore.fetchUserInfo()
    } catch (e: unknown) {
      ElMessage.error(e instanceof Error ? e.message : t('template06Shop.profileSaveFail'))
    } finally {
      phoneSaving.value = false
    }
  })
}

const emailVisible = ref(false)
const emailFormRef = ref<FormInstance>()
const emailSaving = ref(false)
const emailForm = reactive({
  email: '',
  code: ''
})

const emailSeconds = ref(0)
let emailTimer: ReturnType<typeof setInterval> | null = null

const emailDialogTitle = computed(() =>
  emailBound.value ? t('template06Shop.securityEmailDialogChangeTitle') : t('template06Shop.securityEmailDialogBindTitle')
)

function resetEmailForm() {
  emailForm.email = ''
  emailForm.code = ''
}

const emailRules = computed<FormRules>(() => ({
  email: [
    { required: true, message: t('validation.required'), trigger: 'blur' },
    {
      type: 'email',
      message: t('validation.invalidEmail'),
      trigger: 'blur'
    }
  ],
  code: [{ required: true, message: t('validation.required'), trigger: 'blur' }]
}))

function openEmailDialog() {
  resetEmailForm()
  emailVisible.value = true
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

async function sendEmailBindCode() {
  if (emailSeconds.value > 0) return
  const em = emailForm.email.trim()
  if (!em) {
    ElMessage.warning(t('validation.required'))
    return
  }
  if (isAuthMockEnabled()) {
    ElMessage.success(t('toast.emailCodeSent'))
    startEmailCooldown()
    return
  }
  try {
    await sendEmailCode({ type: EMAIL_CODE_SET_EMAIL, email: em })
    ElMessage.success(t('toast.emailCodeSent'))
    startEmailCooldown()
  } catch (e: unknown) {
    ElMessage.error(e instanceof Error ? e.message : t('toast.sendFailed'))
  }
}

async function submitEmail() {
  if (!emailFormRef.value) return
  await emailFormRef.value.validate(async (valid) => {
    if (!valid) return
    emailSaving.value = true
    try {
      const em = emailForm.email.trim()
      const code = emailForm.code.trim()
      if (isAuthMockEnabled()) {
        userStore.updateUser({ email: em })
        ElMessage.success(t('template06Shop.securityEmailMockOk'))
        emailVisible.value = false
        return
      }
      const res = await setEmail({ email: em, code })
      const ok = res.code === 0 || (res.code === 200 && (res as { status?: boolean }).status !== false)
      if (!ok) {
        ElMessage.error((res as { msg?: string }).msg || t('template06Shop.profileSaveFail'))
        return
      }
      ElMessage.success(emailBound.value ? t('template06Shop.securityChangeOk') : t('template06Shop.securityBindOk'))
      emailVisible.value = false
      await userStore.fetchUserInfo()
    } catch (e: unknown) {
      ElMessage.error(e instanceof Error ? e.message : t('template06Shop.profileSaveFail'))
    } finally {
      emailSaving.value = false
    }
  })
}

const pwdVisible = ref(false)
const pwdFormRef = ref<FormInstance>()
const pwdSaving = ref(false)
const pwdForm = reactive({
  smsCode: '',
  password: '',
  confirmPassword: ''
})

const smsSeconds = ref(0)
let smsTimer: ReturnType<typeof setInterval> | null = null

function resetPwdForm() {
  pwdForm.smsCode = ''
  pwdForm.password = ''
  pwdForm.confirmPassword = ''
}

const pwdRules = computed<FormRules>(() => ({
  smsCode: [{ required: true, message: t('validation.required'), trigger: 'blur' }],
  password: [
    { required: true, message: t('validation.required'), trigger: 'blur' },
    { min: 8, message: t('validation.minPass8'), trigger: 'blur' }
  ],
  confirmPassword: [
    {
      validator: (_r, v: string, cb: (e?: Error) => void) => {
        if (v !== pwdForm.password) cb(new Error(t('validation.passwordMismatch')))
        else cb()
      },
      trigger: 'blur'
    }
  ]
}))

function openPwdDialog() {
  resetPwdForm()
  pwdVisible.value = true
}

async function sendSmsForPwd() {
  if (smsSeconds.value > 0) return
  if (isAuthMockEnabled()) {
    ElMessage.success(t('toast.codeSent'))
    smsSeconds.value = 59
    smsTimer = setInterval(() => {
      smsSeconds.value -= 1
      if (smsSeconds.value <= 0 && smsTimer) {
        clearInterval(smsTimer)
        smsTimer = null
      }
    }, 1000)
    return
  }
  try {
    await sendPasswordChangeSms()
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

async function submitPwdChange() {
  if (!pwdFormRef.value) return
  await pwdFormRef.value.validate(async (valid) => {
    if (!valid) return
    pwdSaving.value = true
    try {
      if (isAuthMockEnabled()) {
        ElMessage.success(t('template06Shop.securityPwdMockOk'))
        pwdVisible.value = false
        return
      }
      const res = await changePassword({
        smsCode: pwdForm.smsCode.trim(),
        password: pwdForm.password
      })
      const ok = res.code === 0 || (res.code === 200 && (res as { status?: boolean }).status !== false)
      if (!ok) {
        ElMessage.error((res as { msg?: string }).msg || t('template06Shop.profileSaveFail'))
        return
      }
      ElMessage.success(t('template06Shop.securityPwdChanged'))
      pwdVisible.value = false
    } catch (e: unknown) {
      ElMessage.error(e instanceof Error ? e.message : t('template06Shop.profileSaveFail'))
    } finally {
      pwdSaving.value = false
    }
  })
}

onUnmounted(() => {
  if (smsTimer) clearInterval(smsTimer)
  if (oldPhoneTimer) clearInterval(oldPhoneTimer)
  if (newPhoneTimer) clearInterval(newPhoneTimer)
  if (emailTimer) clearInterval(emailTimer)
})

useHead(() => ({
  title: t('template06Shop.securityTitle'),
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

.security-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 720px;
}

.security-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 20px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.security-row__main {
  flex: 1;
  min-width: 200px;
}

.security-row__title {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.security-row__desc {
  margin: 0;
  font-size: 13px;
  color: #666;
  line-height: 1.5;
}

.security-row__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.security-row__tag {
  font-size: 13px;
  color: #b8860b;
  font-weight: 600;
}

.btn-sm {
  padding: 8px 16px;
}

.dialog-hint {
  margin: 0 0 16px;
  font-size: 13px;
  color: #666;
  line-height: 1.5;
}

.btn-gold {
  background: linear-gradient(180deg, #d4af37, #b8860b);
  border-color: #b8860b;
  color: #fff;
}

.page-note {
  margin-top: 24px;
  font-size: 12px;
  color: #999;
  max-width: 720px;
  line-height: 1.6;
}
</style>
