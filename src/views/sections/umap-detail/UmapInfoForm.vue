<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="地图">
      <el-select-v2 v-model="form.mid" :options="allGameMapOptions" />
      <el-tag effect="light"> 难度系数：{{ mapData.hardA }},{{ mapData.hardB }} </el-tag>
      <el-tag effect="light"> Population：{{ mapData.populationMax }} </el-tag>
    </el-form-item>
    <el-form-item label="引狼到">
      <el-select v-model="form.mid2" clearable>
        <el-option label="无" value="" />
        <el-option v-for="t in allGameMaps" :key="t.id" :label="`${t.id} ${t.name}`" :value="t.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="该地图的狼">
      <el-tag
        v-for="item in formatWolfTag(mapDataObject.wolf_proportion as [number, MonsterId][])"
        :key="item.id"
        type="success"
        class="mx-1 tag-button"
        effect="light"
        @click="form.wid = item.id"
      >
        <sub>{{ item.prob }}</sub>
        {{ item.name }}
        <sup>{{ item.pop }}</sup>
      </el-tag>
    </el-form-item>
    <el-form-item label="随机 Boss" v-if="'random_boss' in mapDataObject">
      <el-tag
        v-for="item in formatRndBossTag(mapDataObject.random_boss as [number, MonsterId, string][])"
        :key="item.id"
        type="success"
        class="mx-1 tag-button"
        effect="light"
        @click="
          form.wid = item.id;
          form.diff = item.diff;
        "
      >
        <sub>{{ item.prob }}</sub>
        {{ item.name }}
        <sub>{{ item.diff }}</sub>
      </el-tag>
    </el-form-item>
    <el-form-item label="狼">
      <el-select-v2 v-model="form.wid" :options="allMonsterOptions" />
      <el-tag effect="light">
        血量系数：{{ monsterData.hpMaxA }},{{ monsterData.hpMaxB }},{{ monsterData.hpMaxC }}
      </el-tag>
    </el-form-item>
    <el-form-item label="进度">
      <el-input-number v-model="form.score" :min="0" />
      <el-tag effect="light" class="tag-button" @click="form.score = mapData2.scoreMax">
        通关进度：{{ mapData2.scoreMax }}
      </el-tag>
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
      <vue-latex :expression="`G(x) = (2+1.07p)(\\frac{L(x)}{0.39})^{2/3} = ${calcPKGold(monsterLevel)}`" />
    </el-form-item>
    <el-form-item>
      经验：
      <vue-latex :expression="`E(x) = (3.5+0.14p)(\\frac{L(x)}{0.39})^{2/3} = ${calcPKExp(monsterLevel)}`" />
    </el-form-item>
    <el-form-item>
      <div class="space-x-4">
        <span>总银币：{{ calcAccumulative.gold }}</span>
        <span>总经验：{{ calcAccumulative.exp }}</span>
        <span>（假设每波+2且不引狼）</span>
      </div>
    </el-form-item>
    <wolf-hp-chart :hp-data="hpData" />
  </el-form>
  <wave-tool :mid="form.mid" :mapMonsterData="mapMonsterData" />
</template>

<script setup lang="ts">
import _ from "lodash-es";

import { GlobalData } from "@/tdsheep/ado/GlobalData";
import type { MapId, MonsterId } from "@/tdsheep/ado/GlobalData";
import { MonsterManager } from "@/tdsheep/command/unit";
import { GameMap } from "@/tdsheep/module/map/GameMap";
import { allGameMaps, allMonsterOptions } from "@/utils/ui-data";
import { allGameMapOptions } from "@/utils/ui-data";
import DifficultySelect from "@/views/components/DifficultySelect.vue";
import WolfHpChart from "@/views/components/WolfHpChart.vue";

import WaveTool from "./WaveTool.vue";

const midModel = defineModel<MapId>("mid");

const form = reactive({
  mid: "m1" as MapId,
  mid2: "" as MapId | "",
  wid: "dahuil",
  score: 0,
  diff: 1.0,
});

watchEffect(() => {
  midModel.value = form.mid;
});

const mapDataObject = computed(() => GlobalData.$_map_Obj[form.mid]);
const mapData = computed(() => GameMap.getMapData(form.mid));
const mapData2 = computed(() => (form.mid2 === "" ? mapData.value : GameMap.getMapData(form.mid2)));
const mapMonsterData = computed(() => mapData.value.monsterList.map((t) => MonsterManager.getOnlyExample().getData(t)));
const monsterData = computed(() => MonsterManager.getOnlyExample().getData(form.wid));

const formatWolfTag = (wp: [number, MonsterId][]) => {
  return wp.map((item) => {
    let _wolf = GlobalData.$_wolfAtt_Obj[item[1]];
    return {
      id: item[1],
      prob: item[0],
      name: _wolf["name"],
      pop: _wolf["pop"],
    };
  });
};

const formatRndBossTag = (rb: [number, MonsterId, string][]) => {
  if (!rb) return [];
  return rb.map((item) => {
    let _wolf = GlobalData.$_wolfAtt_Obj[item[1]];
    return {
      id: item[1],
      prob: item[0],
      name: _wolf["name"],
      diff: parseFloat(item[2]),
    };
  });
};

const monsterLevel = computed(() => mapData2.value.getDifficultyLevel(form.score));
const monsterHpMax = computed(() => monsterData.value.getHpMax(monsterLevel.value, form.diff));

const hpData = computed(() =>
  mapMonsterData.value.map((t) => ({
    name: t.name,
    value: t.getHpMax(monsterLevel.value, form.diff),
  }))
);

const calcPKGold = (_level: float) => {
  const p = mapData.value.populationMax;
  return Math.round((2 + 1.07 * p) * Math.pow(_level / 0.39, 2 / 3));
};

const calcPKExp = (_level: float) => {
  const p = mapData.value.populationMax;
  return Math.round((3.5 + 0.14 * p) * Math.pow(_level / 0.39, 2 / 3));
};

const calcAccumulative = computed(() => {
  let gold = 0;
  let exp = 0;
  for (let i = 0; i <= mapData.value.scoreMax; i += 2) {
    let _level = Math.sqrt(mapData.value.hardA + mapData.value.hardB * i);
    gold += calcPKGold(_level);
    exp += calcPKExp(_level);
  }
  return { gold, exp };
});
</script>

<style scoped>
.tag-button {
  cursor: pointer;
}
</style>
