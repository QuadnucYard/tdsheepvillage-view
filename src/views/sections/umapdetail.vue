<template>
  <el-row>
    <el-col :md="16">
      <umap-info-form v-model:mid="mid" />
    </el-col>
    <el-col :md="8" :sm="16">
      <el-tabs v-model="activeName" class="chart-area">
        <el-tab-pane label="狼分布" name="wolf">
          <wave-distrib-chart :mid="mid"/>
        </el-tab-pane>
        <el-tab-pane label="Boss分布" name="boss">
          <boss-distrib-chart :mid="mid" />
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import UmapInfoForm from "./umap-detail/UmapInfoForm.vue";
import WaveDistribChart from "./umap-detail/WaveDistribChart.vue";
import BossDistribChart from "./umap-detail/BossDistribChart.vue";
import { MapId } from "@/tdsheep/ado/GlobalData";

const mid = ref<MapId>("m1");
const activeName = ref("wolf");
</script>

<style lang="scss">
.chart-area {
  // position: absolute;
  // top: 60px;
  // right: 1em;
  font-size: 0.8em;
}

// @media only screen and (max-width: 1200px) {
//   .chart-area {
//     position: inherit;
//   }
// }
</style>
