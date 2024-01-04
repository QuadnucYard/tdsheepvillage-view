<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <tower-data-form :tower="tower" />
    </el-col>
    <el-col :span="12">
      <tower-info :tower="tower" />
    </el-col>
  </el-row>
  <tower-skill-table :tower="tower" class="mt-2" />
</template>

<script setup lang="ts">
import { GlobalData } from "@/tdsheep/ado/GlobalData";
import { TowerData } from "@/tdsheep/command/unit";
import { Tower } from "@/tdsheep/module/unit/Tower";

import TowerDataForm from "./TowerDataForm.vue";
import TowerInfo from "./TowerInfo.vue";
import TowerSkillTable from "./TowerSkillTable.vue";

const tower = reactive(new Tower(null));
tower.m_data = new TowerData(GlobalData.$_towerAtt_Obj.shaota);
</script>

<style lang="scss"></style>
