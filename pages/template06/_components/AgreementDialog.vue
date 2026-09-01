<template>
  <el-dialog
    :model-value="modelValue"
    :title="title"
    width="min(640px, 92vw)"
    append-to-body
    destroy-on-close
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="agreement-body" v-html="agreementContent" />
    <template #footer>
      <el-button v-if="showCancelButton" @click="emit('update:modelValue', false)">
        {{ cancelButtonText }}
      </el-button>
      <el-button type="primary" @click="emit('update:modelValue', false)">
        {{ confirmButtonText }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: boolean
    title: string
    agreementContent: string
    showCancelButton?: boolean
    cancelButtonText?: string
    confirmButtonText: string
  }>(),
  {
    showCancelButton: true,
    cancelButtonText: 'Cancel'
  }
)

const emit = defineEmits<{ 'update:modelValue': [v: boolean] }>()
</script>

<style scoped>
.agreement-body {
  max-height: 60vh;
  overflow: auto;
  font-size: 14px;
  line-height: 1.65;
}
</style>
