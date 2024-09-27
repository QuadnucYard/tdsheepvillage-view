<template>
  <p>前排解释：</p>
  <p>狼的等级随进度增加而增加。难度系数 hardA 影响初始狼等级，hardB 影响等级增长速率。</p>
  <p>population 影响一波狼的容量。每只狼都会占用一定容量。</p>
  <p>不同随机boss有出现权重。出现率、难度、奖励水平是相对应的，难的比较稀有，奖励也会比较好。</p>
  <el-table
    :data="allGameMaps"
    :default-sort="{ prop: 'index', order: 'ascending' }"
    table-layout="auto"
    stripe
    :header-cell-style="{ 'text-align': 'center' }"
    height="600px"
    style="width: 100%; font-size: 80%"
    class="testbox"
  >
    <el-table-column prop="index" label="index" sortable align="center" fixed width="70" />
    <el-table-column prop="id" label="id" sortable align="center" fixed width="80" />
    <el-table-column prop="name" label="name" sortable align="center" fixed width="80" />

    <el-table-column prop="pass_score" label="scoreMax" sortable align="center" />
    <el-table-column label="hardnessFactor">
      <el-table-column prop="yield_val" label="hardA" sortable align="center" />
      <el-table-column prop="hard_ness" label="hardB" sortable align="center" />
    </el-table-column>
    <el-table-column prop="pop_max" label="populationMax" sortable align="center" />
    <el-table-column prop="interval" label="unkennelDelay" sortable align="center" />
    <el-table-column prop="interval_rule" label="unkennelRule" sortable align="center" />
    <el-table-column prop="teleport_rule" label="teleportRule" sortable align="center" />
    <el-table-column prop="need_lev" label="needLevel" sortable :sort-method="sortByNeedLevel" align="center" />
    <el-table-column prop="pass_by" label="passBy" align="center">
      <template #default="props">
        {{ props.row.pass_by.map((u: MapId) => GlobalData.$_map_Obj[u].name).join(", ") }}
      </template>
    </el-table-column>
    <el-table-column prop="wolf_proportion" label="monsterList" :cell-style="{ 'text-align': 'left' }">
      <template #default="props">
        <div class="flex flex-wrap gap-0.5">
          <el-tag v-for="w in formatWolfProp(props.row.wolf_proportion)" :key="w.prob">
            <sub>{{ w.prob }}</sub>
            {{ w.name }}
            <sup>{{ w.pop }}</sup>
          </el-tag>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import * as _ from "lodash-es";

import { GlobalData, MapId } from "@/tdsheep/ado/GlobalData";
import { MonsterManager } from "@/tdsheep/command/unit";

const allGameMaps = _.map(GlobalData.$_map_Obj, (t, k) => _.extend(t, { id: k }));

const sortByNeedLevel = (a: { need_lev?: number }, b: { need_lev?: number }) => {
  let l1 = a.need_lev || 0,
    l2 = b.need_lev || 0;
  return l1 - l2;
};

const formatWolfProp = (wp: [number, string][]) => {
  return wp.map((item) => {
    const _wolf = MonsterManager.getOnlyExample().getData(item[1]);
    return {
      prob: item[0],
      name: _wolf.name,
      pop: _wolf.population,
    };
  });
};
</script>

<style lang="scss">
.testbox {
  .el-table--scrollable-x .el-table__body-wrapper {
    overflow: auto !important;
  }
}
</style>
