<template>
  <div ref="main" style="width: 400px"></div>
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
import wavegenFreq from "@/assets/wavegen_freq.json";
import { GlobalData } from "@/tdsheep/ado/GlobalData.js";
import { toApprecision } from "@/utils/format.ts";
import { tr } from "@/utils/translate.ts";
import { range, toString } from "@/utils";

const main = ref();
let myChart: echarts.ECharts;

const props = defineProps<{ mid: string }>();

// watch(
//   () => props.hpData,
//   (hpData, old) => {
//     myChart?.setOption({
//       yAxis: { data: hpData.map(t => t.name) },
//       series: [{ data: hpData.map(t => t.hp) }],
//     });
//   }
// );

// 生成dataset
// let source= [
//       ['product', '2012', '2013', '2014', '2015'],
//       ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
//       ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
//       ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
//     ]
let wolfs = wavegenFreq["m11"];
let source: any[] = ["name"].concat(range(wolfs.all.length).map(toString));
source = [source].concat([["all"].concat(wolfs.all.map(toString))]);
source = source.concat(
  GlobalData.$_map_Obj["m11"].wolf_proportion.map((t: any[], i: number) =>
    [tr(t[1])].concat(wolfs.each[i])
  )
);
console.log(source);

onMounted(() => {
  // type EChartsOption = echarts.ComposeOption<GridComponentOption | BarSeriesOption>;
  // myChart = echarts.init(main.value);
  // let option: EChartsOption;
  // option = {
  //   color: ["#92D050", "#94D8F6"],
  //   title: {
  //     left: "center",
  //     textStyle: {
  //       fontStyle: "normal",
  //       fontFamily: "sans-serif",
  //       fontSize: 14,
  //     },
  //   },
  //   tooltip: {
  //     //show: true,
  //     formatter: params =>
  //       params.marker + params.name + "&emsp;" + "<b>" + toApprecision(params.data, 6) + "</b>",
  //   },
  //   //legend: { show: false },
  //   xAxis: {
  //     type: "category",
  //     axisTick: { alignWithLabel: true },
  //   },
  //   yAxis: [
  //     {
  //       name: "频率",
  //       position: "left",
  //       type: "value",
  //       axisLine: {
  //         show: true,
  //         lineStyle: { width: 1, type: "solid" },
  //       },
  //       axisTick: {
  //         show: true,
  //         inside: true,
  //         length: 3,
  //         lineStyle: { width: 1, type: "solid" },
  //       },
  //     },
  //     {
  //       name: "分布频率",
  //       position: "right",
  //       type: "value",
  //       axisLine: {
  //         show: true,
  //         lineStyle: { width: 1, type: "solid" },
  //       },
  //       axisTick: {
  //         show: true,
  //         inside: true,
  //         length: 3,
  //         lineStyle: { width: 1, type: "solid" },
  //       },
  //       splitLine: {
  //         show: false,
  //       },
  //     },
  //   ],
  //   grid: { x1: 10, x2: 30, y: 10, y2: 20 },
  //   series: [
  //     { yAxisIndex: 0, type: "bar", barWidth: "90%" },
  //     { yAxisIndex: 1, type: "line", smooth: true },
  //   ],
  // };
  // option && myChart.setOption(option);
});
</script>

<style lang="scss"></style>
