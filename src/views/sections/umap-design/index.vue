<template>
  <el-row>
    <el-col :md="16">
      <el-button @click="handleExport">导出</el-button>
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
</template>

<script setup lang="ts">
import { useDialogExport } from "@/hooks/dialogs";
import { GameMapData } from "@/tdsheep/command/map";
import WaveDistribChart from "@/views/components/WaveDistribChart.vue";

import UmapDataForm from "./UmapDataForm.vue";

const mapData = ref<GameMapData>();
const activeName = ref("wolf");

const dialogExport = useDialogExport();

const handleExport = () => {
  const md = mapData.value!;
  dialogExport.open({
    name: md.name,
    pass_score: md.scoreMax,
    yield_val: md.hardA,
    hard_ness: md.hardB,
    pop_max: md.populationMax,
    wolf_proportion: md.monsterProportion,
    random_boss: md.randomBossList,
  });
};
</script>

<style scoped></style>
