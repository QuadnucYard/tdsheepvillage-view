<template>
  <v-chart class="chart" :option="option" :style="{ width: `${width}px`, height: `${height}px` }" />
</template>

<script setup lang="ts">
import { BarChart } from "echarts/charts";
import type { BarSeriesOption } from "echarts/charts";
import { GridComponent, TitleComponent, TooltipComponent } from "echarts/components";
import type { GridComponentOption, TitleComponentOption, TooltipComponentOption } from "echarts/components";
import * as echarts from "echarts/core";
import type { ComposeOption } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";

import { strHSl } from "@/utils/colorful";

echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]);

type EChartsOption = ComposeOption<
  TitleComponentOption | TooltipComponentOption | GridComponentOption | BarSeriesOption
>;

const props = withDefaults(
  defineProps<{ hpData: { name: string; value: number }[]; width?: number; height?: number }>(),
  { width: 600, height: 200 }
);

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
    data: props.hpData.map((t) => t.name),
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
    data: props.hpData.map((t) => t.value),
    itemStyle: {
      color: function (params) {
        return strHSl(params.name, 80, 45);
      },
    },
  },
}));
</script>
