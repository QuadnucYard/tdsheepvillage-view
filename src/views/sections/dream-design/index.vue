<template>
  <div>
    <el-select-v2
      v-model="proto"
      :options="allDreamMapOptions"
      placeholder="原型"
      style="max-width: 250px"
      @change="handleSelectProto"
    />
    <el-button @click="handleImport">导入</el-button>
    <el-button @click="handleExport">导出</el-button>

    <DreamWaveTable ref="tableRef" />
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";

import { useDialogExport, useDialogImport } from "@/hooks/dialogs";
import { GlobalData } from "@/tdsheep/ado/GlobalData";

import DreamWaveTable from "./DreamWaveTable.vue";

const dialogImport = useDialogImport();
const dialogExport = useDialogExport();

const tableRef = ref<InstanceType<typeof DreamWaveTable>>();

const allDreamMapOptions = Object.values(GlobalData.dream_maps).map((t) => ({
  label: t.name,
  value: t.id,
}));

const proto = ref<keyof typeof GlobalData.dream_waves>();

const handleSelectProto = () => {
  if (proto.value) tableRef.value?.importData(GlobalData.dream_waves[proto.value]);
};

const handleImport = async () => {
  try {
    const data = await dialogImport.open();
    tableRef.value?.importData(data);
    ElMessage.success("成功导入数据");
  } catch (e) {
    ElMessage.error("导入格式错误！");
  }
};

const handleExport = () => {
  dialogExport.open(tableRef.value?.toExportData());
};
</script>

<style scoped></style>
