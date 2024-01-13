<template>
  <table class="text-center markup-table table-auto">
    <thead>
      <th>Boss</th>
      <th>权重</th>
      <th>概率</th>
      <th>难度系数</th>
    </thead>
    <tbody>
      <tr v-for="(m, i) in bosses">
        <td>
          <el-select-v2
            :key="m.index"
            v-model="m.id"
            :options="allBossMonsterOptions"
            filterable
            clearable
            @clear="bosses.removeAt(i)"
            size="small"
            style="width: 200px"
          />
        </td>
        <td>
          <el-input-number v-model="m.weight" :min="0" size="small" style="width: 100px" />
        </td>
        <td>{{ (m.weight / sumWeight).toFixed(3) }}</td>
        <td>
          <DifficultySelect v-model="m.diff" style="width: 180px" />
        </td>
      </tr>
      <tr>
        <td>
          <el-select-v2
            v-model="bossAdd"
            :options="allBossMonsterOptions"
            filterable
            @change="handleAddMonster"
            size="small"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import _ from "lodash-es";

import { GameMapData } from "@/tdsheep/command/map";
import { proportionToWeight, weightToProportion } from "@/utils/game-utils";
import { allBossMonsterOptions } from "@/utils/ui-data";
import DifficultySelect from "@/views/components/DifficultySelect.vue";

const props = defineProps<{ mapData: GameMapData }>();
const { mapData } = toRefs(props);

let index = 0;

const parseMapBoss = () =>
  _.zip(mapData.value.randomBossList, proportionToWeight(mapData.value.randomBossList.map((t) => t[0]))).map((t) => ({
    index: index++,
    id: t[0]![1],
    weight: t[1]!,
    diff: parseFloat(t[0]![2]),
  }));

const bosses = reactive<{ index: int; id: string; weight: int; diff: float }[]>(parseMapBoss());
const bossAdd = ref<string | null>(null);
const sumWeight = computed(() => _.sumBy(bosses, "weight"));

watch(mapData, () => bosses.splice(0, bosses.length, ...parseMapBoss()));

watch(
  bosses,
  () => {
    const proportion = weightToProportion(bosses.map((t) => t.weight));
    mapData.value.randomBossList = bosses.map((t, i) => [proportion[i], t.id, t.diff.toFixed(1), {}]);
  },
  { deep: true }
);

const handleAddMonster = (val: string) => {
  bosses.push({ index: index++, id: val, weight: 1, diff: 1.0 });
  bossAdd.value = null;
};
</script>

<style scoped></style>
