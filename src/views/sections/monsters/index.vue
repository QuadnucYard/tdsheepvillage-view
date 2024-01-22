<template>
  <h1>狼数据</h1>
  <p>前排解释：</p>
  <p>pop 为狼在一波中占的容量，一般来说 pop 越大则出现机会越少。</p>
  <p>charm 影响到寻路，charm 为负值越小则其他狼越会排斥它。</p>
  <p>hp_factor 影响血量关于等级增长，是二次函数系数。</p>
  <el-table
    :data="allMonsters"
    :default-sort="{ prop: 'id', order: 'ascending' }"
    table-layout="auto"
    stripe
    :header-cell-style="{ 'text-align': 'center' }"
    :cell-style="{ 'text-align': 'center' }"
    row-key="id"
    max-height="600"
    style="width: 100%; max-width: 1280px"
  >
    <el-table-column prop="id" label="id" sortable :width="150" />
    <el-table-column
      prop="group"
      label="group"
      sortable
      :filters="groupFilters"
      :filter-method="(val, row) => row.group === val"
      :width="100"
    />
    <el-table-column prop="data.name" label="name" sortable />
    <el-table-column prop="data.speedBase" label="speedBase" sortable />
    <el-table-column prop="data.population" label="population" sortable />
    <el-table-column prop="data.charm" label="charm" sortable :width="80" />
    <el-table-column label="size">
      <el-table-column prop="data.width" label="width" sortable :width="100" />
      <el-table-column prop="data.height" label="height" sortable :width="100" />
    </el-table-column>
    <el-table-column label="hpFactor">
      <el-table-column prop="data.hpMaxA" label="a" sortable :width="90" />
      <el-table-column prop="data.hpMaxB" label="b" sortable :width="80" />
      <el-table-column prop="data.hpMaxC" label="c" sortable :width="80" />
    </el-table-column>
    <el-table-column label="skills" type="expand" width="60">
      <template #default="props">
        <div class="sk-list">
          <p v-for="skill in props.row.skills" :key="skill.data.id">
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
</template>

<script setup lang="ts">
import _ from "lodash-es";

import { GlobalData } from "@/tdsheep/ado/GlobalData";
import { Monster } from "@/tdsheep/module/unit/Monster";

const groupFilters = ["前线", "随机Boss", "Boss", "噩梦Boss", "大本营"].map((t) => ({ text: t, value: t }));

const allMonsters = _.map(GlobalData.$_wolfAtt_Obj, (t, k) => k)
  .sort()
  .map((t) => {
    let _wolf = new Monster(t, 0, 0);
    _wolf.initSkills();
    let _md = _wolf.monsterData;
    return {
      id: t,
      data: _md,
      skills: Object.values(_wolf.skills),
      group: _md.rawName.startsWith("camp_")
        ? "大本营"
        : _md.id.startsWith("D_")
          ? "噩梦Boss"
          : _md.population === 99
            ? "随机Boss"
            : _md.population === 100
              ? "Boss"
              : "前线",
    };
  });
</script>

<style lang="scss" scoped>
.sk-list {
  margin-left: 2em;
  span {
    margin-right: 0.5em;
  }
  .sk-buff {
    color: red;
    font-weight: bold;
    font-family: monospace;
  }
  .sk-debuff {
    color: black;
    font-weight: bold;
    font-family: monospace;
  }
  .sk-name {
    color: #000040;
    font-weight: bold;
  }
  .sk-id {
    color: #777;
    font-weight: bold;
    font-size: smaller;
  }
  .sk-info {
    color: #333;
    font-size: smaller;
  }

  .sk-tag {
    color: #4040f0;
    font-size: smaller;
  }
}
</style>
