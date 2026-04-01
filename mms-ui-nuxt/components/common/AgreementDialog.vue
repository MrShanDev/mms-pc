<template>
  <!-- 通用协议查看弹框 -->
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    class="agreement-dialog"
    center
    @close="handleClose"
  >
    <div class="agreement-content">
      <!-- 协议内容区域 -->
      <div class="agreement-body">
        <slot name="content">
          <!-- 默认渲染 HTML 内容，支持传入纯文本或 HTML -->
          <div 
            v-if="agreementContent"
            class="agreement-text"
            v-html="renderedContent"
          ></div>
          <!-- 如果没有内容，显示提示 -->
          <el-empty 
            v-else 
            description="暂无协议内容"
            :image-size="80"
          />
        </slot>
      </div>

      <!-- 底部按钮 -->
      <div class="dialog-footer">
        <el-button 
          v-if="showCancelButton"
          @click="handleCancel"
        >
          {{ cancelButtonText }}
        </el-button>
        <el-button 
          type="warning" 
          class="confirm-btn" 
          @click="handleConfirm"
        >
          {{ confirmButtonText }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props 定义
interface Props {
  modelValue: boolean  // 弹框显示状态
  title?: string  // 弹框标题
  width?: string  // 弹框宽度
  closeOnClickModal?: boolean  // 是否可以通过点击遮罩层关闭
  confirmButtonText?: string  // 确认按钮文字
  cancelButtonText?: string  // 取消按钮文字
  showCancelButton?: boolean  // 是否显示取消按钮
  agreementContent?: string  // 协议内容（支持 HTML）
}

const props = withDefaults(defineProps<Props>(), {
  title: '协议详情',
  width: '600px',
  closeOnClickModal: false,
  confirmButtonText: '我已阅读并同意',
  cancelButtonText: '取消',
  showCancelButton: true,
  agreementContent: '',
})

// Emits 定义
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'confirm': []
  'cancel': []
  'close': []
}>()

// 计算属性：弹框显示状态
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value: boolean) => {
    emit('update:modelValue', value)
  }
})

// 计算属性：渲染协议内容（处理纯文本换行）
const renderedContent = computed(() => {
  if (!props.agreementContent) return ''
  
  // 如果是 HTML 内容，直接返回
  if (props.agreementContent.includes('<')) {
    return props.agreementContent
  }
  
  // 如果是纯文本，将换行符转换为<br>
  return props.agreementContent.replace(/\n/g, '<br>')
})

// 确认按钮事件
const handleConfirm = () => {
  emit('confirm')
}

// 取消按钮事件
const handleCancel = () => {
  emit('cancel')
  dialogVisible.value = false
}

// 关闭事件
const handleClose = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
// 协议内容弹框样式
.agreement-content {
  padding: 20px 25px;

  .agreement-body {
    max-height: 50vh;
    overflow-y: auto;
    margin-bottom: 20px;
    padding-right: 10px;

    // 自定义滚动条样式
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.05);
    }

    .agreement-text {
      font-size: 14px;
      color: #333;
      line-height: 1.8;
      text-align: justify;
      word-break: break-all;

      :deep(p) {
        margin-bottom: 12px;
        
        &:last-child {
          margin-bottom: 0;
        }
      }

      :deep(strong) {
        font-weight: 600;
        color: #333;
      }

      :deep(em) {
        font-style: normal;
        color: #FFA347;
        font-weight: 500;
      }

      :deep(ul), :deep(ol) {
        padding-left: 20px;
        margin: 10px 0;

        li {
          margin-bottom: 8px;
          
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}

.dialog-footer {
  text-align: center;
  display: flex;
  gap: 15px;
  justify-content: center;

  .confirm-btn {
    min-width: 120px;
    background: linear-gradient(135deg, #FFB366 0%, #FFA347 100%);
    border: none;
    border-radius: 8px;
    padding: 12px 30px;
    font-size: 15px;
    font-weight: 500;

    &:hover {
      opacity: 0.9;
    }
  }
}

// 弹框响应式
@media screen and (max-width: 768px) {
  :deep(.agreement-dialog) {
    width: 90% !important;
    margin: 0 auto;

    .el-dialog__body {
      max-height: 60vh;
    }
  }

  .agreement-content {
    padding: 15px;

    .agreement-body {
      max-height: 45vh;
      
      .agreement-text {
        font-size: 13px;
      }
    }
  }
}
</style>

<!-- 全局样式：覆盖 el-dialog 默认样式 -->
<style lang="scss">
.agreement-dialog.el-dialog {
  border-radius: 12px;
  overflow: hidden;
  padding: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.agreement-dialog {
  .el-dialog__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(135deg, #5A5A5A 0%, #4A4A4A 100%);
    padding: 14px 20px;
    margin: 0;
    border-bottom: none;

    .el-dialog__title {
      text-align: left;
      font-size: 16px;
      color: #fff;
      font-weight: 600;
    }

    .el-dialog__headerbtn {
      top: 0;
      right: 10px;
      
      .el-dialog__close {
        color: rgba(255, 255, 255, 0.8);
        font-size: 20px;
        
        &:hover {
          color: #fff;
        }
      }
    }
  }

  .el-dialog__body {
    padding: 0;
  }
}
</style>
