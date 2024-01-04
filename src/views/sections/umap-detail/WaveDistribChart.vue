<template>
  <div>
    <h2 style="text-align: center">狼出现频率（按数量，供参考）</h2>
    <v-chart :option="option" autoresize style="height: 600px" />
  </div>
</template>

<script setup lang="ts">
import { BarChart, BarSeriesOption, LineChart, LineSeriesOption } from "echarts/charts";
import {
  GridComponent,
  GridComponentOption,
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  TooltipComponent,
  TooltipComponentOption,
} from "echarts/components";
import * as echarts from "echarts/core";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import _ from "lodash-es";

import wavegenFreq from "@/assets/wavegen_freq.json";
import { GlobalData, MapId } from "@/tdsheep/ado/GlobalData";
import { accumulate, toString } from "@/utils";
import { strHSl } from "@/utils/colorful";
import { toApprecision } from "@/utils/format";
import { tr } from "@/utils/translate";

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

const props = withDefaults(defineProps<{ mid: MapId; height?: number; width?: number }>(), {
  width: 600,
  height: 600,
});

interface Subfigure {
  title: string;
  pdf: number[];
  cdf: number[];
}

const freqs = computed(() => wavegenFreq[props.mid]);
const names = computed<string[]>(() => [
  GlobalData.$_map_Obj[props.mid].name,
  ...GlobalData.$_map_Obj[props.mid].wolf_proportion.map((t) => tr(t[1] as string)),
]);
const xData = computed(() => _.range(freqs.value.all.length));
const subfigures = computed<Subfigure[]>(() =>
  _.zip(names.value, [freqs.value.all, ...freqs.value.each]).map((t, i) => ({
    title: t[0]!,
    pdf: t[1]!,
    cdf: [...accumulate(t[1]!)],
  }))
);

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | TooltipComponentOption | GridComponentOption | BarSeriesOption | LineSeriesOption
>;

const option = computed<EChartsOption>(() => ({
  color: subfigures.value.flatMap((f) => [strHSl(f.title, 70, 50), strHSl(f.title, 50, 80)]),
  tooltip: {
    trigger: "axis",
    valueFormatter: (value: any) => toApprecision(value, 6),
  },
  title: subfigures.value.map((f, i) => ({
    text: f.title,
    left: "center",
    textVerticalAlign: "middle",
    top: props.height * ((i + 0.5) / subfigures.value.length) - 5,
    z: -1,
    textStyle: { fontSize: (props.height / subfigures.value.length) * 0.4, color: "#ccc" },
  })),
  xAxis: subfigures.value.map((f, i) => ({
    gridIndex: i,
    type: "category",
    axisTick: { alignWithLabel: true },
    data: xData.value,
  })),
  yAxis: subfigures.value.flatMap((f, i) => [
    {
      gridIndex: i,
      type: "value",
      alignTicks: true,
      axisLine: { show: true },
      axisTick: { show: true, inside: true, length: 3 },
    },
    {
      gridIndex: i,
      type: "value",
      position: "right",
      min: 0,
      max: 1,
      interval: 0.2,
      alignTicks: true,
      axisLine: { show: true },
      axisTick: { show: true, inside: true, length: 3 },
    },
  ]),
  grid: subfigures.value.map((f, i) => ({
    top: props.height * (i / subfigures.value.length) + 10,
    bottom: props.height * (1 - (i + 1) / subfigures.value.length) + 20,
  })),
  series: subfigures.value.flatMap((f, i) => [
    {
      xAxisIndex: i,
      yAxisIndex: i * 2,
      type: "bar",
      barWidth: "90%",
      data: f.pdf,
    },
    {
      xAxisIndex: i,
      yAxisIndex: i * 2 + 1,
      type: "line",
      smooth: true,
      data: f.cdf,
    },
  ]),
}));
</script>

<style lang="scss" scoped></style>
