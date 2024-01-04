<template>
  <div>
    <el-button @click="dialogImportVisible = true">导入</el-button>
    <el-button @click="showExportDialog">导出</el-button>

    <el-table :data="tableData" style="max-width: 1200px">
      <el-table-column prop="key" label="Key" :width="80" align="center" />
      <el-table-column label="Wolf">
        <template #default="scope">
          <DreamWaveEditor :wolf-list="wolfList" v-model="scope.row.wolf" @change="refreshPopu(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="Population" :width="160" align="center">
        <template #default="scope">
          <el-input-number
            v-model="scope.row.popu"
            size="small"
            :min="0"
            @change="onPopuChanged(scope.row)"
            style="width: 90px"
            :class="{ primary: scope.row.popFixed }"
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

    <el-dialog v-model="dialogImportVisible" title="导出数据">
      <el-input type="textarea" :rows="10" v-model="importString" :spellcheck="false" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogImportVisible = false">取消</el-button>
          <el-button type="primary" @click="onImportDialogConfirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogExportVisible" title="导出数据">
      <!-- <el-input type="textarea" :rows="10" v-model="exportString" :spellcheck="false" /> -->
      <vue-json-pretty :data="exportData" virtual :deep="2" />
      <el-button @click="copyExportString" ref="someRef">复制到剪贴板</el-button>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Lock, Unlock } from "@element-plus/icons-vue";
import { ElInput, ElMessage } from "element-plus";
import "element-plus/es/components/autocomplete/style/css";
import useClipboard from "vue-clipboard3";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

import { GlobalData, MonsterId } from "@/tdsheep/ado/GlobalData";
import { getTotalPop } from "@/utils/game-utils";
import { tr } from "@/utils/translate";

import DreamWaveEditor from "./DreamWaveEditor.vue";

const { toClipboard } = useClipboard();

const dialogImportVisible = ref(false);
const importString = ref("");
const dialogExportVisible = ref(false);
const exportData = ref({});
const exportString = ref("");

const someRef = ref();

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

const onImportDialogConfirm = () => {
  const importData = JSON.parse(importString.value);
  tableData.value = allKeys.map((k) => ({
    key: k,
    wolf: (importData.wolf[k] ?? importData.boss[k] ?? []).map((t: string) => ({
      id: t,
      value: tr(t),
    })),
    popu: importData.popu[k],
    popFixed: true,
  }));
  dialogImportVisible.value = false;
};

const showExportDialog = () => {
  dialogExportVisible.value = true;
  const exportData_ = {
    wolf: {} as { [key: string]: string[] },
    boss: {} as { [key: string]: string[] },
    popu: {} as { [key: string]: int },
  };
  for (const row of tableData.value) {
    const wolfs = row.wolf.map((t) => t.id);
    exportData_[row.key < 10 ? "wolf" : "boss"][row.key] = wolfs;
    if (row.key < 10) {
      exportData_.wolf[row.key] = wolfs;
    } else {
      exportData_.boss[row.key] = wolfs;
    }
    exportData_.popu[row.key] = row.popu;
  }
  exportData.value = exportData_;
  exportString.value = JSON.stringify(exportData_);
};

const copyExportString = () => {
  toClipboard(exportString.value, someRef.value.$el);
  ElMessage.success("已复制到剪贴板");
};
</script>

<style>
.primary .el-input__inner {
  color: var(--el-color-primary) !important;
}
</style>
