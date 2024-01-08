<template>
  <table class="text-center markup-table">
    <thead>
      <th>狼</th>
      <th>权重</th>
      <th>概率</th>
      <th>pop</th>
    </thead>
    <tbody>
      <tr v-for="(m, i) in monsters">
        <td>
          <el-select-v2
            :key="m.index"
            v-model="m.id"
            :options="allNormalMonsterOptions"
            clearable
            @clear="monsters.removeAt(i)"
            size="small"
          />
        </td>
        <td>
          <el-input-number v-model="m.weight" :min="0" size="small" />
        </td>
        <td>{{ (m.weight / sumWeight).toFixed(3) }}</td>
        <td>{{ monsterData[i].population }}</td>
      </tr>
      <tr>
        <td>
          <el-select-v2
            v-model="monsterAdd"
            :options="allNormalMonsterOptions"
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
import { MonsterManager } from "@/tdsheep/command/unit";
import { proportionToWeight, weightToProportion } from "@/utils/game-utils";
import { allNormalMonsterOptions } from "@/utils/ui-data";

const props = defineProps<{ mapData: GameMapData }>();
const { mapData } = toRefs(props);

let index = 0;

const parseMapMonsters = () =>
  _.zip(mapData.value.monsterProportion, proportionToWeight(mapData.value.monsterProportion.map((t) => t[0]))).map(
    (t) => ({
      index: index++,
      id: t[0]![1],
      weight: t[1]!,
    })
  );

const monsters = reactive<{ index: int; id: string; weight: int }[]>(parseMapMonsters());
const monsterAdd = ref<string | null>(null);
const monsterData = computed(() => monsters.map((t) => MonsterManager.getOnlyExample().getData(t.id)));
const sumWeight = computed(() => _.sumBy(monsters, "weight"));

watch(mapData, () => monsters.splice(0, monsters.length, ...parseMapMonsters()));

watch(
  monsters,
  () => {
    const proportion = weightToProportion(monsters.map((t) => t.weight));
    mapData.value.monsterList = monsters.map((t) => t.id);
    mapData.value.monsterProportion = monsters.map((t, i) => [proportion[i], t.id]);
  },
  { deep: true }
);

const handleAddMonster = (val: string) => {
  monsters.push({ index: index++, id: val, weight: 1 });
  monsterAdd.value = null;
};
</script>

<style scoped></style>
