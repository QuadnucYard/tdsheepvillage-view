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
            <div v-for="(v, k) in props.row.waves" class="space-x-1">
              <el-tag>{{ k }}</el-tag>
              <el-tag v-for="x in v" type="info">{{ tr(x) }}</el-tag>
            </div>
            <p v-for="skill in props.row.skills">
              <span v-if="skill.isDebuff" class="sk-debuff">↓</span>
              <span v-else class="sk-buff">↑</span>
              <span class="sk-name">{{ skill.name }}</span>
              <span class="sk-id">[{{ skill.data.id }}]</span>
              <span class="sk-info">{{ skill.skillInfo }}</span>
              <span v-if="skill.skillTag1" class="sk-tag">{{ skill.skillTag1 }}</span>
              <span v-if="skill.skillTag2" class="sk-tag">{{ skill.skillTag2 }}</span>
              <span v-if="skill.skillTag3" class="sk-tag">{{ skill.skillTag3 }}</span>
            </p>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { GlobalData } from "@/tdsheep/ado/GlobalData";
import _ from "lodash-es";
import { tr } from "@/utils/translate";

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
