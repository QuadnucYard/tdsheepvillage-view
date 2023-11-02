<template>
  <el-row>
    <el-col :span="12">
      <tower-data-form :tower="tower" />
    </el-col>
    <el-col :span="12">
      <tower-info :tower="tower" />
    </el-col>
  </el-row>
  <tower-skill-table :tower="tower" />
</template>

<script setup lang="ts">
import { GlobalData } from "@/tdsheep/ado/GlobalData";
import { Tower } from "@/tdsheep/module/unit/Tower";
import _ from "lodash-es";
import TowerSkillTable from "./tower-design/TowerSkillTable.vue";
import TowerDataForm from "./tower-design/TowerDataForm.vue";
import TowerInfo from "./tower-design/TowerInfo.vue";
import { TowerData } from "@/tdsheep/command/unit";

const tower = reactive(new Tower(null));
tower.m_data = new TowerData(GlobalData.$_towerAtt_Obj.shaota);
</script>

<style lang="scss"></style>
