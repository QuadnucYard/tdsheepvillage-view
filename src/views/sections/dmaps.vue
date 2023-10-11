<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="id" label="id" sortable align="center" />
      <el-table-column prop="name" label="name" sortable align="center" />
      <el-table-column prop="interval" label="interval" sortable align="center" />
      <el-table-column prop="interval_rule" label="interval_rule" sortable align="center" />
      <el-table-column prop="hard_ness" label="hard_ness" sortable align="center" />
      <el-table-column prop="yield_val" label="yield_val" sortable align="center" />
      <el-table-column label="waves" type="expand" width="80">
        <template #default="props">
          <div v-if="props.row.waves" class="space-y-1">
            <div v-for="(v, k) in props.row.waves" :key="k" class="space-x-1">
              <el-tag>{{ k }}</el-tag>
              <el-tag
                v-for="x in v"
                :key="x"
                :style="{
                  color: strHSl(x, 40, 40),
                  'background-color': strHSl(x, 80, 90),
                  'border-color': strHSl(x, 50, 80),
                }"
              >
                {{ tr(x) }}
              </el-tag>
              <el-tag>{{ _.sumBy(v, (t: MonsterId) => getPop(t, 0)) }}</el-tag>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { GlobalData, MonsterId } from "@/tdsheep/ado/GlobalData";
import _ from "lodash-es";
import { strHSl } from "@/utils/colorful";
import { tr } from "@/utils/translate";
import { getPop } from "@/utils/game-utils";

const tableData = _.sortBy(Object.values(GlobalData.dream_maps), "name").map(t => ({
  ...t,
  waves: GlobalData.dream_waves[t.id as keyof typeof GlobalData.dream_waves],
}));
</script>

<style lang="scss" scoped>
.el-table {
  width: 100%;
  max-width: 1000px;
  margin: auto;
}
</style>
