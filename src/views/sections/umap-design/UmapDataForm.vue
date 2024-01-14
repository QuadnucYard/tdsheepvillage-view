<template>
  <el-button @click="$emit('export', mapData)">导出</el-button>

  <el-form :model="form" label-width="120px">
    <el-form-item label="原型">
      <el-select-v2 v-model="form.mid" :options="allGameMapOptions" filterable />
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
      <UmapWolfTable :map-data="mapData" style="width: 100%" />
    </el-form-item>
    <el-form-item label="随机 Boss">
      <UmapRandomBossTable :map-data="mapData" style="width: 100%" />
    </el-form-item>

    <el-divider />

    <LevelPreview :map-data="mapData" :map-monster-data="mapMonsterData" />
  </el-form>
</template>

<script setup lang="ts">
import { GlobalData, MapId } from "@/tdsheep/ado/GlobalData";
import { GameMapData } from "@/tdsheep/command/map";
import { MonsterManager } from "@/tdsheep/command/unit";
import { allGameMapOptions } from "@/utils/ui-data";
import LevelPreview from "@/views/components/LevelPreview.vue";

import UmapRandomBossTable from "./UmapRandomBossTable.vue";
import UmapWolfTable from "./UmapWolfTable.vue";

defineEmits<{ export: [mapData: GameMapData] }>();

const proto = ref<ValueOf<typeof GlobalData.$_map_Obj>>(GlobalData.$_map_Obj.m0B);
const mapData = defineModel<GameMapData>("mapData", { default: new GameMapData(GlobalData.$_map_Obj.m0B) });

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

const mapMonsterData = computed(() => mapData.value.monsterList.map((t) => MonsterManager.getOnlyExample().getData(t)));
</script>

<style scoped></style>
