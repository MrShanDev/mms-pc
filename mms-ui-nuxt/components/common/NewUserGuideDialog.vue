<template>
  <el-dialog
    :model-value="visible"
    :show-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="420px"
    class="new-user-dialog"
    align-center
    @update:model-value="handleVisibleChange"
  >
    <div class="new-user-content">
      <div class="success-icon">
        <el-icon :size="48" color="#F5923A">
          <CircleCheckFilled />
        </el-icon>
      </div>
      <div class="dialog-title">登录成功</div>
      <div class="dialog-desc">您已成功登录斑马优号，是否现在去完善个人信息？</div>
      <div class="dialog-actions">
        <button class="btn-wait" @click="handleWait">再等等</button>
        <button class="btn-complete" @click="handleComplete">去完善</button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { CircleCheckFilled } from '@element-plus/icons-vue'

/**
 * 新用户引导弹框组件
 * 登录成功后如果是新用户，弹出此弹框引导用户完善个人信息
 */

interface Props {
  /** 弹框显示状态 */
  visible: boolean
}

interface Emits {
  /** 更新显示状态 */
  (e: 'update:visible', value: boolean): void
  /** 点击"再等等"按钮 */
  (e: 'wait'): void
  /** 点击"去完善"按钮 */
  (e: 'complete'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

/**
 * 处理弹框显示状态变化
 */
const handleVisibleChange = (value: boolean) => {
  emit('update:visible', value)
}

/**
 * 点击"再等等"按钮
 * 关闭弹框并触发 wait 事件
 */
const handleWait = () => {
  emit('update:visible', false)
  emit('wait')
}

/**
 * 点击"去完善"按钮
 * 关闭弹框并触发 complete 事件
 */
const handleComplete = () => {
  emit('update:visible', false)
  emit('complete')
}
</script>

<style lang="scss" scoped>
// 新用户引导弹框样式
:deep(.new-user-dialog) {
  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    padding: 0;
  }
}

.new-user-content {
  padding: 40px 32px 32px;
  text-align: center;

  .success-icon {
    margin-bottom: 16px;

    .el-icon {
      font-size: 48px;
    }
  }

  .dialog-title {
    font-size: 18px;
    font-weight: 600;
    color: #F5923A;
    margin-bottom: 12px;
  }

  .dialog-desc {
    font-size: 14px;
    color: #666;
    margin-bottom: 32px;
    line-height: 1.5;
  }

  .dialog-actions {
    display: flex;
    gap: 16px;
    justify-content: center;

    .btn-wait {
      flex: 1;
      height: 44px;
      border: 1px solid #F5923A;
      background: #fff;
      color: #F5923A;
      border-radius: 8px;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: #FFF2E6;
      }
    }

    .btn-complete {
      flex: 1;
      height: 44px;
      border: none;
      background: linear-gradient(135deg, #FFB366 0%, #F5923A 100%);
      color: #fff;
      border-radius: 8px;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: linear-gradient(135deg, #FFC080 0%, #F5A050 100%);
      }
    }
  }
}
</style>
