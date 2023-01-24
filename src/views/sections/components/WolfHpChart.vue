<template>
  <div style="width: 600px; height: 200px" ref="main"></div>
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

const props = defineProps<{ hpData: { name: string; hp: number }[] }>();

const updateChart = () => {
  myChart?.setOption({
    yAxis: { data: props.hpData.map(t => t.name) },
    series: [{ data: props.hpData.map(t => t.hp) }],
  });
};

watch(
  () => props.hpData,
  () => updateChart()
);

onMounted(() => {
  type EChartsOption = echarts.ComposeOption<GridComponentOption | BarSeriesOption>;

  myChart = echarts.init(main.value);

  let option: EChartsOption;
  option = {
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
    },
    grid: { left: 100, top: 30, bottom: 20 },
    series: [
      {
        type: "bar",
        barWidth: "60%",
        label: {
          show: true,
          position: "right",
        },
        showBackground: true,
        backgroundStyle: { color: "rgba(180, 180, 180, 0.2)" },
      },
    ],
  };

  option && myChart.setOption(option);
  updateChart();
});
</script>

<style lang="scss"></style>
