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

echarts.use([GridComponent, TitleComponent, TooltipComponent, BarChart, CanvasRenderer]);

const props = defineProps<{ data: { name: string; num: number }[]; max: int }>();

type EChartsOption = echarts.ComposeOption<GridComponentOption | BarSeriesOption>;
const option = computed<EChartsOption>(() => ({
  color: ["#C00000"],
  xAxis: {
    type: "value",
    interval: 1,
    axisLine: { show: true, lineStyle: { width: 1, type: "solid" } },
    max: props.max,
  },
  yAxis: {
    type: "category",
    axisTick: { alignWithLabel: true },
    axisLabel: { fontSize: 14 },
    data: props.data.map(t => t.name),
  },
  grid: { left: 100, top: 0, bottom: 20 },
  series: {
    type: "bar",
    barWidth: "60%",
    label: { show: true, position: "right" },
    showBackground: true,
    backgroundStyle: { color: "rgba(180, 180, 180, 0.2)" },
    data: props.data.map(t => t.num),
  },
  // animation: false,
}));
</script>

<style lang="scss" scoped>
.chart {
  width: 600px;
  height: 150px;
}
</style>
