<template>
  <el-table
    :data="allBullets"
    :default-sort="{ prop: 'id', order: 'ascending' }"
    table-layout="auto"
    stripe
    :header-cell-style="{ 'text-align': 'center' }"
    style="width: 100%; font-size: 80%"
  >
    <el-table-column prop="id" label="id" sortable align="center" fixed width="80" />
    <el-table-column prop="shapeMode" label="shapeMode" sortable align="center" />
    <el-table-column prop="damageMode" label="damageMode" sortable align="center" />
    <el-table-column prop="radii" label="radii" sortable align="center" />
    <el-table-column prop="fallAcc" label="fallAccSpeed" sortable align="center" />
    <el-table-column prop="shadow" label="shadow" sortable align="center" />
    <el-table-column prop="effect" label="hitEffectId" sortable align="center" />
    <el-table-column prop="path" label="floorPathId" sortable align="center" />
  </el-table>
</template>

<script setup lang="ts">
import * as _ from "lodash-es";

import { GlobalData } from "@/tdsheep/ado/GlobalData";

const allBullets = _.map(GlobalData.$_bulletAtt_Obj, (t, k) => _.extend(t, { id: k }));
</script>

<style scoped></style>
