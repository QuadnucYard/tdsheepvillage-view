<template>
  <div>
    <el-button @click="handleImport">导入</el-button>
    <el-button @click="handleExport">导出</el-button>

    <el-table :data="tableData" style="max-width: 1200px">
      <el-table-column prop="key" label="Key" :width="80" align="center" />
      <el-table-column label="Wolf">
        <template #default="scope">
          <DreamWaveEditor v-model="scope.row.wolf" :wolf-list="wolfList" @change="refreshPopu(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="Population" :width="160" align="center">
        <template #default="scope">
          <el-input-number
            v-model="scope.row.popu"
            size="small"
            :min="0"
            style="width: 90px"
            :class="{ primary: scope.row.popFixed }"
            @change="onPopuChanged(scope.row)"
          />
          <el-button
            :icon="scope.row.popFixed ? Unlock : Lock"
            circle
            size="small"
            class="m-0.5"
            @click="scope.row.popFixed ? refreshPopu(scope.row, true) : (scope.row.popFixed = true)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { Lock, Unlock } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

import { useDialogExport, useDialogImport } from "@/hooks/dialogs";
import { GlobalData, MonsterId } from "@/tdsheep/ado/GlobalData";
import { getTotalPop } from "@/utils/game-utils";
import { tr } from "@/utils/translate";

import DreamWaveEditor from "./DreamWaveEditor.vue";

const dialogImport = useDialogImport();
const dialogExport = useDialogExport();

type WolfItem = { id: MonsterId; value: string };
const wolfList: WolfItem[] = (Object.keys(GlobalData.$_wolfAtt_Obj) as MonsterId[]).map((t) => ({
  id: t,
  value: tr(t),
}));

const allKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const tableData = ref(
  allKeys.map((k) => ({
    key: k,
    wolf: [] as WolfItem[],
    popu: 0,
    popFixed: false,
  }))
);
type TableRow = (typeof tableData.value)[0];

const refreshPopu = (row: TableRow, force: boolean = false) => {
  if (!row.popFixed || force) {
    row.popFixed = false;
    row.popu = getTotalPop(row.wolf.map((t: WolfItem) => t.id));
  }
};
const onPopuChanged = (row: TableRow) => {
  if (row.popu == 0) {
    row.popFixed = false;
    refreshPopu(row);
  } else {
    row.popFixed = true;
  }
};

const handleImport = async () => {
  const importData = await dialogImport.open();
  try {
    tableData.value = allKeys.map((k) => ({
      key: k,
      wolf: (importData.wolf[k] ?? importData.boss[k] ?? []).map((t: string) => ({
        id: t,
        value: tr(t),
      })),
      popu: importData.popu[k],
      popFixed: true,
    }));
    ElMessage.success("成功导入数据");
  } catch (e) {
    ElMessage.error("导入格式错误！");
  }
};

const handleExport = () => {
  const exportData = {
    wolf: {} as { [key: string]: string[] },
    boss: {} as { [key: string]: string[] },
    popu: {} as { [key: string]: int },
  };
  for (const row of tableData.value) {
    const wolfs = row.wolf.map((t) => t.id);
    exportData[row.key < 10 ? "wolf" : "boss"][row.key] = wolfs;
    exportData.popu[row.key] = row.popu;
  }
  dialogExport.open(exportData);
};
</script>

<style>
.primary .el-input__inner {
  color: var(--el-color-primary) !important;
}
</style>
