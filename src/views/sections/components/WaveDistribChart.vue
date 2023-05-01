<template>
  <div class="chart-area">
    <h2 style="text-align: center;">狼出现频率（按数量，供参考）</h2>
    <div ref="main" style="width: 600px; height: 600px"></div>
  </div>
</template>

<script setup lang="ts">
import wavegenFreq from "@/assets/wavegen_freq.json";
import { GlobalData } from "@/tdsheep/ado/GlobalData.js";
import { accumulate, range, toString } from "@/utils";
import { toApprecision } from "@/utils/format.ts";
import { tr } from "@/utils/translate.ts";
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

const main = ref();
let myChart: echarts.ECharts;

const props = withDefaults(defineProps<{ mid: string; height: number; width: number }>(), {
  width: 600,
  height: 600,
});

let freqs = wavegenFreq["m11"];
let source: any[] = ["name"].concat(range(freqs.all.length).map(toString));
source = [source].concat([["all"].concat(freqs.all.map(toString))]);
source = source.concat(
  GlobalData.$_map_Obj["m11"].wolf_proportion.map((t: any[], i: number) =>
    [tr(t[1])].concat(freqs.each[i])
  )
);
console.log(source);

interface Subfigure {
  title: string;
  pdf: number[];
  cdf: number[];
}

const updateChart = () => {
  const freqs = wavegenFreq[props.mid];
  const names: string[] = [
    GlobalData.$_map_Obj[props.mid].name,
    ...GlobalData.$_map_Obj[props.mid].wolf_proportion.map(t => tr(t[1])),
  ];
  const xData = _.range(freqs.all.length);
  const subfigures: Subfigure[] = _.zip(names, [freqs.all, ...freqs.each]).map((t, i) => ({
    title: t[0]!,
    pdf: t[1]!,
    cdf: [...accumulate(t[1]!)],
  }));
  myChart.clear();
  myChart.setOption({
    tooltip: {
      trigger: "axis",
      valueFormatter: (value: any) => toApprecision(value, 6),
    },
    title: subfigures.map((f, i) => ({
      text: f.title,
      left: "center",
      textVerticalAlign: "middle",
      top: props.height * ((i + 0.5) / subfigures.length) - 5,
      z: -1,
      textStyle: { fontSize: (props.height / subfigures.length) * 0.4, color: "#ccc" },
    })),
    xAxis: subfigures.map((f, i) => ({
      gridIndex: i,
      type: "category",
      axisTick: { alignWithLabel: true },
      data: xData,
    })),
    yAxis: subfigures.flatMap((f, i) => [
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
    grid: subfigures.map((f, i) => ({
      top: props.height * (i / subfigures.length) + 10,
      bottom: props.height * (1 - (i + 1) / subfigures.length) + 20,
    })),
    series: subfigures.flatMap((f, i) => [
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
  });
};

watch(() => props.mid, updateChart);

onMounted(() => {
  type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | BarSeriesOption
    | LineSeriesOption
  >;
  myChart = echarts.init(main.value);
  const option: EChartsOption = {
    // color: ["#92D050", "#94D8F6"],
  };
  myChart.setOption(option);
  updateChart();
});
</script>

<style lang="scss" scoped>
.chart-area {
  position: absolute;
  top: 60px;
  right: 1em;
  font-size: 0.8em;
}

@media only screen and (max-width: 1200px) {
  .chart-area {
    position: inherit;
  }
}
</style>
