<template>
  <el-button @click="$emit('export', mapData)">导出</el-button>

  <el-form :model="form" label-width="120px">
    <el-form-item label="原型">
      <el-select-v2 v-model="form.mid" :options="allGameMapOptions" />
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="mapData.name" style="width: 200px" />
    </el-form-item>
    <el-form-item label="通关进度">
      <el-input-number v-model="mapData.scoreMax" />
    </el-form-item>
    <el-form-item label="Population">
      <el-input-number v-model="mapData.populationMax" />
    </el-form-item>
    <el-form-item label="难度系数">
      <span>A</span>
      <el-input-number v-model="mapData.hardA" size="small" />
      <span>B</span>
      <el-input-number v-model="mapData.hardB" size="small" />
    </el-form-item>

    <el-form-item label="该地图的狼">
      <table class="text-center" style="width: 100%; max-width: 400px">
        <thead>
          <th>狼</th>
          <th>权重</th>
          <th>概率</th>
          <th>pop</th>
        </thead>
        <tbody>
          <tr v-for="(m, i) in mapMonsters">
            <td>
              <el-select-v2
                :key="i"
                v-model="m.id"
                :options="allNormalMonsterOptions"
                clearable
                @clear="mapMonsters.removeAt(i)"
                size="small"
                style="width: 100%"
              />
            </td>
            <td>
              <el-input-number v-model="m.weight" :min="0" size="small" />
            </td>
            <td>{{ (m.weight / sumWeight).toFixed(3) }}</td>
            <td>{{ mapMonsterData[i].population }}</td>
          </tr>
          <tr>
            <td>
              <el-select-v2
                v-model="mapMonsterAdd"
                :options="allNormalMonsterOptions"
                @change="handleAddMonster"
                size="small"
                style="width: 100%"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </el-form-item>
    <!-- <el-form-item label="随机 Boss" v-if="'random_boss' in mapDataObject"> </el-form-item> -->

    <el-divider />

    <LevelPreview :mapData="mapData" :mapMonsterData="mapMonsterData" />
  </el-form>
</template>

<script setup lang="ts">
import _ from "lodash-es";

import { GlobalData, MapId } from "@/tdsheep/ado/GlobalData";
import { GameMapData } from "@/tdsheep/command/map";
import { MonsterManager } from "@/tdsheep/command/unit";
import { allGameMapOptions, allNormalMonsterOptions } from "@/utils/ui-data";
import LevelPreview from "@/views/components/LevelPreview.vue";

defineEmits<{ export: [mapData: GameMapData] }>();

const proto = ref<ValueOf<typeof GlobalData.$_map_Obj>>(GlobalData.$_map_Obj.m0B);
const mapData = ref(new GameMapData(proto.value));

const form = reactive({
  mid: "m0B" as MapId,
  wid: "dahuil",
  score: 0,
  diff: 1.0,
});

watchEffect(() => {
  proto.value = GlobalData.$_map_Obj[form.mid];
  mapData.value = new GameMapData(proto.value);
});

const mapMonsters = reactive<{ id: string; weight: int }[]>([]);
const mapMonsterAdd = ref<string | null>(null);
const mapMonsterData = computed(() => mapMonsters.map((t) => MonsterManager.getOnlyExample().getData(t.id)));
const sumWeight = computed(() => _.sumBy(mapMonsters, "weight"));

watch(
  mapMonsters,
  () => {
    const accWeight: int[] = [];
    for (const { weight } of mapMonsters) {
      accWeight.push(accWeight.length == 0 ? weight : accWeight.at(-1)! + weight);
    }
    mapData.value.monsterList = mapMonsters.map((t) => t.id);
    mapData.value.monsterProportion = mapMonsters.map((t, i) => [accWeight[i] / sumWeight.value, t.id]);
  },
  { deep: true }
);

const handleAddMonster = (val: string) => {
  mapMonsters.push({ id: val, weight: 1 });
  mapMonsterAdd.value = null;
};
</script>

<style scoped></style>
