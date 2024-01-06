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
    <el-form-item label="狼">
      <el-select-v2 v-model="form.wid" :options="allMonsterOptions" />
      <el-tag effect="light">
        血量系数：{{ monsterData.hpMaxA }},{{ monsterData.hpMaxB }},{{ monsterData.hpMaxC }}
      </el-tag>
    </el-form-item>
    <el-form-item label="进度">
      <el-input-number v-model="form.score" :min="0" />
    </el-form-item>
    <el-form-item label="难度">
      <DifficultySelect v-model="form.diff" />
    </el-form-item>
    <el-form-item>
      <div class="space-x-8">
        <span>
          等级：
          <vue-latex :expression="`L(x)=\\sqrt{h_a + h_b x}=${monsterLevel.toFixed(2)}`" />
        </span>
        <span>最大血量：{{ monsterHpMax }}</span>
      </div>
    </el-form-item>
    <el-form-item>
      银币：
      <vue-latex :expression="`G(x) = (2+1.07p)(\\frac{L(x)}{0.39})^{2/3} = ${mapData.calcPKGold(monsterLevel)}`" />
    </el-form-item>
    <el-form-item>
      经验：
      <vue-latex :expression="`E(x) = (3.5+0.14p)(\\frac{L(x)}{0.39})^{2/3} = ${mapData.calcPKExp(monsterLevel)}`" />
    </el-form-item>
    <el-form-item>
      <div class="space-x-4">
        <!-- <span>总银币：{{ mapData.calcAccumulative().gold }}</span>
        <span>总经验：{{ mapData.calcAccumulative().exp }}</span> -->
        <span>（假设每波+2且不引狼）</span>
      </div>
    </el-form-item>
    <wolf-hp-chart :hp-data="hpData" :height="300" />
  </el-form>
</template>

<script setup lang="ts">
import _ from "lodash-es";

import { GlobalData, MapId } from "@/tdsheep/ado/GlobalData";
import { GameMapData } from "@/tdsheep/command/map";
import { MonsterManager } from "@/tdsheep/command/unit";
import { allGameMapOptions, allMonsterOptions, allNormalMonsterOptions } from "@/utils/ui-data";
import DifficultySelect from "@/views/components/DifficultySelect.vue";
import WolfHpChart from "@/views/components/WolfHpChart.vue";

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

const monsterData = computed(() => MonsterManager.getOnlyExample().getData(form.wid));

const monsterLevel = computed(() => mapData.value.getDifficultyLevel(form.score));
const monsterHpMax = computed(() => monsterData.value.getHpMax(monsterLevel.value, form.diff));

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

const hpData = computed(() =>
  mapMonsterData.value.map((t) => ({
    name: t.name,
    value: t.getHpMax(monsterLevel.value, form.diff),
  }))
);

const handleAddMonster = (val: string) => {
  mapMonsters.push({ id: val, weight: 1 });
  mapMonsterAdd.value = null;
};
</script>

<style scoped></style>
