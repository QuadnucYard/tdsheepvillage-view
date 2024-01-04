<template>
  <div>
    <h2>狼相关计算</h2>
    <div>总实力：{{ allPower }}</div>
    <el-tabs v-model="editableTabsValue" type="border-card" editable @edit="handleTabsEdit" class="m-4">
      <el-tab-pane v-for="(wolf, i) in wolfs" :key="wolf.index" :label="wolf.monsterData.name" :name="wolf.index">
        <wolf-calc-one :wolf="wolf" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import type { TabPaneName } from "element-plus";
import _ from "lodash-es";

import { GlobalData } from "@/tdsheep/ado/GlobalData";
import { Monster } from "@/tdsheep/module/unit/Monster";

import WolfCalcOne from "./WolfCalcOne.vue";

const wolfs = reactive([new Monster("dahuil")]);
const editableTabsValue = ref(wolfs[0].index);

const allPower = computed(() => {
  const [p1, p2] = GlobalData.$_wolf_worth_factor;
  return Math.round(
    Math.pow(
      _.sumBy(wolfs, (w) => Math.pow(w.power, p1)),
      p2
    )
  );
});

const handleTabsEdit = (targetName: TabPaneName | undefined, action: "remove" | "add") => {
  if (action === "add") {
    const wolf = new Monster("dahuil");
    wolfs.push(wolf);
    editableTabsValue.value = wolf.index;
  } else if (action === "remove") {
    const tabs = wolfs;
    let activeName = editableTabsValue.value;
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.index === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.index;
          }
        }
      });
    }

    editableTabsValue.value = activeName;
    wolfs.splice(
      wolfs.findIndex((t) => t.index === targetName),
      1
    );
  }
};
</script>

<style scoped></style>
