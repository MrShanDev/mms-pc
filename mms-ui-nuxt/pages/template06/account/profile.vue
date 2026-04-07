<template>
  <AccountCenterShell>
    <nav class="breadcrumb" :aria-label="t('common.breadcrumbNav')">
      <NuxtLink :to="r.home">{{ t('common.breadcrumbHome') }}</NuxtLink>
      <span class="sep">/</span>
      <NuxtLink :to="r.account">{{ t('template06Shop.accountHome') }}</NuxtLink>
      <span class="sep">/</span>
      <span>{{ t('template06Shop.profileTitle') }}</span>
    </nav>

    <h1 class="page-title">{{ t('template06Shop.profileTitle') }}</h1>

    <div v-if="user" class="profile-panel">
      <div class="panel-hd">
        <span class="panel-tag">{{ t('template06Shop.profileSectionBasic') }}</span>
      </div>

      <el-form
        ref="formRef"
        class="profile-form"
        :model="form"
        :rules="rules"
        label-position="top"
        @submit.prevent
      >
        <el-form-item :label="t('template06Shop.profileHeadPortrait')">
          <div class="avatar-block">
            <el-avatar :size="96" :src="avatarPreviewSrc" class="avatar-preview">
              {{ avatarFallbackInitial }}
            </el-avatar>
            <div class="avatar-actions">
              <el-upload
                :show-file-list="false"
                accept="image/jpeg,image/png,image/gif,image/webp"
                :disabled="uploading"
                :before-upload="beforeAvatarUpload"
                :http-request="handleAvatarRequest"
              >
                <el-button type="primary" class="avatar-upload-btn" :loading="uploading">
                  {{ t('template06Shop.profilePickAvatar') }}
                </el-button>
              </el-upload>
              <el-button
                v-if="form.headPortrait"
                link
                type="danger"
                :disabled="uploading"
                @click="clearAvatar"
              >
                {{ t('template06Shop.profileRemoveAvatar') }}
              </el-button>
            </div>
            <p class="avatar-hint">{{ t('template06Shop.profileUploadHint') }}</p>
          </div>
        </el-form-item>

        <el-form-item :label="t('auth.account')">
          <el-input :model-value="displayAccount" disabled />
        </el-form-item>
        <el-form-item :label="t('auth.mobile')">
          <el-input :model-value="user.phone || '—'" disabled />
        </el-form-item>
        <el-form-item :label="t('template06Shop.profileNickname')" prop="nickname">
          <el-input v-model="form.nickname" maxlength="32" show-word-limit clearable />
        </el-form-item>

        <el-form-item :label="t('template06Shop.profileSex')" prop="sex">
          <el-select v-model="form.sex" class="sex-select" :teleported="true">
            <el-option :label="t('template06Shop.sexMale')" :value="1" />
            <el-option :label="t('template06Shop.sexFemale')" :value="2" />
            <el-option :label="t('template06Shop.sexUnknown')" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="save-btn" :loading="saving" @click="onSubmit">
            {{ t('template06Shop.profileSave') }}
          </el-button>
        </el-form-item>
      </el-form>

      <div class="notes">
        <p class="note">{{ t('template06Shop.profileReadonlyHint') }}</p>
        <p class="note muted">{{ t('template06Shop.payHint') }}</p>
        <p v-if="!isMock" class="note muted">{{ t('template06Shop.profileApiHint') }}</p>
      </div>
    </div>
    <p v-else class="empty">{{ t('template06Shop.loginGateHint') }}</p>
  </AccountCenterShell>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules, UploadRequestOptions } from 'element-plus'
import AccountCenterShell from '@/pages/template06/_components/AccountCenterShell.vue'
import { useUserStore } from '@/stores/user'
import { updateMember, uploadAvatarFile } from '@/api/user'
import { isAuthMockEnabled } from '@/api/user/mockAuth'

definePageMeta({ layout: 'default', requiresAuth: true })

const { t } = useAppLocale()
const { locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const r = useTemplate06Routes()
const userStore = useUserStore()
const user = computed(() => userStore.user)

const isMock = computed(() => isAuthMockEnabled())

const displayAccount = computed(() => user.value?.account || user.value?.phone || user.value?.nickname || '—')

const formRef = ref<FormInstance>()
const saving = ref(false)
const uploading = ref(false)

const form = reactive({
  nickname: '',
  headPortrait: '',
  sex: 3 as number
})

function resolvePortraitUrl(raw: string | undefined | null): string | undefined {
  if (!raw || !String(raw).trim()) return undefined
  const s = String(raw).trim()
  if (/^data:image\//i.test(s)) return s
  if (/^https?:\/\//i.test(s) || s.startsWith('//')) return s
  const base = String(runtimeConfig.public.appApiUrl ?? '').replace(/\/$/, '')
  if (!base) return s.startsWith('/') ? s : `/${s}`
  return s.startsWith('/') ? `${base}${s}` : `${base}/${s}`
}

const avatarPreviewSrc = computed(() => resolvePortraitUrl(form.headPortrait))

const avatarFallbackInitial = computed(() => {
  const n = (form.nickname || user.value?.nickname || user.value?.account || user.value?.phone || '?')
    .toString()
    .trim()
  const ch = n.charAt(0)
  return ch ? ch.toUpperCase() : '?'
})

function syncFormFromUser() {
  const u = userStore.user
  if (!u) return
  form.nickname = u.nickname || ''
  form.headPortrait = u.headPortrait || ''
  form.sex = typeof u.sex === 'number' ? u.sex : 3
}

watch(
  () => userStore.user?.id,
  () => syncFormFromUser(),
  { immediate: true }
)

const rules = computed<FormRules>(() => ({
  nickname: [{ required: true, message: t('validation.required'), trigger: 'blur' }]
}))

function apiOk(code: number) {
  return code === 0 || code === 200
}

function parseAvatarUrlFromUpload(data: unknown): string | null {
  if (data == null) return null
  if (typeof data === 'string' && data.trim()) return data.trim()
  if (typeof data === 'object') {
    const o = data as Record<string, unknown>
    const v = o.url ?? o.fileUrl ?? o.path ?? o.data
    if (typeof v === 'string' && v.trim()) return v.trim()
  }
  return null
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(String(r.result))
    r.onerror = () => reject(new Error('read'))
    r.readAsDataURL(file)
  })
}

function beforeAvatarUpload(file: File) {
  const okType = /^image\/(jpeg|png|gif|webp)$/i.test(file.type)
  if (!okType) {
    ElMessage.error(t('template06Shop.profileAvatarInvalidType'))
    return false
  }
  const okSize = file.size / 1024 / 1024 < 2
  if (!okSize) {
    ElMessage.error(t('template06Shop.profileAvatarTooLarge'))
    return false
  }
  return true
}

async function handleAvatarRequest(opt: UploadRequestOptions) {
  const file = opt.file as File
  uploading.value = true
  try {
    if (isMock.value) {
      form.headPortrait = await fileToDataUrl(file)
    } else {
      const res = await uploadAvatarFile(file)
      if (!apiOk(res.code)) {
        throw new Error((res as { msg?: string }).msg || t('template06Shop.profileUploadFail'))
      }
      const url = parseAvatarUrlFromUpload(res.data)
      if (!url) {
        throw new Error(t('template06Shop.profileUploadFail'))
      }
      form.headPortrait = url
    }
    ElMessage.success(t('template06Shop.profileAvatarReady'))
    opt.onSuccess?.({} as never)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : t('template06Shop.profileUploadFail')
    ElMessage.error(msg)
    opt.onError?.(e as Error)
  } finally {
    uploading.value = false
  }
}

function clearAvatar() {
  form.headPortrait = ''
}

async function onSubmit() {
  if (!formRef.value || !user.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    saving.value = true
    try {
      const u = userStore.user!
      const nickname = form.nickname.trim()
      const headPortrait = form.headPortrait.trim()
      const sex = form.sex

      if (isMock.value) {
        userStore.updateUser({
          nickname,
          headPortrait,
          sex
        })
        ElMessage.success(t('template06Shop.profileSaveSuccess'))
        return
      }

      const prevNick = u.nickname || ''
      const prevHp = u.headPortrait || ''
      const prevSex = typeof u.sex === 'number' ? u.sex : 3

      if (nickname === prevNick && headPortrait === prevHp && sex === prevSex) {
        ElMessage.info(t('template06Shop.profileNoChanges'))
        return
      }

      if (nickname !== prevNick) {
        const res = await updateMember({ type: 3, nickname })
        if (!apiOk(res.code)) {
          throw new Error((res as { msg?: string }).msg || t('template06Shop.profileSaveFail'))
        }
      }
      if (headPortrait !== prevHp) {
        const res = await updateMember({ type: 4, headPortrait })
        if (!apiOk(res.code)) {
          throw new Error((res as { msg?: string }).msg || t('template06Shop.profileSaveFail'))
        }
      }
      if (sex !== prevSex) {
        const res = await updateMember({ type: 5, sex })
        if (!apiOk(res.code)) {
          throw new Error((res as { msg?: string }).msg || t('template06Shop.profileSaveFail'))
        }
      }

      userStore.updateUser({ nickname, headPortrait, sex })
      try {
        await userStore.fetchUserInfo()
      } catch {
        /* 已用 updateUser 同步展示 */
      }
      ElMessage.success(t('template06Shop.profileSaveSuccess'))
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : t('template06Shop.profileSaveFail')
      ElMessage.error(msg)
    } finally {
      saving.value = false
    }
  })
}

useHead(() => ({
  title: t('template06Shop.profileTitle'),
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
  margin: 0 0 20px;
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
}

.profile-panel {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.panel-hd {
  padding: 14px 20px;
  background: linear-gradient(90deg, #faf8f3, #fff);
  border-bottom: 1px solid #f0f0f0;
}

.panel-tag {
  font-size: 14px;
  font-weight: 600;
  color: #b8860b;
}

.profile-form {
  padding: 20px 20px 8px;
  max-width: 520px;
}

.avatar-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.avatar-preview {
  flex-shrink: 0;
  border: 2px solid #f0f0f0;
}

.avatar-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;

  :deep(.avatar-upload-btn.el-button--primary) {
    background: linear-gradient(180deg, #d4af37, #b8860b);
    border-color: #b8860b;
    color: #fff;
  }

  :deep(.avatar-upload-btn.el-button--primary:hover),
  :deep(.avatar-upload-btn.el-button--primary:focus) {
    background: linear-gradient(180deg, #e0bc4a, #9a7209);
    border-color: #9a7209;
    color: #fff;
  }

  :deep(.avatar-upload-btn.el-button--primary.is-disabled) {
    background: #e8e0d0;
    border-color: #d4c4a8;
    color: #fff;
  }
}

.avatar-hint {
  margin: 0;
  font-size: 12px;
  color: #999;
  line-height: 1.5;
}

.sex-select {
  width: 100%;
}

.save-btn {
  min-width: 120px;
  background: linear-gradient(180deg, #d4af37, #b8860b);
  border-color: #b8860b;
  color: #fff;

  &:hover,
  &:focus {
    background: linear-gradient(180deg, #e0bc4a, #9a7209);
    border-color: #9a7209;
    color: #fff;
  }
}

.notes {
  padding: 0 20px 20px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}

.note {
  margin: 12px 0 0;
  font-size: 13px;
  color: #666;
  line-height: 1.6;

  &:first-child {
    margin-top: 16px;
  }

  &.muted {
    color: #999;
    font-size: 12px;
  }
}

.empty {
  padding: 32px 20px;
  color: #888;
  background: #fff;
  border: 1px dashed #ddd;
  border-radius: 8px;
  text-align: center;
}
</style>
