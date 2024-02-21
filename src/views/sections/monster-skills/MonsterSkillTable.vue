<template>
  <el-table-v2 :columns="columns" :data="data" :width="1200" :height="600" :estimated-row-height="40"> </el-table-v2>
</template>

<script setup lang="tsx">
import { ElTag } from "element-plus";
import type { Column } from "element-plus";
import _ from "lodash-es";
import { UnwrapRef } from "vue";

import { GlobalData } from "@/tdsheep/ado/GlobalData";
import { tr } from "@/utils/translate";

const ownersDict = computed(() =>
  _.chain(GlobalData.$_wolfAtt_Obj)
    .flatMap((t) => t.skills.map((u) => ({ skid: u.skid, lev: u.lev, owner_name: tr(t.id), owner_id: t.id })))
    .groupBy("skid")
    .value()
);

const data = computed(() =>
  _.chain(GlobalData.$_skillAtt_Obj.monsterSkill)
    .groupBy((t) => t.kindId)
    .map((t) => _.sortBy(t, "id"))
    .flatten()
    .map((t) => Object.assign({}, t, { owners: ownersDict.value[t.id] }))
    .value()
);

const columns: Column[] = [
  { key: "kindId", dataKey: "kindId", title: "kindId", width: 100, align: "center" },
  { key: "id", dataKey: "id", title: "id", width: 150, align: "center" },
  { key: "name", dataKey: "name", title: "name", width: 100, align: "center" },
  {
    key: "levels",
    dataKey: "levels",
    title: "levels",
    width: 300,
    cellRenderer: ({ cellData: levels }: { cellData: any[][] }) => (
      <div>
        {levels.map((t, i) => (
          <p>
            {" "}
            {i + 1}: <code>[{t.map((u) => JSON.stringify(u)).join(", ")}]</code>
          </p>
        ))}
      </div>
    ),
  },
  {
    key: "owners",
    dataKey: "owners",
    title: "owners",
    width: 550,
    cellRenderer: ({ cellData: owners }: { cellData: ValueOf<UnwrapRef<typeof ownersDict>> }) => (
      <div class="flex flex-wrap gap-0.5">
        {owners?.map((t) => (
          <ElTag>
            <ruby>
              {t.owner_name} <rt>{t.owner_id}</rt>
            </ruby>
            <sup>{t.lev}</sup>
          </ElTag>
        ))}
      </div>
    ),
  },
];
</script>

<style scoped></style>
