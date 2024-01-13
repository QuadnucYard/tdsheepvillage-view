<template>
  <el-row>
    <el-col :md="16">
      <umap-info-form v-model:mid="mid" v-model:map-data="mapData" />
    </el-col>
    <el-col :md="8" :sm="16">
      <el-tabs v-if="mapData" v-model="activeName" class="chart-area">
        <el-tab-pane label="狼分布" name="wolf">
          <wave-distrib-chart :map-data="mapData" />
        </el-tab-pane>
        <el-tab-pane label="Boss分布" name="boss">
          <boss-distrib-chart :mid="mid" />
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { MapId } from "@/tdsheep/ado/GlobalData";
import { GameMapData } from "@/tdsheep/command/map";
import BossDistribChart from "@/views/components/BossDistribChart.vue";
import WaveDistribChart from "@/views/components/WaveDistribChart.vue";

import UmapInfoForm from "./UmapInfoForm.vue";

const mid = ref<MapId>("m1");
const mapData = ref<GameMapData>();
const activeName = ref("wolf");
</script>

<style lang="scss">
.chart-area {
  font-size: 0.8em;
}
</style>
