<template>
  <el-dialog v-model="state.visible" title="导入数据" @close="handleClose">
    <el-input v-model="state.data" type="textarea" :rows="10" :spellcheck="false" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";

import { useDialogImport } from "@/hooks/dialogs";

const { state, close } = useDialogImport();

const handleConfirm = () => {
  try {
    const data = JSON.parse(state.data);
    state.resolve?.(data);
    close();
  } catch (e) {
    ElMessage.error("JSON格式不合法！");
  }
};

const handleClose = () => {
  // state.reject?.();
};
</script>

<style scoped>
.dialog-footer button {
  max-width: 120px;
}
</style>
