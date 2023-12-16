<template>
  <div>
    <v-chart ref="chartRef" :option="option" autoresize :update-options="{ notMerge: true }" style="height: 600px" />
  </div>
</template>

<script setup lang="ts">
import { BarChart, BarSeriesOption } from "echarts/charts";
import {
  DatasetComponent,
  DatasetComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import _ from "lodash-es";
import VChart from "vue-echarts";

import { GlobalData, MapId } from "@/tdsheep/ado/GlobalData";
import { tr } from "@/utils/translate";

const props = defineProps<{ mid: MapId }>();

const chartRef = ref<InstanceType<typeof VChart>>();

echarts.use([DatasetComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  DatasetComponentOption | TooltipComponentOption | GridComponentOption | LegendComponentOption | BarSeriesOption
>;

const option = reactive<EChartsOption>({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // Use axis to trigger tooltip
      type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  legend: {},
  grid: [
    { left: "5%", right: "4%", bottom: "52%", containLabel: true },
    { left: "5%", right: "4%", top: "52%", containLabel: true },
  ],
  dataset: {
    source: [],
  },
  xAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
  yAxis: [
    { type: "category", gridIndex: 0 },
    { type: "category", gridIndex: 1 },
  ],
  series: [],
});

watchEffect(() => {
  const boss: any[] = (GlobalData.$_map_Obj[props.mid] as any).random_boss;
  if (!boss) return;
  const a = boss.map((t, i) => [
    Object.keys(t[3].properties.card)[0],
    t[1],
    Math.round((t[0] - (boss[i - 1]?.[0] ?? 0)) * 1000) / 10,
  ]);
  // console.log(a);
  const top = _.uniq(a.map((t) => t[0])).sort(); // baoxiang
  const left = _.uniq(a.map((t) => t[1])).sort(); // boss
  const b = [["boss", ...top]].concat(left.map((x) => [x].concat(new Array<number>(top.length).fill(0))));
  // console.log(b);
  for (const it of a) {
    b[left.indexOf(it[1]) + 1][top.indexOf(it[0]) + 1] = it[2];
  }
  for (let i = 0; i < top.length; i++) {
    b[0][i + 1] = tr(top[i]);
  }
  for (let i = 0; i < left.length; i++) {
    b[i + 1][0] = tr(left[i]);
  }
  (option.dataset! as any).source = b;
  option.series = [
    ...new Array(top.length).fill({
      type: "bar",
      stack: `${props.mid}-totalA`,
      label: { show: true },
      emphasis: { focus: "series" },
    }),
    ...new Array(left.length).fill({
      type: "bar",
      stack: `${props.mid}-totalB`,
      seriesLayoutBy: "row",
      label: { show: true },
      emphasis: { focus: "series" },
      xAxisIndex: 1,
      yAxisIndex: 1,
    }),
  ];
  // chartRef?.value.
});
</script>

<style scoped></style>
