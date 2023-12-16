<template>
  <div>
    <el-table ref="skillTableRef" :data="tableData" stripe border table-layout="auto" style="font-size: small">
      <el-table-column label="Skill" header-align="center">
        <template #default="scope: { row: SkillItem }">
          <tower-skill-item :tower="tower" v-model="scope.row.data" />
        </template>
      </el-table-column>
      <el-table-column label="Level" header-align="center" :width="130">
        <template #default="scope: { row: SkillItem }">
          <el-input-number
            v-if="tower.skills[scope.row.data.kindId]"
            v-model="tower.skills[scope.row.data.kindId].level"
            style="width: 120px"
          />
        </template>
      </el-table-column>
      <el-table-column label="Info" header-align="center">
        <template #default="scope: { row: SkillItem }">
          {{ tower.skills[scope.row.data.kindId]?.skillInfo }}
        </template>
      </el-table-column>
      <el-table-column label="操作" :width="100" align="center">
        <template #default="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="addRow">新增</el-button>
  </div>
</template>

<script setup lang="ts">
import { ElTable } from "element-plus";

import { Tower } from "@/tdsheep/module/unit/Tower";

import TowerSkillItem from "./TowerSkillItem.vue";

const props = defineProps<{ tower: Tower }>();

type SkillItem = { data: { kindId: string; params: (number | string)[] } };

const tableData = reactive<SkillItem[]>([]);

const skillTableRef = ref<InstanceType<typeof ElTable>>();

const addRow = () => {
  tableData.push({ data: { kindId: "", params: [] } });
};

const handleDelete = (index: number, row: SkillItem) => {
  tableData.splice(index, 1);
};
</script>

<style scoped></style>
