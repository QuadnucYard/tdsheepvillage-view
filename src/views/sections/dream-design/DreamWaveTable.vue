<template>
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
</template>

<script setup lang="ts">
import { Lock, Unlock } from "@element-plus/icons-vue";

import { GlobalData, MonsterId } from "@/tdsheep/ado/GlobalData";
import { getTotalPop } from "@/utils/game-utils";
import { tr } from "@/utils/translate";
import { dreamWaveKeys } from "@/utils/ui-data";

import DreamWaveEditor from "./DreamWaveEditor.vue";

type WolfItem = { id: MonsterId; value: string };

const wolfList: WolfItem[] = (Object.keys(GlobalData.$_wolfAtt_Obj) as MonsterId[]).map((t) => ({
  id: t,
  value: tr(t),
}));

type TableRow = {
  key: int;
  wolf: WolfItem[];
  popu: int;
  popFixed: boolean;
};

const tableData = defineModel<TableRow[]>({
  default: dreamWaveKeys.map((k) => ({
    key: k,
    wolf: [],
    popu: 0,
    popFixed: false,
  })),
});

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

const importData = (data: any) => {
  tableData.value = dreamWaveKeys.map((k) => ({
    key: k,
    wolf: (data.wolf[k] ?? data.boss[k] ?? []).map((t: string) => ({
      id: t,
      value: tr(t),
    })),
    popu: data.popu[k] as int,
    popFixed: true,
  }));
};

const toExportData = () => {
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
  return exportData;
};

defineExpose({ importData, toExportData });
</script>

<style>
.primary .el-input__inner {
  color: var(--el-color-primary) !important;
}
</style>
