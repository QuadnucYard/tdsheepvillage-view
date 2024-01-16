<template>
  <el-dialog v-model="state.visible" title="导出数据" @close="handleClose">
    <vue-json-pretty :data="state.data" virtual :deep="2" />
    <template #footer>
      <span class="dialog-footer">
        <el-button ref="someRef" @click="copyString">复制到剪贴板</el-button>
        <el-button type="primary" @click="close"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import useClipboard from "vue-clipboard3";
import VueJsonPretty from "vue-json-pretty";

import { useDialogExport } from "@/hooks/dialogs";

const { toClipboard } = useClipboard();
const { state, close } = useDialogExport();

const someRef = ref();

const copyString = () => {
  toClipboard(JSON.stringify(state.data), someRef.value.$el);
  ElMessage.success("已复制到剪贴板");
};

const handleClose = () => {
  state.resolve?.(state.data);
  state.data = null;
};
</script>

<style scoped>
.dialog-footer button {
  max-width: 120px;
}
</style>
