<template>
  <UmapDataForm @export="handleExport" />

  <el-dialog v-model="dialogExportVisible" title="导出数据">
    <vue-json-pretty :data="exportData" virtual :deep="2" />
    <el-button @click="copyExportString" ref="someRef">复制到剪贴板</el-button>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import useClipboard from "vue-clipboard3";
import VueJsonPretty from "vue-json-pretty";

import { GameMapData } from "@/tdsheep/command/map";

import UmapDataForm from "./UmapDataForm.vue";

const { toClipboard } = useClipboard();

const dialogExportVisible = ref(false);
const exportData = ref({});
const exportString = ref("");

const someRef = ref();

const handleExport = (mapData: GameMapData) => {
  dialogExportVisible.value = true;
  const exportData_ = {
    name: mapData.name,
    pass_score: mapData.scoreMax,
    yield_val: mapData.hardA,
    hard_ness: mapData.hardB,
    pop_max: mapData.populationMax,
    wolf_proportion: mapData.monsterProportion,
    random_boss: mapData.randomBossList,
  };
  exportData.value = exportData_;
  exportString.value = JSON.stringify(exportData_);
};

const copyExportString = () => {
  toClipboard(exportString.value, someRef.value.$el);
  ElMessage.success("已复制到剪贴板");
};
</script>

<style scoped></style>
