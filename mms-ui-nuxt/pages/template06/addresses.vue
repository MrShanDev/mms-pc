<template>
  <AccountCenterShell>
    <nav class="breadcrumb" :aria-label="t('common.breadcrumbNav')">
      <NuxtLink :to="r.home">{{ t('common.breadcrumbHome') }}</NuxtLink>
      <span class="sep">/</span>
      <NuxtLink :to="r.account">{{ t('template06Shop.accountHome') }}</NuxtLink>
      <span class="sep">/</span>
      <span>{{ t('template06Shop.addressesTitle') }}</span>
    </nav>

    <div class="head">
      <h1 class="page-title">{{ t('template06Shop.addressesTitle') }}</h1>
      <el-button type="primary" class="gold" @click="openAdd">{{ t('template06Shop.addAddress') }}</el-button>
    </div>

    <ul class="list">
        <li v-for="a in addresses" :key="a.id" class="item">
          <div class="body">
            <span v-if="a.isDefault" class="tag">{{ t('template06Shop.defaultTag') }}</span>
            <p class="line">
              <strong>{{ a.name }}</strong> {{ a.phone }}
            </p>
            <p class="line2">{{ a.region }} {{ a.detail }}</p>
          </div>
          <div class="ops">
            <el-button link type="primary" @click="openEdit(a)">{{ t('template06Shop.editAddress') }}</el-button>
            <el-button v-if="!a.isDefault" link @click="onSetDefault(a.id)">{{ t('template06Shop.setDefault') }}</el-button>
            <el-button link type="danger" @click="onDelete(a.id)">{{ t('template06Shop.deleteAddress') }}</el-button>
          </div>
        </li>
      </ul>

      <el-dialog
        v-model="dialogVisible"
        :title="editingId ? t('template06Shop.editAddress') : t('template06Shop.addAddress')"
        width="520px"
        destroy-on-close
        @closed="resetForm"
      >
        <el-form label-position="top">
          <el-form-item :label="t('template06Shop.receiverName')">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item :label="t('template06Shop.phone')">
            <el-input v-model="form.phone" />
          </el-form-item>
          <el-form-item :label="t('template06Shop.region')">
            <el-input v-model="form.region" />
          </el-form-item>
          <el-form-item :label="t('template06Shop.detailAddress')">
            <el-input v-model="form.detail" type="textarea" :rows="2" />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.isDefault">{{ t('template06Shop.setDefault') }}</el-checkbox>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">{{ t('template06Shop.cancel') }}</el-button>
          <el-button type="primary" :loading="saving" @click="onSave">{{ t('template06Shop.save') }}</el-button>
        </template>
      </el-dialog>
  </AccountCenterShell>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { DemoAddress } from '@/types/template06-shop'
import { deleteAddressMock, fetchAddressesMock, saveAddressMock } from '@/api/template06/shop'
import AccountCenterShell from '@/pages/template06/_components/AccountCenterShell.vue'

definePageMeta({ layout: 'default', requiresAuth: true })

const { t } = useAppLocale()
const { locale } = useI18n()
const r = useTemplate06Routes()
const shop = useTemplate06ShopStore()

const addresses = ref<DemoAddress[]>([])
const dialogVisible = ref(false)
const editingId = ref<string | null>(null)
const saving = ref(false)

const form = reactive({
  name: '',
  phone: '',
  region: '',
  detail: '',
  isDefault: false
})

async function load() {
  shop.ensureSeedData()
  const { data } = await fetchAddressesMock()
  addresses.value = data
}

onMounted(() => {
  load()
})

function resetForm() {
  editingId.value = null
  form.name = ''
  form.phone = ''
  form.region = ''
  form.detail = ''
  form.isDefault = false
}

function openAdd() {
  resetForm()
  dialogVisible.value = true
}

function openEdit(a: DemoAddress) {
  editingId.value = a.id
  form.name = a.name
  form.phone = a.phone
  form.region = a.region
  form.detail = a.detail
  form.isDefault = a.isDefault
  dialogVisible.value = true
}

async function onSave() {
  if (!form.name.trim() || !form.phone.trim()) {
    ElMessage.warning(t('validation.required'))
    return
  }
  saving.value = true
  try {
    await saveAddressMock({
      id: editingId.value ?? undefined,
      name: form.name.trim(),
      phone: form.phone.trim(),
      region: form.region.trim(),
      detail: form.detail.trim(),
      isDefault: form.isDefault
    })
    ElMessage.success(t('template06Shop.save'))
    dialogVisible.value = false
    await load()
  } finally {
    saving.value = false
  }
}

async function onSetDefault(id: string) {
  shop.setDefaultAddress(id)
  await load()
}

async function onDelete(id: string) {
  try {
    await ElMessageBox.confirm(t('template06Shop.deleteAddress'), t('header.logoutConfirmTitle'), {
      type: 'warning'
    })
  } catch {
    return
  }
  await deleteAddressMock(id)
  ElMessage.success(t('template06Shop.save'))
  await load()
}

useHead(() => ({
  title: t('template06Shop.addressesTitle'),
  htmlAttrs: { lang: locale.value }
}))
</script>

<style lang="scss" scoped>
.breadcrumb {
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
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

.head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.page-title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
}

.gold {
  background: linear-gradient(180deg, #d4af37, #b8860b);
  border-color: #b8860b;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  padding: 20px;
  margin-bottom: 12px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.tag {
  display: inline-block;
  font-size: 12px;
  color: #b8860b;
  margin-bottom: 8px;
}

.line {
  margin: 0 0 4px;
  font-size: 15px;
}

.line2 {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.ops {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
</style>
