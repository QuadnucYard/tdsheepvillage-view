<template>
  <v-chart class="chart" :option="option" />
</template>

<script setup lang="ts">
import * as echarts from "echarts/core";
import {
  GridComponent,
  GridComponentOption,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { BarChart, BarSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";

echarts.use([GridComponent, TitleComponent, TooltipComponent, BarChart, CanvasRenderer]);

const props = defineProps<{ hpData: { name: string; value: number }[] }>();

type EChartsOption = echarts.ComposeOption<GridComponentOption | BarSeriesOption>;
const option = computed<EChartsOption>(() => ({
  color: ["#00A2E8"],
  title: {
    text: "当前狼血量",
    left: "center",
    textStyle: {
      fontStyle: "normal",
      fontFamily: "sans-serif",
      fontSize: 16,
    },
  },
  tooltip: {},
  xAxis: {
    type: "value",
    axisLine: {
      show: true,
      lineStyle: { width: 1, type: "solid" },
    },
  },
  yAxis: {
    type: "category",
    axisTick: { alignWithLabel: true },
    axisLabel: {
      fontSize: 14,
    },
    data: props.hpData.map(t => t.name),
  },
  grid: { left: 100, top: 30, bottom: 20 },
  series: {
    type: "bar",
    barWidth: "60%",
    label: {
      show: true,
      position: "right",
    },
    showBackground: true,
    backgroundStyle: { color: "rgba(180, 180, 180, 0.2)" },
    data: props.hpData.map(t => t.value),
  },
}));
</script>

<style lang="scss" scoped>
.chart {
  width: 600px;
  height: 200px;
}
</style>
