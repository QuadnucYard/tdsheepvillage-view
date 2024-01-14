<template>
  <el-row>
    <el-col :md="16">
      <UmapDataForm v-model:map-data="mapData" @export="handleExport" />
    </el-col>
    <el-col :md="8" :sm="16">
      <el-tabs v-if="mapData" v-model="activeName" class="chart-area">
        <el-tab-pane label="狼分布" name="wolf">
          <wave-distrib-chart :map-data="mapData" />
        </el-tab-pane>
        <!-- <el-tab-pane label="Boss分布" name="boss">
          <boss-distrib-chart :mid="mid" />
        </el-tab-pane> -->
      </el-tabs>
    </el-col>
  </el-row>

  <el-dialog v-model="dialogExportVisible" title="导出数据">
    <vue-json-pretty :data="exportData" virtual :deep="2" />
    <el-button ref="someRef" @click="copyExportString">复制到剪贴板</el-button>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import useClipboard from "vue-clipboard3";
import VueJsonPretty from "vue-json-pretty";

import { GameMapData } from "@/tdsheep/command/map";
import WaveDistribChart from "@/views/components/WaveDistribChart.vue";

import UmapDataForm from "./UmapDataForm.vue";

const { toClipboard } = useClipboard();

const mapData = ref<GameMapData>();
const activeName = ref("wolf");

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
