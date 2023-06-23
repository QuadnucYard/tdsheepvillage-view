<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="地图">
      <el-select v-model="form.mid">
        <el-option v-for="t in allGamemaps" :label="`${t.id} ${t.name}`" :value="t.id" />
      </el-select>
      <el-tag effect="light"> 难度系数：{{ mapData.hardA }},{{ mapData.hardB }} </el-tag>
      <el-tag effect="light"> Population：{{ mapData.populationMax }} </el-tag>
    </el-form-item>
    <el-form-item label="引狼到">
      <el-select v-model="form.mid2" clearable>
        <el-option label="无" value=""></el-option>
        <el-option v-for="t in allGamemaps" :label="`${t.id} ${t.name}`" :value="t.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="该地图的狼">
      <el-tag
        v-for="item in formatWolfTag(mapDataObject.wolf_proportion as [number, MonsterId][])"
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
      <el-input-number v-model="form.score" :min="0" :max="mapData2.scoreMax" />
      <el-tag effect="light" class="tag-button" @click="form.score = mapData2.scoreMax">
        通关进度：{{ mapData2.scoreMax }}
      </el-tag>
    </el-form-item>
    <el-form-item label="难度">
      <el-select v-model="form.diff">
        <el-option :value="0.8" label="小菜一碟" />
        <el-option :value="0.9" label="轻而易举" />
        <el-option :value="1.0" label="势均力敌" />
        <el-option :value="1.1" label="有惊无险" />
        <el-option :value="1.2" label="稍有难度" />
        <el-option :value="1.3" label="困难重重" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <label>等级：{{ monsterLevel.toFixed(2) }}</label>
      <label>最大血量：{{ monsterHpMax }}</label>
    </el-form-item>
    <el-form-item>
      <div class="space-x-4">
        <span>银币(估计)：{{ calcPKGold(monsterLevel) }}</span>
        <span>经验(估计)：{{ calcPKExp(monsterLevel) }}</span>
        <span>这里采用估计公式 $y=(ap+b)\sqrt[3]{h_a+h_bx}$</span>
      </div>
      <div class="space-x-4">
        <span>总银币(估计)：{{ calcAccumulative.gold }}</span>
        <span>总经验(估计)：{{ calcAccumulative.exp }}</span>
        <span>（假设每波+2且不引狼）</span>
      </div>
    </el-form-item>
    <wolf-hp-chart :hp-data="hpData" />
  </el-form>
  <wave-tool :mid="form.mid" :mapMonsterData="mapMonsterData" />
  <wave-distrib-chart :mid="form.mid" :width="600" :height="600" />
</template>

<script setup lang="ts">
import { GlobalData, MapId, MonsterId } from "@/tdsheep/ado/GlobalData";
import { GameMap } from "@/tdsheep/module/map/GameMap";
import { MonsterManager } from "@/tdsheep/command/unit";
import _ from "lodash-es";
import WolfHpChart from "./components/WolfHpChart.vue";
import WaveDistribChart from "./components/WaveDistribChart.vue";
import WaveTool from "./components/WaveTool.vue";

const allGamemaps = _.chain(GlobalData.$_map_Obj)
  .map((t, id) => _.extend(t, { id }))
  .toArray()
  .sortBy("index")
  .value();

const allMonsterOptions = _.chain(GlobalData.$_wolfAtt_Obj)
  .toPairs()
  .map(t => {
    let _name: string = t[1]["name"];
    return {
      value: t[0],
      label: _name.includes("^") ? _name.substring(_name.indexOf("^") + 1) : _name,
    };
  })
  .sortBy("id")
  .value();

const form = reactive({
  mid: "m1" as MapId,
  mid2: "" as MapId | "",
  wid: "dahuil",
  score: 0,
  diff: 1.0,
});

const mapDataObject = computed(() => GlobalData.$_map_Obj[form.mid]);
const mapData = computed(() => GameMap.getMapData(form.mid));
const mapData2 = computed(() => (form.mid2 === "" ? mapData.value : GameMap.getMapData(form.mid2)));
const mapMonsterData = computed(() =>
  mapData.value.monsterList.map(t => MonsterManager.getOnlyExample().getData(t))
);
const monsterData = computed(() => MonsterManager.getOnlyExample().getData(form.wid));

const formatWolfTag = (wp: [number, MonsterId][]) => {
  return wp.map(item => {
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
  mapMonsterData.value.map(t => ({
    name: t.name,
    value: t.getHpMax(monsterLevel.value, form.diff),
  }))
);

const calcPKGold = (_level: float) => {
  return Math.round((2.0045 * mapData.value.populationMax + 3.7475) * Math.pow(_level, 2 / 3));
};

const calcPKExp = (_level: float) => {
  return Math.round((0.2624 * mapData.value.populationMax + 6.5484) * Math.pow(_level, 2 / 3));
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

<style lang="scss">
.tag-button {
  cursor: pointer;
}
</style>
