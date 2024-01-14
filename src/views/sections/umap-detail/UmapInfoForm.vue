<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="地图">
      <el-select-v2 v-model="form.mid" :options="allGameMapOptions" filterable />
      <el-tag effect="light"> 难度系数：{{ mapData.hardA }},{{ mapData.hardB }} </el-tag>
      <el-tag effect="light"> Population：{{ mapData.populationMax }} </el-tag>
    </el-form-item>
    <el-form-item label="引狼到">
      <el-select v-model="form.mid2" filterable clearable>
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
    <el-form-item v-if="'random_boss' in mapDataObject" label="随机 Boss">
      <el-tag
        v-for="(item, index) in formatRndBossTag(mapDataObject.random_boss as [number, MonsterId, string][])"
        :key="index"
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

    <el-divider />

    <LevelPreview
      v-model:wid="form.wid"
      v-model:diff="form.diff"
      :map-data="mapData2"
      :map-monster-data="mapMonsterData"
    />
  </el-form>
</template>

<script setup lang="ts">
import { GlobalData } from "@/tdsheep/ado/GlobalData";
import type { MapId, MonsterId } from "@/tdsheep/ado/GlobalData";
import { GameMapData } from "@/tdsheep/command/map";
import { MonsterManager } from "@/tdsheep/command/unit";
import { GameMap } from "@/tdsheep/module/map/GameMap";
import { allGameMaps } from "@/utils/ui-data";
import { allGameMapOptions } from "@/utils/ui-data";
import LevelPreview from "@/views/components/LevelPreview.vue";

const midModel = defineModel<MapId>("mid");

const form = reactive({
  mid: "m1" as MapId,
  mid2: "" as MapId | "",
  wid: "dahuil",
  diff: 1.0,
});

const mapDataObject = computed(() => GlobalData.$_map_Obj[form.mid]);
const mapData = defineModel<GameMapData>("mapData", { default: GameMap.getMapData("m1") });
// const mapData = computed(() => GameMap.getMapData(form.mid));
const mapData2 = computed(() => (form.mid2 === "" ? mapData.value : GameMap.getMapData(form.mid2)));
const mapMonsterData = computed(() => mapData.value.monsterList.map((t) => MonsterManager.getOnlyExample().getData(t)));

watchEffect(() => {
  midModel.value = form.mid;
  mapData.value = GameMap.getMapData(form.mid);
});

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
</script>

<style scoped>
.tag-button {
  cursor: pointer;
}
</style>
