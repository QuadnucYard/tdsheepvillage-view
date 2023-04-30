<template>
  <div style="width: 600px; height: 150px" ref="main"></div>
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

const main = ref();
let myChart: echarts.ECharts;

const props = defineProps<{ data: { name: string; num: number }[]; max: int }>();

const updateChart = () => {
  myChart?.setOption({
    xAxis: { max: props.max },
    yAxis: { data: props.data.map(t => t.name) },
    series: [{ data: props.data.map(t => t.num) }],
  });
};

watch(() => props.data, updateChart);

onMounted(() => {
  type EChartsOption = echarts.ComposeOption<GridComponentOption | BarSeriesOption>;

  myChart = echarts.init(main.value);

  let option: EChartsOption;
  option = {
    color: ["#C00000"],
    xAxis: {
      type: "value",
      interval: 1,
      axisLine: { show: true, lineStyle: { width: 1, type: "solid" } },
    },
    yAxis: {
      type: "category",
      axisTick: { alignWithLabel: true },
      axisLabel: { fontSize: 14 },
    },
    grid: { left: 100, top: 0, bottom: 20 },
    series: [
      {
        type: "bar",
        barWidth: "60%",
        label: { show: true, position: "right" },
        showBackground: true,
        backgroundStyle: { color: "rgba(180, 180, 180, 0.2)" },
      },
    ],
    // animation: false,
  };

  option && myChart.setOption(option);
  updateChart();
});
</script>

<style lang="scss"></style>
